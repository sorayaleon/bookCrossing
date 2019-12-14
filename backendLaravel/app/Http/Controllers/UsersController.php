<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

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
        // $data = json_decode($request->getContent(), true);
        // define('UPLOAD_DIR', 'descargas/');
        // $usuario = new User();
        // $usuario->dni = $data[0]["dni"];
        // $usuario->nombre = $data[0]["nombre"];
        // $usuario->apellidos = $data[0]["apellidos"];
        // $usuario->email = $data[0]["email"];
        // $usuario->password = $data[0]["password"];
        // $usuario->foto= $data[1]["filename"];
        
        
        // $file = UPLOAD_DIR.$data[1]["filename"];
        // $success = file_put_contents($file, base64_decode($data[1]["value"]));
       
        // $usuario->save();
        
        // return json_encode("success");
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
    //     try{
    //     $data = json_decode($request->getContent(), true);
    //     define('UPLOAD_DIR', 'descargas/');
        
    //     $usuario = User::find($data[0]);

    //     $usuario->dni = $data[1]["dni"];
    //     $usuario->nombre = $data[1]["nombre"];
    //     $usuario->apellidos = $data[1]["apellidos"];
    //     $usuario->email = $data[1]["email"];
    //     $usuario->password = $data[1]["password"];
        
    //     if($data[2] != ""){
    //         $usuario->foto= $data[2]["filename"];
    //         $file = UPLOAD_DIR.$data[2]["filename"];
    //         $success = file_get_contents($file, base64_decode($data[2]["value"]));
       
    //     }
       
    //     $usuario->save();
        
    //     return json_encode("success");
    // } catch (\Exception $e){
    //     return $e;
    // }
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

}
