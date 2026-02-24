import { useLocation, useNavigate } from "react-router";
import { useDashboard } from "~/context/DashboardContext";
import type { NavItem } from "~/types/nav_items";

// ─────────────────────────────────────────────
//  ROUTE MAP
//  Maps nav item ids to their URL paths.
// ─────────────────────────────────────────────
const ROUTE_MAP: Record<string, string> = {
    clipboard: "/",
    devices:   "/devices",
    history:   "/history",
    help:      "/help",
};

// ─────────────────────────────────────────────
//  NAV ITEM
// ─────────────────────────────────────────────
export default function DashboardNavItem({ item }: { item: NavItem }) {
    const { collapsed } = useDashboard();
    const location = useLocation();
    const navigate = useNavigate();

    const route = ROUTE_MAP[item.id] ?? `/${item.id}`;
    const isActive =
        item.id === "clipboard"
            ? location.pathname === "/"
            : location.pathname === route || location.pathname.startsWith(route + "/");

    function handleClick() {
        navigate(route);
    }

    return (
        <button
            onClick={handleClick}
            title={item.label}
            className={`
                cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono
                transition-colors duration-150
                ${isActive
                    ? "bg-[#1a1a1a] text-green-400"
                    : "text-neutral-500 hover:bg-[#1a1a1a] hover:text-green-400"
                }
                ${collapsed ? "justify-center" : ""}
            `}
        >
            <span className="font-mono text-base shrink-0">
                <span className="text-neutral-600">[</span>
                <span className={isActive ? "text-green-400" : "text-neutral-500"}>{item.icon}</span>
                <span className="text-neutral-600">]</span>
            </span>
            {!collapsed && <span className="text-sm">{item.label}</span>}
        </button>
    );
}
