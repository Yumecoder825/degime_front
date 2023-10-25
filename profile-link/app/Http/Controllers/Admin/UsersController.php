<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    function create() {
        $users = User::orderByDesc('name')->paginate(20);

        return view('app.admin.users', compact('users'));
    }

    function store() {
        $user = User::find(request('user_id'));
        if($user == null) return redirect()->to('app.admin.users');

        $user->delete();

        return redirect()->to('app.admin.users')->with('message', 'ユーザーを退会させました');
    }
}
