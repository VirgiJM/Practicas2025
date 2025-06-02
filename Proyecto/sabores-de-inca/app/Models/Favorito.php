<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Favorito extends Model
{
    protected $table = 'favorito';
    protected $primaryKey = 'idFavorito';
    public $timestamps = false;

    protected $fillable = ['fk_idUsuario', 'fk_idRestaurante'];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'fk_idUsuario');
    }

    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'fk_idRestaurante');
    }
}
