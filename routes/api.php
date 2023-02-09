<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Custom laravel passport routes
Route::middleware('throttle')->group(function(){
    Route::post('/token', [AccessTokenController::class,'issueToken'])->name('token');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
