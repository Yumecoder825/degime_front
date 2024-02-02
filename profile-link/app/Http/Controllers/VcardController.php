<?php

namespace App\Http\Controllers;

use App\Enum\AccessType;
use App\Models\Access;
use App\Models\User;
use Illuminate\Http\Request;
use JeroenDesloovere\VCard\VCard;

class VcardController extends Controller
{
    function create($user_id) {
        $user = User::find($user_id);
        if($user == null) abort(404);

        $profile = json_decode($user->profile()->data);

        foreach($profile as $data) {
            if($data->type != 'business') continue;

            $vcard = new VCard();
            $vcard->addName($data->name);
            $vcard->addCompany($data->company);
            $vcard->addRole($data->role);
            $vcard->addEmail($data->email);
            $vcard->addPhoneNumber($data->phone, 'PREF;WORK');
            $vcard->addURL($data->url);

            return response($vcard->getOutput())->header('Content-Type', 'text/x-vcard; charset=utf-8');
        }

        abort(404);
    }
}
