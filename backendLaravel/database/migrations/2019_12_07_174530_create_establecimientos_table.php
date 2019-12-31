<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstablecimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('establecimientos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('dni')->unique();
            $table->string('email')->unique();
            $table->string('nombreEst')->unique();
            $table->string('direccion');
            $table->integer('cp');
            $table->integer('tfno');
            $table->time('horarioAp');
            $table->time('horarioC');
            $table->float('latitud');
            $table->float('longitud');
            $table->enum('estado', ['activo','inactivo', 'baja'])->default('inactivo');
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
        Schema::dropIfExists('establecimientos');
    }
}
