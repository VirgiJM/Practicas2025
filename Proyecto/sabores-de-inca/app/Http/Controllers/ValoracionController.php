<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValoracionCreateRequest;
use App\Models\Valoracion;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ValoracionController extends Controller
{
    public function index()
    {
        $valoraciones = Valoracion::all();
        return response()->json($valoraciones);
    }

    public function show($id)
    {
        $valoracion = Valoracion::find($id); // Busca en la base de datos el elemento con ese ID.

        if ($valoracion) {
            return response()->json($valoracion); // Si lo encuentra, lo devuelve en formato JSON.
        } else {
            return response()->json(['mensaje' => 'Valoración no encontrada'], 404); // Si no lo encuentra, error 404.
        }
    }

    // public function store(ValoracionCreateRequest $request)
    // {
    //     try {
    //         $validated = $request->validated();
    //         Valoracion::create($validated);

    //         return response()->json(['mensaje' => 'Valoracion creada correctamente'], 201); // 201: creado
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'mensaje' => 'Error al crear la valoración..',
    //             'error' => $e->getMessage()
    //         ], 400);
    //     }
    // }
    public function store(ValoracionCreateRequest $request)
    {
        try {
            $validated = $request->validated();

            $valoracion = new Valoracion($validated);
            $valoracion->fk_idUsuario = $request->user()->idUsuario; // <- Obtenemos el usuario desde el token.
            $valoracion->save();

            return response()->json(['mensaje' => 'Valoración creada correctamente'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error al crear la valoración.',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Esta función la usaré para eliminar un comentario siendo admin.
    public function destroy($id)
    {
        try {
            $valoracion = Valoracion::findOrFail($id);
            $valoracion->delete();
            return response()->json(['mensaje' => 'Valoración eliminada correctamente']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['mensaje' => 'Valoración no encontrada'], 404);
        } catch (\Exception $e) {
            return response()->json(['mensaje' => 'Error al eliminar la valoración', 'error' => $e->getMessage()], 500);
        }
    }
}
