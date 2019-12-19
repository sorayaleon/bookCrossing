<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = "reservas";

    protected $fillable = ['tipo', 'dni', 'titulo', 'isbn', 'idL', 'fechaSolicitud', 'fechaPrestamo', 'fechaDevolucion', 'nombreEst', 'comentario', 'puntuacion'];
}
