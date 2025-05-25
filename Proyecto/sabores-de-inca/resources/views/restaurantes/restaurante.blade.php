@extends('layouts.layout')

@section('titulo', $restaurante->Nombre)

@section('contenido')
    <h2 class="text-2xl font-bold mb-4">{{ $restaurante->Nombre }}</h2>

    @if ($restaurante->Foto)
        <img src="{{ asset('storage/' . $restaurante->Foto) }}" alt="Foto del restaurante" class="mb-4 max-w-full h-auto rounded-xl shadow-md">
    @endif

    <p><strong>Dirección:</strong> {{ $restaurante->Direccion }}</p>
    <p><strong>Tipo de cocina:</strong> {{ $restaurante->tipoCocina->Nombre }}</p>
    <p><strong>Rango de precio:</strong> {{ $restaurante->RangoPrecio }}</p>
    <p><strong>Opciones veganas:</strong> {{ $restaurante->Vegano ? 'Sí' : 'No' }}</p>
    <p><strong>Teléfono:</strong> {{ $restaurante->Telefono }}</p>
    <p><strong>Sitio web:</strong>
        @if ($restaurante->SitioWeb)
            <a hr
