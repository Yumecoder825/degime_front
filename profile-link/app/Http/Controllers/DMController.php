<?php

namespace App\Http\Controllers;

use App\Http\Requests\DMRequest;
use App\Models\Block;
use App\Models\DirectMessage;
use App\Models\User;
use App\Notifications\DMNotification;
use Illuminate\Http\Request;

class DMController extends Controller
{
    function create($user_id) {
        if($user_id == auth()->id()) return redirect()->route('app.dm.list');

        $user = User::find($user_id);
        if($user == null) return redirect()->route('app.dm.list');

        $dms = DirectMessage::where([
            ['from_user_id', auth()->id()],
            ['to_user_id', $user_id],
        ])->orWhere([
            ['from_user_id', $user_id],
            ['to_user_id', auth()->id()],
        ])->orderByDesc('created_at')->paginate(20);

        return view('app.dm', compact('user', 'user_id', 'dms'));
    }

    function store(DMRequest $request, $user_id) {
        if($user_id == auth()->id()) return redirect()->route('app.dm.list');

        if(Block::where([['target_user_id', $user_id], ['user_id', auth()->id()]])
           ->orWhere([['target_user_id', auth()->id()], ['user_id', $user_id]])->exists()) {
            return redirect()->route('app.dm', $user_id)->with('message', 'このユーザーには送信できません');
        }

        DirectMessage::create([
            'from_user_id' => auth()->id(),
            'to_user_id' => $user_id,
            'message' => $request->message,
        ]);

        User::find($user_id)->notify(new DMNotification(auth()->id()));

        return redirect()->route('app.dm', $user_id)->with('message', 'メッセージを送信しました');
    }
}
