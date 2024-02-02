<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileCustomizeRequest;
use App\Models\Favorite;
use App\Models\User;
use App\Notifications\ProfileUpdateNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ProfileCustomizeController extends Controller
{
    function create() {
        $user = auth()->user();
        $profile = $user->profile();

        return view('app.profile-customize', compact('user', 'profile'));
    }

    function store(ProfileCustomizeRequest $request) {
        $user = auth()->user();
        if(request('bg_color')) {
            $user->setMeta('bgColor', request('bg_color'));
        }
        if(request('bg_image')) {
            $user->setMeta('bgImage', request('bg_image'));
        }

        $profile = $user->profile();
        $profile->data = $request->widget_data;
        $profile->save();

        $favoriteUserIds = Favorite::where('target_user_id', auth()->id())->pluck('user_id');
        Notification::send(User::find($favoriteUserIds), new ProfileUpdateNotification(auth()->user()));

        return redirect()->route('app.profile.customize')
            ->with('message', 'プロフィールを保存しました');
    }
}
