<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorito;


class FavoritoController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->user();

        $favoritos = Favorito::where('fk_idUsuario', $usuario->id)->pluck('fk_idRestaurante');

        return response()->json($favoritos);
    }
}
