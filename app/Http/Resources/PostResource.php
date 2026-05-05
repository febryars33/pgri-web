<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 1. Identitas & Meta Utama
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => $this->status,

            // 2. Konten (Gunakan Excerpt yang sudah kita rapikan)
            'excerpt' => $this->excerpt,
            // 'body'    => $this->body, // Biasanya body tidak dikirim di index/list untuk hemat bandwidth
            'body' => $this->when($request->routeIs('posts.show'), $this->body),

            // 3. Visual & Media (Dikelompokkan agar rapi di Props Vue/React)
            'media' => [
                'cover' => [
                    'preview' => $this->getFirstMediaUrl('covers', 'preview') ?: null,
                    'original' => $this->getFirstMediaUrl('covers', 'original') ?: null,
                ],
            ],

            // 4. Taksonomi & Relasi
            // Gunakan whenLoaded agar tidak memicu query tambahan jika tidak dipanggil
            'category' => new CategoryResource($this->whenLoaded('post_category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),

            // 5. Informasi Waktu (Format yang ramah untuk UI)
            'dates' => [
                'published_at' => $this->created_at?->format('d M Y'),
                'published_at_human' => $this->created_at?->diffForHumans(),
            ],

            // 6. User Permissions (Opsional, sangat berguna untuk UI)
            'can' => [
                'update' => $request->user()?->can('update', $this->resource),
                'delete' => $request->user()?->can('delete', $this->resource),
            ],
        ];
    }
}
