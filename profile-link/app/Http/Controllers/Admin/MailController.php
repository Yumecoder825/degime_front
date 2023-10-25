<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MailRequest;
use App\Models\MailHistory;
use App\Models\User;
use App\Notifications\AdminMailNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class MailController extends Controller
{
    function create() {
        $mailHistories = MailHistory::OrderByDesc('created_at')->paginate(20);

        return view('app.admin.mail', compact('mailHistories'));
    }

    function store(MailRequest $request) {
        Notification::send(User::all(), new AdminMailNotification($request->subject, $request->contents));

        MailHistory::create([
            'subject' => $request->subject,
            'contents' => $request->contents,
        ]);

        return redirect()->route('app.admin.mail')->with('message', 'メールを一斉送信しました');
    }
}
