// ─────────────────────────────────────────────
//  STORAGE OVERVIEW
//  Usage bar + color-coded breakdown legend.
// ─────────────────────────────────────────────
const BREAKDOWN = [
    { label: "text: 1.4GB",    dotColor: "#10B981" },
    { label: "images: 820MB",  dotColor: "#06B6D4" },
    { label: "files: 580MB",   dotColor: "#F472B6" },
] as const;

export default function StorageOverview() {
    return (
        <div className="flex flex-col gap-3 w-full">
            {/* bar info */}
            <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[13px]" style={{ color: "#FAFAFA" }}>2.8 GB / 5 GB used (56%)</span>
                <span className="font-mono text-[11px]" style={{ color: "#F59E0B" }}>upgrade for unlimited</span>
            </div>

            {/* bar */}
            <div className="w-full" style={{ height: 12, backgroundColor: "#1A1A1A" }}>
                <div style={{ width: "56%", height: "100%", backgroundColor: "#10B981" }} />
            </div>

            {/* legend */}
            <div className="flex gap-4 w-full">
                {BREAKDOWN.map((b) => (
                    <div key={b.label} className="flex items-center gap-1.5">
                        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: b.dotColor }} />
                        <span className="font-mono text-[11px]" style={{ color: "#9CA3AF" }}>{b.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
