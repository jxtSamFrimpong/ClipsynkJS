// ─────────────────────────────────────────────
//  DOCS AREA
//  Left column of the Help page.
//  Contains: header, topic nav tabs, getting
//  started steps, and keyboard shortcuts grid.
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';

type Topic = 'getting started' | 'clipboard' | 'sync & devices' | 'integrations' | 'security';

const TOPICS: Topic[] = ['getting started', 'clipboard', 'sync & devices', 'integrations', 'security'];

const STEPS = [
    {
        num:   '1',
        title: 'install clipsync on your devices',
        desc:  'download the native app for macOS, Windows, Linux, iOS, or Android. all platforms support real-time sync.',
        active: true,
    },
    {
        num:   '2',
        title: 'sign in and link your devices',
        desc:  "use your account to sign in on each device. they'll auto-discover each other on the same network, or sync via cloud relay.",
        active: false,
    },
    {
        num:   '3',
        title: 'copy anything, sync everywhere',
        desc:  'copy text, images, code, or files on any device. it instantly appears on all linked devices. organize with clipgroups for team workflows.',
        active: false,
    },
    {
        num:   '4',
        title: 'pull, share, and integrate',
        desc:  'use history to pull multiple clips into a doc and share to Google Docs, Notion, Slack, email, or export as .md, .html, .pdf.',
        active: false,
    },
];

const SHORTCUTS = [
    { key: '⌘ + C',         desc: 'copy to clipsync'   },
    { key: '⌘ + Shift + V', desc: 'paste from history'  },
    { key: '⌘ + Shift + S', desc: 'sync now'            },
    { key: '⌘ + Shift + G', desc: 'open clipgroups'     },
];

interface DocsAreaProps {
    onOpenChat: () => void;
}

export default function DocsArea({ onOpenChat }: DocsAreaProps) {
    const [activeTopic, setActiveTopic] = useState<Topic>('getting started');

    useEffect(() => {
        console.log('[DocsArea] mounted');
    }, []);

    return (
        <div
            className="flex flex-col flex-1 overflow-y-auto"
            style={{ padding: 32, gap: 28 }}
        >
            {/* ── Header row ── */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center" style={{ gap: 12 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 20, color: '#FAFAFA' }}
                    >
                        &gt; help
                    </span>
                    <span
                        style={{ fontSize: 12, color: '#4B5563', fontFamily: 'IBM Plex Mono, monospace' }}
                    >
                        v2.4.1
                    </span>
                </div>

                {/* Search box (static display) */}
                <div
                    className="flex items-center"
                    style={{
                        width:  280,
                        height: 36,
                        border: '1px solid #2A2A2A',
                        padding: '0 12px',
                        gap: 8,
                    }}
                >
                    <span style={{ color: '#4B5563', fontSize: 14 }}>&#128269;</span>
                    <span style={{ color: '#4B5563', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
                        search docs...
                    </span>
                </div>
            </div>

            {/* ── Topic nav tabs ── */}
            <div className="flex items-center flex-wrap" style={{ gap: 8 }}>
                {TOPICS.map(topic => {
                    const isActive = topic === activeTopic;
                    return (
                        <button
                            key={topic}
                            type="button"
                            className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                            onClick={() => {
                                console.log('[DocsArea] topic tab clicked:', topic);
                                setActiveTopic(topic);
                            }}
                            style={{
                                height:          32,
                                padding:         '0 14px',
                                fontSize:        12,
                                fontWeight:      isActive ? '500' : 'normal',
                                color:           isActive ? '#10B981' : '#6B7280',
                                backgroundColor: isActive ? '#1F1F1F' : 'transparent',
                                border:          isActive ? '1px solid #10B981' : '1px solid #2A2A2A',
                            }}
                        >
                            {topic}
                        </button>
                    );
                })}
            </div>

            {/* ── Content area ── */}
            <div className="flex flex-col overflow-y-auto" style={{ gap: 24 }}>

                {/* Section 1: getting_started intro */}
                <div className="flex flex-col" style={{ gap: 12 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 14, color: '#FFFFFF' }}
                    >
                        // getting_started
                    </span>
                    <p
                        style={{
                            color:      '#9CA3AF',
                            fontSize:   13,
                            fontFamily: 'IBM Plex Mono, monospace',
                            lineHeight: 1.6,
                            margin:     0,
                        }}
                    >
                        welcome to clipsync. here&apos;s everything you need to start syncing your clipboard
                        across all your devices in under 2 minutes.
                    </p>
                </div>

                {/* Section 2: setup steps */}
                <div className="flex flex-col" style={{ gap: 12 }}>
                    {STEPS.map(step => (
                        <div
                            key={step.num}
                            className="flex items-center"
                            style={{
                                gap:        16,
                                padding:    '16px 20px',
                                borderLeft: step.active ? '2px solid #10B981' : '2px solid #2A2A2A',
                            }}
                        >
                            {/* Number badge */}
                            <div
                                className="flex items-center justify-center flex-shrink-0"
                                style={{
                                    width:           28,
                                    height:          28,
                                    backgroundColor: step.active ? '#0D3320' : '#1F1F1F',
                                }}
                            >
                                <span
                                    className="font-mono font-bold"
                                    style={{ fontSize: 13, color: step.active ? '#10B981' : '#9CA3AF' }}
                                >
                                    {step.num}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="flex flex-col" style={{ gap: 4 }}>
                                <span
                                    className="font-mono"
                                    style={{ fontSize: 13, fontWeight: '500', color: '#FAFAFA' }}
                                >
                                    {step.title}
                                </span>
                                <p
                                    style={{
                                        color:      '#6B7280',
                                        fontSize:   12,
                                        fontFamily: 'IBM Plex Mono, monospace',
                                        lineHeight: 1.5,
                                        margin:     0,
                                    }}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 3: keyboard shortcuts */}
                <div className="flex flex-col" style={{ gap: 12 }}>
                    <span
                        className="font-mono font-bold"
                        style={{ fontSize: 14, color: '#FFFFFF' }}
                    >
                        // keyboard_shortcuts
                    </span>
                    <div className="grid grid-cols-2" style={{ gap: 12 }}>
                        {SHORTCUTS.map(sc => (
                            <div
                                key={sc.key}
                                className="flex flex-col"
                                style={{
                                    padding: '10px 14px',
                                    gap:     6,
                                    border:  '1px solid #2A2A2A',
                                }}
                            >
                                <span
                                    className="font-mono font-bold"
                                    style={{ fontSize: 13, color: '#10B981' }}
                                >
                                    {sc.key}
                                </span>
                                <span
                                    style={{ fontSize: 11, color: '#6B7280', fontFamily: 'IBM Plex Mono, monospace' }}
                                >
                                    {sc.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
