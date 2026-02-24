// ─────────────────────────────────────────────
//  FAQ PANEL
//  Right column (360px) of the default help view.
//  Contains: FAQ accordion + support links +
//  compact AI chatbot preview widget.
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';

const FAQ_ITEMS = [
    {
        id:       'fq1',
        question: 'what is a clipgroup?',
        answer:   'a clipgroup is a shared clipboard folder. you can create one for your team, project, or workflow. members see the same clips in real-time.',
        defaultOpen: true,
    },
    { id: 'fq2', question: 'is my data encrypted?',            answer: null, defaultOpen: false },
    { id: 'fq3', question: 'how many devices can I link?',     answer: null, defaultOpen: false },
    { id: 'fq4', question: 'what happens if I go offline?',    answer: null, defaultOpen: false },
    { id: 'fq5', question: 'how do I pull clips into a doc?',  answer: null, defaultOpen: false },
    { id: 'fq6', question: 'can I share clips with non-users?',answer: null, defaultOpen: false },
    { id: 'fq7', question: "what's the free plan limit?",      answer: null, defaultOpen: false },
];

const SUPPORT_LINKS = [
    { icon: '✉', label: 'contact support'       },
    { icon: '⊞', label: 'full documentation'    },
    { icon: '⌥', label: 'github / report a bug'  },
    { icon: '▷', label: 'video tutorials'        },
];

interface FaqPanelProps {
    onOpenChat: () => void;
}

export default function FaqPanel({ onOpenChat }: FaqPanelProps) {
    const [openId, setOpenId] = useState<string>('fq1');

    useEffect(() => {
        console.log('[FaqPanel] mounted');
    }, []);

    function toggleFaq(id: string) {
        setOpenId(prev => (prev === id ? '' : id));
        console.log('[FaqPanel] faq toggled:', id);
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
            {/* ── FAQ header ── */}
            <span
                className="font-mono font-bold"
                style={{ fontSize: 14, color: '#FFFFFF' }}
            >
                // faq
            </span>

            {/* ── FAQ items ── */}
            <div className="flex flex-col">
                {FAQ_ITEMS.map(faq => {
                    const isOpen = openId === faq.id;
                    return (
                        <div
                            key={faq.id}
                            className="flex flex-col"
                            style={{
                                padding:         '12px 0',
                                gap:             8,
                                borderBottom:    '1px solid #2A2A2A',
                            }}
                        >
                            {/* Question row */}
                            <button
                                type="button"
                                className="cursor-pointer flex items-center justify-between w-full"
                                onClick={() => toggleFaq(faq.id)}
                                style={{ background: 'none', border: 'none', padding: 0 }}
                            >
                                <span
                                    className="font-mono"
                                    style={{ fontSize: 12, fontWeight: '500', color: '#FAFAFA', textAlign: 'left' }}
                                >
                                    {faq.question}
                                </span>
                                <span
                                    style={{
                                        fontSize:   14,
                                        color:      isOpen ? '#10B981' : '#4B5563',
                                        flexShrink: 0,
                                        marginLeft: 8,
                                        transition: 'transform 0.15s',
                                        display:    'inline-block',
                                        transform:  isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    }}
                                >
                                    &#8964;
                                </span>
                            </button>

                            {/* Answer — only for open item with content */}
                            {isOpen && faq.answer && (
                                <p
                                    style={{
                                        color:      '#6B7280',
                                        fontSize:   11,
                                        fontFamily: 'IBM Plex Mono, monospace',
                                        lineHeight: 1.6,
                                        margin:     0,
                                    }}
                                >
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── Divider ── */}
            <div style={{ height: 1, backgroundColor: '#1A1A1A' }} />

            {/* ── Support links ── */}
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
                            className="cursor-pointer flex items-center w-full transition-opacity hover:opacity-80"
                            onClick={() => console.log('[FaqPanel] support link clicked:', link.label)}
                            style={{
                                gap:             10,
                                padding:         '8px 10px',
                                border:          '1px solid #2A2A2A',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <span style={{ fontSize: 14, color: '#6B7280', width: 14, flexShrink: 0 }}>
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

            {/* ── Compact AI chatbot widget ── */}
            <div
                className="flex flex-col"
                style={{ border: '1px solid #10B981' }}
            >
                {/* Widget header */}
                <div
                    className="flex items-center"
                    style={{
                        gap:             10,
                        padding:         '10px 14px',
                        backgroundColor: '#0D3320',
                    }}
                >
                    <span style={{ fontSize: 16, color: '#10B981' }}>&#9874;</span>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 12, color: '#10B981' }}
                    >
                        clippy_ai
                    </span>
                    <span
                        style={{
                            width:           6,
                            height:          6,
                            borderRadius:    '50%',
                            backgroundColor: '#10B981',
                            flexShrink:      0,
                        }}
                    />
                </div>

                {/* Bot message bubble */}
                <div
                    className="flex flex-col"
                    style={{ padding: '12px 14px', backgroundColor: '#0A0A0A', gap: 10 }}
                >
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
                                    fontSize:   12,
                                    fontFamily: 'IBM Plex Mono, monospace',
                                    lineHeight: 1.5,
                                    margin:     0,
                                }}
                            >
                                hey! i&apos;m clippy. ask me anything about clipsync.
                            </p>
                        </div>
                    </div>

                    {/* Quick action chips */}
                    <div className="flex flex-col" style={{ gap: 6 }}>
                        {['how do I add a device?', 'what are clipgroups?', 'pricing & plans'].map(qa => (
                            <button
                                key={qa}
                                type="button"
                                className="cursor-pointer font-mono flex items-center justify-center transition-opacity hover:opacity-80"
                                onClick={() => {
                                    console.log('[FaqPanel] quick action clicked:', qa);
                                    onOpenChat();
                                }}
                                style={{
                                    height:          24,
                                    padding:         '0 8px',
                                    fontSize:        10,
                                    color:           '#9CA3AF',
                                    border:          '1px solid #2A2A2A',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                {qa}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat input bar */}
                <div
                    className="flex items-center"
                    style={{
                        gap:         8,
                        padding:     '8px 14px',
                        borderTop:   '1px solid #2A2A2A',
                        backgroundColor: '#0A0A0A',
                    }}
                >
                    <span style={{ fontSize: 14, color: '#4B5563', flexShrink: 0 }}>&#9997;</span>
                    <span
                        style={{ color: '#4B5563', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', flex: 1 }}
                    >
                        ask clippy anything...
                    </span>
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                            console.log('[FaqPanel] open chat clicked');
                            onOpenChat();
                        }}
                        style={{
                            fontSize:        14,
                            color:           '#10B981',
                            background:      'none',
                            border:          'none',
                            padding:         0,
                            cursor:          'pointer',
                        }}
                    >
                        &#10148;
                    </button>
                </div>
            </div>
        </aside>
    );
}
