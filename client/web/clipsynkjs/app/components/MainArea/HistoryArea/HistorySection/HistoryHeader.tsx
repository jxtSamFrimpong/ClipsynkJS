// ─────────────────────────────────────────────
//  HISTORY HEADER
//  Page-level header: "> history" title on the
//  left, export and clear-all actions on the right.
//  When hasSelection is true, the "clear all" button
//  is hidden — the BatchBar owns that action instead.
// ─────────────────────────────────────────────
interface HistoryHeaderProps {
    hasSelection: boolean;
}

export default function HistoryHeader({ hasSelection }: HistoryHeaderProps) {
    function handleExport() {
        console.log('[HistoryHeader] export clicked');
    }

    function handleClearAll() {
        console.log('[HistoryHeader] clear all clicked');
    }

    return (
        <div className="flex items-center justify-between w-full">
            {/* Left: "> history" title */}
            <div className="flex items-center gap-2">
                <span
                    className="font-mono font-semibold"
                    style={{ fontSize: 20, color: '#10B981', fontFamily: 'JetBrains Mono, monospace' }}
                >
                    &gt;
                </span>
                <span
                    className="font-mono font-semibold"
                    style={{ fontSize: 20, color: '#FAFAFA', fontFamily: 'JetBrains Mono, monospace' }}
                >
                    history
                </span>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                    onClick={handleExport}
                    style={{
                        height:          32,
                        padding:         '0 12px',
                        fontSize:        12,
                        color:           '#9CA3AF',
                        border:          '1px solid #2A2A2A',
                        backgroundColor: 'transparent',
                    }}
                >
                    ↓ export
                </button>
                {/* "clear all" hidden when a selection is active — BatchBar owns that action */}
                {!hasSelection && (
                    <button
                        type="button"
                        className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                        onClick={handleClearAll}
                        style={{
                            height:          32,
                            padding:         '0 12px',
                            fontSize:        12,
                            color:           '#EF4444',
                            border:          '1px solid #EF4444',
                            backgroundColor: 'transparent',
                        }}
                    >
                        ✕ clear all
                    </button>
                )}
            </div>
        </div>
    );
}
