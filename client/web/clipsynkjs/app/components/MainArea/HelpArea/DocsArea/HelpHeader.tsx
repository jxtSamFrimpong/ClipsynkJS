// ─────────────────────────────────────────────
//  HELP HEADER
//  "> help" title + version + search box
// ─────────────────────────────────────────────
export default function HelpHeader() {
    return (
        <div className="flex items-center justify-between w-full">
            {/* Left: title + version */}
            <div className="flex items-center" style={{ gap: 12 }}>
                <span
                    className="font-mono font-bold"
                    style={{ fontSize: 20, color: '#FAFAFA' }}
                >
                    &gt; help
                </span>
                <span
                    style={{
                        fontSize:   12,
                        color:      '#4B5563',
                        fontFamily: 'IBM Plex Mono, monospace',
                    }}
                >
                    v2.4.1
                </span>
            </div>

            {/* Right: search box */}
            <div
                className="flex items-center"
                style={{
                    width:   280,
                    height:  36,
                    border:  '1px solid #2A2A2A',
                    padding: '0 12px',
                    gap:     8,
                }}
            >
                <span style={{ color: '#4B5563', fontSize: 14 }}>⌕</span>
                <span
                    style={{
                        color:      '#4B5563',
                        fontSize:   12,
                        fontFamily: 'IBM Plex Mono, monospace',
                    }}
                >
                    search docs...
                </span>
            </div>
        </div>
    );
}
