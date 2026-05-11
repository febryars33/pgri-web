<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::published()
            ->latest()
            ->get();

        return inertia('posts/index', [
            'posts' => PostResource::collection($posts),
            'tags' => $this->getTags(),
            'post_categories' => $this->getPostCategories(),
            'seo' => [
                'title' => 'Berita Sekolah',
                'description' => 'Informasi terbaru seputar kegiatan dan prestasi SMAS PGRI 1 Bandung',
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['tags', 'post_attachments']);

        return inertia('posts/show', [
            'post' => new PostResource($post),
            'tags' => $this->getTags(),
            'post_categories' => $this->getPostCategories(),
            'seo' => [
                'title' => $post->title,
                'description' => $post->description,
            ],
        ]);
    }

    public function tag(string $slug)
    {
        $posts = Post::withAllTags($slug)
            ->published()
            ->latest()
            ->get();

        return inertia('posts/index', [
            'posts' => PostResource::collection($posts),
            'tags' => $this->getTags(),
            'post_categories' => $this->getPostCategories(),
            'seo' => [
                'title' => 'Berita Sekolah',
                'description' => 'Informasi terbaru seputar kegiatan dan prestasi SMAS PGRI 1 Bandung',
            ],
        ]);
    }

    public function category(string $slug)
    {
        // 1. Cek apakah ini permintaan untuk Uncategorized
        if ($slug === 'uncategorized') {
            $posts = Post::published()
                ->whereNull('post_category_id') // Post tanpa kategori
                ->latest()
                ->get();

            $categoryName = __('Uncategorized');
        } else {
            // 2. Jika bukan, cari kategori di DB, jika tidak ada baru 404
            $postCategory = PostCategory::where('slug', $slug)->firstOrFail();

            $posts = $postCategory->posts()
                ->published()
                ->latest()
                ->get();

            $categoryName = $postCategory->name;
        }

        $title = function () use ($slug, $categoryName) {
            if ($slug === 'uncategorized') {
                return 'Artikel '.__('Uncategorized');
            }

            return "Kategori artikel: {$categoryName}";
        };

        return inertia('posts/index', [
            'posts' => PostResource::collection($posts),
            'tags' => $this->getTags(),
            'post_categories' => $this->getPostCategories(),
            'seo' => [
                'title' => $title(),
                'description' => "Menampilkan semua artikel dalam kategori {$categoryName}. Baca informasi terbaru hanya di ".config('app.name'),
            ],
        ]);
    }

    protected function getTags()
    {
        $tags = Tag::withCount(['posts' => function ($query) {
            /** @var Post $query */
            $query->published();
        }])
            ->orderBy('posts_count', 'desc')
            ->limit(20);

        /** @var Builder $tags */
        return $tags->get();
    }

    protected function getPostCategories()
    {
        $categories = PostCategory::withCount(['posts' => fn ($q) => $q->published()])
            ->orderByDesc('posts_count')
            ->limit(20)
            ->get();

        $uncategorizedCount = Post::published()->whereNull('post_category_id')->count();

        return $categories->when($uncategorizedCount > 0, function ($collection) use ($uncategorizedCount) {
            return $collection->push([
                'id' => null,
                'name' => __('Uncategorized'),
                'slug' => 'uncategorized',
                'posts_count' => $uncategorizedCount,
                // Properti null lainnya opsional jika frontend Anda bisa handle undefined
                'description' => null,
                'deleted_at' => null,
                'created_at' => null,
                'updated_at' => null,
            ])->sortByDesc('posts_count')->values(); // values() untuk reset index array
        })->toArray();
    }
}
