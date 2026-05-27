// ─────────────────────────────────────────────
//  CLIPBOARD API TYPES
//  Mirrors the backend ClipboardEvent entity
//  shape returned by GET /clipboard
// ─────────────────────────────────────────────

export type StorageStrategy = 'text' | 'binary_inline' | 'binary_s3';

export interface ClipboardEventResponse {
    id: string;
    generatedAt: string;
    deviceFingerprint: string;
    createdAt: string;
    clientTimestamp: number;
    clipboardgroup: string;
    mimeType: string;
    contentHash: string;
    storageStrategy: StorageStrategy;
    content: string | null;
    contentSize: number;
    s3Url: string | null;
    fileName: string | null;
    fileExtension: string | null;
    metadata: {
        badge?: string;
        host?: string;
        app?: string;
        width?: number;
        height?: number;
        format?: string;
        duration?: number;
        codec?: string;
        [key: string]: unknown;
    };
    vectorClock: Record<string, number>;
    sequenceNumber: number;
    signature: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    sourceUserId: string;
}

export interface PaginatedClipboardResponse {
    data: ClipboardEventResponse[];
    total: number;
}
