// ─────────────────────────────────────────────
//  DEVICE ITEM
//  Status dot + device name + status label.
// ─────────────────────────────────────────────
export interface DeviceItemData {
    id: string;
    name: string;
    status: string;
    dotColor: string;
    statusColor: string;
}

export default function DeviceItem({ name, status, dotColor, statusColor }: DeviceItemData) {
    return (
        <div className="flex items-center gap-2.5 w-full">
            {/* status dot */}
            <div
                style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: dotColor,
                    flexShrink: 0,
                }}
            />
            <span className="font-mono text-[12px] text-[#FAFAFA] flex-1 min-w-0 truncate">
                {name}
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
