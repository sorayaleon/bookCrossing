<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = User::all();
        $respuesta = Response::json($usuarios,200);
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $usuario = User::find($id);
        return json_encode($usuario);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $usuario = User::find($id);
        return json_encode($usuario);
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
    
    }
   

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $usuario = User::find($id);
        $usuario->delete();
    }

    public function updateTipoUsuario(Request $request)
    {
        
        try {
            $data = json_decode($request->getContent(), true);
            // var_dump($data);
            $usuario = User::where("dni",$data[0])->first();
            $usuario->tipo = $data[1];
            $usuario->save();
            return json_encode("success");
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function updateEstadoUsuario(Request $request)
    {
        
        try {
            $data = json_decode($request->getContent(), true);
            // var_dump($data);
            $usuario = User::where("id",$data[0])->first();
            $usuario->estado = $data[1];
            $usuario->save();
            return json_encode("success");
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function UpdateNumLibros(Request $request){
        try {
            $data = json_decode($request->getContent(), true);
            var_dump($data);
            $usuario = User::where("id",$data[0])->first();
            $usuario->numLibros = $data[1];
            $usuario->save();
            return json_encode("success");
        } catch (\Exception $e) {
            return $e;
        }
    }
}
