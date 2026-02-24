import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  ENCRYPTION SECTION
// ─────────────────────────────────────────────
export default function EncryptionSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>encryption</span>
            <div className="flex flex-col w-full">
                <KeyValueRow label="end_to_end_encryption" value="enabled"              valueColor="#10B981" />
                <KeyValueRow label="algorithm"             value="aes-256-gcm"          valueColor="#FAFAFA" />
                <div className="flex items-center justify-between w-full" style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>key_rotation</span>
                    <div
                        className="flex items-center justify-between"
                        style={{ width: 160, height: 32, border: "1px solid #2A2A2A", padding: "0 12px" }}
                    >
                        <span className="font-mono text-[11px]" style={{ color: "#FAFAFA" }}>30 days</span>
                        <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>▾</span>
                    </div>
                </div>
                <KeyValueRow label="last_key_rotation" value="feb 1, 2026 (21 days ago)" valueColor="#6B7280" />
                <div className="flex justify-start pt-2">
                    <button
                        type="button"
                        className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                        style={{ color: "#F59E0B", border: "1px solid #F59E0B", height: 32, padding: "0 14px", backgroundColor: "transparent" }}
                    >
                        rotate keys now
                    </button>
                </div>
            </div>
        </div>
    );
}
