<?php

namespace App\Http\Controllers;
Use App\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservas = Reserva::all();
        $respuesta = Response::json($reservas, 200);
        return $respuesta;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $reserva = new Reserva();
        $reserva->tipo = $data[0]["tipo"];
        $reserva->dni = $data[0]["dni"];
        $reserva->titulo = $data[0]["titulo"];
        $reserva->isbn = $data[0]["isbn"];
        $reserva->idL = $data[0]["idL"];
        $reserva->fechaSolicitud = $data[0]["fechaSolicitud"];
        $reserva->fechaPrestamo = $data[0]["fechaPrestamo"];
        $reserva->fechaDevolucion = $data[0]["fechaDevolucion"];
        $reserva->nombreEst = $data[0]["nombreEst"];
        $reserva->comentario = $data[0]["comentario"];
        $reserva->puntuacion = $data[0]["puntuacion"];
        
        $reserva->save();
        return json_encode("success");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reserva = Reserva::find($id);
        return json_encode($reserva);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function updateTipoReserva(Request $request)
    {
        try {
            $data = json_decode($request->getContent(), true);
            $reserva = Reserva::find($data[0]);
            $reserva->tipo = $data[1];
            $reserva->save();
            return json_encode("success");
        } catch (\Exception $e) {
            return $e;
        }
    }
}
