<?php

namespace App\Http\Controllers;

use App\Enums\PostStatus;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Spatie\Tags\Tag;

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
            'tags' => Tag::latest()->limit(10)->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['post_category', 'tags']);

        return inertia('posts/show', [
            'post' => new PostResource($post),
            'tags' => Tag::latest()->limit(10)->get(),
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
            'tags' => Tag::latest()->limit(10)->get(),
        ]);
    }
}
