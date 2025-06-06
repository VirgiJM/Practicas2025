<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    protected $table = 'valoracion';
    protected $primaryKey = 'idValoracion';
    // public $timestamps = true;

    protected $fillable = [
        'fk_idUsuario',
        'fk_idRestaurante',
        'Comentario',
        'Valoracion'
    ];

    public function restaurante()
    {
        return $this->belongsTo(\App\Models\Restaurante::class, 'idRestaurante', 'fk_idRestaurante');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'fk_idUsuario', 'idUsuario');
    }
}
