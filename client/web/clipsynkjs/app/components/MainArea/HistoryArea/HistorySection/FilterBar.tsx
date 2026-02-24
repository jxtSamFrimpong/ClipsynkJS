// ─────────────────────────────────────────────
//  FILTER BAR
//  Search input + three filter chip dropdowns.
//  All non-functional / static — UI scaffold.
// ─────────────────────────────────────────────
export default function FilterBar() {
    return (
        <div className="flex items-center w-full" style={{ gap: 8 }}>
            {/* Search box */}
            <div
                className="flex items-center flex-1"
                style={{
                    height:  36,
                    padding: '0 12px',
                    gap:     8,
                    border:  '1px solid #2A2A2A',
                }}
            >
                <span
                    className="font-mono flex-shrink-0"
                    style={{ fontSize: 12, color: '#4B5563' }}
                >
                    ⌕
                </span>
                <span
                    className="font-mono"
                    style={{ fontSize: 12, color: '#4B5563' }}
                >
                    / search history...
                </span>
            </div>

            {/* Filter chip: type */}
            <div
                className="flex items-center flex-shrink-0"
                style={{
                    height:  36,
                    padding: '0 10px',
                    gap:     4,
                    border:  '1px solid #2A2A2A',
                }}
            >
                <span className="font-mono" style={{ fontSize: 11, color: '#6B7280' }}>type:</span>
                <span className="font-mono" style={{ fontSize: 11, color: '#FAFAFA' }}>all</span>
            </div>

            {/* Filter chip: group */}
            <div
                className="flex items-center flex-shrink-0"
                style={{
                    height:  36,
                    padding: '0 10px',
                    gap:     4,
                    border:  '1px solid #2A2A2A',
                }}
            >
                <span className="font-mono" style={{ fontSize: 11, color: '#6B7280' }}>group:</span>
                <span className="font-mono" style={{ fontSize: 11, color: '#FAFAFA' }}>all</span>
            </div>

            {/* Filter chip: device */}
            <div
                className="flex items-center flex-shrink-0"
                style={{
                    height:  36,
                    padding: '0 10px',
                    gap:     4,
                    border:  '1px solid #2A2A2A',
                }}
            >
                <span className="font-mono" style={{ fontSize: 11, color: '#6B7280' }}>device:</span>
                <span className="font-mono" style={{ fontSize: 11, color: '#FAFAFA' }}>all</span>
            </div>
        </div>
    );
}
