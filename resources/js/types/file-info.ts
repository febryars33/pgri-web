import type { FileMimeType } from '@zag-js/file-utils';
export interface FileInfo {
    name: string;
    size: string;
    extension: string;
    mime_type: FileMimeType;
    url: string;
}
