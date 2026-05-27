// ─────────────────────────────────────────────
//  CLIPBOARD UTILS
//  Helpers for mapping API ClipboardEventResponse
//  to the frontend ClipData shape.
// ─────────────────────────────────────────────

import type { ClipboardEventResponse } from '~/types/clipboard';
import type { ClipData } from '~/components/MainArea/ClipsArea/ClipsList/ClipItem';

export function mimeTypeToColor(mimeType: string): string {
    if (mimeType.startsWith('text/')) return '#10B981';
    if (mimeType.startsWith('image/')) return '#06B6D4';
    if (mimeType.startsWith('video/')) return '#F472B6';
    return '#A855F7';
}

export function mimeTypeToBadge(mimeType: string, metadata?: ClipboardEventResponse['metadata']): string {
    if (metadata?.badge) return metadata.badge;
    if (mimeType.startsWith('text/')) return '[text]';
    if (mimeType.startsWith('image/')) return '[image]';
    if (mimeType.startsWith('video/')) return '[video]';
    return '[file]';
}

export function toClipData(clip: ClipboardEventResponse): Omit<ClipData, 'isLast'> {
    const badge = mimeTypeToBadge(clip.mimeType, clip.metadata);
    const title = clip.content ?? clip.fileName ?? clip.id;
    const meta = `${clip.sourceUserId} ~ ${clip.deviceFingerprint} · ${new Date(clip.createdAt).toLocaleTimeString()}`;
    return {
        id: clip.id,
        title,
        meta,
        badge,
        color: mimeTypeToColor(clip.mimeType),
    };
}
