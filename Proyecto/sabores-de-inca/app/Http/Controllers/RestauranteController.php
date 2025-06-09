<?php

namespace App\Http\Controllers;

use App\Http\Requests\RestauranteCreateRequest;
use App\Http\Requests\RestauranteUpdateRequest;
use App\Models\Restaurante;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log; // Pruebas.
use App\Models\TipoCocina;
use App\Models\TipoCocinaTraduccion;

class RestauranteController extends Controller
{
    // Index para mostrar todos los elementos de la tabla. 
    public function index(Request $request)
    {
        $query = Restaurante::with([
            'valoraciones',
            'tipoCocina.traduccionEsp'  // Carga la traducción en español
        ])
            ->withAvg('valoraciones as promedio_valoracion', 'Valoracion');

        if ($request->has('vegano') && $request->vegano == 1) {
            $query->where('Vegano', true);
        }

        if ($request->has('mediaMinima')) {
            $mediaMinima = (int) $request->mediaMinima;
            $query->having('promedio_valoracion', '>=', $mediaMinima);
        } else {
            $mediaMinima = 0;  // Valor por defecto para evitar lo de variable indefinida.
        }

        // Filtrar por tipo cocina.
        if ($request->has('tipoCocina') && $request->tipoCocina != 0) {
            $query->where('fk_idTipoCocina', $request->tipoCocina);
        }

        // Filtrar por rangoPrecio.
        if ($request->has('rangoPrecio') && $request->rangoPrecio != 0) {
            Log::info('Filtro rangoPrecio recibido: ' . $request->rangoPrecio);
            $query->where('RangoPrecio', $request->rangoPrecio);
        }

        $query->orderByDesc('promedio_valoracion');
        $restaurantes = $query->get();

        /** @var \App\Models\User $usuario */
        $usuario = Auth::user(); // La línea de encima es para que no se queje tanto.

        $rangosPrecio = Restaurante::select('RangoPrecio')
            ->distinct()
            ->orderBy('RangoPrecio')
            ->pluck('RangoPrecio');

        if ($usuario) {
            $usuario->load('favoritos');
            Log::info('Favoritos del usuario:', $usuario->favoritos->pluck('idRestaurante')->toArray());
        }

        if ($request->ajax()) {
            return view('restaurantes._lista', compact('restaurantes', 'usuario', 'rangosPrecio', 'mediaMinima'));
        }

        return view('restaurantes.index', compact('restaurantes', 'usuario', 'rangosPrecio', 'mediaMinima'));
    }





    // Este método sería usado desde api.php (el de las rutas). Devuelve datos en json.
    public function indexApi(Request $request)
    {

        $query = Restaurante::with([
            'valoraciones',
            'tipoCocina.traduccionEsp'  // Carga la traducción en español
        ])->withAvg('valoraciones as promedio_valoracion', 'Valoracion');

        if ($request->has('vegano') && $request->vegano == 1) {
            $query->where('Vegano', true);
        }

        if ($request->has('tipoCocina') && $request->tipoCocina != 0) {
            $query->where('fk_idTipoCocina', $request->tipoCocina);
        }

        if ($request->has('mediaMinima')) {
            $mediaMinima = (int) $request->mediaMinima;
            $query->having('promedio_valoracion', '>=', $mediaMinima);
        }

        // Filtrar por rangoPrecio.
        if ($request->has('rangoPrecio') && $request->rangoPrecio != 0) {
            // Log::info('Filtro rangoPrecio recibido: ' . $request->rangoPrecio);
            $query->where('RangoPrecio', $request->rangoPrecio);
        }

        $query->orderByDesc('promedio_valoracion');
        // dd($query);

        return response()->json($query->get());
    }


    // Show es para mostrar un elemento en específico. Esta función será para pruebas de PostMan y tal. 
    public function showApi($id)
    {
        $restaurante = Restaurante::find($id); // Busca en la base de datos el elemento con ese ID.
        if ($restaurante) {
            return response()->json($restaurante); // Si lo encuentra, lo devuelve en formato JSON.
        } else {
            return response()->json(['mensaje' => 'Restaurante no encontrado'], 404); // Si no lo encuentra, error 404.
        }

        // $restaurante = Restaurante::where('Slug', $slug)->firstOrFail();
        // return view('restaurantes.show', compact('restaurante'));
    }

