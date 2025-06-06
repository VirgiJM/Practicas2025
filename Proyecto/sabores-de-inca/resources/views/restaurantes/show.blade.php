@extends('layouts.app')

@section('titulo', $restaurante->Nombre)
@vite('resources/css/restaurante.css')
@vite('resources/js/restaurante.js')

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

        <section id="valoraciones">
            <h2>Valoraciones</h2>

            @if ($restaurante->valoraciones->count() > 0)
            <ul class="lista-valoraciones">
                @foreach ($restaurante->valoraciones as $valoracion)
                <li class="valoracion">
                    <strong>{{ $valoracion->usuario->Username ?? 'Usuario anónimo' }}</strong>
                    - <em>{{ $valoracion->created_at->format('d/m/Y') }}</em>
                    <p>Puntuación: {{ $valoracion->Valoracion }} ⭐</p>
                    <p>{{ $valoracion->Comentario }}</p>
                </li>
                @endforeach
            </ul>
            @else
            <p>Este restaurante aún no tiene valoraciones.</p>
            @endif
        </section>
        <section id="formulario-valoracion" style="display: none;">
            <h3>Deja tu valoración</h3>
            <form id="nueva-valoracion">
                <label for="valoracion">Puntuación:</label>
                <select id="valoracion" name="valoracion" required>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                </select>

                <label for="comentario">Comentario (opcional):</label>
                <textarea id="comentario" name="comentario" rows="3" placeholder="Escribe algo si quieres..."></textarea>

                <button type="submit">Enviar valoración</button>
            </form>
        </section>

</div>
@endsection