import { useProfile } from "~/context/ProfileContext";

// ─────────────────────────────────────────────
//  EDIT FORM GRID
//  Two-column form: left (username, email,
//  display_name) + right (timezone, language).
// ─────────────────────────────────────────────
interface FieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    isActive?: boolean;
    hasDropdown?: boolean;
}

function Field({ label, value, onChange, isActive, hasDropdown }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px]" style={{ color: "#9CA3AF" }}>{label}</span>
            <div
                className="flex items-center justify-between"
                style={{
                    height: 40,
                    backgroundColor: isActive ? "#111111" : "transparent",
                    border: `1px solid ${isActive ? "#10B981" : "#2A2A2A"}`,
                    padding: "0 12px",
                }}
            >
                <input
                    className="font-mono text-[13px] bg-transparent outline-none flex-1"
                    style={{ color: "#FAFAFA" }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {hasDropdown && (
                    <span className="font-mono text-[12px] ml-2 flex-shrink-0" style={{ color: "#6B7280" }}>▾</span>
                )}
            </div>
        </div>
    );
}

interface EditFormGridProps {
    values: {
        username: string;
        email: string;
        displayName: string;
        timezone: string;
        language: string;
    };
    onChange: (field: string, value: string) => void;
}

export default function EditFormGrid({ values, onChange }: EditFormGridProps) {
    return (
        <div className="flex gap-5 w-full">
            {/* left column */}
            <div className="flex flex-col gap-5 flex-1">
                <Field label="username"     value={values.username}    onChange={(v) => onChange("username", v)}    isActive />
                <Field label="email"        value={values.email}       onChange={(v) => onChange("email", v)} />
                <Field label="display_name" value={values.displayName} onChange={(v) => onChange("displayName", v)} />
            </div>

            {/* right column */}
            <div className="flex flex-col gap-5 flex-1">
                <Field label="timezone" value={values.timezone} onChange={(v) => onChange("timezone", v)} hasDropdown />
                <Field label="language" value={values.language} onChange={(v) => onChange("language", v)} hasDropdown />
            </div>
        </div>
    );
}
