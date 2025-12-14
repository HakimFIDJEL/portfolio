<?php

// routes/web.php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Controllers
use App\Http\Controllers\Landing as LandingController;

Route::middleware(['web'])->group(function () {
    Route::get('/', [LandingController::class, 'landing'])->name('home');
    Route::get('/toggle-language', [LandingController::class, 'toggle_language'])->name('toggle_language');
    Route::get('/terms', [LandingController::class, 'terms'])->name('terms');
});

Route::middleware(['auth', 'verified:auth.verification.notice'])->group(function () {
    Route::get('/dashboard', function () {
        // return Inertia::render('dashboard');
        return redirect()->route('backoffice.projects.index');
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

// Backoffice routes
require __DIR__.'/backoffice.php';


Route::middleware(['web'])->group(function () {
    Route::get('/{slug}', [LandingController::class, 'project'])->name('project');
});






