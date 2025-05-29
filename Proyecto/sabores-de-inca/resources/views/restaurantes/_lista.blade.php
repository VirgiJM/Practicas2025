@foreach ($restaurantes as $restaurante)
<div class="restaurante-card">
    <div class="image-container">
        <img src="{{ Storage::url($restaurante->Foto) }}" alt="Foto del restaurante">
        <div class="favorito-btn">
            <i class="fa-regular fa-heart"></i> <!-- corazón vacío -->
        </div>
    </div>
    <div class="details">
        <h3>{{ $restaurante->Nombre }}</h3>
        <p>{{ $restaurante->Direccion }} 📍</p>
        @if ($restaurante->Vegano)
        <p style="color:green">Vegano</p>
        @else
        <p style="color:red">No vegano</p>
        @endif
        <!-- <p style="color:green">{{ $restaurante->Vegano ? 'Vegano' : '' }}</p> -->
        <p>
            {{ number_format($restaurante->promedio_valoracion ?? 0, 1, '.', '') }} ⭐
        </p>
        <button class="ver-mas"><a href="{{ url('/restaurante/' . $restaurante->idRestaurante) }}">Ver más</a></button>
    </div>
</div>
@endforeach