import SectionLabel from "~/components/MainArea/Shared/SectionLabel";

// ─────────────────────────────────────────────
//  CONNECTED ACCOUNTS
//  GitHub (connected) + Google (not connected).
// ─────────────────────────────────────────────
const ACCOUNTS = [
    {
        id: "github",
        icon: "⌥",
        name: "github · alex-chen",
        nameColor: "#FAFAFA",
        action: "disconnect",
        actionColor: "#EF4444",
    },
    {
        id: "google",
        icon: "G",
        name: "google · not connected",
        nameColor: "#6B7280",
        action: "connect",
        actionColor: "#10B981",
    },
] as const;

export default function ConnectedAccounts() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="connected_accounts" size={14} />
            <div className="flex flex-col gap-1.5 w-full">
                {ACCOUNTS.map((a) => (
                    <div
                        key={a.id}
                        className="flex items-center justify-between w-full"
                        style={{ border: "1px solid #2A2A2A", padding: "10px 12px" }}
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="font-mono font-bold text-[14px]" style={{ color: "#FAFAFA" }}>{a.icon}</span>
                            <span className="font-mono text-[12px]" style={{ color: a.nameColor }}>{a.name}</span>
                        </div>
                        <button type="button" className="cursor-pointer font-mono text-[11px]" style={{ color: a.actionColor, backgroundColor: "transparent" }}>
                            {a.action}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
