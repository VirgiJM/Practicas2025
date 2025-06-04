@extends('layouts.app')

@section('titulo', 'Mi perfil')

@vite(['resources/js/usuario.js', 'resources/js/session-controller.js'])

@section('contenido')
<div id="perfil"></div>
<section>
    <h2>Tus restaurantes favoritos</h2>
    <div id="favoritos"></div>
</section>
@endsection