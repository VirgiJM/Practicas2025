@extends('layouts.app')

@section('titulo', 'Quién soy | Sabores de Inca')
@vite('resources/css/dark-mode.css')

@section('contenido')
<section id="quien-soy" style="max-width: 800px; margin: 0 auto; padding: 2rem;">
    <h2 class="h2-modo-oscuro">Quién soy</h2>
    <p style="font-size: 1.1rem; line-height: 1.6;">
        ¡Hola! Soy <strong>Virginia</strong>, programadora y entusiasta de la buena comida.
        <em>Sabores de Inca</em> es un proyecto que une dos de mis grandes pasiones: el desarrollo web y descubrir nuevos sitios para comer bien.
    </p>
    <p style="font-size: 1.1rem; line-height: 1.6; margin-top: 1rem;">
        Esta guía nace como parte de mi proyecto de fin de grado, con el objetivo de facilitar a cualquier persona la búsqueda de restaurantes en Inca
        según sus gustos, presupuesto o necesidades. Desde cartas y precios hasta ubicación, accesibilidad u opciones veganas, he diseñado esta web pensando en la experiencia del usuario…
        <strong>¡y en abrir el apetito!</strong>
    </p>
    <img id="yo" src="{{ asset('Yo.jpg')}}">
</section>

@endsection