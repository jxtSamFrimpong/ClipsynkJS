import type { NavItem } from "~/types/nav_items";

// ─────────────────────────────────────────────
//  NAV ITEM
// ─────────────────────────────────────────────
export default function DashboardNavItems({
    item,
    active,
    onClick,
    collapsed,
}: {
    item: NavItem;
    active: string;
    onClick: (id: string) => void;
    collapsed: boolean;
}) {
    const isActive = active === item.id;

    return (
        <button
            onClick={() => onClick(item.id)}
            title={collapsed ? item.label : undefined}
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
            <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? "bg-green-400" : "bg-neutral-700"
                    }`}
            />
            {!collapsed && <span>{item.label}</span>}
        </button>
    );
}