<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('app.profile.customize');
});

Route::get('r/{url}', function($url){
    return redirect()->to('https://is.gd/' . $url);
})->where('url', '.*')->name('app.r');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('profile/{user_id}', [App\Http\Controllers\ProfileController::class, 'create'])->name('app.profile');
Route::get('profile/{user_id}/vcard', [App\Http\Controllers\VcardController::class, 'create'])->name('app.profile.vcard');
Route::get('redirect', [App\Http\Controllers\RedirectController::class, 'create'])->name('app.redirect');

Route::middleware('auth')->group(function() {
    // Customize
    Route::get('customize', [App\Http\Controllers\ProfileCustomizeController::class, 'create'])->name('app.profile.customize');
    Route::post('customize', [App\Http\Controllers\ProfileCustomizeController::class, 'store']);

    // Analytics
    Route::get('analytics', [App\Http\Controllers\AnalyticsController::class, 'create'])->name('app.analytics');

    // Direct Message
    Route::get('dm', [App\Http\Controllers\DMListController::class, 'create'])->name('app.dm.list');
    Route::get('dm/{user_id}', [App\Http\Controllers\DMController::class, 'create'])->name('app.dm');
    Route::post('dm/{user_id}', [App\Http\Controllers\DMController::class, 'store']);

    // Favorite
    Route::get('favorite', [App\Http\Controllers\FavoriteListController::class, 'create'])->name('app.favorite.list');
    Route::post('favorite/add', [App\Http\Controllers\FavoriteController::class, 'store'])->name('app.favorite.add');
    Route::post('favorite/remove', [App\Http\Controllers\FavoriteController::class, 'destroy'])->name('app.favorite.remove');

    // Block
    Route::get('block', [App\Http\Controllers\BlockListController::class, 'create'])->name('app.block.list');
    Route::post('block/add', [App\Http\Controllers\BlockController::class, 'store'])->name('app.block.add');
    Route::post('block/remove', [App\Http\Controllers\BlockController::class, 'destroy'])->name('app.block.remove');

    // Settings
    Route::get('settings', [App\Http\Controllers\SettingsController::class, 'create'])->name('app.settings');
    Route::post('settings', [App\Http\Controllers\SettingsController::class, 'store']);
});

Route::middleware(['auth', 'can:is-admin'])->prefix('admin')->group(function() {
    // Home
    Route::get('home', [App\Http\Controllers\Admin\HomeController::class, 'create'])->name('app.admin.home');

    // Users
    Route::get('users', [App\Http\Controllers\Admin\UsersController::class, 'create'])->name('app.admin.users');
    Route::post('users', [App\Http\Controllers\Admin\UsersController::class, 'store']);

    // Mail
    Route::get('mail', [App\Http\Controllers\Admin\MailController::class, 'create'])->name('app.admin.mail');
    Route::post('mail', [App\Http\Controllers\Admin\MailController::class, 'store']);
});
