<?php

// use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([

    'middleware' => 'api',
    // 'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('registro', 'AuthController@registro');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');
    
});

Route::resource('establecimientos', 'EstablecimientosController');
Route::resource('libros', 'LibrosController');
Route::resource('usuarios', 'UsersController');
Route::put('estados', 'EstablecimientosController@updateEstado');
Route::resource('reservas', 'ReservaController');
Route::resource('historial', 'HistorialReservaController');
Route::put('estado', 'LibrosController@updateEstadoLibro');
Route::put('cambio', 'UsersController@updateTipoUsuario');
Route::put('bloqueo', 'UsersController@updateEstadoUsuario');
Route::resource('comentarios', 'ComentariosController');
Route::put('comentario', 'ComentariosController@updateEstadoComentario');

