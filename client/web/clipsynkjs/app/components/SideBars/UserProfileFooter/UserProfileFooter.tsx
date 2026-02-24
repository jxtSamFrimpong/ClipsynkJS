import { useNavigate } from "react-router";
import { useDashboard } from "~/context/DashboardContext";
import { useApp } from "~/context/AppContext";

// ─────────────────────────────────────────────
//  USER FOOTER
//  Clicking navigates to /profile/account.
// ─────────────────────────────────────────────
function deriveMonogram(username: string): string {
    const parts = username.split(/[_\-\s.]+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return username.slice(0, 2).toUpperCase();
}

function UserProfileFooter() {
    const { collapsed } = useDashboard();
    const { user } = useApp();
    const navigate = useNavigate();
    const username = user?.username ?? "guest";
    const monogram = deriveMonogram(username);

    return (
        <button
            type="button"
            title={username}
            onClick={() => navigate("/profile/account")}
            className="cursor-pointer border-t border-[#222] px-3 py-3 flex items-center gap-2 w-full text-left transition-opacity hover:opacity-80"
        >
            {collapsed ? (
                <span className="font-mono text-sm shrink-0">
                    <span className="text-neutral-600">[</span>
                    <span className="text-green-400">{monogram}</span>
                    <span className="text-neutral-600">]</span>
                </span>
            ) : (
                <>
                    <span className="font-mono text-sm text-neutral-500 shrink-0">{">"}_</span>
                    <span className="text-green-400 font-mono text-sm truncate">{username}</span>
                </>
            )}
        </button>
    );
}

export default UserProfileFooter;
