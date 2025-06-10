@extends('layouts.app')

@section('titulo', 'Inicio | Sabores de Inca')
@vite('resources/css/inicio.css')
@vite('resources/js/inicio.js')

@section('contenido')
<section class="presentacion">
    <h2 id="sabores-inca-inicio">Descubre los mejores sabores de Inca</h2>
    <p>
        Guía gastronómica para explorar restaurantes locales, ver cartas, precios, ubicación y más.
    </p>
    <a href="/restaurantes" class="boton-rojo">
        <strong>Ver restaurantes</strong>
    </a>
</section>

<section class="slider-section">
    <div class="slider">
        <div class="slide active">
            <img src="{{ asset('images/slider/2.jpg') }}" alt="Restaurante 1">
        </div>
        <div class="slide">
            <img src="{{ asset('images/slider/3.jpg') }}" alt="Restaurante 2">
        </div>
        <div class="slide">
            <img src="{{ asset('images/slider/6.jpg') }}" alt="Restaurante 3">
        </div>
        <div class="slide">
            <img src="{{ asset('images/slider/8.jpg') }}" alt="Restaurante 4">
        </div>
        <div class="slide">
            <img src="{{ asset('images/slider/9.jpg') }}" alt="Restaurante 5">
        </div>
        <div class="slide">
            <img src="{{ asset('images/slider/10.jpg') }}" alt="Restaurante 6">
        </div>
        <div class="slide">
            <img src="{{ asset('images/slider/11.jpg') }}" alt="Restaurante 7">
        </div>
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>

    </div>
</section>

<section class="ventajas">
    <div>
        <h3>Opciones veganas</h3>
        <p>Filtra restaurantes con platos veganos fácilmente.</p>
    </div>
    <div>
        <h3>Consulta la carta</h3>
        <p>Ve los menús antes de decidir dónde comer.</p>
    </div>
    <div>
        <h3>Ubicación en el mapa</h3>
        <p>Encuentra cada restaurante en el mapa interactivo.</p>
    </div>
</section>
@endsection