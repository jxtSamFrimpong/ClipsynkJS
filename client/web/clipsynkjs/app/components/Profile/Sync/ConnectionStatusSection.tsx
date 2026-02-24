// ─────────────────────────────────────────────
//  CONNECTION STATUS SECTION
//  Terminal-style connection info box.
// ─────────────────────────────────────────────
const LINES = [
    { text: "> ws://sync.clipsync.dev:443", color: "#10B981" },
    { text: "  status: connected",          color: "#10B981" },
    { text: "  latency: 12ms",              color: "#FAFAFA" },
    { text: "  uptime: 4h 23m",             color: "#FAFAFA" },
    { text: "  fallback: sse (standby)",    color: "#6B7280" },
    { text: "  last_reconnect: none",       color: "#6B7280" },
] as const;

export default function ConnectionStatusSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>connection_status</span>
            <div
                className="flex flex-col gap-2 w-full"
                style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A", padding: 14 }}
            >
                {LINES.map((l, i) => (
                    <span key={i} className="font-mono text-[11px]" style={{ color: l.color }}>{l.text}</span>
                ))}
            </div>
        </div>
    );
}
