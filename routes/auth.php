<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\EmailVerification as ControllersEmail;
use App\Http\Controllers\Auth\Login as ControllersLogin;
use App\Http\Controllers\Auth\Password as ControllersPassword;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function (): void {
    // Connexion / Déconnexion
    Route::controller(ControllersLogin::class)->group(function (): void {
        Route::middleware('guest')->group(function (): void {
            Route::get('login', 'create')->name('login');
            Route::post('login', 'store')->name('login.store');
        });

        Route::middleware(['web', 'auth'])->group(function (): void {
            Route::get('logout', 'logout')->name('logout');
        });
    });

    // Réinitialisation de mot de passe
    Route::controller(ControllersPassword::class)->middleware('guest')->name('password.')->group(function (): void {
        Route::get('forgot-password', 'forget')->name('request');
        Route::post('forgot-password', 'sendResetLinkEmail')->name('email');
        Route::get('reset-password/{token}', 'reset')->name('reset');
        Route::post('reset-password', 'update')->name('update');
    });

    // Vérification d'adresse email
    Route::controller(ControllersEmail::class)->name('verification.')->group(function (): void {
        Route::get('verify-email/{token}', 'verify')->name('verify');

        Route::middleware(['web', 'auth'])->group(function (): void {
            Route::get('verify-email', 'notice')->name('notice');
            Route::post('verification-notification', 'sendVerificationEmail')->name('send');
            Route::get('change-email', 'editEmail')->name('email.edit');
            Route::post('change-email', 'updateEmail')->name('email.update');
        });
    });
});
