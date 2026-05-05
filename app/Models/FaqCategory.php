<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name',
])]
#[WithoutTimestamps]
class FaqCategory extends Model
{
    /**
     * Get all of the faqs for the FaqCategory
     */
    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class);
    }
}
