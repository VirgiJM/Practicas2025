@extends('layouts.app')

@section('titulo', 'Lista de Restaurantes')

@vite('resources/js/restaurantes.js') <!-- Esto importa el JS solo en esta vista. -->

@section('contenido')
<h2>Filtrar</h2>
<div class="filtro-container">
    <select id="tipoCocina">
        <!-- Esto se llena con JS. -->
    </select>

    <select id="filtroMedia">
        <option value="0">Cualquier media</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
    </select>

    <select id="rangoPrecio">
        <option value="0">Rango de precio</option>
        @foreach ($rangosPrecio as $rango)
        <option value="{{ $rango }}">{{ $rango }}</option>
        @endforeach
    </select>

    <label for="vegano">
        ¿Vegano?
        <input type="checkbox" id="vegano">
    </label>

</div>

<h2>Lista de restaurantes</h2>

@if ($restaurantes->isEmpty())
<p>No hay restaurantes todavía.</p>
@else
<div class="restaurantes-container" id="restaurantList">
    @include('restaurantes._lista')
</div>
<div id="map" style="height: 600px; margin-top: 4rem; margin-bottom: 2rem;"></div>
@endif
@endsection