<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = "reservas";

    protected $fillable = ['tipo', 'dni', 'titulo', 'idL', 'idUsu', 'fecha', 'nombreEst'];
}
