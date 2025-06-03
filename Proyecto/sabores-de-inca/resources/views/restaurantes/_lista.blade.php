@foreach ($restaurantes as $restaurante)
<div class="restaurante-card" data-id="{{ $restaurante->idRestaurante }}">
    <div class="image-container">
        <img src="{{ Storage::url($restaurante->Foto) }}" alt="Foto de {{$restaurante->Nombre}}">
        <div class="favorito-btn" data-restaurante-id="{{ $restaurante->idRestaurante }}">
            <i class="fa-regular fa-heart"></i>
        </div>
    </div>
    <div class="details">
        <h3 title="{{ $restaurante->Nombre }}">{{ $restaurante->Nombre }}</h3>
        <p title="{{ $restaurante->Direccion }}">{{ $restaurante->Direccion }} 📍</p>
        @if ($restaurante->Vegano)
        <p style="color:green">Vegano</p>
        @else
        <p style="color:red">No vegano</p>
        @endif
        <p>{{$restaurante->RangoPrecio}}</p>
        <p>{{ number_format($restaurante->promedio_valoracion ?? 0, 1, '.', '') }} ⭐</p>
        <a href="{{ url('/restaurante/' . $restaurante->Slug) }}" class="btn-ver-mas">Ver más</a>
    </div>
</div>
@endforeach