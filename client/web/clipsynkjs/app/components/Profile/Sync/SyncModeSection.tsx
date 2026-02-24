// ─────────────────────────────────────────────
//  SYNC MODE SECTION
//  Three selectable mode cards: realtime (active),
//  interval, manual.
// ─────────────────────────────────────────────
const MODES = [
    {
        id: "realtime",
        name: "realtime",
        desc: "websocket connection, instant sync on clipboard change",
        badge: "[active]",
        isActive: true,
    },
    {
        id: "interval",
        name: "interval",
        desc: "batch sync every N seconds, lower bandwidth usage",
        badge: null,
        isActive: false,
    },
    {
        id: "manual",
        name: "manual",
        desc: "sync only when triggered by user, full control",
        badge: null,
        isActive: false,
    },
] as const;

export default function SyncModeSection() {
    return (
        <div className="flex flex-col gap-3.5 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>sync_mode</span>
            <div className="flex gap-2.5 w-full">
                {MODES.map((m) => (
                    <div
                        key={m.id}
                        className="flex flex-col gap-1.5 flex-1"
                        style={{
                            border: `1px solid ${m.isActive ? "#10B981" : "#2A2A2A"}`,
                            backgroundColor: m.isActive ? "#0D3320" : "transparent",
                            padding: 14,
                        }}
                    >
                        <span className="font-mono font-semibold text-[14px]" style={{ color: m.isActive ? "#10B981" : "#FAFAFA" }}>
                            {m.name}
                        </span>
                        <span className="font-mono text-[10px]" style={{ color: m.isActive ? "#9CA3AF" : "#6B7280", lineHeight: 1.4 }}>
                            {m.desc}
                        </span>
                        {m.badge && (
                            <span className="font-mono text-[9px]" style={{ color: "#10B981" }}>{m.badge}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
