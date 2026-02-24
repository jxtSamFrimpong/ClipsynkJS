// ─────────────────────────────────────────────
//  SESSIONS SECTION
//  Active sessions list with revoke actions.
// ─────────────────────────────────────────────
const SESSIONS = [
    {
        id: "s1",
        name: "macbook_pro · macOS 14.2 · Chrome",
        meta: "192.168.1.42 · active now · [current]",
        metaColor: "#10B981",
        action: "[current]",
        actionColor: "#10B981",
        isActive: true,
    },
    {
        id: "s2",
        name: "iphone_14 · iOS 17.3 · ClipSync App",
        meta: "10.0.0.15 · last active 3h ago",
        metaColor: "#6B7280",
        action: "revoke",
        actionColor: "#EF4444",
        isActive: false,
    },
    {
        id: "s3",
        name: "linux_desktop · Ubuntu 22.04 · Firefox",
        meta: "172.16.0.8 · last active 1d ago",
        metaColor: "#6B7280",
        action: "revoke",
        actionColor: "#EF4444",
        isActive: false,
    },
] as const;

export default function SessionsSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>active_sessions</span>
                <button type="button" className="cursor-pointer font-mono text-[11px]" style={{ color: "#EF4444", backgroundColor: "transparent" }}>
                    revoke all others
                </button>
            </div>
            <div className="flex flex-col gap-1 w-full">
                {SESSIONS.map((s) => (
                    <div
                        key={s.id}
                        className="flex items-center justify-between w-full"
                        style={{
                            border: `1px solid ${s.isActive ? "#10B981" : "#2A2A2A"}`,
                            backgroundColor: s.isActive ? "#0D3320" : "transparent",
                            padding: "10px 12px",
                        }}
                    >
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[12px]" style={{ color: "#FAFAFA" }}>{s.name}</span>
                            <span className="font-mono text-[10px]" style={{ color: s.metaColor }}>{s.meta}</span>
                        </div>
                        <span className="font-mono text-[10px] flex-shrink-0 ml-4" style={{ color: s.actionColor }}>
                            {s.action}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
