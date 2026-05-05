<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AcademicController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\StudentAffairController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::get('/about', AboutController::class)->name('about');
Route::get('/about/facilities', FacilityController::class)->name('about.facilities');
Route::get('/contact', ContactController::class)->name('contact');
// Route::get('/academic', AcademicController::class)->name('academic');
Route::get('/faq', FaqController::class)->name('faq');
Route::get('/student-affairs', StudentAffairController::class)->name('student-affair');
Route::get('/posts/tag/{slug}', [PostController::class, 'tag'])->name('posts.tag');
Route::resource('/posts', PostController::class)->only(['index', 'show']);

Route::get('/privacy-policy', fn () => inertia('privacy'))->name('privacy');

// Route::get('/blank', function () {
//     return inertia('blank');
// });
