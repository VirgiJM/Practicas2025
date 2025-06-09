@extends('layouts.app')

@section('titulo', 'Registro')
@vite('resources/css/dark-mode.css')
@vite('resources/js/dark-mode.js')
@vite('resources/css/register.css')
@vite('resources/js/register.js')
@section('contenido')
<div class="register-container">
    <h2 style="max-width: 940px; margin: 0 auto; padding: 2rem;">Crear cuenta</h2>
    <form id="register-form">
        <label for="Username">Nombre</label>
        <input type="text" name="Username">

        <label for="Email">Correo electrónico</label>
        <input type="email" name="Email">

        <label for="Password">Contraseña</label>
        <input type="password" name="Password">

        <label for="Password_confirmation">Confirmar contraseña</label>
        <input type="password" name="Password_confirmation">

        <button type="submit">Registrarse</button>
    </form>

    <div id="errors" class="error-message"></div>
</div>
@endsection