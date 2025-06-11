@extends('layouts.app')
@vite('resources/js/admin.js')
@vite(['resources/js/admin.js', 'resources/css/admin.css'])

@section('titulo', 'Administración | Sabores de Inca')
@section('contenido')
<div id="admin-content" style="display: none;">
    <h1>Panel de Administración</h1>
    <p>Bienvenida, <span id="admin-username"></span>.</p>
    <button class="add-btn" id="add-btn" data-idRestaurante-restaurante="${rest.idRestaurante}">Añadir restaurante</button>

    <h2 class="h2-modo-oscuro">Restaurantes registrados</h2>
    <div class="responsive-table">
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
    <div class="responsive-table">
        <h2 class="h2-modo-oscuro">Valoraciones registradas</h2>
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Restaurante</th>
                    <th>Usuario</th>
                    <th>Comentario</th>
                    <th>Puntuación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="valoraciones-table-body">
                <!-- Las filas se insertarán dinámicamente -->
            </tbody>
        </table>
    </div>
</div>
@endsection