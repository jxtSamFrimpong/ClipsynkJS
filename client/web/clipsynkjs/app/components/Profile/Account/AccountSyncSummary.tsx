import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  ACCOUNT SYNC SUMMARY
//  Three stat cards + key-value settings rows.
// ─────────────────────────────────────────────
const SYNC_CARDS = [
    { label: "sync_mode",   value: "realtime",     valueColor: "#10B981", desc: "websocket · fallback: sse" },
    { label: "encryption",  value: "e2e enabled",  valueColor: "#10B981", desc: "aes-256-gcm · key rotation: 30d" },
    { label: "bandwidth",   value: "no limit",     valueColor: "#FAFAFA", desc: "max file: 25MB · throttle: off" },
] as const;

const SYNC_ROWS = [
    { label: "auto_sync_on_copy",  value: "enabled",              valueColor: "#10B981" },
    { label: "conflict_resolution",value: "latest_wins",          valueColor: "#FAFAFA" },
    { label: "offline_queue",      value: "enabled · 50 clips",   valueColor: "#FAFAFA" },
] as const;

export default function AccountSyncSummary() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <SectionLabel label="sync_&_connectivity" size={14} />

            <div className="flex gap-3 w-full">
                {SYNC_CARDS.map((c) => (
                    <div
                        key={c.label}
                        className="flex flex-col gap-1.5 flex-1"
                        style={{ border: "1px solid #2A2A2A", padding: 14 }}
                    >
                        <span className="font-mono text-[10px]" style={{ color: "#6B7280" }}>{c.label}</span>
                        <span className="font-mono font-semibold text-[14px]" style={{ color: c.valueColor }}>{c.value}</span>
                        <span className="font-mono text-[10px]" style={{ color: "#4B5563" }}>{c.desc}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col w-full">
                {SYNC_ROWS.map((r) => (
                    <KeyValueRow key={r.label} label={r.label} value={r.value} valueColor={r.valueColor} />
                ))}
            </div>
        </div>
    );
}
