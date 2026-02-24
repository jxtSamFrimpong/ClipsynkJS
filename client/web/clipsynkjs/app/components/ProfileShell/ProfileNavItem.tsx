import { useLocation, useNavigate } from "react-router";

// ─────────────────────────────────────────────
//  PROFILE NAV ITEM
//  Active state derived from URL.
//  "danger" item is always red text.
// ─────────────────────────────────────────────
interface ProfileNavItemProps {
    label: string;
    route: string;
    isDanger?: boolean;
}

export default function ProfileNavItem({ label, route, isDanger }: ProfileNavItemProps) {
    const location = useLocation();
    const navigate = useNavigate();

    // account/edit should also highlight "account"
    const isActive = location.pathname === route || location.pathname.startsWith(route + "/");

    return (
        <button
            type="button"
            onClick={() => navigate(route)}
            className="cursor-pointer flex items-center w-full text-left transition-opacity hover:opacity-80"
            style={{
                padding: "8px 12px",
                backgroundColor: isActive ? "#1F1F1F" : "transparent",
                borderLeft: isActive ? "2px solid #10B981" : "2px solid transparent",
                color: isDanger ? "#EF4444" : isActive ? "#FAFAFA" : "#6B7280",
            }}
        >
            <span className="font-mono text-[12px]">{label}</span>
        </button>
    );
}
