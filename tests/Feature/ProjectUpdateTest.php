<?php

declare(strict_types=1);

use App\Models\Backoffice\Project;
use App\Models\User;
use App\Services\AttachmentService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function (): void {
    Storage::fake('public');
    $this->actingAs(User::factory()->create(['email_verified_at' => now()]));
    $this->project = Project::create([
        'type' => 'project',
        'title_fr' => 'Projet',
        'title_en' => 'Project',
        'subtitle_fr' => 'Sous-titre',
        'subtitle_en' => 'Subtitle',
        'slug_fr' => 'projet',
        'slug_en' => 'project',
        'sort_order' => 1,
    ]);
});

test('project update stores a 3.4 MiB PNG while retaining an existing attachment', function (): void {
    $existing = app(AttachmentService::class)->store(UploadedFile::fake()->image('existing.jpg'));
    $this->project->attachments()->attach($existing->id, ['sort_order' => 0]);

    $response = $this->post(route('backoffice.projects.update', $this->project), [
        ...$this->project->getAttributes(),
        'attachments' => [
            ['id' => (string) $existing->id, 'file' => ['id' => (string) $existing->id, 'url' => $existing->url], 'title' => 'Existing'],
            ['file' => UploadedFile::fake()->image('new.png')->size(3482), 'title' => 'New screenshot'],
        ],
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect(route('backoffice.projects.index'));
    $attachments = $this->project->fresh()->attachments;
    expect($attachments)->toHaveCount(2)
        ->and($attachments[0]->id)->toBe($existing->id)
        ->and($attachments[1]->title)->toBe('New screenshot');
    Storage::disk('public')->assertExists($attachments[1]->file_path);
});

test('project update rejects invalid uploads without a success message or partial changes', function (string $failure): void {
    $existing = app(AttachmentService::class)->store(UploadedFile::fake()->image('existing.jpg'));
    $this->project->attachments()->attach($existing->id);
    $file = match ($failure) {
        'size' => UploadedFile::fake()->image('large.png')->size(5121),
        'type' => UploadedFile::fake()->create('document.pdf', 100, 'application/pdf'),
        'php-limit' => new UploadedFile('', 'screenshot.png', 'image/png', UPLOAD_ERR_INI_SIZE, true),
    };

    $response = $this->from(route('backoffice.projects.edit', $this->project))
        ->post(route('backoffice.projects.update', $this->project), [
            ...$this->project->getAttributes(),
            'title_fr' => 'Changed title',
            'attachments' => [
                ['file' => UploadedFile::fake()->image('valid.png')],
                ['file' => $file],
            ],
        ]);

    $response->assertSessionHasErrors('attachments.1.file')->assertSessionMissing('success');
    expect($this->project->fresh()->title_fr)->toBe('Projet')
        ->and($this->project->fresh()->attachments->modelKeys())->toBe([$existing->id]);
    Storage::disk('public')->assertExists($existing->file_path);
    expect(Storage::disk('public')->allFiles('attachments'))->toHaveCount(1);
})->with(['size', 'type', 'php-limit']);
