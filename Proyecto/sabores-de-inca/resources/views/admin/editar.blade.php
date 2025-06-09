@extends('layouts.app')

@section('titulo', $restaurante->Nombre)
@vite('resources/js/editarRestaurante.js')

@section('contenido')
<h1>Editar Restaurante</h1>
<form id="formEditar">
    <input type="hidden" name="idRestaurante" id="idRestaurante" value="{{ $restaurante->idRestaurante }}">

    <label for="nombre">Nombre:</label>
    <input type="text" name="Nombre" id="nombre" value="{{ $restaurante->Nombre }}"><br>

    <label for="telefono">Teléfono:</label>
    <input type="text" name="Telefono" id="telefono" value="{{ $restaurante->Telefono }}"><br>

    <label for="vegano">¿Opciones veganas?</label>
    <input type="checkbox" name="Vegano" id="vegano" {{ $restaurante->Vegano ? 'checked' : '' }}><br>

    <label for="descripcion">Descripción:</label>
    <textarea name="Descripcion" id="descripcion" rows="8" cols="90">{{ old('Descripcion', $restaurante->Descripcion) }}</textarea>

    <label for="tipoCocina">Tipo de cocina:</label>
    <select name="fk_idTipoCocina" id="tipoCocina">
        @foreach($tiposCocina as $tipo)
        <option value="{{ $tipo->fk_idTipoCocina }}" {{ $restaurante->fk_idTipoCocina == $tipo->fk_idTipoCocina ? 'selected' : '' }}>
            {{ $tipo->Nombre }}
        </option>
        @endforeach
    </select>

    <button type="submit">Guardar cambios</button>
</form>


<script src="{{ asset('js/editarRestaurante.js') }}"></script>
</body>

</html>

@endsection