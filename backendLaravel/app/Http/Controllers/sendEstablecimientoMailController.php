<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Establecimiento;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ConfirmEstablecimientoMail;
use App\Mail\DenegadoEstablecimientoMail;
use Illuminate\Support\Facades\DB;

class sendEstablecimientoMailController extends Controller
{
    public function sendEmailAceptar(Request $request)
    {
        $this->sendAceptar($request->email);
        return $this->successResponse();
    }

    public function sendAceptar($email){
        // $email = Establecimiento::find(14)->toArray();
        Mail::to($email)->send(new ConfirmEstablecimientoMail);
    }

    
    public function sendEmailRechazo(Request $request)
    {
        $this->sendRechazar($request->email);
        return $this->successResponse();

    }

    public function sendRechazar($email){
        // $email = Establecimiento::find()->toArray();
        Mail::to($email)->send(new DenegadoEstablecimientoMail);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Se ha enviado un email al usuario.'
        ], Response::HTTP_OK);
    }
}
