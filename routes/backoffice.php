<?php

declare(strict_types=1);

use App\Http\Controllers\Backoffice\Contacts as ContactsController;
use App\Http\Controllers\Backoffice\Educations as EducationsController;
use App\Http\Controllers\Backoffice\Experiences as ExperiencesController;
use App\Http\Controllers\Backoffice\Projects as ProjectsController;
use App\Http\Controllers\Backoffice\Stacks as StacksController;
use App\Http\Controllers\Backoffice\Tags as TagsController;
use App\Http\Controllers\Backoffice\Tools as ToolsController;
use Illuminate\Support\Facades\Route;

Route::prefix('backoffice')->name('backoffice.')->middleware(['auth', 'verified:auth.verification.notice'])->group(function (): void {
    // Projets
    Route::post('projects/sort', [ProjectsController::class, 'sort'])->name('projects.sort');
    Route::post('projects/{project}', [ProjectsController::class, 'update'])->name('projects.update');
    Route::resource('projects', ProjectsController::class)->except(['update', 'show']);

    // Stacks techniques
    Route::post('stacks/sort', [StacksController::class, 'sort'])->name('stacks.sort');
    Route::resource('stacks', StacksController::class)->except(['show']);

    // Outils
    Route::post('tools/sort', [ToolsController::class, 'sort'])->name('tools.sort');
    Route::resource('tools', ToolsController::class)->except(['show']);

    // Tags
    Route::post('tags/sort', [TagsController::class, 'sort'])->name('tags.sort');
    Route::resource('tags', TagsController::class)->except(['show']);

    // Formations
    Route::post('educations/sort', [EducationsController::class, 'sort'])->name('educations.sort');
    Route::resource('educations', EducationsController::class)->except(['show']);

    // Expériences professionnelles
    Route::post('experiences/sort', [ExperiencesController::class, 'sort'])->name('experiences.sort');
    Route::resource('experiences', ExperiencesController::class)->except(['show']);

    // Contacts
    Route::post('contacts/sort', [ContactsController::class, 'sort'])->name('contacts.sort');
    Route::resource('contacts', ContactsController::class)->except(['show']);
});
