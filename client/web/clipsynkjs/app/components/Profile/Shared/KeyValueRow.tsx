// ─────────────────────────────────────────────
//  KEY VALUE ROW
//  Shared label / value pair used across all
//  profile sub-pages.
// ─────────────────────────────────────────────
interface KeyValueRowProps {
    label: string;
    value: string;
    valueColor?: string;
    topPadding?: number;
    bottomPadding?: number;
}

export default function KeyValueRow({
    label,
    value,
    valueColor = "#FAFAFA",
    topPadding = 8,
    bottomPadding = 8,
}: KeyValueRowProps) {
    return (
        <div
            className="flex items-center justify-between w-full"
            style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}
        >
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>
                {label}
            </span>
            <span className="font-mono text-[12px]" style={{ color: valueColor }}>
                {value}
            </span>
        </div>
    );
}
