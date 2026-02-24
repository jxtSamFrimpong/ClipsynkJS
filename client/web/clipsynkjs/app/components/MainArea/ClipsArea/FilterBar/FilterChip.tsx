// ─────────────────────────────────────────────
//  FILTER CHIP
//  "label: value" segment inside the filter bar.
//  Each chip has a right border except the last.
// ─────────────────────────────────────────────
interface FilterChipProps {
    label: string;
    value: string;
    valueColor: string;
    borderRight?: boolean;
}

export default function FilterChip({
    label,
    value,
    valueColor,
    borderRight = true,
}: FilterChipProps) {
    return (
        <div
            className="flex items-center gap-1.5 h-full px-3"
            style={borderRight ? { borderRight: "1px solid #2A2A2A" } : undefined}
        >
            <span className="font-mono text-[#6B7280] text-[11px]">{label}</span>
            <span
                className="font-mono font-semibold text-[11px]"
                style={{ color: valueColor }}
            >
                {value}
            </span>
        </div>
    );
}
