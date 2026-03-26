<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


Route::prefix('admin')->group(function () {
     Route::middleware('guest')->group(function () {
        Route::get('/', function () {
            return Inertia::render('auth/login', [
                'canResetPassword' => Features::enabled(Features::resetPasswords()),
            ]);
        })->name('home');
    });
    
    Route::middleware('guest')->get('/login', function () {
        return redirect('/admin');
    })->name('login');

    require __DIR__ . '/settings.php';
});

Route::middleware('guest')->group(function () {
    require __DIR__ . '/home.php';
});
