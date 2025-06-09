<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->esAdmin) {
            abort(403, 'Acceso denegado');
        }

        return view('admin.dashboard');
    }
}
