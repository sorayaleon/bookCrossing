<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLibrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('libros', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('codigo')->unique();
            $table->string('isbn');
            $table->string('titulo');
            $table->string('autor');
            $table->string('descripcion');
            $table->string('portada');
            $table->string('categoria');
            $table->string('establecimiento');
            $table->enum('estado', ['activo','inactivo','solicitado', 'prestado', 'retrasado'])->default('activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('libros');
    }
}
