// ─────────────────────────────────────────────
//  FAQ PANEL
//  Right column (360px) of the Help page.
//  Contains: FAQ accordion, support links,
//  spacer, and mini ai_chatbot widget.
// ─────────────────────────────────────────────
import { useState } from 'react';

const FAQS = [
    {
        q: 'what is a clipgroup?',
        a: 'a clipgroup is a shared clipboard folder. you can create one for your team, project, or workflow. members see the same clips in real-time.',
    },
    { q: 'is my data encrypted?',              a: null },
    { q: 'how many devices can I link?',       a: null },
    { q: 'what happens if I go offline?',      a: null },
    { q: 'how do I pull clips into a doc?',    a: null },
    { q: 'can I share clips with non-users?',  a: null },
    { q: "what's the free plan limit?",        a: null },
];

const SUPPORT_LINKS = [
    { icon: '✉',  label: 'contact support'     },
    { icon: '☰',  label: 'full documentation'  },
    { icon: '↗',  label: 'github / report a bug' },
    { icon: '▶',  label: 'video tutorials'     },
];

const QUICK_ACTIONS = ['setup guide', 'clipgroups', 'pricing'];

interface FaqPanelProps {
    onOpenChat: () => void;
}

export default function FaqPanel({ onOpenChat }: FaqPanelProps) {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    function toggleFaq(idx: number) {
        console.log('[FaqPanel] toggle FAQ:', idx, '→', openIdx === idx ? 'close' : 'open');
        setOpenIdx(prev => (prev === idx ? null : idx));
    }

    return (
        <aside
            className="flex flex-col flex-shrink-0 overflow-y-auto"
            style={{
                width:      360,
                borderLeft: '1px solid #2A2A2A',
                padding:    '32px 24px',
                gap:        20,
            }}
        >
            {/* ── FAQ title ── */}
            <span
                className="font-mono font-bold"
                style={{ fontSize: 14, color: '#FFFFFF' }}
            >
                // faq
            </span>

            {/* ── FAQ items ── */}
            <div className="flex flex-col">
                {FAQS.map((faq, idx) => {
                    const isOpen = openIdx === idx;
                    return (
                        <div
                            key={idx}
                            className="flex flex-col"
                            style={{
                                padding:       '12px 0',
                                borderBottom:  '1px solid #2A2A2A',
                                gap:           8,
                            }}
                        >
                            {/* Question row */}
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFaq(idx)}
                            >
                                <span
                                    className="font-mono"
                                    style={{ fontSize: 12, color: '#FAFAFA', fontWeight: '500' }}
                                >
                                    {faq.q}
                                </span>
                                <span
                                    style={{
                                        fontSize: 12,
                                        color:    isOpen ? '#10B981' : '#4B5563',
                                        flexShrink: 0,
                                        marginLeft: 8,
                                    }}
                                >
                                    {isOpen ? '▼' : '▶'}
                                </span>
                            </div>

                            {/* Answer — only shown when open and answer exists */}
                            {isOpen && faq.a && (
                                <p
                                    style={{
                                        color:      '#6B7280',
                                        fontSize:   11,
                                        fontFamily: 'IBM Plex Mono, monospace',
                                        lineHeight: 1.6,
                                        margin:     0,
                                    }}
                                >
                                    {faq.a}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── Divider ── */}
            <div style={{ height: 1, backgroundColor: '#1A1A1A', flexShrink: 0 }} />

            {/* ── Need more help? ── */}
            <div className="flex flex-col" style={{ gap: 10 }}>
                <span
                    className="font-mono font-bold"
                    style={{ fontSize: 12, color: '#FFFFFF' }}
                >
                    // need_more_help?
                </span>
                <div className="flex flex-col" style={{ gap: 8 }}>
                    {SUPPORT_LINKS.map(link => (
                        <button
                            key={link.label}
                            type="button"
                            className="cursor-pointer flex items-center transition-opacity hover:opacity-80"
                            onClick={() => console.log('[FaqPanel] support link clicked:', link.label)}
                            style={{
                                border:          '1px solid #2A2A2A',
                                padding:         '8px 10px',
                                gap:             10,
                                backgroundColor: 'transparent',
                            }}
                        >
                            <span style={{ color: '#6B7280', fontSize: 14, width: 14 }}>
                                {link.icon}
                            </span>
                            <span
                                className="font-mono"
                                style={{ fontSize: 11, color: '#9CA3AF' }}
                            >
                                {link.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Spacer ── */}
            <div className="flex-1" />

            {/* ── Mini ai_chatbot widget ── */}
            <div
                className="flex flex-col"
                style={{ border: '1px solid #10B981' }}
            >
                {/* Chat header — clicking opens full chat */}
                <div
                    className="flex items-center cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => {
                        console.log('[FaqPanel] chatbot header clicked, opening chat');
                        onOpenChat();
                    }}
                    style={{
                        backgroundColor: '#0D3320',
                        padding:         '10px 14px',
                        gap:             10,
                    }}
                >
                    <span style={{ color: '#10B981', fontSize: 14 }}>◈</span>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 12, color: '#10B981' }}
                    >
                        clippy_ai
                    </span>
                    <div
                        style={{
                            width:           6,
                            height:          6,
                            borderRadius:    '50%',
                            backgroundColor: '#10B981',
                        }}
                    />
                </div>

                {/* Chat body */}
                <div
                    className="flex flex-col"
                    style={{
                        backgroundColor: '#0A0A0A',
                        padding:         '12px 14px',
                        gap:             10,
                    }}
                >
                    {/* Bot message */}
                    <div className="flex flex-col" style={{ gap: 4 }}>
                        <span
                            className="font-mono font-bold"
                            style={{ fontSize: 9, color: '#10B981' }}
                        >
                            clippy_ai
                        </span>
                        <div style={{ backgroundColor: '#1F1F1F', padding: '8px 10px' }}>
                            <p
                                style={{
                                    color:      '#FAFAFA',
                                    fontSize:   11,
                                    fontFamily: 'IBM Plex Mono, monospace',
                                    lineHeight: 1.5,
                                    margin:     0,
                                }}
                            >
                                hey! i&apos;m clippy, your clipsync assistant. ask me anything
                                — how to set up sync, manage devices, use clipgroups, or pull
                                clips into docs.
                            </p>
                        </div>
                    </div>

                    {/* Quick action chips */}
                    <div className="flex items-center flex-wrap" style={{ gap: 6 }}>
                        {QUICK_ACTIONS.map(action => (
                            <button
                                key={action}
                                type="button"
                                className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                                onClick={() => {
                                    console.log('[FaqPanel] quick action clicked:', action);
                                    onOpenChat();
                                }}
                                style={{
                                    height:          24,
                                    padding:         '0 8px',
                                    fontSize:        9,
                                    color:           '#6B7280',
                                    border:          '1px solid #2A2A2A',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat input row */}
                <div
                    className="flex items-center"
                    style={{
                        borderTop:       '1px solid #2A2A2A',
                        padding:         '8px 14px',
                        gap:             8,
                    }}
                >
                    <span style={{ color: '#4B5563', fontSize: 12 }}>◉</span>
                    <span
                        className="flex-1"
                        style={{
                            color:      '#4B5563',
                            fontSize:   11,
                            fontFamily: 'IBM Plex Mono, monospace',
                        }}
                    >
                        ask clippy anything...
                    </span>
                    <span
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        style={{ color: '#10B981', fontSize: 14 }}
                        onClick={() => {
                            console.log('[FaqPanel] chatbot send clicked, opening chat');
                            onOpenChat();
                        }}
                    >
                        →
                    </span>
                </div>
            </div>
        </aside>
    );
}
