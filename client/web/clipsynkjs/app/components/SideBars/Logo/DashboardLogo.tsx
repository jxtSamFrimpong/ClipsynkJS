import { useDashboard } from "~/context/DashboardContext";

// ─────────────────────────────────────────────
//  LOGO
// ─────────────────────────────────────────────
export default function Logo() {
    const { collapsed, toggleCollapsed } = useDashboard();

    function handleExpand() {
        console.log("[DashboardLogo] expand triggered via logo '>' button");
        toggleCollapsed();
    }

    const chevron = (
        <span className="text-green-400 font-mono font-bold shrink-0 text-sm">&gt;</span>
    );

    return (
        <div className="flex items-center gap-2 px-4 py-5">
            {collapsed ? (
                // When collapsed, the ">" becomes the sole visible affordance — make it tappable.
                <button
                    onClick={handleExpand}
                    aria-label="Expand sidebar"
                    className="cursor-pointer rounded hover:text-green-300 transition-colors"
                >
                    {chevron}
                </button>
            ) : (
                chevron
            )}
            {!collapsed && (
                <span className="text-sm font-bold tracking-widest text-green-400 font-mono">
                    clipsync
                </span>
            )}
        </div>
    );
}
