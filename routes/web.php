<?php

// routes/web.php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Controllers
use App\Http\Controllers\Landing as LandingController;

Route::get('/', [LandingController::class, 'landing'])->name('home');
Route::get('/{slug}', [LandingController::class, 'project'])->name('project');

Route::middleware(['auth', 'verified:auth.verification.notice'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/errors', function(Request $request) {
    $data = $request->validate([
        'statusCode' => 'required|integer',
        'title' => 'nullable|string',
    ]);

    return Inertia::render('errors/show', [
        'statusCode' => $data['statusCode'],
        'title' => $data['title'] ?? null,
    ]);
})->name('errors.show');

// Authentication routes
require __DIR__.'/auth.php';

// Settings routes
require __DIR__.'/settings.php';









