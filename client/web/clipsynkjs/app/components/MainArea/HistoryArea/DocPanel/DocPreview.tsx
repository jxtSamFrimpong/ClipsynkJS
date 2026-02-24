// ─────────────────────────────────────────────
//  DOC PREVIEW
//  Shows a virtual assembled document with
//  the currently pulled clips. Static data only.
// ─────────────────────────────────────────────
const PULLED_CLIPS = [
    {
        tag:     '# clip_1 [text] — 09:42',
        content: "const syncEngine = new ClipSyncEngine({ interval: 'realtime'...",
    },
    {
        tag:     '# clip_2 [link] — 09:42',
        content: 'https://docs.clipsync.dev/api/v2/realtime-sync',
    },
];

export default function DocPreview() {
    function handleNewDoc() {
        console.log('[DocPreview] new doc clicked');
    }

    return (
        <div className="flex flex-col" style={{ gap: 10 }}>
            {/* Section header row */}
            <div className="flex items-center justify-between">
                <span
                    className="font-mono font-semibold"
                    style={{ fontSize: 13, color: '#FFFFFF' }}
                >
                    // doc_builder
                </span>
                <button
                    type="button"
                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                    onClick={handleNewDoc}
                    style={{ fontSize: 11, color: '#10B981', background: 'transparent', border: 'none' }}
                >
                    + new doc
                </button>
            </div>

            {/* Doc preview box */}
            <div
                className="flex flex-col"
                style={{
                    backgroundColor: '#111111',
                    border:          '1px solid #2A2A2A',
                    padding:         16,
                    gap:             12,
                }}
            >
                {/* Filename row */}
                <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="font-mono" style={{ fontSize: 12, color: '#10B981' }}>
                        [~]
                    </span>
                    <span className="font-mono" style={{ fontSize: 12, color: '#FAFAFA' }}>
                        untitled_doc.md
                    </span>
                </div>

                {/* Separator */}
                <div style={{ height: 1, backgroundColor: '#2A2A2A' }} />

                {/* Pulled clip entries */}
                {PULLED_CLIPS.map((clip, index) => (
                    <div
                        key={index}
                        className="flex flex-col"
                        style={{
                            border:  '1px solid #1A1A1A',
                            padding: '8px 10px',
                            gap:     4,
                        }}
                    >
                        <span
                            className="font-mono"
                            style={{ fontSize: 10, color: '#4B5563' }}
                        >
                            {clip.tag}
                        </span>
                        <span
                            style={{
                                fontSize:   11,
                                color:      '#9CA3AF',
                                fontFamily: 'IBM Plex Mono, monospace',
                                lineHeight: 1.4,
                                wordBreak:  'break-all',
                            }}
                        >
                            {clip.content}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
