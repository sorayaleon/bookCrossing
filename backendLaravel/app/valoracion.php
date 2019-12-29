<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class valoracion extends Model
{
    protected $table = "valoracions";

    protected $fillable = ['idLibro', 'puntuacion', 'votos'];
}
