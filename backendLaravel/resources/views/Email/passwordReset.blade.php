@component('mail::message')
# Restablecer contraseña

Haz click en el botón para restablecer tu contraseña.

@component('mail::button', ['url' => 'http://localhost:4200/responsePass?token='.$token])
Restablecer Contraseña
@endcomponent

Atentamente el equipo de <br>
{{ config('app.name') }}
@endcomponent
