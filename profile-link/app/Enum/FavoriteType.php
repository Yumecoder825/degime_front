<?php

namespace App\Enum;

enum FavoriteType: string
{
    case BUSINESS = 'business';
    case PRIVATE = 'private';

    function toText(): string
    {
        return match($this) {
            self::BUSINESS => 'ビジネス',
            self::PRIVATE => 'プライベート',
        };
    }
}
