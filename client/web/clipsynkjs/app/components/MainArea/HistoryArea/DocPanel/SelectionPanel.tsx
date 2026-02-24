// ─────────────────────────────────────────────
//  SELECTION PANEL
//  Replaces DocPanel when selectedIds.size > 0.
//  Shows the selected clips list + action buttons.
//  Width: 320px, same column position as DocPanel.
// ─────────────────────────────────────────────
import { HISTORY_CLIPS } from '~/components/MainArea/HistoryArea/HistorySection/Timeline/Timeline';

const TYPE_BADGE_COLORS: Record<string, string> = {
    text:  '#10B981',
    link:  '#10B981',
    image: '#06B6D4',
    code:  '#A855F7',
    file:  '#F472B6',
};

interface SelectionPanelProps {
    selectedIds:      Set<string>;
    onPullToDoc:      () => void;
    onClearSelection: () => void;
    onShare:          () => void;
}

export default function SelectionPanel({ selectedIds, onPullToDoc, onClearSelection, onShare }: SelectionPanelProps) {
    // Flatten all groups into a single array, preserving the group time on each entry
    const allClips = HISTORY_CLIPS.flatMap(g => g.entries.map(e => ({ ...e, time: g.time })));
    const selected = allClips.filter(c => selectedIds.has(c.id));
    const count    = selected.length;

    return (
        <aside
            className="flex flex-col overflow-y-auto flex-shrink-0"
            style={{
                width:      320,
                borderLeft: '1px solid #2A2A2A',
                padding:    '32px 24px',
                gap:        24,
            }}
        >
            {/* Section 1: selected clips list */}
            <div className="flex flex-col" style={{ gap: 12 }}>
                <span
                    className="font-mono font-bold"
                    style={{ fontSize: 14, color: '#FAFAFA' }}
                >
                    selected_clips ({count})
                </span>

                {selected.map(clip => {
                    const badgeColor = TYPE_BADGE_COLORS[clip.type] ?? '#9CA3AF';
                    return (
                        <div
                            key={clip.id}
                            className="flex flex-col"
                            style={{
                                border:  '1px solid #2A2A2A',
                                padding: '8px 10px',
                                gap:     2,
                            }}
                        >
                            {/* Tag row: [type] time */}
                            <span
                                className="font-mono"
                                style={{ fontSize: 10, color: badgeColor }}
                            >
                                [{clip.type}] {clip.time}
                            </span>

                            {/* Content — single line, truncated */}
                            <span
                                style={{
                                    color:        '#9CA3AF',
                                    fontFamily:   'IBM Plex Mono, monospace',
                                    fontSize:     11,
                                    overflow:     'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace:   'nowrap',
                                }}
                            >
                                {clip.content}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: '#1A1A1A' }} />

            {/* Section 2: actions */}
            <div className="flex flex-col" style={{ gap: 8 }}>
                <span
                    className="font-mono"
                    style={{ fontSize: 11, color: '#6B7280' }}
                >
                    actions
                </span>

                {/* pull to doc */}
                <button
                    type="button"
                    className="cursor-pointer font-mono font-bold w-full transition-opacity hover:opacity-80"
                    onClick={() => {
                        console.log('[SelectionPanel] pull to doc clicked');
                        onPullToDoc();
                    }}
                    style={{
                        height:          40,
                        fontSize:        13,
                        color:           '#0A0A0A',
                        backgroundColor: '#10B981',
                        border:          'none',
                    }}
                >
                    pull to doc →
                </button>

                {/* share selection */}
                <button
                    type="button"
                    className="cursor-pointer font-mono w-full transition-opacity hover:opacity-80"
                    onClick={() => {
                        console.log('[SelectionPanel] share selection clicked');
                        onShare();
                    }}
                    style={{
                        height:          40,
                        fontSize:        13,
                        color:           '#9CA3AF',
                        border:          '1px solid #2A2A2A',
                        backgroundColor: 'transparent',
                    }}
                >
                    share selection
                </button>

                {/* delete selected */}
                <button
                    type="button"
                    className="cursor-pointer font-mono w-full transition-opacity hover:opacity-80"
                    onClick={() => {
                        console.log('[SelectionPanel] delete selected clicked');
                        onClearSelection();
                    }}
                    style={{
                        height:          40,
                        fontSize:        13,
                        color:           '#EF4444',
                        border:          '1px solid #EF4444',
                        backgroundColor: 'transparent',
                    }}
                >
                    delete selected
                </button>
            </div>
        </aside>
    );
}
