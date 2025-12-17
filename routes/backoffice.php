<?php

// routes/backoffice.php

// Necessary imports
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\Backoffice\Projects as ProjectsController;
use App\Http\Controllers\Backoffice\Stacks as StacksController;
use App\Http\Controllers\Backoffice\Tools as ToolsController;
use App\Http\Controllers\Backoffice\Tags as TagsController;
use App\Http\Controllers\Backoffice\Educations as EducationsController;
use App\Http\Controllers\Backoffice\Experiences as ExperiencesController;
use App\Http\Controllers\Backoffice\Contacts as ContactsController;

Route::prefix('backoffice/')->name('backoffice.')->middleware(['auth', 'verified:auth.verification.notice'])->group(function() {
    // ------------------------------------------------------------------ //
    //                          Projects Routes
    // ------------------------------------------------------------------ //
    Route::resource('projects', ProjectsController::class)->except([
        'update'
    ]);

    Route::post('projects/sort', [ProjectsController::class, 'sort'])->name('projects.sort');
    Route::post('projects/{project}', [ProjectsController::class, 'update'])
        ->name('projects.update');
    Route::resource('projects', ProjectsController::class)->only([
        'index', 'create', 'store', 'edit', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Stacks Routes
    // ------------------------------------------------------------------ //
    Route::post('stacks/sort', [StacksController::class, 'sort'])->name('stacks.sort');
    Route::resource('stacks', StacksController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Tools Routes
    // ------------------------------------------------------------------ //
    Route::post('tools/sort', [ToolsController::class, 'sort'])->name('tools.sort');
    Route::resource('tools', ToolsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Tags Routes
    // ------------------------------------------------------------------ //
    Route::post('tags/sort', [TagsController::class, 'sort'])->name('tags.sort');
    Route::resource('tags', TagsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Education Routes
    // ------------------------------------------------------------------ //
    Route::post('educations/sort', [EducationsController::class, 'sort'])->name('educations.sort');
    Route::resource('educations', EducationsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Experience Routes
    // ------------------------------------------------------------------ //
    Route::post('experiences/sort', [ExperiencesController::class, 'sort'])->name('experiences.sort');
    Route::resource('experiences', ExperiencesController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Contacts Routes
    // ------------------------------------------------------------------ //
    Route::post('contacts/sort', [ContactsController::class, 'sort'])->name('contacts.sort');
    Route::resource('contacts', ContactsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);

});
