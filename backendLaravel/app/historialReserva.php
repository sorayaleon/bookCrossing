<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class historialReserva extends Model
{
    protected $table = "historial_reservas";

    protected $fillable = ['tipo', 'dni', 'titulo', 'codigo', 'idL', 'idUsu','fecha', 'nombreEst', 'incidencia','incidenciaActiva'];
}
