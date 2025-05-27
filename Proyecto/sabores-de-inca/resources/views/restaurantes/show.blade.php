@extends('layouts.app')

@section('titulo', 'Restaurante')
@vite('resources/css/restaurante.css')
@section('contenido')
<div class="acciones">
    <a href="/restaurantes">Volver a la lista</a>
</div>
<h1>{{ $restaurante->Nombre }}</h1>
<img src="{{ Storage::url($restaurante->Foto) }}" alt="{{ $restaurante->Nombre}}">
<p><strong>Dirección:</strong> {{ $restaurante->Direccion }}</p>
<p><strong>Precio medio:</strong> {{ $restaurante->RangoPrecio }}</p>
<p><strong>Teléfono:</strong> {{ $restaurante->Telefono }}</p>
<strong><a href="{{ $restaurante->SitioWeb }}" target="_blank">Sitio Web</a></strong>
<p><strong>Carta:<strong> {{$restaurante->Carta}}</p>
@endsection