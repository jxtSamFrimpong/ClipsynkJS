// ─────────────────────────────────────────────
//  CLIP ITEM
//  Single row in the clips list.
//  dot color + badge color are both derived from
//  the clip type — matches design system tokens.
// ─────────────────────────────────────────────
export interface ClipData {
    id: string;
    title: string;
    meta: string;        // "device ~ source · time"
    badge: string;       // "[text]", "[image]", etc.
    color: string;       // type color from design system
    isLast?: boolean;
}

export default function ClipItem({ title, meta, badge, color, isLast }: ClipData) {
    return (
        <div
            className="flex items-center gap-4 w-full cursor-pointer hover:opacity-80 transition-opacity"
            style={{
                padding: "16px 20px",
                borderBottom: isLast ? "none" : "1px solid #2A2A2A",
            }}
        >
            {/* type dot */}
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: color,
                    flexShrink: 0,
                }}
            />

            {/* clip content */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                    className="font-mono text-[#FAFAFA] text-[13px] truncate"
                    style={{ fontFamily: "IBM Plex Mono" }}
                >
                    {title}
                </span>
                <span
                    className="font-mono text-[11px]"
                    style={{ color: "#6B7280", fontFamily: "IBM Plex Mono" }}
                >
                    {meta}
                </span>
            </div>

            {/* type badge */}
            <span
                className="font-mono text-[11px] flex-shrink-0"
                style={{ color }}
            >
                {badge}
            </span>
        </div>
    );
}
