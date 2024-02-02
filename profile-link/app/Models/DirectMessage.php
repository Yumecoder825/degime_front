<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectMessage extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'message',
    ];

    function from_user() {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    function to_user() {
        return $this->belongsTo(User::class, 'to_user_id');
    }
}
