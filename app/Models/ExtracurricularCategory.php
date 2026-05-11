<?php

namespace App\Models;

use App\Traits\SlugRoute;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

#[WithoutTimestamps]
#[Fillable([
    'name',
    'slug',
    'description',
    'icon',
])]
class ExtracurricularCategory extends Model
{
    use HasSlug, SlugRoute;

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /**
     * Get all of the extracurriculars for the ExtracurricularCategory
     */
    public function extracurriculars(): HasMany
    {
        return $this->hasMany(Extracurricular::class);
    }
}
