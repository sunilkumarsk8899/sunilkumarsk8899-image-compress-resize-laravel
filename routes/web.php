<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // return view('welcome');
    return view('image-compression');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');




Route::middleware(['auth'])->group(function () {
    Route::get('/image-compression', [ImageController::class, 'index'])->name('image.compression');
    Route::post('/image-compression', [ImageController::class, 'compress']);
    Route::get('/dashboard', function(){
        return view('image-compression');
    });
});

