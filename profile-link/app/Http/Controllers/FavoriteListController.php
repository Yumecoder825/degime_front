<?php

namespace App\Http\Controllers;

use App\Enum\FavoriteType;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteListController extends Controller
{
    function create() {
        $businessFavorites = Favorite::where([
            ['type', FavoriteType::BUSINESS],
            ['user_id', auth()->id()],
        ])->get();

        $privateFavorites = Favorite::where([
            ['type', FavoriteType::PRIVATE],
            ['user_id', auth()->id()],
        ])->get();

        return view('app.favorite-list', compact('businessFavorites', 'privateFavorites'));
    }
}
