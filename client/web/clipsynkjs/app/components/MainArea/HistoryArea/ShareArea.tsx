// ─────────────────────────────────────────────
//  SHARE AREA
//  Full-width view shown when view === 'share'.
//  Two-column layout: left = doc preview,
//  right = destination panel (380px).
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { HISTORY_CLIPS } from '~/components/MainArea/HistoryArea/HistorySection/Timeline/Timeline';

// ── Type accent colors ────────────────────────
const TYPE_COLOR: Record<string, string> = {
    text:  '#10B981',
    link:  '#10B981',
    image: '#06B6D4',
    code:  '#A855F7',
    file:  '#F472B6',
};

// ── Static service data ───────────────────────
const SERVICES = [
    { name: 'Google Docs', status: 'connected',     highlighted: true  },
    { name: 'Email',       status: 'connected',     highlighted: false },
    { name: 'Notion',      status: 'connected',     highlighted: false },
    { name: 'Slack',       status: 'connected',     highlighted: false },
    { name: 'Discord',     status: 'not connected', highlighted: false },
] as const;

// ── Export format chips ───────────────────────
const FORMATS = ['.md', '.html', '.pdf', '.txt'] as const;
type FormatChip = typeof FORMATS[number];

// ── Props ─────────────────────────────────────
interface ShareAreaProps {
    selectedIds: Set<string>;
    onBack:      () => void;
}

