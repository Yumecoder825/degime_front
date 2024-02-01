<?php

namespace App\Http\Controllers;

use App\Models\DirectMessage;
use App\Models\User;
use Illuminate\Http\Request;

class DMListController extends Controller
{
    function create() {
        $dmQuery = DirectMessage::where([
            ['from_user_id', auth()->id()],
        ])->orWhere([
            ['to_user_id', auth()->id()],
        ])->orderByDesc('created_at');

        $userIds = [];
        $users = [];
        if($dmQuery->exists()) {
            foreach($dmQuery->get() as $dm) {
                if($dm->from_user_id == auth()->id() &&
                   $dm->to_user_id != auth()->id() &&
                   !in_array($dm->to_user_id, $userIds)) {
                    $userIds[] = $dm->to_user_id;
                }
                if($dm->to_user_id == auth()->id() &&
                   $dm->from_user_id != auth()->id() &&
                   !in_array($dm->from_user_id, $userIds)) {
                    $userIds[] = $dm->from_user_id;
                }
            }

            $users = User::find($userIds);
        }

        return view('app.dm-list', compact('users'));
    }
}
