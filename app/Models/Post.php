<?php

namespace App\Models;

use App\Enums\PostStatus;
use App\Observers\PostObserver;
use App\Traits\SlugRoute;
use Carbon\Carbon;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;
use Override;
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
#[ObservedBy(PostObserver::class)]
class Post extends Model implements HasMedia
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, HasSlug, HasTags, InteractsWithMedia, SlugRoute, SoftDeletes, Searchable;

    protected $with = ['post_category'];

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

    public function scoutMetadata(): array
    {
        return [
            '_formatted' => $this->scout_metadata['_formatted'] ?? null,
        ];
    }

    public function searchableAs(): string
    {
        return 'posts';
    }

    public function toSearchableArray(): array
    {
        return [
            'id'    => (int) $this->id,
            'post_category_id' => $this->post_category_id,
            'title' => $this->title,
            'body'  => strip_tags($this->body), // Bersihkan HTML agar indeks bersih
            'slug'  => $this->slug,
            'category_name' => $this->post_category->name, // Memungkinkan cari artikel berdasarkan nama kategori
            'category_slug' => $this->post_category->slug,
            'status' => $this->status,
            'tags' => $this->tags->pluck('slug')->toArray(),
            'created_at' => $this->created_at->timestamp,
            'updated_at' => $this->updated_at->timestamp,
        ];
    }

    /**
     * Get the post_category that owns the Post
     */
    public function post_category(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class)
            ->withDefault([
                'id' => null,
                'name' => 'Uncategorized',
                'slug' => 'uncategorized',
                'description' => null,
                'deleted_at' => null,
                'created_at' => null,
                'updated_at' => null,
            ]);
    }

    /**
     * Get all of the post_attachments for the Post
     */
    public function post_attachments(): HasMany
    {
        return $this->hasMany(PostAttachment::class);
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

    public function scopePublished(Builder $query)
    {
        return $query->where('status', PostStatus::PUBLISHED);
    }

    #[Override]
    public function resolveRouteBinding(mixed $value, $field = null): ?Model
    {
        return $this->published()
            ->where($field ?? $this->getRouteKeyName(), $value)
            ->firstOrFail();
    }
}
