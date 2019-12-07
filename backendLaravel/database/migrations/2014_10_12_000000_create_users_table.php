<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('dni')->unique();
            $table->string('alias');
            $table->string('nombre');
            $table->string('apellidos');
            $table->string('email')->unique();
            $table->string('password');
            // $table->string('foto');
            $table->enum('tipo', ['normal', 'responsable', 'admin'])->default('normal');
            $table->enum('estado', ['activo','inactivo'])->default('activo');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
