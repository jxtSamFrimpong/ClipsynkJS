// ─────────────────────────────────────────────
//  RECENT DOCS
//  List of recently assembled documents.
//  Static data only — click logs the doc name.
// ─────────────────────────────────────────────
const RECENT_DOCS = [
    { name: 'api_research_notes.md', clips: 5  },
    { name: 'design_refs_feb.md',    clips: 12 },
];

export default function RecentDocs() {
    function handleDocClick(name: string) {
        console.log('[RecentDocs] doc clicked:', name);
    }

    return (
        <div className="flex flex-col" style={{ gap: 8 }}>
            {/* Section header */}
            <span
                className="font-mono font-semibold"
                style={{ fontSize: 12, color: '#FFFFFF' }}
            >
                // recent_docs
            </span>

            {/* Doc rows */}
            <div className="flex flex-col" style={{ gap: 4 }}>
                {RECENT_DOCS.map((doc) => (
                    <div
                        key={doc.name}
                        className="cursor-pointer flex items-center transition-opacity hover:opacity-80"
                        style={{
                            border:  '1px solid #2A2A2A',
                            padding: '8px 10px',
                            gap:     8,
                        }}
                        onClick={() => handleDocClick(doc.name)}
                    >
                        <span
                            className="font-mono flex-shrink-0"
                            style={{ fontSize: 11, color: '#6B7280' }}
                        >
                            [~]
                        </span>
                        <span
                            className="font-mono truncate"
                            style={{ fontSize: 11, color: '#FAFAFA' }}
                        >
                            {doc.name}
                        </span>
                        {/* Spacer */}
                        <div className="flex-1" />
                        <span
                            style={{
                                fontSize:   10,
                                color:      '#4B5563',
                                fontFamily: 'IBM Plex Mono, monospace',
                                flexShrink: 0,
                            }}
                        >
                            {doc.clips} clips
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
