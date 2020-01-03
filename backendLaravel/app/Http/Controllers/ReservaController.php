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
        $reserva->idL = $data[0]["idL"];
        $reserva->idUsu = $data[0]["idUsu"];
        $reserva->fecha = $data[0]["fecha"];
        $reserva->nombreEst = $data[0]["nombreEst"];
        
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
        try{
            $data = json_decode($request->getContent(), true);
            $reserva = Reserva::find($id);
            $reserva->tipo = $data[1];
            $reserva->fecha = $data[2];
            $reserva->save();
            return json_encode("success");
        }catch (\Exception $e){
            return $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reserva = Reserva::find($id);
        $reserva->delete();
    }

}
