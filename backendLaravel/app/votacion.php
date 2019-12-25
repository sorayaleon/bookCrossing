<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class votacion extends Model
{
    protected $table = "votacion";

    protected $fillable = ['idLibro', 'idUsu', 'puntaje', 'votos'];
    
}
