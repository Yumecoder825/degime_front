<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'target_user_id',
        'user_id',
    ];

    function target_user() {
//        return $this->belongsTo(User::class, 'target_user_id');
        return User::find($this->target_user_id);
    }

    function user() {
//        return $this->belongsTo(User::class);
        return User::find($this->user_id);
    }
}
