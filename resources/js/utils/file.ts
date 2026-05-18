import type { IconType } from 'react-icons';

import {
    LuArchive,
    LuBookOpen,
    LuCode,
    LuDatabase,
    LuDisc3,
    LuFile,
    LuFileArchive,
    LuFileAudio2,
    LuFileBadge,
    LuFileCode2,
    LuFileCog,
    LuFileDigit,
    LuFileDown,
    LuFileImage,
    LuFileJson,
    LuFileLock2,
    LuFileScan,
    LuFileSearch,
    LuFileSpreadsheet,
    LuFileStack,
    LuFileSymlink,
    LuFileTerminal,
    LuFileText,
    LuFileVideo2,
    LuFolderArchive,
    LuGlobe,
    LuImage,
    LuLayoutTemplate,
    LuMonitorSmartphone,
    LuMusic4,
    LuPackage,
    LuPresentation,
    LuScrollText,
    LuShieldCheck,
    LuSheet,
    LuTerminal,
    LuVideo,
} from 'react-icons/lu';

export interface FileTypeData {
    color: string;
    baseColor: string;
    icon: IconType;
}

const FILE_TYPES: Record<
    string,
    FileTypeData
> = {
    /**
     * Documents
     */
    pdf: {
        color: 'red.500',
        baseColor: 'red',
        icon: LuFileBadge,
    },

    doc: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuFileText,
    },

    docx: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuFileText,
    },

    txt: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuScrollText,
    },

    rtf: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuFileText,
    },

    odt: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuFileText,
    },

    pages: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuBookOpen,
    },

    /**
     * Spreadsheet
     */
    xls: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuFileSpreadsheet,
    },

    xlsx: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuFileSpreadsheet,
    },

    csv: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuSheet,
    },

    ods: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuSheet,
    },

    /**
     * Presentation
     */
    ppt: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuPresentation,
    },

    pptx: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuPresentation,
    },

    odp: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuPresentation,
    },

    keynote: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuPresentation,
    },

    /**
     * Images
     */
    jpg: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuFileImage,
    },

    jpeg: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuFileImage,
    },

    png: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuImage,
    },

    webp: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuImage,
    },

    svg: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuImage,
    },

    gif: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuImage,
    },

    bmp: {
        color: 'pink.500',
        baseColor: 'pink',
        icon: LuFileImage,
    },

    psd: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuLayoutTemplate,
    },

    ai: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuLayoutTemplate,
    },

    /**
     * Video
     */
    mp4: {
        color: 'purple.500',
        baseColor: 'purple',
        icon: LuVideo,
    },

    mov: {
        color: 'purple.500',
        baseColor: 'purple',
        icon: LuVideo,
    },

    mkv: {
        color: 'purple.500',
        baseColor: 'purple',
        icon: LuFileVideo2,
    },

    avi: {
        color: 'purple.500',
        baseColor: 'purple',
        icon: LuFileVideo2,
    },

    /**
     * Audio
     */
    mp3: {
        color: 'cyan.500',
        baseColor: 'cyan',
        icon: LuMusic4,
    },

    wav: {
        color: 'cyan.500',
        baseColor: 'cyan',
        icon: LuFileAudio2,
    },

    flac: {
        color: 'cyan.500',
        baseColor: 'cyan',
        icon: LuFileAudio2,
    },

    /**
     * Archive
     */
    zip: {
        color: 'yellow.600',
        baseColor: 'yellow',
        icon: LuArchive,
    },

    rar: {
        color: 'yellow.600',
        baseColor: 'yellow',
        icon: LuFolderArchive,
    },

    '7z': {
        color: 'yellow.600',
        baseColor: 'yellow',
        icon: LuFileArchive,
    },

    tar: {
        color: 'yellow.600',
        baseColor: 'yellow',
        icon: LuFileArchive,
    },

    /**
     * Code
     */
    html: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuGlobe,
    },

    css: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuCode,
    },

    js: {
        color: 'yellow.500',
        baseColor: 'yellow',
        icon: LuFileCode2,
    },

    ts: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuFileCode2,
    },

    tsx: {
        color: 'cyan.500',
        baseColor: 'cyan',
        icon: LuCode,
    },

    jsx: {
        color: 'cyan.500',
        baseColor: 'cyan',
        icon: LuCode,
    },

    php: {
        color: 'purple.500',
        baseColor: 'purple',
        icon: LuCode,
    },

    java: {
        color: 'red.500',
        baseColor: 'red',
        icon: LuCode,
    },

    py: {
        color: 'yellow.500',
        baseColor: 'yellow',
        icon: LuCode,
    },

    json: {
        color: 'yellow.500',
        baseColor: 'yellow',
        icon: LuFileJson,
    },

    sql: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuDatabase,
    },

    env: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuFileCog,
    },

    /**
     * Executable
     */
    exe: {
        color: 'red.500',
        baseColor: 'red',
        icon: LuMonitorSmartphone,
    },

    msi: {
        color: 'red.500',
        baseColor: 'red',
        icon: LuPackage,
    },

    apk: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuPackage,
    },

    dmg: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuPackage,
    },

    iso: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuDisc3,
    },

    bat: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuTerminal,
    },

    sh: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuFileTerminal,
    },

    /**
     * Security
     */
    key: {
        color: 'yellow.600',
        baseColor: 'yellow',
        icon: LuFileLock2,
    },

    cer: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuShieldCheck,
    },

    crt: {
        color: 'green.500',
        baseColor: 'green',
        icon: LuShieldCheck,
    },

    /**
     * Misc
     */
    log: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuFileSearch,
    },

    bak: {
        color: 'orange.500',
        baseColor: 'orange',
        icon: LuFileStack,
    },

    dat: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuFileDigit,
    },

    torrent: {
        color: 'purple.500',
        baseColor: 'purple',
        icon: LuFileDown,
    },

    url: {
        color: 'blue.500',
        baseColor: 'blue',
        icon: LuGlobe,
    },

    lnk: {
        color: 'gray.500',
        baseColor: 'gray',
        icon: LuFileSymlink,
    },

    scan: {
        color: 'cyan.500',
        baseColor: 'cyan',
        icon: LuFileScan,
    },
};

const DEFAULT_FILE_TYPE: FileTypeData = {
    color: 'gray.500',
    baseColor: 'gray',
    icon: LuFile,
};

export function getFileData(
    extension?: string | null,
): FileTypeData {
    if (!extension) {
        return DEFAULT_FILE_TYPE;
    }

    return (
        FILE_TYPES[
            extension.toLowerCase()
        ] ?? DEFAULT_FILE_TYPE
    );
}
