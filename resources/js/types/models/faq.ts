import type { FaqCategory } from "./faq-category";

export interface Faq {
    id: number;
    faq_category_id?: number;
    faq_category?: FaqCategory;
    title: string;
    description: string | null | TrustedHTML;
    created_at: string | null;
    updated_at: string | null;
}
