import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  PRIVACY CONTROLS SECTION
// ─────────────────────────────────────────────
const ROWS = [
    { label: "clipboard_visibility",    value: "private", valueColor: "#FAFAFA" },
    { label: "sensitive_content_filter",value: "enabled", valueColor: "#10B981" },
    { label: "password_auto_exclude",   value: "enabled", valueColor: "#10B981" },
] as const;

export default function PrivacyControlsSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>privacy_controls</span>
            <div className="flex flex-col w-full">
                {ROWS.map((r) => (
                    <KeyValueRow key={r.label} label={r.label} value={r.value} valueColor={r.valueColor} />
                ))}
            </div>
        </div>
    );
}
