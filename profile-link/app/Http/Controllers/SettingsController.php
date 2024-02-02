<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingsRequest;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    function create() {
        $user = auth()->user();

        return view('app.settings', compact('user'));
    }

    function store(SettingsRequest $request) {
        $user = auth()->user();
        $user->name = $request->name;
        if($request->avatar) {
            $avatarFile = request()->file('avatar');
            if($avatarFile->isValid()) {
                $avatarData = $avatarFile->get();
                $avatarFileName = sha1($avatarData) . $avatarFile->getClientOriginalExtension();
                file_put_contents(public_path('img/' . $avatarFileName), $avatarData);
                $user->avatar = $avatarFileName;
            }
        }
        if($user->email !== $request->email) {
            $user->email = $request->email;
            $user->email_verified_at = null;
            $user->sendEmailVerificationNotification();
        }
        $user->save();

        return redirect()->route('app.settings')->with('message', '設定を更新しました');
    }
}
