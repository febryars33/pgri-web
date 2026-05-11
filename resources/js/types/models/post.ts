import type { PostStatus } from "../enums/post-status";
import type { PostAttachment } from "./post-attachment";
import type { PostCategory } from "./post-category";
import type { Tag } from "./tag";

export interface Post {
    id: number;
    title: string;
    slug: string;
    status: PostStatus;
    excerpt: string;
    body?: string | TrustedHTML; // Opsional jika tidak dikirim di index

    // Sesuai grup 'media' di Resource
    media: {
        cover: {
            preview?: string | null;
            original?: string | null;
        };
        attachments?: PostAttachment[]
    };

    // Sesuai grup 'dates' di Resource
    dates: {
        published_at: string;
        published_at_human: string;
    };

    // Relasi menggunakan interface yang sudah didefinisikan
    category: PostCategory;
    tags?: Tag[];
}
