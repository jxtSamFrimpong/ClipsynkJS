// ─────────────────────────────────────────────
//  DATE NAV
//  Date navigation row: prev/next day chevrons,
//  current date label, jump-to-date link.
//  Right side: selection count + pull-to-doc CTA
//  (only rendered when selectedCount > 0).
// ─────────────────────────────────────────────
interface DateNavProps {
    selectedCount: number;
}

export default function DateNav({ selectedCount }: DateNavProps) {
    function handlePrev() {
        console.log('[DateNav] previous day clicked');
    }

    function handleNext() {
        console.log('[DateNav] next day clicked');
    }

    function handleJumpToDate() {
        console.log('[DateNav] jump to date clicked');
    }

    function handlePullToDoc() {
        console.log('[DateNav] pull to doc clicked, selectedCount:', selectedCount);
    }

    return (
        <div className="flex items-center justify-between w-full">
            {/* Left: date navigation controls */}
            <div className="flex items-center" style={{ gap: 12 }}>
                {/* Previous chevron */}
                <button
                    type="button"
                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                    onClick={handlePrev}
                    style={{ fontSize: 14, color: '#6B7280', background: 'transparent', border: 'none' }}
                >
                    ‹
                </button>

                {/* Current date */}
                <span
                    className="font-mono font-medium"
                    style={{ fontSize: 13, color: '#FAFAFA' }}
                >
                    feb 22, 2026
                </span>

                {/* Next chevron */}
                <button
                    type="button"
                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                    onClick={handleNext}
                    style={{ fontSize: 14, color: '#6B7280', background: 'transparent', border: 'none' }}
                >
                    ›
                </button>

                {/* Separator */}
                <div style={{ width: 1, height: 14, backgroundColor: '#2A2A2A' }} />

                {/* Jump to date */}
                <button
                    type="button"
                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                    onClick={handleJumpToDate}
                    style={{ fontSize: 11, color: '#10B981', background: 'transparent', border: 'none' }}
                >
                    jump to date
                </button>
            </div>

            {/* Right: selection info (only when something is selected) */}
            {selectedCount > 0 && (
                <div className="flex items-center" style={{ gap: 12 }}>
                    <span
                        className="font-mono"
                        style={{ fontSize: 11, color: '#10B981' }}
                    >
                        {selectedCount} selected
                    </span>

                    <button
                        type="button"
                        className="cursor-pointer font-mono font-semibold transition-opacity hover:opacity-80"
                        onClick={handlePullToDoc}
                        style={{
                            height:          30,
                            padding:         '0 12px',
                            fontSize:        11,
                            color:           '#0A0A0A',
                            backgroundColor: '#10B981',
                            border:          'none',
                        }}
                    >
                        ⊞ pull to doc
                    </button>
                </div>
            )}
        </div>
    );
}
