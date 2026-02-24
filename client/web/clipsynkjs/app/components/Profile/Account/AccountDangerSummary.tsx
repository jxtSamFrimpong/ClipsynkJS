import SectionLabel from "~/components/MainArea/Shared/SectionLabel";

// ─────────────────────────────────────────────
//  ACCOUNT DANGER SUMMARY
//  Three destructive action buttons.
// ─────────────────────────────────────────────
const ACTIONS = [
    { label: "clear all data",    filled: false },
    { label: "unlink all devices",filled: false },
    { label: "delete account",    filled: true  },
] as const;

export default function AccountDangerSummary() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="danger_zone" color="#EF4444" size={14} />
            <div className="flex gap-2 w-full">
                {ACTIONS.map((a) => (
                    <button
                        key={a.label}
                        type="button"
                        className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                        style={{
                            color: a.filled ? "#FFFFFF" : "#EF4444",
                            backgroundColor: a.filled ? "#EF4444" : "transparent",
                            border: `1px solid #EF4444`,
                            height: 34,
                            padding: "0 14px",
                            fontWeight: a.filled ? 600 : 400,
                        }}
                    >
                        {a.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
