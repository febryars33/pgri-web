import type { Faq } from "./faq";

export interface FaqCategory {
    id: number;
    name: string;
    faqs: Faq[];
}
