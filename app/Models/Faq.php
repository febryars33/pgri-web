<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'title',
    'description',
])]
class Faq extends Model
{
    /**
     * Get the category that owns the Faq
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(FaqCategory::class, 'faq_category_id')
            ->withDefault([
                'id' => null,
                'name' => __('Uncategorized'),
            ]);
    }
}
