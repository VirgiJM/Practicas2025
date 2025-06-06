<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccesibilidadController; // Importante añadir el import para que encuentre el AccesibilidadController del Route::Get.
use App\Http\Controllers\AccesibilidadTraduccionController;
use App\Http\Controllers\IdiomaController;
use App\Http\Controllers\RestauranteAccesibilidadController;
use App\Http\Controllers\RestauranteController;
use App\Models\Restaurante; // Para hacer la vista con Blade.
use App\Http\Controllers\RestauranteTraduccionController;
use App\Http\Controllers\TipoCocinaController;
use App\Http\Controllers\TipoCocinaTraduccionController;
use Illuminate\Support\Facades\Auth; // Para el logout.

// Prueba
// Route::get('/debug-api', function () {
//     require base_path('routes/api.php');
//     return 'api.php cargado manualmente';
// });

Route::get('/', function () {
    return view('inicio'); // No borrar. Esto es para cuando entre a la raíz del proyecto.
});

// Route::get('/restaurantes', function () {
// $restaurantes = Restaurante::all(); # $restaurantes es la variable que voy a utilizar en el resto de archivos para obtener los datos de los restaurantes.
// dd($restaurantes);
// return view('restaurantes.index', compact('restaurantes')); # Sintaxis: Hace un return de la vista y devuelve los datos de la variable.
// });
// Route::get('/restaurantes', [RestauranteController::class, 'index']);
// Route::middleware(['auth:sanctum'])->get('/restaurantes', [RestauranteController::class, 'index']);
Route::get('/restaurantes', [RestauranteController::class, 'index'])->name('restaurantes.index');



// Una ruta por cada tabla.
// Route::get('/accesibilidad', [AccesibilidadController::class, 'index']);
// Route::get('/accesibilidad/{id}', [AccesibilidadController::class, 'show']);

// Route::get('/idioma', [IdiomaController::class, 'index']);
// Route::get('/idioma/{id}', [IdiomaController::class, 'show']); // Ruta para mostrar un idioma a partir de un id.

// Route::get('/accesibilidad-traduccion', [AccesibilidadTraduccionController::class, 'index']);
// Route::get('/accesibilidad-traduccion/{id}', [AccesibilidadTraduccionController::class, 'show']);

// Route::get('/tipo-cocina', [TipoCocinaController::class, 'index']);
// Route::get('/tipo-cocina/{id}', [TipoCocinaController::class, 'show']);

// Route::get('/tipo-cocina-traduccion', [TipoCocinaTraduccionController::class, 'index']);
// Route::get('/tipo-cocina-traduccion/{id}', [TipoCocinaTraduccionController::class, 'show']);

// Route::get('/restaurante', [RestauranteController::class, 'index']);
Route::get('/restaurante/{slug}', [RestauranteController::class, 'show']);

// Route::get('/restaurante-accesibilidad', [RestauranteAccesibilidadController::class, 'index']);
// Route::get('/restaurante-accesibilidad/{id}', [RestauranteAccesibilidadController::class, 'show']);

// Route::get('/restaurante-traduccion', [RestauranteTraduccionController::class, 'index']);
// Route::get('/restaurante-traduccion/{id}', [RestauranteTraduccionController::class, 'show']);


Route::get('/quien-soy', function () {
    return view('quien-soy');
});

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::get('/login', function () {
    // return response()->json(['error' => 'Credenciales incorrectas.'], 401);
    return view('auth.login');
})->name('login');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

// En web.php no puedo comprobar si hay token o no. La comprobación se hará en la vista.
Route::get('/perfil', function () {
    return view('user.perfil');
})->name('perfil');
// })->middleware('auth');
