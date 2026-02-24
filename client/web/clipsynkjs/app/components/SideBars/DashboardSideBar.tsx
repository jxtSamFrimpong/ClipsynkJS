import { useDashboard } from "~/context/DashboardContext";
import { NAV_ITEMS } from "~/types/nav_items";
import type { NavItem } from "~/types/nav_items";
import Logo from "./Logo/DashboardLogo";
import DashboardNavItem from "./NavItems/DashboardNavItems";
import UpgradeToPro from "./UpgradePro/UpradeToPro";
import UserProfileFooter from "./UserProfileFooter/UserProfileFooter";

// ─────────────────────────────────────────────
//  SIDEBAR
// ─────────────────────────────────────────────
function Sidebar() {
    const { collapsed, toggleCollapsed } = useDashboard();

    function handleToggle() {
        console.log("[DashboardSideBar] collapse toggle button clicked");
        toggleCollapsed();
    }

    return (
        <aside
            className={`
        flex flex-col shrink-0 bg-[#111] border-r border-[#222]
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-14" : "w-56"}
      `}
        >
            {/* Header row: Logo + collapse toggle on the same line */}
            <div className="flex items-center justify-between">
                <Logo />
                <button
                    onClick={handleToggle}
                    className={`cursor-pointer mr-3 shrink-0 p-1.5 rounded-md flex items-center justify-center text-yellow-400 hover:bg-[#1a1a1a] hover:text-yellow-300 transition-colors ${collapsed ? "hidden" : ""}`}
                >
                    <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
                {NAV_ITEMS.map((item: NavItem) => (
                    <DashboardNavItem key={item.id} item={item} />
                ))}
            </nav>

            <UpgradeToPro />
            <UserProfileFooter />
        </aside>
    );
}

export default Sidebar;
