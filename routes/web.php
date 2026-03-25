<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


Route::prefix('admin')->group(function () {
    Route::inertia('/', 'welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ])->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::inertia('/dashboard', 'dashboard')->name('dashboard');
    });
    require __DIR__ . '/settings.php';
});

Route::middleware('guest')->group(function () {
    require __DIR__ . '/home.php';
});
