import { useEffect } from "react";
import { useDashboard } from "~/context/DashboardContext";
import { useApp } from "~/context/AppContext";

// ─────────────────────────────────────────────
//  USER FOOTER
// ─────────────────────────────────────────────
function deriveMonogram(username: string): string {
    const parts = username.split(/[_\-\s.]+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return username.slice(0, 2).toUpperCase();
}

function UserProfileFooter() {
    const { collapsed } = useDashboard();
    const { user } = useApp();
    const username = user?.username ?? "guest";
    const monogram = deriveMonogram(username);

    useEffect(() => {
        console.log("[UserProfileFooter] resolved user:", username, "| monogram:", monogram, "| collapsed:", collapsed);
    }, [username, collapsed]);

    return (
        <div title={username} className="border-t border-[#222] px-3 py-3 flex items-center gap-2">
            {collapsed ? (
                <span className="font-mono text-sm shrink-0">
                    <span className="text-neutral-600">[</span>
                    <span className="text-green-400">{monogram}</span>
                    <span className="text-neutral-600">]</span>
                </span>
            ) : (
                <>
                    <span className="font-mono text-sm text-neutral-500 shrink-0">{'>'}_</span>
                    <span className="text-green-400 font-mono text-sm truncate">{username}</span>
                </>
            )}
        </div>
    );
}

export default UserProfileFooter;
