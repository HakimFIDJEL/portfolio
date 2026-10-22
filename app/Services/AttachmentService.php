<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Attachment;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class AttachmentService
{
    /**
     * Disque de stockage par défaut pour les pièces jointes publiques.
     */
    private const DISK = 'public';

    /**
     * Dossier relatif pour le stockage des pièces jointes.
     */
    private const DIRECTORY = 'attachments';

    /**
     * Enregistrer un fichier téléversé et persister l'enregistrement Attachment.
     *
     *
     * @throws RuntimeException Si le stockage du fichier échoue
     */
    public function store(UploadedFile $file, ?string $title = null, ?string $description = null): Attachment
    {
        $filePath = $file->store(self::DIRECTORY, self::DISK);

        if ($filePath === false) {
            throw new RuntimeException("Échec du téléversement du fichier {$file->getClientOriginalName()}.");
        }

        return Attachment::create([
            'title' => $title,
            'description' => $description,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $filePath,
            'mime_type' => $file->getClientMimeType() ?: 'application/octet-stream',
            'file_extension' => $file->getClientOriginalExtension() ?: pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION),
            'file_size' => $file->getSize() ?: 0,
        ]);
    }

    /**
     * Mettre à jour les métadonnées d'une pièce jointe.
     *
     * @param  array{title?: string|null, description?: string|null}  $data
     */
    public function update(Attachment $attachment, array $data): bool
    {
        return $attachment->update([
            'title' => $data['title'] ?? $attachment->title,
            'description' => $data['description'] ?? $attachment->description,
        ]);
    }

    /**
     * Supprimer une pièce jointe de la base et du système de fichiers.
     */
    public function delete(Attachment $attachment): bool
    {
        if (Storage::disk(self::DISK)->exists($attachment->file_path)) {
            Storage::disk(self::DISK)->delete($attachment->file_path);
        }

        return (bool) $attachment->delete();
    }
}
