import { useProfile } from "~/context/ProfileContext";

// ─────────────────────────────────────────────
//  AVATAR EDIT
//  Avatar initials display + upload/remove actions.
// ─────────────────────────────────────────────
function deriveInitials(name: string): string {
    const parts = name.split(/[_\-\s.]+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
}

export default function AvatarEdit() {
    const { profile } = useProfile();
    const initials = deriveInitials(profile.username);

    return (
        <div className="flex items-center gap-5 w-full">
            {/* avatar */}
            <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 80, height: 80, backgroundColor: "#1F1F1F", border: "2px solid #10B981" }}
            >
                <span className="font-mono font-bold" style={{ color: "#10B981", fontSize: 28 }}>
                    {initials}
                </span>
            </div>

            {/* actions */}
            <div className="flex flex-col gap-2">
                <button type="button" className="cursor-pointer font-mono text-[12px] text-left" style={{ color: "#10B981", backgroundColor: "transparent" }}>
                    upload avatar
                </button>
                <button type="button" className="cursor-pointer font-mono text-[11px] text-left" style={{ color: "#6B7280", backgroundColor: "transparent" }}>
                    remove
                </button>
                <span className="font-mono text-[10px]" style={{ color: "#4B5563" }}>
                    max 2MB · png, jpg, webp
                </span>
            </div>
        </div>
    );
}
