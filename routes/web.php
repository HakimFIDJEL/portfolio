<?php

declare(strict_types=1);

use App\Http\Controllers\Landing as LandingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web'])->group(function (): void {
    Route::get('/', [LandingController::class, 'landing'])->name('home');
    Route::get('/toggle-language', [LandingController::class, 'toggle_language'])->name('toggle_language');
    Route::get('/terms', [LandingController::class, 'terms'])->name('terms');
});

Route::middleware(['auth', 'verified:auth.verification.notice'])->group(function (): void {
    Route::get('/dashboard', function () {
        return redirect()->route('backoffice.projects.index');
    })->name('dashboard');
});

Route::get('/errors', function (Request $request) {
    $data = $request->validate([
        'statusCode' => ['required', 'integer'],
        'title' => ['nullable', 'string'],
    ]);

    return Inertia::render('errors/show', [
        'statusCode' => $data['statusCode'],
        'title' => $data['title'] ?? null,
    ]);
})->name('errors.show');

// Routes d'authentification
require __DIR__.'/auth.php';

// Routes des paramètres utilisateur
require __DIR__.'/settings.php';

// Routes du backoffice d'administration
require __DIR__.'/backoffice.php';

Route::middleware(['web'])->group(function (): void {
    Route::get('/{slug}', [LandingController::class, 'project'])->name('project');
});
