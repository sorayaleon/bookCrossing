<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ValidarEmailMail;

class sendValidationMailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $this->send($request->email);
        return $this->successResponse();

    }

    public function send($email){
        Mail::to($email)->send(new ValidarEmailMail);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Se ha enviado un email de validación. Por favor, compruebe su bandeja de entrada.'
        ], Response::HTTP_OK);
    }
}
