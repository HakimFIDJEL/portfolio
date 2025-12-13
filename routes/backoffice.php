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
    Route::resource('projects', ProjectsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Stacks Routes
    // ------------------------------------------------------------------ //
    Route::resource('stacks', StacksController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Tools Routes
    // ------------------------------------------------------------------ //
    Route::resource('tools', ToolsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Tags Routes
    // ------------------------------------------------------------------ //
    Route::resource('tags', TagsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    
    // ------------------------------------------------------------------ //
    //                          Education Routes
    // ------------------------------------------------------------------ //
    Route::resource('educations', EducationsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    Route::post('educations/sort', [EducationsController::class, 'sort'])->name('educations.sort');
    
    // ------------------------------------------------------------------ //
    //                          Experience Routes
    // ------------------------------------------------------------------ //
    Route::resource('experiences', ExperiencesController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    Route::post('experiences/sort', [ExperiencesController::class, 'sort'])->name('experiences.sort');
    
    // ------------------------------------------------------------------ //
    //                          Contacts Routes
    // ------------------------------------------------------------------ //
    Route::resource('contacts', ContactsController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
    ]);
    Route::post('contacts/sort', [ContactsController::class, 'sort'])->name('contacts.sort');

});
