import type { IconType } from "react-icons/lib";
import type { Extracurricular } from "./extracurricular";

export interface ExtracurricularCategory {
    id: number | null;
    name: string;
    slug: string;
    icon: string | null | IconType;
    extracurriculars: Extracurricular[]
}
