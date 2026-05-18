<?php

namespace App\Models;

use App\Traits\SlugRoute;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

#[Fillable([
    'code',
    'name',
    'description',
    'thumbnail',
    'slug',
    'is_active'
])]
class Course extends Model
{
    use SoftDeletes, SlugRoute, HasSlug, Searchable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    #[SearchUsingPrefix(['code'])]
    #[SearchUsingFullText(['name', 'description'])]
    public function toSearchableArray(): array
    {
        return [
            'id'          => (int) $this->id,
            'code'        => $this->code,
            'name'        => $this->name,
            'description' => $this->description,
        ];
    }

    /**
     * The teachers that belong to the Course
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class)
            ->using(CourseTeacher::class)
            ->withTimestamps();
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('is_active', true);
    }
}
