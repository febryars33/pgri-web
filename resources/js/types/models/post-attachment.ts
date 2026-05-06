import type { FileInfo } from "../file-info";

export interface PostAttachment {
    id: number;
    name: string;
    post_id: number;
    file?: FileInfo;
}
