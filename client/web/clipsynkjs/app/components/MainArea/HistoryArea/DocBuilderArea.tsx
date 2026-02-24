// ─────────────────────────────────────────────
//  DOC BUILDER AREA
//  Full-width view shown when view === 'doc_builder'.
//  Replaces the two-column layout entirely.
//  Renders selected clips as editable doc blocks.
// ─────────────────────────────────────────────
import { useEffect } from 'react';
import { HISTORY_CLIPS } from '~/components/MainArea/HistoryArea/HistorySection/Timeline/Timeline';

const TYPE_BADGE_COLORS: Record<string, string> = {
    text:  '#10B981',
    link:  '#10B981',
    image: '#06B6D4',
    code:  '#A855F7',
    file:  '#F472B6',
};

// Left border color per clip type (2px accent on each block)
const TYPE_BORDER_COLORS: Record<string, string> = {
    text:  '#10B981',
    link:  '#10B981',
    image: '#06B6D4',
    code:  '#A855F7',
    file:  '#F472B6',
};

interface DocBuilderAreaProps {
    selectedIds: Set<string>;
    onBack:      () => void;
    onShare:     () => void;
}

export default function DocBuilderArea({ selectedIds, onBack, onShare }: DocBuilderAreaProps) {
    useEffect(() => {
        console.log('[DocBuilderArea] mounted, selectedIds:', [...selectedIds]);
    }, []);

    const allClips  = HISTORY_CLIPS.flatMap(g => g.entries.map(e => ({ ...e, time: g.time })));
    const selected  = allClips.filter(c => selectedIds.has(c.id));
    const count     = selected.length;
    const dateLabel = new Date().toISOString().slice(0, 10).replace(/-/g, '-');

    return (
        <div
            className="flex flex-col flex-1 min-h-0 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            {/* Scrollable inner content */}
            <div
                className="flex flex-col flex-1 overflow-y-auto"
                style={{ padding: 32, gap: 24 }}
            >
                {/* ── Header ── */}
                <div className="flex items-center justify-between w-full">
                    {/* Left: back + title */}
                    <div className="flex items-center" style={{ gap: 12 }}>
                        <span
                            className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                            style={{ fontSize: 16, color: '#6B7280' }}
                            onClick={() => {
                                console.log('[DocBuilderArea] back clicked');
                                onBack();
                            }}
                        >
                            ←
                        </span>
                        <span
                            className="font-mono font-bold"
                            style={{ fontSize: 18, color: '#FAFAFA' }}
                        >
                            &gt; doc_builder
                        </span>
                    </div>

                    {/* Right: toolbar buttons */}
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <button
                            type="button"
                            className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                            onClick={() => console.log('[DocBuilderArea] save draft clicked')}
                            style={{
                                height:          32,
                                padding:         '0 14px',
                                fontSize:        12,
                                color:           '#9CA3AF',
                                border:          '1px solid #2A2A2A',
                                backgroundColor: 'transparent',
                            }}
                        >
                            save draft
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                            onClick={() => console.log('[DocBuilderArea] export clicked')}
                            style={{
                                height:          32,
                                padding:         '0 14px',
                                fontSize:        12,
                                color:           '#9CA3AF',
                                border:          '1px solid #2A2A2A',
                                backgroundColor: 'transparent',
                            }}
                        >
                            export
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer font-mono font-bold transition-opacity hover:opacity-80"
                            onClick={() => { console.log('[DocBuilderArea] share clicked'); onShare(); }}
                            style={{
                                height:          32,
                                padding:         '0 14px',
                                fontSize:        12,
                                color:           '#0A0A0A',
                                backgroundColor: '#10B981',
                                border:          'none',
                            }}
                        >
                            share →
                        </button>
                    </div>
                </div>

                {/* ── Doc metadata ── */}
                <div className="flex flex-col" style={{ gap: 8 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 22, color: '#FFFFFF' }}
                    >
                        untitled_doc_{dateLabel}
                    </span>
                    <div className="flex items-center" style={{ gap: 16 }}>
                        <span
                            style={{ color: '#10B981', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                            {count} clips pulled
                        </span>
                        <span
                            style={{ color: '#4B5563', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                            created: just now
                        </span>
                        <span
                            className="font-mono"
                            style={{ color: '#F59E0B', fontSize: 12 }}
                        >
                            draft
                        </span>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div
                    className="flex items-center flex-shrink-0"
                    style={{
                        gap:    8,
                        border: '1px solid #2A2A2A',
                        padding: '8px 12px',
                    }}
                >
                    {(['B', 'I', '</>', '|', '≡', 'H', '|', '⊟', '⊔'] as const).map((glyph, i) => {
                        const isSeparator = glyph === '|';
                        return (
                            <span
                                key={i}
                                className={isSeparator ? undefined : 'cursor-pointer'}
                                style={{
                                    color:      isSeparator ? '#2A2A2A' : '#6B7280',
                                    fontFamily: 'monospace',
                                    fontSize:   13,
                                }}
                            >
                                {glyph}
                            </span>
                        );
                    })}
                </div>

                {/* ── Doc body: one block per selected clip ── */}
                <div className="flex flex-col flex-1 overflow-y-auto" style={{ gap: 16 }}>
                    {selected.map(entry => {
                        const badgeColor  = TYPE_BADGE_COLORS[entry.type]  ?? '#9CA3AF';
                        const borderColor = TYPE_BORDER_COLORS[entry.type] ?? '#2A2A2A';

                        return (
                            <div
                                key={entry.id}
                                className="flex flex-col"
                                style={{
                                    padding:    '12px 16px',
                                    gap:        6,
                                    borderLeft: `2px solid ${borderColor}`,
                                }}
                            >
                                {/* Label row: [type] + device · time */}
                                <div className="flex items-center" style={{ gap: 8 }}>
                                    <span
                                        className="font-mono"
                                        style={{ fontSize: 10, color: badgeColor }}
                                    >
                                        [{entry.type}]
                                    </span>
                                    <span
                                        style={{
                                            color:      '#4B5563',
                                            fontSize:   10,
                                            fontFamily: 'IBM Plex Mono, monospace',
                                        }}
                                    >
                                        {entry.device} · {entry.time}
                                    </span>
                                </div>

                                {/* Content block — rendered by type */}
                                {entry.type === 'text' && (
                                    <p style={{ color: '#FAFAFA', fontSize: 13, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6, margin: 0 }}>
                                        {entry.content}
                                    </p>
                                )}

                                {entry.type === 'link' && (
                                    <p style={{ color: '#10B981', fontSize: 13, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6, margin: 0, wordBreak: 'break-all' }}>
                                        {entry.content}
                                    </p>
                                )}

                                {entry.type === 'image' && (
                                    <>
                                        <div style={{ backgroundColor: '#1A1A1A', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ color: '#4B5563', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>[image]</span>
                                        </div>
                                        <p style={{ color: '#6B7280', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', margin: 0 }}>{entry.content}</p>
                                    </>
                                )}

                                {entry.type === 'code' && (
                                    <div style={{ backgroundColor: '#111111', padding: 12 }}>
                                        <pre style={{ color: '#10B981', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                            {entry.content}
                                        </pre>
                                    </div>
                                )}

                                {entry.type === 'file' && (
                                    <div style={{ backgroundColor: '#111111', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ color: '#F472B6', fontSize: 14, fontFamily: 'IBM Plex Mono, monospace' }}>[~]</span>
                                        <span style={{ color: '#FAFAFA', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>{entry.content}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
