<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MinimalistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\MainController as MainAdminController;

use App\Http\Middleware\AuthMiddleware;

Route::get('/', [MinimalistController::class, 'home'])->name('home');
Route::get('/project', [MinimalistController::class, 'project'])->name('project');

// AUTH ROUTES
Route::prefix('/auth')->name('auth.')->controller(AuthController::class)->group(function()
{
    // Authentification
    Route::get('/login', 'login')->name('login');
    Route::get('/logout', 'logout')->name('logout');

    Route::post('/login', 'loginPost')->name('toLogin');

    // Passwords
    Route::prefix('/password')->name('password.')->group(function()
    {
        Route::get('/forget', 'forget')->name('forget');
        Route::get('/reset/{password_token?}', 'reset')->name('reset');

        Route::post('/forget', 'forgetPost')->name('toForget');
        Route::post('/reset', 'resetPost')->name('toReset');
    });
});

// ADMIN ROUTES
Route::prefix('/admin')->name('admin.')->controller(MainAdminController::class)->middleware(AuthMiddleware::class)->group(function()
{
    Route::get('/', 'home')->name('home');
});