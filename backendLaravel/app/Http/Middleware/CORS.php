<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        header('Access-Control-Allow-Origin : *');
        header('Access-Control-Allow-Headers : Content-type, X-Auth-Token, Authorizarion, Origin');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('http://localhost:4200', 'http://127.0.0.1:8000',);
        return $next($request);
    }

    
}

// return [

//     /*
//      |--------------------------------------------------------------------------
//      | Laravel CORS
//      |--------------------------------------------------------------------------
//      |
//      | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
//      | to accept any value.
//      |
//      */
//     'supportsCredentials' => false,
//     'allowedOrigins' => ['*'],
//     'allowedHeaders' => ['Origin','Content-Type', 'X-Requested-With', 'Accept'],
//     'allowedMethods' => ['*'], // ex: ['GET', 'POST', 'PUT',  'DELETE']
//     'exposedHeaders' => [],
//     'maxAge' => 0,


//     /*
//      * A cors profile determines which origins, methods, headers are allowed for
//      * a given requests. The `DefaultProfile` reads its configuration from this
//      * config file.
//      *
//      * You can easily create your own cors profile.
//      * More info: https://github.com/spatie/laravel-cors/#creating-your-own-cors-profile
//      */
//     'cors_profile' => Spatie\Cors\CorsProfile\DefaultProfile::class,

//     /*
//      * This configuration is used by `DefaultProfile`.
//      */
//     'default_profile' => [

//         'allow_credentials' => false,

//         'allow_origins' => [
//             'http://localhost:4200',
//             'http://127.0.0.1:8000',
//         ],

//         'allow_methods' => [
//             'POST',
//             'GET',
//             'OPTIONS',
//             'PUT',
//             'PATCH',
//             'DELETE',
//         ],

//         'allow_headers' => [
//             'Content-Type',
//             'X-Auth-Token',
//             'Origin',
//             'Authorization',
//         ],

//         'expose_headers' => [
//             'Cache-Control',
//             'Content-Language',
//             'Content-Type',
//             'Expires',
//             'Last-Modified',
//             'Pragma',
//         ],

//         'forbidden_response' => [
//             'message' => 'Forbidden (cors).',
//             'status' => 403,
//         ],

//         /*
//          * Preflight request will respond with value for the max age header.
//          */
//         'max_age' => 60 * 60 * 24,
//     ],
// ];
