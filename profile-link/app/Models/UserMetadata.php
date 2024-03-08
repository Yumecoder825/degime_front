<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMetadata extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'meta_key',
        'meta_value',
        'user_id'
    ];

    static function getMeta($user_id, $metaKey, $def = null) {
        $userMetadataQuery = UserMetadata::where([['user_id', $user_id], ['meta_key', $metaKey]]);
        if(!$userMetadataQuery->exists()) return $def;
        return $userMetadataQuery->first()->meta_value;
    }

    static function setMeta($user_id, $metaKey, $val) {
        $userMetadataQuery = UserMetadata::where([['user_id', $user_id], ['meta_key', $metaKey]]);
        if($userMetadataQuery->exists()) {
            $userMetadata = $userMetadataQuery->first();
            $userMetadata->meta_value = $val;
        } else {
            $userMetadata = UserMetadata::create([
                'meta_key' => $metaKey,
                'meta_value' => $val,
                'user_id' => $user_id,
            ]);
        }
        $userMetadata->save();
    }

    static function delMeta($user_id, $metaKey) {
        $userMetadataQuery = UserMetadata::where([['user_id', $user_id], ['meta_key', $metaKey]]);
        if($userMetadataQuery->exists()) {
            $userMetadataQuery->delete();
        }
    }
}
