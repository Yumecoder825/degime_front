<?php

namespace App\Http\Controllers;

use App\Enum\AccessType;
use App\Models\Access;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    function create() {
        $profileAccesses = Access::select([
            'type',
            DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as created_date'),
            DB::raw('COUNT(created_at) as created_count'),
        ])->where([
            ['type', AccessType::PROFILE->value],
            ['created_at', '>=', Carbon::now()->subDays(7)->startOfDay()],
        ])->orderByDesc('created_at')->groupBy(['type', DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d")')])->get();

        $linkAccesses = Access::select([
            'type',
            DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as created_date'),
            DB::raw('COUNT(created_at) as created_count'),
        ])->where([
            ['type', AccessType::LINK->value],
            ['created_at', '>=', Carbon::now()->subDays(7)->startOfDay()],
        ])->orderByDesc('created_at')->groupBy(['type', DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d")')])->get();

        return view('app.analytics', compact('profileAccesses', 'linkAccesses'));
    }
}
