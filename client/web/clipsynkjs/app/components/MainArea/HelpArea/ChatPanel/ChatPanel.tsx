// ─────────────────────────────────────────────
//  CHAT PANEL
//  Full chatbot view (400px right column).
//  Shown when chatOpen === true.
//  Replaces FaqPanel entirely.
// ─────────────────────────────────────────────
import { useEffect } from 'react';

const SUGGESTIONS = [
    { label: 'open clipgroups page', active: true  },
    { label: 'tell me about pull to doc', active: false },
    { label: 'pricing plans',        active: false },
];

interface ChatPanelProps {
    onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
    useEffect(() => {
        console.log('[ChatPanel] mounted');
    }, []);

    return (
        <aside
            className="flex flex-col flex-shrink-0 overflow-hidden"
            style={{
                width:      400,
                borderLeft: '2px solid #10B981',
            }}
        >
            {/* ── Chat header ── */}
            <div
                className="flex items-center justify-between flex-shrink-0"
                style={{
                    backgroundColor: '#0D3320',
                    padding:         '16px 20px',
                }}
            >
                {/* Left: icon + name + status dot + online */}
                <div className="flex items-center" style={{ gap: 10 }}>
                    <span style={{ color: '#10B981', fontSize: 18 }}>◈</span>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 14, color: '#10B981' }}
                    >
                        clippy_ai
                    </span>
                    <div
                        style={{
                            width:           7,
                            height:          7,
                            borderRadius:    '50%',
                            backgroundColor: '#10B981',
                        }}
                    />
                    <span
                        style={{
                            fontSize:   10,
                            color:      '#6B7280',
                            fontFamily: 'IBM Plex Mono, monospace',
                        }}
                    >
                        online
                    </span>
                </div>

                {/* Right: action icons (clear, minimize, close) */}
                <div className="flex items-center" style={{ gap: 12 }}>
                    <span
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        style={{ color: '#6B7280', fontSize: 14 }}
                        onClick={() => console.log('[ChatPanel] clear clicked')}
                        title="clear history"
                    >
                        ⊘
                    </span>
                    <span
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        style={{ color: '#6B7280', fontSize: 14 }}
                        onClick={() => console.log('[ChatPanel] minimize clicked')}
                        title="minimize"
                    >
                        —
                    </span>
                    <span
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        style={{ color: '#6B7280', fontSize: 14 }}
                        onClick={() => {
                            console.log('[ChatPanel] close clicked');
                            onClose();
                        }}
                        title="close"
                    >
                        ×
                    </span>
                </div>
            </div>

            {/* ── Messages area ── */}
            <div
                className="flex flex-col flex-1 overflow-y-auto"
                style={{
                    backgroundColor: '#0A0A0A',
                    padding:         20,
                    gap:             16,
                }}
            >
                {/* m1: bot greeting */}
                <div className="flex flex-col" style={{ gap: 4 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 10, color: '#10B981' }}
                    >
                        clippy_ai
                    </span>
                    <div
                        style={{
                            backgroundColor: '#1F1F1F',
                            padding:         '10px 12px',
                        }}
                    >
                        <p
                            style={{
                                color:      '#FAFAFA',
                                fontSize:   12,
                                fontFamily: 'IBM Plex Mono, monospace',
                                lineHeight: 1.6,
                                margin:     0,
                            }}
                        >
                            hey! i&apos;m clippy, your clipsync assistant. ask me anything about
                            setting up sync, managing devices, clipgroups, or sharing docs.
                        </p>
                    </div>
                    <span
                        style={{
                            color:      '#4B5563',
                            fontSize:   9,
                            fontFamily: 'IBM Plex Mono, monospace',
                        }}
                    >
                        2:34 PM
                    </span>
                </div>

                {/* m2: user message */}
                <div className="flex flex-col items-end" style={{ gap: 4 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 10, color: '#9CA3AF' }}
                    >
                        you
                    </span>
                    <div
                        style={{
                            backgroundColor: '#10B981',
                            padding:         '10px 12px',
                            maxWidth:        280,
                        }}
                    >
                        <p
                            style={{
                                color:      '#0A0A0A',
                                fontSize:   12,
                                fontFamily: 'IBM Plex Mono, monospace',
                                lineHeight: 1.5,
                                margin:     0,
                            }}
                        >
                            how do I set up sync between my macbook and phone?
                        </p>
                    </div>
                    <span
                        style={{
                            color:      '#4B5563',
                            fontSize:   9,
                            fontFamily: 'IBM Plex Mono, monospace',
                        }}
                    >
                        2:34 PM
                    </span>
                </div>

                {/* m3: bot reply with steps */}
                <div className="flex flex-col" style={{ gap: 4 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 10, color: '#10B981' }}
                    >
                        clippy_ai
                    </span>
                    <div
                        className="flex flex-col"
                        style={{
                            backgroundColor: '#1F1F1F',
                            padding:         '10px 12px',
                            gap:             10,
                        }}
                    >
                        <p style={{ color: '#FAFAFA', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5, margin: 0 }}>
                            great question! here&apos;s how to get syncing in 3 steps:
                        </p>
                        {[
                            'install clipsync on both devices',
                            'sign in with the same account on both',
                            'they auto-discover if on the same wifi, or sync via cloud relay if not',
                        ].map((step, i) => (
                            <div key={i} className="flex items-center" style={{ gap: 10 }}>
                                <div
                                    className="flex items-center justify-center flex-shrink-0"
                                    style={{ width: 20, height: 20, backgroundColor: '#0D3320' }}
                                >
                                    <span className="font-mono font-bold" style={{ fontSize: 10, color: '#10B981' }}>
                                        {i + 1}
                                    </span>
                                </div>
                                <span style={{ color: '#FAFAFA', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
                                    {step}
                                </span>
                            </div>
                        ))}
                        <p style={{ color: '#9CA3AF', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5, margin: 0 }}>
                            that&apos;s it! copies on one device show up on the other in ~50ms. want
                            me to walk you through encryption setup too?
                        </p>
                    </div>
                    <span style={{ color: '#4B5563', fontSize: 9, fontFamily: 'IBM Plex Mono, monospace' }}>
                        2:34 PM
                    </span>
                </div>

                {/* m4: user */}
                <div className="flex flex-col items-end" style={{ gap: 4 }}>
                    <span className="font-mono font-bold" style={{ fontSize: 10, color: '#9CA3AF' }}>you</span>
                    <div style={{ backgroundColor: '#10B981', padding: '10px 12px', maxWidth: 280 }}>
                        <p style={{ color: '#0A0A0A', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5, margin: 0 }}>
                            yes! and how do I create a clipgroup for my team?
                        </p>
                    </div>
                    <span style={{ color: '#4B5563', fontSize: 9, fontFamily: 'IBM Plex Mono, monospace' }}>2:35 PM</span>
                </div>

                {/* m5: bot reply with code block + tip */}
                <div className="flex flex-col" style={{ gap: 4 }}>
                    <span className="font-mono font-bold" style={{ fontSize: 10, color: '#10B981' }}>clippy_ai</span>
                    <div
                        className="flex flex-col"
                        style={{ backgroundColor: '#1F1F1F', padding: '10px 12px', gap: 10 }}
                    >
                        <p style={{ color: '#FAFAFA', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5, margin: 0 }}>
                            two things! first, for encryption — it&apos;s enabled by default with AES-256. you can rotate your key in:
                        </p>
                        {/* Code block */}
                        <div style={{ backgroundColor: '#111111', padding: '8px 10px' }}>
                            <span className="font-mono" style={{ fontSize: 11, color: '#10B981' }}>
                                profile → sync &amp; connectivity → encryption
                            </span>
                        </div>
                        <p style={{ color: '#FAFAFA', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5, margin: 0 }}>
                            for clipgroups — go to your clipboard page and hit the + next to &apos;clipgroups&apos;. name it, invite team members by email, and you&apos;re set. everyone in the group sees the same clips in real-time.
                        </p>
                        {/* Tip in amber */}
                        <p style={{ color: '#F59E0B', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5, margin: 0 }}>
                            tip: you can set permissions per member — viewer, editor, or admin.
                        </p>
                    </div>
                    <span style={{ color: '#4B5563', fontSize: 9, fontFamily: 'IBM Plex Mono, monospace' }}>2:35 PM</span>
                </div>
            </div>

            {/* ── Suggestions ── */}
            <div
                className="flex items-center flex-wrap flex-shrink-0"
                style={{
                    backgroundColor: '#0A0A0A',
                    padding:         '10px 20px',
                    borderTop:       '1px solid #1A1A1A',
                    gap:             6,
                }}
            >
                <span
                    className="font-mono"
                    style={{ fontSize: 10, color: '#4B5563', marginRight: 2 }}
                >
                    suggested:
                </span>
                {SUGGESTIONS.map(s => (
                    <button
                        key={s.label}
                        type="button"
                        className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                        onClick={() => console.log('[ChatPanel] suggestion clicked:', s.label)}
                        style={{
                            height:          24,
                            padding:         '0 10px',
                            fontSize:        10,
                            color:           s.active ? '#10B981' : '#6B7280',
                            border:          s.active ? '1px solid #10B981' : '1px solid #2A2A2A',
                            backgroundColor: 'transparent',
                        }}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* ── Input bar ── */}
            <div
                className="flex items-center flex-shrink-0"
                style={{
                    backgroundColor: '#0A0A0A',
                    padding:         '12px 20px',
                    borderTop:       '1px solid #2A2A2A',
                    gap:             10,
                }}
            >
                <span style={{ color: '#4B5563', fontSize: 16 }}>◉</span>
                <div
                    className="flex items-center flex-1"
                    style={{
                        height:  36,
                        border:  '1px solid #2A2A2A',
                        padding: '0 12px',
                    }}
                >
                    <span
                        style={{
                            color:      '#4B5563',
                            fontSize:   12,
                            fontFamily: 'IBM Plex Mono, monospace',
                        }}
                    >
                        ask clippy anything...
                    </span>
                </div>
                <button
                    type="button"
                    className="cursor-pointer flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
                    onClick={() => console.log('[ChatPanel] send clicked')}
                    style={{
                        width:           36,
                        height:          36,
                        backgroundColor: '#10B981',
                        border:          'none',
                    }}
                >
                    <span style={{ color: '#0A0A0A', fontSize: 14 }}>→</span>
                </button>
            </div>
        </aside>
    );
}
