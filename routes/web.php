<?php

use Illuminate\Support\Facades\Route;

// 1. Halaman Beranda Utama (Customer / Pembeli Sruput & Nyam)
Route::get('/', function () {
    return view('home');
});

// 2. Halaman Mobile Home Fresh (Menu 8k & 12k + WA 085246966228 & IG @sruputnyam.official)
Route::get('/mobile-home', function () {
    return view('layout-mobile-home');
});

// 3. Halaman Layout 2 Menu Presisi
Route::get('/layout-2menu', function () {
    return view('layout-2menu');
});

// 4. Halaman Single App View
Route::get('/single-app', function () {
    return view('single-app');
});

// 5. Halaman Admin & Dapur (Management, Katalog & Analytics)
Route::get('/admin', function () {
    return view('admin');
});
