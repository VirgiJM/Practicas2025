@extends('layouts.app')
@vite('resources/js/admin.js')


@section('titulo', 'Administración | Sabores de Inca')
@section('contenido')
<div id="admin-content" style="display: none;">
    <h1>Panel de Administración</h1>
    <p>Bienvenida, <span id="admin-username"></span>.</p>

    <h2>Restaurantes registrados</h2>
    <table border="1" cellpadding="10">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo de cocina</th>
                <th>Vegano</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="restaurant-table-body">
            <!-- Las filas se insertarán de forma dinámica. -->
        </tbody>
    </table>
</div>
@endsection