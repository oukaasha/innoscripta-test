<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\UserPreferencesController;

Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
        
Route::get('/top-headlines', [NewsController::class, 'topHeadlines']);
Route::get('/search', [NewsController::class, 'search']);
Route::get('/filter', [NewsController::class, 'filter']);
Route::middleware('auth:sanctum')->group( function () {

    Route::get('/user/preferences', [UserPreferencesController::class, 'getPreferences']);
    Route::post('/user/preferences', [UserPreferencesController::class, 'updatePreferences']);
    Route::get('/news/sources', [NewsController::class, 'getSources']);
    Route::get('/news/categories', [NewsController::class, 'getCategories']);
    Route::get('/news/authors', [NewsController::class, 'getAuthors']);
});
