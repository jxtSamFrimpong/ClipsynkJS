import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  RETENTION SECTION
// ─────────────────────────────────────────────
function DropdownRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between w-full" style={{ paddingTop: 8, paddingBottom: 8 }}>
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>{label}</span>
            <div className="flex items-center justify-between" style={{ width: 160, height: 32, border: "1px solid #2A2A2A", padding: "0 12px" }}>
                <span className="font-mono text-[11px]" style={{ color: "#FAFAFA" }}>{value}</span>
                <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>▾</span>
            </div>
        </div>
    );
}

export default function RetentionSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>retention_policies</span>
            <div className="flex flex-col w-full">
                <DropdownRow label="auto_delete_after"        value="90 days" />
                <KeyValueRow label="history_retention"        value="unlimited (free: 30d)" valueColor="#F59E0B" />
                <KeyValueRow label="keep_deleted_clips"       value="7 days (trash)"        valueColor="#FAFAFA" />
                <KeyValueRow label="auto_cleanup_duplicates"  value="enabled"               valueColor="#10B981" />
            </div>
        </div>
    );
}
