@extends('layouts.app')
@section('titulo', 'Login')

@section('contenido')
<h2 style="max-width: 940px; margin: 0 auto; padding: 2rem;" class="h2-modo-oscuro">Iniciar sesión</h2>

<form id="login-form">
    <label for="email">Correo electrónico:</label><br>
    <input type="email" id="email" name="Email" required><br>
    <span id="error-email" class="error-message"></span><br>

    <label for="password">Contraseña:</label><br>
    <input type="password" id="password" name="Password" required><br>
    <span id="error-password" class="error-message"></span><br>

    <button type="submit">Entrar</button>
</form>

<div id="response"></div>

<script type="module" src="{{ Vite::asset('resources/js/login.js') }}"></script>
@endsection