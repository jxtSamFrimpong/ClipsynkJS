import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  ACCOUNT STORAGE SUMMARY
//  Storage bar + breakdown cards + 2 settings.
// ─────────────────────────────────────────────
const BREAKDOWN = [
    { label: "text clips", value: "1.4GB",  valueColor: "#10B981" },
    { label: "images",     value: "820MB",  valueColor: "#06B6D4" },
    { label: "files",      value: "580MB",  valueColor: "#F472B6" },
] as const;

const STORAGE_ROWS = [
    { label: "auto_delete_after",   value: "90 days",               valueColor: "#FAFAFA" },
    { label: "history_retention",   value: "unlimited (free: 30d)", valueColor: "#F59E0B" },
] as const;

export default function AccountStorageSummary() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <SectionLabel label="storage_&_history" size={14} />

            {/* storage bar */}
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[12px]" style={{ color: "#FAFAFA" }}>2.8 GB used</span>
                    <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>5 GB total</span>
                </div>
                <div className="w-full" style={{ height: 8, backgroundColor: "#1A1A1A" }}>
                    <div style={{ width: "56%", height: "100%", backgroundColor: "#10B981" }} />
                </div>
            </div>

            {/* breakdown cards */}
            <div className="flex gap-3 w-full">
                {BREAKDOWN.map((b) => (
                    <div
                        key={b.label}
                        className="flex flex-col gap-1 flex-1"
                        style={{ border: "1px solid #2A2A2A", padding: 12 }}
                    >
                        <span className="font-mono font-semibold text-[14px]" style={{ color: b.valueColor }}>{b.value}</span>
                        <span className="font-mono text-[10px]" style={{ color: "#6B7280" }}>{b.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col w-full">
                {STORAGE_ROWS.map((r) => (
                    <KeyValueRow key={r.label} label={r.label} value={r.value} valueColor={r.valueColor} />
                ))}
            </div>
        </div>
    );
}
