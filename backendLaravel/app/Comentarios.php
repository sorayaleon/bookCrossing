<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comentarios extends Model
{
    protected $table = "comentarios";

    protected $fillable = ['idUsu', 'alias', 'comentario', 'idL', 'estado'];
    
}
