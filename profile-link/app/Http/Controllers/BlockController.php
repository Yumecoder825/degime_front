<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlockRequest;
use App\Models\Block;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    function store(BlockRequest $request) {
        if(!Block::where([
            ['target_user_id', $request->user_id],
            ['user_id', auth()->id()]
        ])->exists()) {
            Block::create([
                'target_user_id' => $request->user_id,
                'user_id' => auth()->id(),
            ]);
        }

        return redirect()->route('app.block.list')->with('message', 'ブロックしました');
    }

    function destroy(BlockRequest $request) {
        $blockQuery = Block::where([
            ['target_user_id', $request->user_id],
            ['user_id', auth()->id()]
        ]);

        if($blockQuery->exists()) {
            $blockQuery->delete();
        }

        return redirect()->route('app.block.list')->with('message', 'ブロックを解除しました');
    }
}
