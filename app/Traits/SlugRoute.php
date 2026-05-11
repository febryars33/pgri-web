<?php

namespace App\Traits;

trait SlugRoute
{
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
