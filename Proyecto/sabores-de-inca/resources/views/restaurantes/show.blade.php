@extends('layouts.app')

@section('titulo', $restaurante->Nombre)
@vite('resources/css/restaurante.css')

@section('contenido')
<div class="restaurante-detalle">
    <div class="acciones">
        <a href="/restaurantes">Volver a la lista</a>
    </div>

    <h1>{{ $restaurante->Nombre }}</h1>
    <img src="{{ Storage::url($restaurante->Foto) }}" alt="{{ $restaurante->Nombre }}">

    @php
    $query = urlencode($restaurante->Nombre . ', ' . $restaurante->Direccion);
    @endphp
    <p>
        <strong>📍</strong>
        <a href="https://www.google.com/maps/search/?api=1&query={{ $query }}" target="_blank" rel="noopener noreferrer">
            {{ $restaurante->Direccion }}
        </a>
    </p>

    <p><strong>Precio medio:</strong><a> {{ $restaurante->RangoPrecio }}<a></p>
    <a href="tel:{{$restaurante->Telefono}}"><strong>📞</strong> {{ $restaurante->Telefono }}</p>
    <strong><a href="{{ $restaurante->SitioWeb }}" target="_blank">Sitio Web</a></strong>
    <p>{{ $restaurante->Descripcion }}</p>

    @if ($restaurante->Carta)
    <a href="{{ asset('storage/' . $restaurante->Carta) }}" target="_blank">Ver carta PDF</a>
    @else
    <p>No hay carta disponible</p>
    @endif
</div>
@endsection