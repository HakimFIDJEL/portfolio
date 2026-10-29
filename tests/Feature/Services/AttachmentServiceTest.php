<?php

declare(strict_types=1);

use App\Models\Attachment;
use App\Services\AttachmentService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function (): void {
    Storage::fake('public');
});

test('attachment service stores an uploaded file correctly', function (): void {
    $service = new AttachmentService;
    $file = UploadedFile::fake()->image('test-screenshot.png', 640, 480);

    $attachment = $service->store(
        file: $file,
        title: 'Capture de test',
        description: 'Description de test'
    );

    expect($attachment)->toBeInstanceOf(Attachment::class)
        ->and($attachment->title)->toBe('Capture de test')
        ->and($attachment->file_name)->toBe('test-screenshot.png')
        ->and($attachment->mime_type)->toBe('image/png')
        ->and($attachment->file_extension)->toBe('png');

    Storage::disk('public')->assertExists($attachment->file_path);
});

test('attachment service updates metadata correctly', function (): void {
    $service = new AttachmentService;
    $file = UploadedFile::fake()->image('avatar.jpg');
    $attachment = $service->store($file, 'Old Title');

    $result = $service->update($attachment, ['title' => 'New Title']);

    expect($result)->toBeTrue()
        ->and($attachment->fresh()->title)->toBe('New Title');
});

test('attachment service deletes attachment and its file from storage', function (): void {
    $service = new AttachmentService;
    $file = UploadedFile::fake()->image('to-delete.png');
    $attachment = $service->store($file);

    $path = $attachment->file_path;
    Storage::disk('public')->assertExists($path);

    $result = $service->delete($attachment);

    expect($result)->toBeTrue();
    Storage::disk('public')->assertMissing($path);
    expect(Attachment::find($attachment->id))->toBeNull();
});
