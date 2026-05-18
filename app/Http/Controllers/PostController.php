<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Meilisearch\Endpoints\Indexes;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $this->filters($request);

        return inertia('posts/index', [
            'posts' => Inertia::scroll(
                fn () => PostResource::collection(
                    $this->getPosts($filters)
                )
            ),

            'tags' => $this->getTags(),
            'post_categories' => $this->getPostCategories(),

            'filters' => $request->only(['tag_slug', 'category_slug', 'search']),

            'seo' => $this->generateSeoData(
                $filters['tag_slug'],
                $filters['category_slug'],
            ),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        views($post)
            // ->cooldown(20)
            ->unique()
            ->record();

        $post->load(['tags', 'post_attachments', 'post_category']);

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

    private function getPosts(array $filters)
    {
        $search = $filters['search'];

        // ======================================================
        // NORMAL QUERY (NO SEARCH)
        // ======================================================

        if (blank($search)) {
            return Post::query()
                ->with([
                    'post_category',
                    'tags',
                ])
                ->where('status', 'published')

                // ======================================================
                // TAG FILTER (SPATIE TAGS)
                // ======================================================

                ->when(
                    filled($filters['tag_slug']),
                    fn ($query) => $query->withAnyTags(
                        [$filters['tag_slug']]
                    )
                )

                // ======================================================
                // CATEGORY FILTER
                // ======================================================

                ->when(
                    filled($filters['category_slug']),
                    function ($query) use ($filters) {
                        $slug = $filters['category_slug'];

                        if ($filters['category_slug'] === 'uncategorized') {
                            return $query->whereNull(
                                'post_category_id'
                            );
                        }

                        return $query->whereRelation('post_category', 'slug', $slug);
                    }
                )

                ->latest()
                ->paginate(12)
                ->withQueryString();
        }

        // ======================================================
        // MEILISEARCH QUERY
        // ======================================================

        $query = Post::search(
            $search,
            function (
                Indexes $index,
                string $query,
                array $options
            ) {
                $options['attributesToHighlight'] = [
                    'title',
                ];

                $options['highlightPreTag']
                    = '<mark class="search-highlight">';

                $options['highlightPostTag']
                    = '</mark>';

                return $index->search($query, $options);
            }
        );

        // ======================================================
        // REQUIRED FILTERS
        // ======================================================

        $query->where('status', 'published');

        // ======================================================
        // TAG FILTER (SPATIE TAGS)
        // ======================================================

        if (filled($filters['tag_slug'])) {
            $query->where(
                'tags',
                $filters['tag_slug']
            );
        }

        // ======================================================
        // CATEGORY FILTER
        // ======================================================

        if (filled($filters['category_slug'])) {
            if ($filters['category_slug'] === 'uncategorized') {
                $query->where(
                    'category_slug',
                    null
                );
            } else {
                $query->where(
                    'category_slug',
                    $filters['category_slug']
                );
            }
        }

        return $query
            ->query(
                fn ($query) => $query->with([
                    'post_category',
                    'tags',
                ])
            )
            ->paginate(12)
            ->withQueryString();
    }

    private function generateSeoData(?string $tag, ?string $cat)
    {
        $title = 'Berita Sekolah';
        if ($tag) $title = "Topik Terpopuler: " . str($tag)->title();
        if ($cat) $title = "Daftar Berita Kategori " . str($cat)->title();

        return [
            'title' => $title,
            'description' => 'Informasi terbaru seputar kegiatan dan prestasi SMAS PGRI 1 Bandung',
        ];
    }

    private function filters(Request $request): array
    {
        return [
            'search' => trim(
                $request->string('search')->toString()
            ),

            'tag_slug' => $request->route('tag_slug'),

            'category_slug' => $request->route(
                'category_slug'
            ),
        ];
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
