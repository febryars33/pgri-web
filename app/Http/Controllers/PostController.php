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
        $posts = Post::with(['post_category'])
            ->where('status', PostStatus::PUBLISHED)
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
        $post->load(['post_category', 'tags', 'post_attachments']);

        return inertia('posts/show', [
            'post' => new PostResource($post),
            'tags' => $this->tags(),
        ]);
    }

    public function tag(string $slug)
    {
        $posts = Post::withAllTags($slug)
            ->with(['post_category'])
            ->where('status', PostStatus::PUBLISHED)
            ->latest()
            ->get();

        return inertia('posts/index', [
            'posts' => PostResource::collection($posts),
            'tags' => $this->tags(),
        ]);
    }

    protected function tags()
    {
        return Tag::withCount('posts')
            ->orderBy('posts_count', 'desc')
            ->limit(10)
            ->get();
    }
}
