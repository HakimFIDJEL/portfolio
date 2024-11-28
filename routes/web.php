<?php

use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\MinimalistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\MainController as MainAdminController;

use App\Http\Controllers\admin\ProjectController as AdminProjectController;
use App\Http\Controllers\admin\BadgeController as AdminBadgeController;
use App\Http\Controllers\admin\SocialController as AdminSocialController;
use App\Http\Controllers\admin\StackController as AdminStackController;
use App\Http\Controllers\admin\AccountController as AdminAccountController;

// Middlewares
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
Route::prefix('/admin')->name('admin.')->middleware(AuthMiddleware::class)->group(function()
{
    Route::get('/', [MainAdminController::class, 'home'])->name('home');

    // Projects
    Route::prefix('/projects')->name('projects.')->controller(AdminProjectController::class)->group(function()
    {
        Route::get('/', 'index')->name('index');
        //
    });

    // Stacks
    Route::prefix('/stacks')->name('stacks.')->controller(AdminStackController::class)->group(function()
    {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/edit/{stack}', 'edit')->name('edit');

        Route::post('/store', 'store')->name('store');
        Route::post('/update/{stack}', 'update')->name('update');
        Route::delete('/delete/{stack}', 'delete')->name('delete');
    });

    // Socials
    Route::prefix('/socials')->name('socials.')->controller(AdminSocialController::class)->group(function()
    {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/edit/{social}', 'edit')->name('edit');

        Route::post('/store', 'store')->name('store');
        Route::post('/update/{social}', 'update')->name('update');
        Route::delete('/delete/{social}', 'delete')->name('delete');
    });


    // Account
    Route::prefix('/account')->name('account.')->controller(AdminAccountController::class)->group(function()
    {
        Route::get('/', 'index')->name('index');
        //
    });
});