export default function ShareArea({ selectedIds, onBack }: ShareAreaProps) {
    const [activeFormat, setActiveFormat] = useState<FormatChip>('.md');

    useEffect(() => {
        console.log('[ShareArea] mounted, selectedIds:', [...selectedIds]);
    }, []);

    const allClips  = HISTORY_CLIPS.flatMap(g => g.entries.map(e => ({ ...e, time: g.time })));
    const selected  = allClips.filter(c => selectedIds.has(c.id));
    const count     = selected.length;
    const dateLabel = new Date().toISOString().slice(0, 10);

    return (
        <div
            className="flex flex-1 min-h-0 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            {/* ══════════════════════════════════════════
                LEFT COLUMN — editor_preview (fill)
            ══════════════════════════════════════════ */}
            <div
                className="flex flex-col flex-1 overflow-y-auto"
                style={{ padding: 32, gap: 24 }}
            >
                {/* ── Back + Title ── */}
                <div className="flex items-center" style={{ gap: 12 }}>
                    <span
                        className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                        style={{ fontSize: 16, color: '#6B7280' }}
                        onClick={() => {
                            console.log('[ShareArea] back clicked');
                            onBack();
                        }}
                    >
                        ←
                    </span>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 18, color: '#FAFAFA' }}
                    >
                        &gt; share_doc
                    </span>
                </div>

                {/* ── Doc name + clip summary ── */}
                <div className="flex flex-col" style={{ gap: 8 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 22, color: '#FFFFFF' }}
                    >
                        untitled_doc_{dateLabel}
                    </span>
                    <div className="flex items-center" style={{ gap: 16 }}>
                        <span style={{ color: '#10B981', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
                            {count} clips
                        </span>
                        <span style={{ color: '#4B5563', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
                            created: just now
                        </span>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div style={{ height: 1, backgroundColor: '#1A1A1A' }} />

                {/* ── Clip preview blocks ── */}
                <div className="flex flex-col" style={{ gap: 16 }}>
                    {selected.map(entry => {
                        const accentColor = TYPE_COLOR[entry.type] ?? '#9CA3AF';
                        return (
                            <div
                                key={entry.id}
                                className="flex flex-col"
                                style={{
                                    padding:    '10px 14px',
                                    gap:        4,
                                    borderLeft: `2px solid ${accentColor}`,
                                }}
                            >
                                <span
                                    className="font-mono"
                                    style={{ fontSize: 10, color: accentColor }}
                                >
                                    [{entry.type}]
                                </span>
                                <span
                                    style={{
                                        color:        '#9CA3AF',
                                        fontFamily:   'IBM Plex Mono, monospace',
                                        fontSize:     12,
                                        overflow:     'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace:   'nowrap',
                                    }}
                                >
                                    {entry.content}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ══════════════════════════════════════════
                RIGHT COLUMN — share_panel (380px)
            ══════════════════════════════════════════ */}
            <aside
                className="flex flex-col flex-shrink-0 overflow-y-auto"
                style={{
                    width:      380,
                    borderLeft: '1px solid #2A2A2A',
                    padding:    '32px 24px',
                    gap:        24,
                }}
            >
                {/* ── Section 1: send_to header ── */}
                <div className="flex flex-col" style={{ gap: 6 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 16, color: '#FAFAFA' }}
                    >
                        send_to
                    </span>
                    <span style={{ color: '#6B7280', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
                        select a destination to send your compiled doc
                    </span>
                </div>

                {/* ── Section 2: service rows ── */}
                <div className="flex flex-col" style={{ gap: 8 }}>
                    {SERVICES.map(svc => {
                        const isDisconnected = svc.status === 'not connected';
                        const rowStyle: React.CSSProperties = {
                            padding:         '10px 12px',
                            border:          svc.highlighted ? '1px solid #10B981' : '1px solid #2A2A2A',
                            backgroundColor: svc.highlighted ? '#0D3320' : 'transparent',
                            opacity:         isDisconnected ? 0.5 : 1,
                            display:         'flex',
                            alignItems:      'center',
                            justifyContent:  'space-between',
                        };

                        return (
                            <div key={svc.name} style={rowStyle}>
                                {/* Left: name + status */}
                                <div className="flex flex-col" style={{ gap: 2 }}>
                                    <span
                                        className="font-mono"
                                        style={{ fontSize: 12, color: '#FAFAFA' }}
                                    >
                                        {svc.name}
                                    </span>
                                    <span
                                        style={{
                                            fontSize:   10,
                                            fontFamily: 'IBM Plex Mono, monospace',
                                            color:      isDisconnected ? '#6B7280' : '#10B981',
                                        }}
                                    >
                                        {svc.status}
                                    </span>
                                </div>

                                {/* Right: action button */}
                                {svc.highlighted ? (
                                    <button
                                        type="button"
                                        className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                                        onClick={() => {
                                            console.log('[ShareArea] share selection clicked:', svc.name);
                                        }}
                                        style={{
                                            height:          28,
                                            padding:         '0 12px',
                                            fontSize:        11,
                                            color:           '#0A0A0A',
                                            backgroundColor: '#10B981',
                                            border:          'none',
                                        }}
                                    >
                                        send
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                                        onClick={() => {
                                            console.log(`[ShareArea] ${isDisconnected ? 'connect' : 'send'} clicked:`, svc.name);
                                        }}
                                        style={{
                                            height:          28,
                                            padding:         '0 12px',
                                            fontSize:        11,
                                            color:           '#9CA3AF',
                                            backgroundColor: 'transparent',
                                            border:          '1px solid #2A2A2A',
                                        }}
                                    >
                                        {isDisconnected ? 'connect' : 'send'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Section 3: divider ── */}
                <div style={{ height: 1, backgroundColor: '#1A1A1A' }} />

                {/* ── Section 4: export format chips ── */}
                <div className="flex flex-col" style={{ gap: 10 }}>
                    <span
                        className="font-mono"
                        style={{ fontSize: 11, color: '#6B7280' }}
                    >
                        export_as
                    </span>
                    <div className="flex items-center" style={{ gap: 8 }}>
                        {FORMATS.map(fmt => {
                            const isActive = fmt === activeFormat;
                            return (
                                <button
                                    key={fmt}
                                    type="button"
                                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                                    onClick={() => setActiveFormat(fmt)}
                                    style={{
                                        height:          28,
                                        padding:         '0 12px',
                                        fontSize:        11,
                                        color:           isActive ? '#10B981' : '#6B7280',
                                        backgroundColor: isActive ? '#1F1F1F' : 'transparent',
                                        border:          isActive ? '1px solid #10B981' : '1px solid #2A2A2A',
                                    }}
                                >
                                    {fmt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Section 5: copy URL row ── */}
                <div className="flex items-center" style={{ gap: 8 }}>
                    <div
                        className="flex items-center flex-1"
                        style={{
                            height:     36,
                            border:     '1px solid #2A2A2A',
                            padding:    '0 12px',
                            color:      '#4B5563',
                            fontSize:   11,
                            fontFamily: 'IBM Plex Mono, monospace',
                        }}
                    >
                        https://clipsynk.app/share/...
                    </div>
                    <button
                        type="button"
                        className="cursor-pointer font-mono flex-shrink-0 transition-opacity hover:opacity-80"
                        onClick={() => {
                            console.log('[ShareArea] copy URL clicked');
                        }}
                        style={{
                            height:          36,
                            padding:         '0 14px',
                            fontSize:        12,
                            color:           '#9CA3AF',
                            backgroundColor: 'transparent',
                            border:          '1px solid #2A2A2A',
                        }}
                    >
                        copy
                    </button>
                </div>
            </aside>
        </div>
    );
}
