<?php

namespace App\Http\Controllers;

use App\Enum\FavoriteType;
use App\Http\Requests\FavoriteRequest;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    function store(FavoriteRequest $request) {
        $favoriteType = FavoriteType::from($request->type);

        if(!Favorite::where([
            ['type', $favoriteType],
            ['target_user_id', $request->user_id],
            ['user_id', auth()->id()]
        ])->exists()) {
            Favorite::create([
                'type' => $favoriteType,
                'target_user_id' => $request->user_id,
                'user_id' => auth()->id(),
            ]);
        }

        return redirect()->route('app.favorite.list')->with('message', 'お気に入りに追加しました');
    }

    function destroy(FavoriteRequest $request) {
        $favoriteType = FavoriteType::from($request->type);

        $favoriteQuery = Favorite::where([
            ['type', $favoriteType],
            ['target_user_id', $request->user_id],
            ['user_id', auth()->id()]
        ]);

        if($favoriteQuery->exists()) {
            $favoriteQuery->delete();
        }

        return redirect()->route('app.favorite.list')->with('message', 'お気に入りから削除しました');
    }
}
