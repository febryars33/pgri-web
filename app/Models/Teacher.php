<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Searchable;

class Teacher extends Model
{
    use SoftDeletes, Searchable;

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

    #[SearchUsingFullText(['name', 'bio'])]
    public function toSearchableArray(): array
    {
        return [
            'id'          => (int) $this->id,
            'name'        => $this->name,
            'bio' => $this->bio,
        ];
    }

    /**
     * The courses that belong to the Teacher
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class)
            ->using(CourseTeacher::class)
            ->withTimestamps();
    }
}
