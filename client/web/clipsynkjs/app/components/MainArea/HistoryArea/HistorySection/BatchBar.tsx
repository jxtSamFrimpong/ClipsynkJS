// ─────────────────────────────────────────────
//  BATCH BAR
//  Replaces DateNav when selectedIds.size > 0.
//  Shows count of selected clips + actions:
//  delete (destructive) and pull-to-doc (CTA).
// ─────────────────────────────────────────────
interface BatchBarProps {
    count:       number;
    onClear:     () => void;
    onPullToDoc: () => void;
}

export default function BatchBar({ count, onClear, onPullToDoc }: BatchBarProps) {
    function handleDelete() {
        console.log('[BatchBar] delete clicked, count:', count);
    }

    function handlePullToDoc() {
        console.log('[BatchBar] pull to doc clicked, count:', count);
        onPullToDoc();
    }

    return (
        <div
            className="flex items-center justify-between w-full flex-shrink-0"
            style={{
                backgroundColor: '#0D3320',
                border:          '1px solid #10B981',
                padding:         '10px 16px',
            }}
        >
            {/* Left: count + clear */}
            <div className="flex items-center" style={{ gap: 12 }}>
                <span
                    className="font-mono font-semibold"
                    style={{ fontSize: 13, color: '#10B981' }}
                >
                    {count} clips selected
                </span>
                <span
                    className="cursor-pointer font-mono"
                    style={{ fontSize: 11, color: '#6B7280' }}
                    onClick={() => {
                        console.log('[BatchBar] clear selection clicked');
                        onClear();
                    }}
                >
                    clear selection
                </span>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center" style={{ gap: 8 }}>
                <button
                    type="button"
                    className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                    onClick={handleDelete}
                    style={{
                        height:          32,
                        padding:         '0 12px',
                        fontSize:        11,
                        color:           '#EF4444',
                        border:          '1px solid #EF4444',
                        backgroundColor: 'transparent',
                    }}
                >
                    delete
                </button>
                <button
                    type="button"
                    className="cursor-pointer font-mono font-semibold transition-opacity hover:opacity-80"
                    onClick={handlePullToDoc}
                    style={{
                        height:          32,
                        padding:         '0 14px',
                        fontSize:        11,
                        color:           '#0A0A0A',
                        backgroundColor: '#10B981',
                        border:          'none',
                    }}
                >
                    ⊞ pull to doc
                </button>
            </div>
        </div>
    );
}
