<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('tipo', ['prestamo','devolucion'])->default('prestamo');
            $table->string('dni');
            $table->string('titulo');
            $table->integer('isbn');
            $table->dateTime('fechaSolicitud');
            $table->dateTime('fechaPrestamo');
            $table->dateTime('fechaDevolucion');
            $table->string('nombreEst');
            $table->string('comentario');
            $table->float('puntuacion');
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
        Schema::dropIfExists('reservas');
    }
}