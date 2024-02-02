<?php

namespace App\Models;

use App\Enum\AccessType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Access extends Model
{
    use HasFactory, HasUuids;

    protected $casts = [
        'type' => AccessType::class,
    ];

    protected $fillable = [
        'type',
        'url',
        'user_id',
    ];
}
