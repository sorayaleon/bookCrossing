<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('establecimientos', 'EstablecimientosController@store');
Route::get('establecimientos/{id}', 'EstablecimientosController@show');
Route::delete('establecimientos', 'EstablecimientosController@destroy');
Route::put('establecimientos', 'EstablecimientosController@update');