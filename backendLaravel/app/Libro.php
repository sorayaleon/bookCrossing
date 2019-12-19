<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    protected $table = "libros";

    protected $fillable = ['codigo', 'isbn', 'titulo', 'autor', 'descripcion', 'portada', 'categoria', 'establecimiento', 'estado'];
    
}