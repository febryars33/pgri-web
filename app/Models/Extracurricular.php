<?php

namespace App\Models;

use App\Traits\SlugRoute;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

#[WithoutTimestamps]
#[Fillable([
    'extracurricular_category_id',
    'name',
    'slug',
    'description',
    'icon',
    'is_active',
    'mentors',
])]
class Extracurricular extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, SlugRoute;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'mentors' => 'array',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function galleries()
    {
        return $this->media()->where('collection_name', 'galleries');
    }

    /**
     * Get the extracurricular_category that owns the Extracurricular
     */
    public function extracurricular_category(): BelongsTo
    {
        return $this->belongsTo(ExtracurricularCategory::class)
            ->withDefault([
                'id' => null,
                'name' => 'Uncategorized',
                'slug' => 'uncategorized',
                'icon' => null,
            ]);
    }
}
