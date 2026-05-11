<?php

namespace App\Observers;

use App\Models\PostCategory;
use Illuminate\Validation\ValidationException;

class PostCategoryObserver
{
    public function creating(PostCategory $postCategory): void
    {
        if ($postCategory->slug === 'uncategorized') {
            throw ValidationException::withMessages([
                'slug' => 'This slug is reserved.',
            ]);
        }
    }

    /**
     * Handle the PostCategory "created" event.
     */
    public function created(PostCategory $postCategory): void
    {
        //
    }

    /**
     * Handle the PostCategory "updated" event.
     */
    public function updated(PostCategory $postCategory): void
    {
        //
    }

    /**
     * Handle the PostCategory "deleted" event.
     */
    public function deleted(PostCategory $postCategory): void
    {
        //
    }

    /**
     * Handle the PostCategory "restored" event.
     */
    public function restored(PostCategory $postCategory): void
    {
        //
    }

    /**
     * Handle the PostCategory "force deleted" event.
     */
    public function forceDeleted(PostCategory $postCategory): void
    {
        //
    }
}
