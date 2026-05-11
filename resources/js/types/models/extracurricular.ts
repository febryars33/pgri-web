import type { IconType } from "react-icons/lib";
import type { ExtracurricularCategory } from "./extracurricular_category";

export interface Extracurricular {
    id: number;
    name: string;
    slug: string;
    description: string | null | TrustedHTML;
    icon: string | null | IconType;
    is_active: boolean;
    extracurricular_category_id: number | null;
    extracurricular_category?: ExtracurricularCategory | null;
    mentors: Mentor[];
}

export interface Mentor {
    name: string;
    position: string;
}
