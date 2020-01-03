<?php

namespace App\Http\Controllers;
use App\Comentarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ComentariosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comentarios = Comentarios::all();
        $respuesta = Response::json($comentarios,200);
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
       
        $comentarios = new Comentarios();
        $comentarios->idUsu = $data[0]["idUsu"];
        $comentarios->alias = $data[0]["alias"];
        $comentarios->comentario = $data[0]["comentario"];
        $comentarios->idL = $data[0]["idL"];
        $comentarios->estado = $data[0]["estado"];
       
        $comentarios->save();
      
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
            $comentarios = Comentarios::find($data[0]);
            $comentarios->estado = $data[1];
            $comentarios->save();
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

    public function updateComentario(Request $request)
    {
        try {
            $data = json_decode($request->getContent(), true);
            $comentario = Comentarios::find($data[0]);
            $comentario->alias = $data[1];
            $comentario->save();
            return json_encode("success");
        } catch (\Exception $e) {
            return $e;
        }
    }
}
