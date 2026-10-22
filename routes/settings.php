<?php

declare(strict_types=1);

use App\Http\Controllers\Settings\Appearance as ControllersAppearance;
use App\Http\Controllers\Settings\Password as ControllersPassword;
use App\Http\Controllers\Settings\Profile as ControllersProfile;
use Illuminate\Support\Facades\Route;

Route::prefix('settings')->name('settings.')->middleware(['auth', 'verified:auth.verification.notice'])->group(function (): void {
    Route::controller(ControllersPassword::class)->prefix('password')->name('password.')->group(function (): void {
        Route::get('/', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
    });

    Route::controller(ControllersProfile::class)->prefix('profile')->name('profile.')->group(function (): void {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
    });

    Route::controller(ControllersAppearance::class)->prefix('appearance')->name('appearance.')->group(function (): void {
        Route::get('/', 'edit')->name('edit');
    });
});
