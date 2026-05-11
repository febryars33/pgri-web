<?php

namespace App\Http\Controllers;

use App\Enums\PostStatus;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;

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
            'tags' => $this->tags(),
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
            'tags' => $this->tags(),
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
            'tags' => $this->tags(),
        ]);
    }

    protected function tags()
    {
        return Tag::withCount(['posts' => function($query) {
            /** @var Post $query */
            $query->published();
        }])
            ->orderBy('posts_count', 'desc')
            ->limit(20)
            ->get();
    }
}
