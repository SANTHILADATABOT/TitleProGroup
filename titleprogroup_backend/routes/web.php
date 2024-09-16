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
    return view('welcome');
});

Route::get('gmailtest', function(){
    $to_name="Ranjith";$to_mailid="ranjith4santhila@gmail.com";
    $subject="test2";
    $body="test2";
    return $mail1=(new \App\Http\Controllers\Plugins\GmailController())->sentMail($to_mailid,$to_name,$subject,$body);
});
