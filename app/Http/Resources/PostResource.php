<?php

namespace App\Http\Resources;

use App\Models\Post;
use App\Models\PostAttachment;
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
        $scout = \Closure::bind(function(Post $model) {
            return $model->scoutMetadata;
        }, null, $this->resource);

        $metadata = $scout($this->resource) ?? [];
        $formatted = $metadata['_formatted'] ?? null;

        return [
            'id' => $this->id,
            'title' => $formatted['title'] ?? $this->title,
            'slug' => $this->slug,
            'status' => $this->status,
            'excerpt' => $this->excerpt,
            'body' => $this->when($request->routeIs('posts.show'), $this->body),

            'media' => [
                'cover' => [
                    'preview' => $this->getFirstMediaUrl('covers', 'preview') ?: null,
                    'original' => $this->getFirstMediaUrl('covers', 'original') ?: null,
                ],
                // 7. Tambahkan File Pendukung di sini
                'attachments' => $this->whenLoaded('post_attachments', function () {
                    return $this->post_attachments->map(function (PostAttachment $attachment) {
                        $media = $attachment->getFirstMedia('post_attachments');

                        return [
                            'id' => $attachment->id,
                            'name' => $attachment->name, // Nama dari TextInput
                            'file' => $media ? [
                                'name' => $media->file_name, // Nama file asli/hash
                                'size' => $media->human_readable_size, // Format KB/MB otomatis dari Spatie
                                'extension' => $media->extension,
                                'mime_type' => $media->mime_type,
                                'url' => $media->getUrl(),
                            ] : null,
                        ];
                    });
                }),
            ],

            'category' => new CategoryResource($this->whenLoaded('post_category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),

            'dates' => [
                'published_at' => $this->created_at?->format('d M Y'),
                'published_at_human' => $this->created_at?->diffForHumans(),
            ],
        ];
    }
}
