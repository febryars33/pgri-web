export interface Tag {
    id: number;
    name: {
        id: string;
    };
    slug: {
        id: string
    };
    type: string | null,
    order_column: number,
    created_at: string | null,
    updated_at: string | null,
    posts_count: number
}
