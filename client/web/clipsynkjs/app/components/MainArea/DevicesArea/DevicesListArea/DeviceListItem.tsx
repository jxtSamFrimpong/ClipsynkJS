// ─────────────────────────────────────────────
//  DEVICE LIST ITEM
//  Single row in the devices list.
//  Selected state: green left border + #1F1F1F bg + [*] badge.
//  Unselected state: bottom border only (except last).
// ─────────────────────────────────────────────
export interface DeviceListItemData {
    id: string;
    name: string;
    meta: string;
    dotColor: string;
    metaColor: string;
    isSelected?: boolean;
    badge?: string;
    isLast?: boolean;
    onClick?: () => void;
}

export default function DeviceListItem({
    name,
    meta,
    dotColor,
    metaColor,
    isSelected,
    badge,
    isLast,
    onClick,
}: DeviceListItemData) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer flex items-center gap-3 w-full text-left transition-opacity hover:opacity-80"
            style={{
                padding: 14,
                backgroundColor: isSelected ? "#1F1F1F" : "transparent",
                borderLeft: isSelected ? "2px solid #10B981" : "2px solid transparent",
                borderBottom: !isSelected && !isLast ? "1px solid #2A2A2A" : undefined,
            }}
        >
            {/* status dot */}
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: dotColor,
                    flexShrink: 0,
                }}
            />

            {/* device info */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                    className="font-mono text-[13px] truncate"
                    style={{
                        color: isSelected ? "#FAFAFA" : "#FAFAFA",
                        fontWeight: isSelected ? 600 : 400,
                    }}
                >
                    {name}
                </span>
                <span
                    className="font-mono text-[10px] truncate"
                    style={{ color: metaColor }}
                >
                    {meta}
                </span>
            </div>

            {/* selected badge */}
            {badge && (
                <span
                    className="font-mono text-[11px] flex-shrink-0"
                    style={{ color: "#10B981" }}
                >
                    {badge}
                </span>
            )}
        </button>
    );
}
