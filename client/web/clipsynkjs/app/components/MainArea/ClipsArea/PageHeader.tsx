// ─────────────────────────────────────────────
//  PAGE HEADER
//  "> clipboard" title row.
// ─────────────────────────────────────────────

export default function PageHeader() {
    return (
        <div className="flex items-center gap-3">
            <span
                className="font-mono font-bold"
                style={{ color: "#10B981", fontSize: 28 }}
            >
                &gt;
            </span>
            <span
                className="font-mono font-bold text-[#FAFAFA]"
                style={{ fontSize: 24 }}
            >
                clipboard
            </span>
        </div>
    );
}
