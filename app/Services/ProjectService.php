<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Attachment;
use App\Models\Backoffice\Project;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProjectService
{
    public function __construct(
        private readonly AttachmentService $attachmentService
    ) {}

    /**
     * Créer un nouveau projet et synchroniser ses relations sous transaction atomique.
     *
     * @param  array<string, mixed>  $attributes
     * @param  array<int, array{id: int}>|null  $tags
     * @param  array<int, array{id: int}>|null  $stackItems
     * @param  array<int, array{file: UploadedFile, title?: string|null}>|null  $attachments
     *
     * @throws Throwable
     */
    public function create(
        array $attributes,
        ?array $tags = null,
        ?array $stackItems = null,
        ?array $attachments = null
    ): Project {
        return DB::transaction(function () use ($attributes, $tags, $stackItems, $attachments): Project {
            $attributes['sort_order'] = (int) (Project::max('sort_order') ?? 0) + 1;

            /** @var Project $project */
            $project = Project::create($attributes);

            if (! empty($tags)) {
                $project->tags()->attach(array_column($tags, 'id'));
            }

            if (! empty($stackItems)) {
                $project->stackItems()->attach(array_column($stackItems, 'id'));
            }

            if (! empty($attachments)) {
                foreach ($attachments as $attachmentData) {
                    if (isset($attachmentData['file']) && $attachmentData['file'] instanceof UploadedFile) {
                        $attachment = $this->attachmentService->store(
                            file: $attachmentData['file'],
                            title: $attachmentData['title'] ?? null
                        );
                        $project->attachments()->attach($attachment->id);
                    }
                }
            }

            return $project;
        });
    }

    /**
     * Mettre à jour un projet existant et synchroniser ses dépendances.
     *
     * @param  array<string, mixed>  $attributes
     * @param  array<int, array{id: int}>|null  $tags
     * @param  array<int, array{id: int}>|null  $stackItems
     * @param  array<int, array<string, mixed>>|null  $attachments
     *
     * @throws Throwable
     */
    public function update(
        Project $project,
        array $attributes,
        ?array $tags = null,
        ?array $stackItems = null,
        ?array $attachments = null
    ): Project {
        return DB::transaction(function () use ($project, $attributes, $tags, $stackItems, $attachments): Project {
            $project->update($attributes);

            if ($tags !== null) {
                $project->tags()->sync(array_column($tags, 'id'));
            } else {
                $project->tags()->detach();
            }

            if ($stackItems !== null) {
                $project->stackItems()->sync(array_column($stackItems, 'id'));
            } else {
                $project->stackItems()->detach();
            }

            if ($attachments !== null) {
                $this->syncAttachments($project, $attachments);
            }

            return $project->fresh(['tags', 'stackItems', 'attachments']);
        });
    }

    /**
     * Mettre à jour l'ordre d'affichage des projets de manière ordonnée.
     *
     * @param  array<int, array{id: int, sort_order: int}>  $orderedProjects
     *
     * @throws Throwable
     */
    public function sort(array $orderedProjects): void
    {
        DB::transaction(function () use ($orderedProjects): void {
            // Éviter les conflits d'unicité avec un décalage temporaire élevé
            foreach ($orderedProjects as $index => $item) {
                Project::where('id', $item['id'])->update(['sort_order' => $index + 9000]);
            }

            // Réassigner l'ordre séquentiel définitif
            foreach ($orderedProjects as $index => $item) {
                Project::where('id', $item['id'])->update(['sort_order' => $index]);
            }
        });
    }

    /**
     * Supprimer un projet et nettoyer ses fichiers associés.
     *
     *
     * @throws Throwable
     */
    public function delete(Project $project): bool
    {
        return DB::transaction(function () use ($project): bool {
            foreach ($project->attachments as $attachment) {
                $this->attachmentService->delete($attachment);
            }

            $project->tags()->detach();
            $project->stackItems()->detach();
            $project->attachments()->detach();

            return (bool) $project->delete();
        });
    }

    /**
     * Synchroniser les pièces jointes (nouveaux fichiers, ordonnancement, suppression d'anciens).
     *
     * @param  array<int, array<string, mixed>>  $attachmentsData
     */
    private function syncAttachments(Project $project, array $attachmentsData): void
    {
        $existingAttachmentsInRequest = [];
        $existingAttachmentsInModel = $project->attachments()->get();

        $index = 0;

        foreach ($attachmentsData as $attachment) {
            if (! isset($attachment['file'])) {
                continue;
            }

            // Nouveau fichier téléversé
            if ($attachment['file'] instanceof UploadedFile) {
                $newAttachment = $this->attachmentService->store(
                    file: $attachment['file'],
                    title: $attachment['title'] ?? null
                );

                $project->attachments()->attach($newAttachment->id, ['sort_order' => $index]);
            } else {
                // Fichier existant conservé
                $attachmentId = (int) $attachment['id'];
                $existingAttachmentsInRequest[] = $attachmentId;

                $project->attachments()->updateExistingPivot($attachmentId, [
                    'sort_order' => $index,
                ]);

                Attachment::where('id', $attachmentId)->update([
                    'title' => $attachment['title'] ?? null,
                ]);
            }

            $index++;
        }

        // Suppression des pièces jointes retirées de l'interface
        foreach ($existingAttachmentsInModel as $modelAttachment) {
            if (! in_array($modelAttachment->id, $existingAttachmentsInRequest, true)) {
                $project->attachments()->detach($modelAttachment->id);
                $this->attachmentService->delete($modelAttachment);
            }
        }
    }
}
