@extends('layouts.app')

@section('titulo', 'Mi perfil')

@vite(['resources/js/usuario.js', 'resources/js/session-controller.js'])

@section('contenido')
<div id="perfil">
    <p>Cargando información del perfil...</p>
</div>
@endsection
