<?php

declare(strict_types=1);

use App\Models\Backoffice\Project;
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\StackItem;
use App\Models\Backoffice\Tag;
use App\Services\AttachmentService;
use App\Services\ProjectService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function (): void {
    Storage::fake('public');
});

test('project service creates project with tags, stack items and attachments in transaction', function (): void {
    $tag = Tag::create(['name_fr' => 'Web', 'name_en' => 'Web', 'sort_order' => 1]);
    $stack = Stack::create(['name_fr' => 'Backend', 'name_en' => 'Backend', 'sort_order' => 1]);
    $stackItem = StackItem::create(['stack_id' => $stack->id, 'name' => 'Laravel', 'sort_order' => 1]);

    $service = new ProjectService(new AttachmentService);
    $file = UploadedFile::fake()->image('project.jpg');

    $project = $service->create(
        attributes: [
            'type' => 'project',
            'title_fr' => 'Projet Test',
            'title_en' => 'Test Project',
            'subtitle_fr' => 'Sous-titre',
            'subtitle_en' => 'Subtitle',
            'slug_fr' => 'projet-test',
            'slug_en' => 'test-project',
        ],
        tags: [['id' => $tag->id]],
        stackItems: [['id' => $stackItem->id]],
        attachments: [
            ['file' => $file, 'title' => 'Capture Principale'],
        ]
    );

    expect($project)->toBeInstanceOf(Project::class)
        ->and($project->tags)->toHaveCount(1)
        ->and($project->stackItems)->toHaveCount(1)
        ->and($project->attachments)->toHaveCount(1)
        ->and($project->sort_order)->toBe(1);

    Storage::disk('public')->assertExists($project->attachments->first()->file_path);
});

test('project service updates and syncs relations properly', function (): void {
    $tag1 = Tag::create(['name_fr' => 'Web', 'name_en' => 'Web', 'sort_order' => 1]);
    $tag2 = Tag::create(['name_fr' => 'Mobile', 'name_en' => 'Mobile', 'sort_order' => 2]);

    $service = new ProjectService(new AttachmentService);
    $project = $service->create(
        attributes: [
            'type' => 'project',
            'title_fr' => 'Init',
            'title_en' => 'Init',
            'subtitle_fr' => 'Sub',
            'subtitle_en' => 'Sub',
            'slug_fr' => 'init-fr',
            'slug_en' => 'init-en',
        ],
        tags: [['id' => $tag1->id]]
    );

    expect($project->tags->first()->id)->toBe($tag1->id);

    $updated = $service->update(
        project: $project,
        attributes: ['title_fr' => 'Titre Modifié'],
        tags: [['id' => $tag2->id]]
    );

    expect($updated->title_fr)->toBe('Titre Modifié')
        ->and($updated->tags)->toHaveCount(1)
        ->and($updated->tags->first()->id)->toBe($tag2->id);
});

test('project service sorts projects cleanly without duplicate errors', function (): void {
    $service = new ProjectService(new AttachmentService);

    $p1 = $service->create(['type' => 'project', 'title_fr' => 'A', 'title_en' => 'A', 'subtitle_fr' => 'A', 'subtitle_en' => 'A', 'slug_fr' => 'a-fr', 'slug_en' => 'a-en']);
    $p2 = $service->create(['type' => 'project', 'title_fr' => 'B', 'title_en' => 'B', 'subtitle_fr' => 'B', 'subtitle_en' => 'B', 'slug_fr' => 'b-fr', 'slug_en' => 'b-en']);

    $service->sort([
        ['id' => $p2->id, 'sort_order' => 0],
        ['id' => $p1->id, 'sort_order' => 1],
    ]);

    expect($p2->fresh()->sort_order)->toBe(0)
        ->and($p1->fresh()->sort_order)->toBe(1);
});

test('project service deletes project and cleans attached files', function (): void {
    $service = new ProjectService(new AttachmentService);
    $file = UploadedFile::fake()->image('clean.png');

    $project = $service->create(
        attributes: [
            'type' => 'project',
            'title_fr' => 'Del',
            'title_en' => 'Del',
            'subtitle_fr' => 'Del',
            'subtitle_en' => 'Del',
            'slug_fr' => 'del-fr',
            'slug_en' => 'del-en',
        ],
        attachments: [['file' => $file, 'title' => 'ToDelete']]
    );

    $path = $project->attachments->first()->file_path;
    Storage::disk('public')->assertExists($path);

    $result = $service->delete($project);

    expect($result)->toBeTrue();
    Storage::disk('public')->assertMissing($path);
    expect(Project::find($project->id))->toBeNull();
});
