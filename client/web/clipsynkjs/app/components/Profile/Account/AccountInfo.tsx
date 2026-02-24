import { useProfile } from "~/context/ProfileContext";

// ─────────────────────────────────────────────
//  ACCOUNT INFO
//  Avatar initials + username, email, plan/tier.
// ─────────────────────────────────────────────
function deriveInitials(name: string): string {
    const parts = name.split(/[_\-\s.]+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
}

export default function AccountInfo() {
    const { profile } = useProfile();
    const initials = deriveInitials(profile.username);

    return (
        <div className="flex items-center gap-6 w-full">
            {/* avatar */}
            <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#1F1F1F",
                    border: "2px solid #10B981",
                }}
            >
                <span
                    className="font-mono font-bold"
                    style={{ color: "#10B981", fontSize: 22 }}
                >
                    {initials}
                </span>
            </div>

            {/* details */}
            <div className="flex flex-col gap-1.5">
                <span
                    className="font-mono font-medium"
                    style={{ color: "#FAFAFA", fontSize: 16 }}
                >
                    {profile.username}
                </span>
                <span className="font-mono text-[13px]" style={{ color: "#6B7280" }}>
                    {profile.email}
                </span>
                <span className="font-mono text-[11px]" style={{ color: "#4B5563" }}>
                    member since {profile.memberSince} · {profile.plan} tier
                </span>
            </div>
        </div>
    );
}
