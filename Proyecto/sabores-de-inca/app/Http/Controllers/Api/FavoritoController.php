<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorito;
use App\Models\Restaurante;

class FavoritoController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->user();

        $favoritos = Favorito::where('fk_idUsuario', $usuario->id)->pluck('fk_idRestaurante');

        return response()->json($favoritos);
    }

    public function toggle(Request $request)
    {
        $usuario = $request->user();
        $restauranteId = $request->input('restaurante_id');

        $favorito = Favorito::where('fk_idUsuario', $usuario->id)
            ->where('fk_idRestaurante', $restauranteId)
            ->first();

        if ($favorito) {
            $favorito->delete();
            return response()->json(['estado' => 'eliminado']);
        } else {
            Favorito::create([
                'fk_idUsuario' => $usuario->id,
                'fk_idRestaurante' => $restauranteId,
            ]);
            return response()->json(['estado' => 'añadido']);
        }
    }
}
