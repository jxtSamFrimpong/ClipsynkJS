// ─────────────────────────────────────────────
//  CLIP ENTRY
//  Single clipboard entry row in the timeline.
//  Selected: green left border + #1F1F1F bg + filled checkbox.
//  Unselected: transparent bg + empty checkbox.
//  Dimmed: other entries selected but not this one —
//          muted text + gray checkbox border.
// ─────────────────────────────────────────────
export interface ClipEntryData {
    id:      string;
    type:    'text' | 'link' | 'image' | 'code' | 'file';
    device:  string;
    content: string;
}

const TYPE_BADGE_COLOR: Record<ClipEntryData['type'], string> = {
    text:  '#10B981',
    link:  '#10B981',
    image: '#06B6D4',
    code:  '#A855F7',
    file:  '#F472B6',
};

interface ClipEntryProps {
    entry:    ClipEntryData;
    selected: boolean;
    dimmed:   boolean;
    onToggle: (id: string) => void;
}

export default function ClipEntry({ entry, selected, dimmed, onToggle }: ClipEntryProps) {
    const badgeColor = TYPE_BADGE_COLOR[entry.type];

    return (
        <div
            className="cursor-pointer flex items-start gap-3 transition-opacity hover:opacity-90"
            style={{
                padding:         '10px 16px',
                backgroundColor: selected ? '#1F1F1F' : 'transparent',
                borderLeft:      selected ? '2px solid #10B981' : '2px solid transparent',
            }}
            onClick={() => {
                console.log(`[ClipEntry] toggled: ${entry.id}, was selected: ${selected}`);
                onToggle(entry.id);
            }}
        >
            {/* 14×14 checkbox */}
            <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                    width:           14,
                    height:          14,
                    marginTop:       2,
                    // Dimmed: gray border instead of default #2A2A2A
                    border:          selected ? 'none' : `1px solid ${dimmed ? '#4B5563' : '#2A2A2A'}`,
                    backgroundColor: selected ? '#10B981' : 'transparent',
                }}
            >
                {selected && (
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 9, color: '#0A0A0A', lineHeight: 1 }}
                    >
                        ✓
                    </span>
                )}
            </div>

            {/* Entry body */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
                {/* Top row: type badge + device name */}
                <div className="flex items-center justify-between gap-2">
                    <span
                        className="font-mono"
                        style={{ fontSize: 10, color: badgeColor, flexShrink: 0 }}
                    >
                        [{entry.type}]
                    </span>
                    <span
                        className="font-mono truncate"
                        style={{ fontSize: 10, color: '#4B5563' }}
                    >
                        {entry.device}
                    </span>
                </div>

                {/* Content text — dimmed entries use muted gray */}
                <span
                    style={{
                        fontSize:    12,
                        color:       dimmed ? '#9CA3AF' : '#FAFAFA',
                        fontFamily:  'IBM Plex Mono, monospace',
                        lineHeight:  1.4,
                        wordBreak:   'break-all',
                    }}
                >
                    {entry.content}
                </span>
            </div>
        </div>
    );
}
