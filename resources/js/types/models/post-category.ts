export interface PostCategory {
    id: number | null;
    name: string;
    description: string | null;
    slug: string;
    posts_count?: number;
    created_at: null;
    deleted_at: null;
}
