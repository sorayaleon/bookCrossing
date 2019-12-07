<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Establecimiento;
class EstablecimientosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         $establecimientos = Establecimiento::all();
         $respuesta = Response::json($establecimientos,200);
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

        $establecimiento = new Establecimiento();
        $establecimiento->nombreResp = $data[0]["nombreResp"];
        $establecimiento->email = $data[0]["email"];
        $establecimiento->nombreEst = $data[0]["nombreEst"];
        $establecimiento->direccion = $data[0]["direccion"];
        $establecimiento->cp = $data[0]["cp"];
        $establecimiento->tfno = $data[0]["tfno"];        
        $establecimiento->horarioAp = $data[0]["horarioAp"]; 
        $establecimiento->horarioC = $data[0]["horarioC"];  
        $establecimiento->latitud = $data[0]["latitud"];    
        $establecimiento->longitud = $data[0]["longitud"];       
       
        $establecimiento->save();
        // echo json_encode($libro);
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
        $establecimiento = Establecimiento::find($id);
        return json_encode($establecimiento);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $establecimiento = Establecimiento::find($id);
        return json_encode($establecimiento);
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

            $establecimiento = Establecimiento::find($data[1]);
            $establecimiento->nombreResp = $data[1]["nombreResp"];
            $establecimiento->email = $data[1]["email"];
            $establecimiento->nombreEst = $data[1]["nombreEst"];
            $establecimiento->direccion = $data[1]["direccion"];
            $establecimiento->cp = $data[1]["cp"];
            $establecimiento->tfno = $data[1]["tfno"];        
            $establecimiento->horarioAp = $data[1]["horarioAp"]; 
            $establecimiento->horarioC = $data[1]["horarioC"];  
            $establecimiento->latitud = $data[1]["latitud"];    
            $establecimiento->longitud = $data[1]["longitud"];
            $establecimiento->save();
            
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
        $establecimiento = Establecimiento::find($id);
        $establecimiento->delete();
    }
}
