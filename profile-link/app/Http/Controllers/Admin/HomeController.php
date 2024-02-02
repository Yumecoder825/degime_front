<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    function create() {
        $users = User::select([
            DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as created_date'),
            DB::raw('COUNT(created_at) as created_count'),
        ])->where([
            ['created_at', '>=', Carbon::now()->subDays(7)->startOfDay()],
        ])->orderByDesc('created_at')->groupBy([DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d")')])->get();

        return view('app.admin.home', compact('users'));
    }
}
