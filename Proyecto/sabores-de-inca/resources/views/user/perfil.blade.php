@extends('layouts.app')

@section('titulo', 'Mi perfil')

@vite(['resources/js/usuario.js', 'resources/js/session-controller.js'])
@vite('resources/css/perfil.css')


@section('contenido')
<div id="perfil"></div>
<section>
    <h2 id="restaurantes-favoritos">Tus restaurantes favoritos</h2>
    <div id="favoritos"></div>
</section>
@endsection