<?php

namespace App\Http\Controllers;

use App\Models\Block;
use Illuminate\Http\Request;

class BlockListController extends Controller
{
    function create() {
        $blocks = Block::where('user_id', auth()->id())->get();

        return view('app.block-list', compact('blocks'));
    }
}
