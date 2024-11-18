<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MinimalistController;

Route::get('/', [MinimalistController::class, 'home'])->name('home');
Route::get('/project', [MinimalistController::class, 'project'])->name('project');
