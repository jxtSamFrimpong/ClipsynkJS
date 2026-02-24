// ─────────────────────────────────────────────
//  TIMELINE
//  Vertically scrollable list of time-grouped
//  clipboard entries.
// ─────────────────────────────────────────────
import TimeGroup from './TimeGroup';
import type { TimeGroupData } from './TimeGroup';

export const HISTORY_CLIPS: TimeGroupData[] = [
    {
        time: '09:42',
        entries: [
            {
                id:      'e1',
                type:    'text',
                device:  'macbook_pro',
                content: "const syncEngine = new ClipSyncEngine({ interval: 'realtime', encryption: 'e2e' });",
            },
            {
                id:      'e2',
                type:    'link',
                device:  'macbook_pro',
                content: 'https://docs.clipsync.dev/api/v2/realtime-sync',
            },
        ],
    },
    {
        time: '08:17',
        entries: [
            {
                id:      'e3',
                type:    'image',
                device:  'iphone_14',
                content: 'screenshot_2026-02-22_081702.png (2.4MB)',
            },
            {
                id:      'e4',
                type:    'text',
                device:  'macbook_pro',
                content: 'meeting notes: Q1 sync architecture review — decided on WebSocket for realtime, fallback to SSE',
            },
        ],
    },
    {
        time: '07:03',
        entries: [
            {
                id:      'e5',
                type:    'file',
                device:  'macbook_pro',
                content: 'sync_config_backup.json (18KB)',
            },
            {
                id:      'e6',
                type:    'code',
                device:  'macbook_pro',
                content: 'export async function pullClips(ids: string[]): Promise<Document>',
            },
        ],
    },
];

interface TimelineProps {
    selectedIds: Set<string>;
    anySelected: boolean;
    onToggle:    (id: string) => void;
}

export default function Timeline({ selectedIds, anySelected, onToggle }: TimelineProps) {
    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            {HISTORY_CLIPS.map((group) => (
                <TimeGroup
                    key={group.time}
                    group={group}
                    selectedIds={selectedIds}
                    anySelected={anySelected}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}
