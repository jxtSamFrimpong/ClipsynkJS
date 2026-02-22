import { useDashboard } from "~/context/DashboardContext";
import type { NavItem } from "~/types/nav_items";

// ─────────────────────────────────────────────
//  NAV ITEM
// ─────────────────────────────────────────────
export default function DashboardNavItems({ item }: { item: NavItem }) {
    const { active, setActive, collapsed } = useDashboard();
    const isActive = active === item.id;

    function handleClick() {
        console.log("[DashboardNavItems] nav item clicked:", item.id, "| previous active:", active, "| isActive:", isActive);
        setActive(item.id);
    }

    return (
        <button
            onClick={handleClick}
            title={item.label}
            className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono
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
