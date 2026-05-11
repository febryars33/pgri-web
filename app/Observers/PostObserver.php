<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Validation\ValidationException;

class PostObserver
{
    public function creating(Post $post): void
    {
        $reserved_words = [
            'admin',
            'administrator',
            'root',
            'superuser',
            'superadmin',
            'moderator',
            'faq',
            'tag',
            'category',
            'post',
            'user',
            'role',
            'permission',
            'media',
            'settings',
            'dashboard',
            'login',
            'register',
            'logout',
            'profile',
            'email',
            'password',
        ];

        if (in_array(strtolower($post->slug), $reserved_words)) {
            throw ValidationException::withMessages([
                'slug' => 'This slug is reserved.',
            ]);
        }
    }

    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        //
    }
}
