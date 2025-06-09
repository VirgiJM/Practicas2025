@extends('layouts.app')
@vite('resources/js/crearRestaurante.js')


@section('titulo', 'Añadir restaurante | Sabores de Inca')
@section('contenido')
<h3>Añadir restaurante</h3>
<form id="formCrearRestaurante" method="POST" action="/restaurantes" enctype="multipart/form-data">
    @csrf
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="Nombre" required><br>

    <label for="telefono">Teléfono:</label>
    <input type="text" id="telefono" name="Telefono" required><br>

    <label for="direccion">Dirección:</label>
    <input type="text" id="direccion" name="Direccion" required><br>

    <label for="rangoPrecio">Rango de Precio:</label>
    <input type="text" id="rangoPrecio" name="RangoPrecio" required><br>

    <label for="vegano">¿Opciones veganas?</label>
    <input type="hidden" name="Vegano" value="0">
    <input type="checkbox" id="vegano" name="Vegano" value="1"><br>

    <label for="sitioWeb">Sitio Web:</label>
    <input type="text" id="sitioWeb" name="SitioWeb"><br>

    <label for="carta">Carta (PDF):</label>
    <input type="file" id="carta" name="Carta" accept="application/pdf"><br>

    <label for="descripcion">Descripción:</label>
    <textarea id="descripcion" name="Descripcion" rows="5" cols="60"></textarea><br>

    <label for="tipoCocina">Tipo de cocina:</label>
    <select name="fk_idTipoCocina" id="tipoCocina" required>
        <option value="" disabled selected>-- Selecciona un tipo de cocina --</option>
        @foreach($tiposCocina as $tipo)
        <option value="{{ $tipo->fk_idTipoCocina }}">{{ $tipo->Nombre }}</option>
        @endforeach
    </select>

    <label for="slug">Slug:</label>
    <input type="text" id="slug" name="Slug" required disabled><br>

    <label for="foto">Foto del restaurante:</label>
    <input type="file" id="foto" name="Foto" accept="image/*"><br>

    <button type="submit">Guardar restaurante</button>
</form>
@endsection