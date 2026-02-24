// ─────────────────────────────────────────────
//  SYNC ITEM
//  Config label + colored value badge side by side.
// ─────────────────────────────────────────────
export interface SyncItemData {
    id: string;
    label: string;
    value: string;
    valueColor: string;
}

export default function SyncItem({ label, value, valueColor }: SyncItemData) {
    return (
        <div className="flex items-center justify-between w-full">
            <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>
                {label}
            </span>
            <span
                className="font-mono text-[12px] font-bold"
                style={{ color: valueColor }}
            >
                {value}
            </span>
        </div>
    );
}
