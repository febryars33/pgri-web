import type { PostStatus } from "../enums/post-status";
export type PostFormRequest = {
    title: string;
    body: string;
    post_category_id: number | null;
    status: PostStatus;
    tags: number[]; // Biasanya saat kirim ke backend hanya kirim ID-nya saja
    cover?: File | null; // Untuk handling upload file di frontend
};
