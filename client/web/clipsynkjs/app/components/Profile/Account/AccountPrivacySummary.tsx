import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import KeyValueRow from "~/components/Profile/Shared/KeyValueRow";

// ─────────────────────────────────────────────
//  ACCOUNT PRIVACY SUMMARY
// ─────────────────────────────────────────────
const ROWS = [
    { label: "2fa",                     value: "enabled (totp)",  valueColor: "#10B981" },
    { label: "clipboard_visibility",    value: "private",         valueColor: "#FAFAFA" },
    { label: "sensitive_content_filter",value: "enabled",         valueColor: "#10B981" },
    { label: "active_sessions",         value: "3 sessions",      valueColor: "#FAFAFA" },
    { label: "login_history",           value: "view log",        valueColor: "#10B981" },
] as const;

export default function AccountPrivacySummary() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="privacy_&_security" size={14} />
            <div className="flex flex-col w-full">
                {ROWS.map((r) => (
                    <KeyValueRow key={r.label} label={r.label} value={r.value} valueColor={r.valueColor} />
                ))}
            </div>
        </div>
    );
}
