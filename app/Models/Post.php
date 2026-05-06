<?php

namespace App\Models;

use App\Enums\PostStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\Attributes\Sluggable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Tags\HasTags;

#[Sluggable(from: 'title', to: 'slug')]
#[Fillable([
    'title',
    'body',
    'image',
    'status',
    'slug',
])]
#[Appends(['excerpt', 'formatted_created_at'])]
class Post extends Model implements HasMedia
{
    use HasSlug, HasTags, InteractsWithMedia, SoftDeletes;

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => PostStatus::class,
        ];
    }

    protected function title(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => ucfirst($value),
        );
    }

    protected function excerpt(): Attribute
    {
        return Attribute::make(
            get: fn () => Str::of($this->body)
                // 1. Ganti semua tag HTML dengan spasi (mencegah kata menempel)
                ->replaceMatches('/<[^>]+>/', ' ')

                // 2. Gunakan pipe() untuk menjalankan fungsi PHP native
                ->pipe(fn ($s) => html_entity_decode($s, ENT_QUOTES, 'UTF-8'))

                // 3. Bersihkan spasi ganda, tab, & newline menjadi 1 spasi saja
                ->squish()

                // 4. Potong teks dengan rapi
                ->limit(100),
        );
    }

    protected function formattedCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)
                ->locale('id')
                ->translatedFormat('l, d F Y'),
        );
    }

    /**
     * Get the post_category that owns the Post
     */
    public function post_category(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class);
    }

    /**
     * Get all of the post_attachments for the Post
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function post_attachments(): HasMany
    {
        return $this->hasMany(PostAttachment::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function attachments()
    {
        return $this->media()->where('collection_name', 'attachments');
    }
}
