@component('mail::message')
# Validar Email

Haz click en el botón para validar tu email.

@component('mail::button', ['url' => 'http://localhost:4200/responseLogin'])
Validar Email
@endcomponent

Atentamente el equipo de <br>
{{ config('app.name') }}
@endcomponent