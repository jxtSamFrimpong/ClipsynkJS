import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  BANDWIDTH SECTION
// ─────────────────────────────────────────────
function DropdownRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between w-full" style={{ paddingTop: 8, paddingBottom: 8 }}>
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>{label}</span>
            <div
                className="flex items-center justify-between"
                style={{ width: 160, height: 32, border: "1px solid #2A2A2A", padding: "0 12px" }}
            >
                <span className="font-mono text-[11px]" style={{ color: "#FAFAFA" }}>{value}</span>
                <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>▾</span>
            </div>
        </div>
    );
}

export default function BandwidthSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>bandwidth_&_limits</span>
            <div className="flex flex-col w-full">
                <DropdownRow label="max_file_size"         value="25 MB" />
                <KeyValueRow label="throttle"              value="off"          valueColor="#FAFAFA" />
                <DropdownRow label="conflict_resolution"   value="latest_wins" />
                <DropdownRow label="offline_queue_size"    value="50 clips" />
            </div>
        </div>
    );
}
