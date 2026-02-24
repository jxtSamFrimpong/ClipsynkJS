// ─────────────────────────────────────────────
//  INTEGRATION ITEM
//  Icon prefix + destination label, right-aligned
//  colored status indicator.
// ─────────────────────────────────────────────
export interface IntegrationItemData {
    id: string;
    icon: string;
    label: string;
    status: string;
    statusColor: string;
}

export default function IntegrationItem({ icon, label, status, statusColor }: IntegrationItemData) {
    return (
        <div className="flex items-center gap-2.5 w-full">
            <span
                className="font-mono text-[12px] flex-shrink-0"
                style={{ color: statusColor, width: 14 }}
            >
                {icon}
            </span>
            <span className="font-mono text-[12px] text-[#FAFAFA] flex-1 min-w-0 truncate">
                {label}
            </span>
            <span
                className="font-mono text-[11px] flex-shrink-0"
                style={{ color: statusColor }}
            >
                {status}
            </span>
        </div>
    );
}
