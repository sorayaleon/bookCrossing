<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class resetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        if($this.validateEmail($request->email)){
            return $this->failedRespnse();
        }
    }
    
    public function validateEmail($email){
        return !!User::where('email', $email)->first();
    }

    public function failedResponse(){
        return response()->json([
            'error' => 'Este email no está registrado en la aplicación'
        ], Response::HTTP_NOT_FOUND);
    }
}