    // Función para vista web.
    // $restaurante = Restaurante::findOrFail($id);
    // return view('restaurantes.show', compact('restaurante'));
    public function show($slug)
    {
        $restaurante = Restaurante::with(['valoraciones.usuario'])
            ->where('Slug', $slug)
            ->firstOrFail();

        Log::info("Info: " . $restaurante);
        return view('restaurantes.show', compact('restaurante'));
    }

    // Store es la función que se encarga de recibir peticiones POST.
    public function store(RestauranteCreateRequest $request)
    {
        try {
            // Validar y recoger los datos validados del formulario
            $validated = $request->validated();

            // Generar el slug desde el nombre
            $validated['Slug'] = \Str::slug($validated['Nombre']);

            // Comprobar si se ha subido una imagen
            if ($request->hasFile('Foto')) {
                $foto = $request->file('Foto');
                $ruta = $foto->store('imagenes', 'public'); // Guardar en storage/app/public/imagenes
                $validated['Foto'] = $ruta; // Guardar la ruta en la BD
            }

            // Crear el restaurante con todos los datos
            Restaurante::create($validated);

            return response()->json(['mensaje' => 'Restaurante creado correctamente'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error al crear el restaurante.',
                'error' => $e->getMessage()
            ], 400);
        }
    }


    // Para crear un restaurante en la parte de admin.
    public function create()
    {
        $tiposCocina = TipoCocinaTraduccion::select('fk_idTipoCocina', 'Nombre')
            ->where("fk_idIdioma", 1)
            ->get();
        return view('admin.crear', compact('tiposCocina'));
    }

    // Función para controlar los updates.
    public function update(RestauranteUpdateRequest $request, $id)
    {
        try {
            $restaurante = Restaurante::findOrFail($id); // Lanza 404 si no existe.

            $datos = $request->validated(); // Solo los campos válidos.
            $restaurante->update($datos);

            return response()->json(['mensaje' => 'Restaurante actualizado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Error al actualizar el restaurante.',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Función para subir la carta de un restaurante con PostMan.
    public function subirCarta(Request $request, $id)
    {
        // Validación del archivo PDF
        $request->validate([
            'Carta' => 'required|file|mimes:pdf|max:6144', // Puedo ajustar el tamaño máximo. Lo suyo es que no sea muy grande para que no ralentice la carga de la página. 5120 -> 5 MB
        ]);

        $restaurante = Restaurante::findOrFail($id);

        if ($request->hasFile('Carta')) {
            $path = $request->file('Carta')->store('/cartas', 'public'); // Carpeta storage/app/public/cartas.

            // Guardar la ruta relativa en la base de datos.
            $restaurante->Carta = $path;
            $restaurante->save();

            return response()->json(['mensaje' => 'Carta subida correctamente', 'ruta' => $path], 200);
        }

        return response()->json(['error' => 'No se ha subido ningún archivo'], 400);
    }



    // Método para eliminar un restaurante.
    public function destroy($id)
    {
        try {
            $accesibilidad = Restaurante::findOrFail($id);
            $accesibilidad->delete();

            return response()->json([
                'mensaje' => 'Restaurante eliminado correctamente.'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'El restaurante con el ID proporcionado no existe.'
            ], 404);
        }
    }
    public function subirImagen(Request $request, $id) // Aparte de las funciones store, destroy... también puedo crear yo unas propias. 
    {
        // Valido la Foto.
        $request->validate([
            'Foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $restaurante = Restaurante::findOrFail($id);

        // Subo la Foto.
        if ($request->hasFile('Foto')) {
            $imagenPath = $request->file('Foto')->store('imagenes', 'public'); // Laravel usará la carpeta storage/app/public/imagenes para guardar las imágenes. Es una carpeta accesible para Laravel.

            // Aquí guardo la ruta de la Foto en el modelo.
            $restaurante->Foto = $imagenPath;
            $restaurante->save();

            return response()->json(['success' => 'Foto subida correctamente', 'path' => $imagenPath]);
        }

        return response()->json(['error' => 'Se ha producido un error. No se ha subido ninguna Foto.'], 400);
    }

    public function editarVista($id)
    {
        $restaurante = Restaurante::findOrFail($id);
        $tiposCocina = TipoCocinaTraduccion::select('fk_idTipoCocina', 'Nombre')
            ->where("fk_idIdioma", 1)
            ->get();
        // $tiposCocina = TipoCocina::with('traduccion_esp')->get();

        return view('admin.editar', compact('restaurante', 'tiposCocina'));
    }
}
