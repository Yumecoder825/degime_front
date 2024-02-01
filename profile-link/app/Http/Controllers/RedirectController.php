<?php

namespace App\Http\Controllers;

use App\Enum\AccessType;
use App\Models\Access;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RedirectController extends Controller
{
    function create() {
        $v = Validator::make(request()->all(), [
            'url' => ['required', 'string', 'url'],
        ]);

        if($v->fails()) abort(400);

        if(request('user_id') && User::find(request('user_id')) != null) {
            Access::create([
                'type' => AccessType::LINK,
                'url' => request('url'),
                'user_id' => request('user_id'),
            ]);
        }

        return redirect()->to(request('url'));
    }
}
