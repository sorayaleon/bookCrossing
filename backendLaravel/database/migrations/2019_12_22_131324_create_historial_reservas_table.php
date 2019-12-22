<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistorialReservasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_reservas', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('tipo', ['solicitud','prestamo','devolucion'])->default('solicitud');
            $table->string('dni');
            $table->string('titulo');
            $table->integer('codigo');
            $table->integer('idL');
            $table->timestamp('fecha');
            $table->string('nombreEst');
            $table->string('comentario');
            $table->float('puntuacion');
            $table->string('incidencia');
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
        Schema::dropIfExists('historial_reservas');
    }
}
