<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorito;


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorito;
use App\Models\Restaurante;

class FavoritoController extends Controller
{
    // Esta función devuelve solo los IDs de los restaurantes favoritos
    public function ids(Request $request)
    {
        $usuario = $request->user();
        $favoritos = Favorito::where('fk_idUsuario', $usuario->id)->pluck('fk_idRestaurante');

        return response()->json($favoritos);
    }

    // Esta función devuelve los datos completos de los restaurantes favoritos
    public function index(Request $request)
    {
        $usuario = $request->user();
        $favoritos = $usuario->favoritos()->get();

        return response()->json($favoritos);
    }
}
