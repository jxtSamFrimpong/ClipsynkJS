// ─────────────────────────────────────────────
//  GETTING STARTED CONTENT
//  Step-by-step guide + keyboard shortcuts grid.
//  Shown when "getting started" topic is active.
// ─────────────────────────────────────────────

const STEPS = [
    {
        num:   1,
        title: 'install clipsync on your devices',
        desc:  'download the native app for macOS, Windows, Linux, iOS, or Android. all platforms support real-time sync.',
        active: true,
    },
    {
        num:   2,
        title: 'sign in and link your devices',
        desc:  "use your account to sign in on each device. they'll auto-discover each other on the same network, or sync via cloud relay.",
        active: false,
    },
    {
        num:   3,
        title: 'copy anything, sync everywhere',
        desc:  'copy text, images, code, or files on any device. it instantly appears on all linked devices. organize with clipgroups for team workflows.',
        active: false,
    },
    {
        num:   4,
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

export default function GettingStartedContent() {
    return (
        <div className="flex flex-col overflow-y-auto flex-1" style={{ gap: 24 }}>
            {/* ── Section header ── */}
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
                    welcome to clipsync. here&apos;s everything you need to start syncing your
                    clipboard across all your devices in under 2 minutes.
                </p>
            </div>

            {/* ── Steps ── */}
            <div className="flex flex-col" style={{ gap: 12 }}>
                {STEPS.map(step => (
                    <div
                        key={step.num}
                        className="flex items-center"
                        style={{
                            padding:    '16px 20px',
                            gap:        16,
                            borderLeft: step.active
                                ? '2px solid #10B981'
                                : '2px solid #2A2A2A',
                        }}
                    >
                        {/* Number circle */}
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
                                style={{
                                    fontSize: 13,
                                    color:    step.active ? '#10B981' : '#9CA3AF',
                                }}
                            >
                                {step.num}
                            </span>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col" style={{ gap: 4 }}>
                            <span
                                className="font-mono"
                                style={{ fontSize: 13, color: '#FAFAFA', fontWeight: '500' }}
                            >
                                {step.title}
                            </span>
                            <span
                                style={{
                                    color:      '#6B7280',
                                    fontSize:   12,
                                    fontFamily: 'IBM Plex Mono, monospace',
                                    lineHeight: 1.5,
                                }}
                            >
                                {step.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Keyboard shortcuts ── */}
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
                                border:  '1px solid #2A2A2A',
                                padding: '10px 14px',
                                gap:     6,
                            }}
                        >
                            <span
                                className="font-mono font-bold"
                                style={{ fontSize: 13, color: '#10B981' }}
                            >
                                {sc.key}
                            </span>
                            <span
                                style={{
                                    color:      '#6B7280',
                                    fontSize:   11,
                                    fontFamily: 'IBM Plex Mono, monospace',
                                }}
                            >
                                {sc.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
