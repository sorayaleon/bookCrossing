<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Libro;
use Illuminate\Support\Facades\Response;

class LibrosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         //Muestro todos los libros en formato json
         $libros = Libro::all();
         $respuesta = Response::json($libros,200);
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
        define('UPLOAD_DIR', 'descargas/');
        $libro = new Libro();
        $libro->codigo = $data[0]["codigo"];
        $libro->isbn = $data[0]["isbn"];
        $libro->titulo = $data[0]["titulo"];
        $libro->autor = $data[0]["autor"];
        $libro->descripcion = $data[0]["descripcion"];
        $libro->categoria = $data[0]["categoria"];
        $libro->establecimientoInicial = $data[0]["establecimiento"];
        $libro->portada= $data[1]["filename"];
        
        $file = UPLOAD_DIR.$data[1]["filename"];
        $success = file_put_contents($file, base64_decode($data[1]["value"]));
       
        $libro->save();
      
        return json_encode("success");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
       
        $libro = Libro::find($id);
        return json_encode($libro);
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $libro = Libro::find($id);
        return json_encode($libro);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{
        $data = json_decode($request->getContent(), true);
        define('UPLOAD_DIR', 'descargas/');

        $libro = Libro::find($data[0]);
        $libro->codigo = $data[0]["codigo"];
        $libro->isbn = $data[1]["isbn"];
        $libro->titulo = $data[1]["titulo"];
        $libro->autor = $data[1]["autor"];
        $libro->descripcion = $data[1]["descripcion"];
        $libro->categoria = $data[1]["categoria"];
        $libro->establecimientoInicial = $data[1]["establecimiento"];
        if($data[2] != ""){
            $libro->portada= $data[2]["filename"];
            $file = UPLOAD_DIR.$data[2]["filename"];
            $success = file_get_contents($file, base64_decode($data[2]["value"]));
       
        }
        
        $libro->save();
        
        return json_encode("success");
    } catch (\Exception $e){
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
       
            // Localizamos y creamos el objeto
            $libro = Libro::find($id);
            
            //borramos el usuario de la BD
            $libro->delete();
            
            
    }

    public function updateEstadoLibro(Request $request)
    {
        try {
           
            $data = json_decode($request->getContent(), true);
            $libro = Libro::find($data[0]);
            $libro->estado = $data[1];
            $libro->save();
            return json_encode("success");
        } catch (\Exception $e) {
            return $e;
        }
    }
}
