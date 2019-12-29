<?php

namespace App\Http\Controllers;
use App\Valoracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Foundation\Bootstrap\HandleExceptions;

class ValoracionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $valoraciones = Valoracion::all();
        $respuesta = Response::json($valoraciones, 200);
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
        // var_dump($data);
        $valoracion = new Valoracion();
        $valoracion->idLibro = $data[0]["idLibro"];
        $valoracion->puntuacion = $data[0]["puntuacion"];
        // var_dump($valoracion->puntuacion);
        $valoracion->votos = $data[0]["votos"];   
        
        $valoracion->save();
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
        //
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
    public function update(Request $request)
    {
        try{
            $data = json_decode($request->getContent(), true);
            $valoracion = Valoracion::where("idLibro",$data[0])->first();
            // var_dump($data[0]);
            $valoracion->puntuacion = $data[1];
            // var_dump($valoracion->puntuacion);
            $valoracion->votos = $data[2];
            $valoracion->save();
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
        //
    }
}
