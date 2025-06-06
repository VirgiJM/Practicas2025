<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorito;
use App\Models\Restaurante;
use Illuminate\Support\Facades\Log;

class FavoritoController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->user();

        // Opción 1: Usar relación
        $restaurantes = $usuario->favoritos;

        Log::info('Restaurantes favoritos:', $restaurantes->toArray());
        return response()->json($restaurantes);
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
