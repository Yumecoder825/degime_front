<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    function profile() {
        $profileQuery = Profile::where('user_id', $this->id);

        if($profileQuery->exists()) {
            $profile = $profileQuery->first();
        } else {
            $profile = Profile::create([
                'data' => '[]',
                'user_id' => $this->id,
            ]);
        }

        return $profile;
    }

    function getMeta($metaKey, $defVal = null) {
        return UserMetadata::getMeta($this->id, $metaKey, $defVal);
    }

    function setMeta($metaKey, $val) {
        return UserMetadata::setMeta($this->id, $metaKey, $val);
    }

    function delMeta($metaKey) {
        return UserMetadata::delMeta($this->id, $metaKey);
    }

    function isAdmin(): bool
    {
        return $this->getMeta('admin') === 'true';
    }
}
