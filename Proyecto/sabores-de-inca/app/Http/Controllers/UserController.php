<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator; // Para las validaciones.


class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validación de los campos
            $validator = Validator::make($request->all(), [
                'Username' => 'required|string|max:100|unique:Usuario',
                'Email' => 'required|email|max:30|unique:Usuario',
                'Password' => 'required|string|min:8|confirmed', // El confirmed es para cuando quieres que dos contraseñas coincidan.
                'esAdmin' => 'sometimes|boolean'
                // 'Profile_Image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Necesario únicamente si voy a subir yo una imagen mientras creo el usuario.
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();


            // Asignación de la imagen por defecto.
            $profileImagePath = 'images/default-profile.png';  // Ruta de la imagen por defecto.

            // // Si el usuario ha subido una imagen, la guardamos.
            // if ($request->hasFile('Profile_Image')) {
            //     $imageName = time() . '.' . $request->Profile_Image->getClientOriginalExtension();
            //     $request->Profile_Image->move(public_path('images'), $imageName);
            //     $profileImagePath = 'images/' . $imageName;
            // }

            // Crea el nuevo usuario con los datos validados y la foto de perfil.
            $user = User::create([
                'Username' => $validatedData['Username'],
                'Email' => $validatedData['Email'],
                'Password' => Hash::make($validatedData['Password']),
                'Profile_Image' => $profileImagePath,  // Asignamos la ruta de la imagen.
                'esAdmin' => $request->has('esAdmin') ? (bool)$request->esAdmin : false,
            ]);
            return response()->json($user, 201);  // Devuelve el usuario creado.
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
