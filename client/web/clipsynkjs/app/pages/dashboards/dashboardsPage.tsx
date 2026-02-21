import { useState, createContext, useContext } from "react"

// ─────────────────────────────────────────────
//  THEME DEFINITIONS
// ─────────────────────────────────────────────
const THEMES = {
    light: {
        name: "light",
        sidebar: "bg-neutral-50",
        sidebarBorder: "border-r border-neutral-200",
        main: "bg-neutral-100",
        logoText: "text-neutral-800",
        logoAccent: "bg-orange-500",
        navItem: "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800",
        navItemActive: "bg-neutral-200 text-neutral-900 font-medium",
        userText: "text-neutral-800",
        upgradeBox: "bg-orange-50 border border-orange-200",
        upgradeTitle: "text-orange-800 font-semibold text-xs",
        upgradeBody: "text-orange-600 text-xs leading-relaxed",
        upgradeBtn: "bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg",
        divider: "border-neutral-200",
        collapseBtn: "text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700",
        dotActive: "bg-green-500",
        dotIdle: "bg-neutral-300",
        placeholder: "bg-white border border-neutral-200 text-neutral-400 text-sm",
        placeholderText: (id: string) => `${id} content goes here`,
        heading: "text-2xl font-semibold text-neutral-900",
        subheading: "text-sm text-neutral-400 mt-0.5",
        toggleBtn: "border-neutral-300 text-neutral-600 hover:bg-neutral-200 text-xs",
    },
    dark: {
        name: "dark",
        sidebar: "bg-[#111]",
        sidebarBorder: "border-r border-[#222]",
        main: "bg-[#0d0d0d]",
        logoText: "text-green-400 font-mono font-bold",
        logoAccent: "bg-transparent",
        navItem: "text-neutral-500 hover:bg-[#1a1a1a] hover:text-green-400 font-mono",
        navItemActive: "bg-[#1a1a1a] text-green-400 font-mono",
        userText: "text-green-400 font-mono text-sm",
        upgradeBox: "bg-transparent border border-yellow-700/40",
        upgradeTitle: "text-yellow-400 font-mono text-xs",
        upgradeBody: "text-yellow-600/70 font-mono text-xs leading-relaxed",
        upgradeBtn: "bg-green-500 hover:bg-green-400 text-black font-mono font-bold text-xs rounded",
        divider: "border-[#222]",
        collapseBtn: "text-neutral-600 hover:bg-[#1a1a1a] hover:text-green-400",
        dotActive: "bg-green-400",
        dotIdle: "bg-neutral-700",
        placeholder: "border border-[#222] text-neutral-700 font-mono text-sm",
        placeholderText: (id: string) => `// ${id} content renders here`,
        heading: "text-2xl font-bold text-green-400 font-mono",
        subheading: "text-xs text-neutral-600 font-mono mt-1",
        toggleBtn: "border-green-700/40 text-green-400 hover:bg-green-400/10 font-mono text-xs",
    },
};
type ThemeName = keyof typeof THEMES;


// ─────────────────────────────────────────────
//  CONTEXT
// ─────────────────────────────────────────────
type ThemeContextType = {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    t: typeof THEMES.light;
    isDark: boolean;
};

const ThemeCtx = createContext<ThemeContextType | null>(null);
const useTheme = () => {
    const ctx = useContext(ThemeCtx);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
};

// ─────────────────────────────────────────────
//  NAV ITEMS
// ─────────────────────────────────────────────
const NAV_ITEMS = [
    { id: "clipboard", lightLabel: "Clipboard", lightIcon: "📋" },
    { id: "devices", lightLabel: "Devices", lightIcon: "💻" },
    { id: "history", lightLabel: "History", lightIcon: "🕓" },
    { id: "pinned", lightLabel: "Pinned", lightIcon: "📌" },
    { id: "settings", lightLabel: "Settings", lightIcon: "⚙️" },
    { id: "help", lightLabel: "Help", lightIcon: "❓" },
];


// ─────────────────────────────────────────────
//  LOGO
// ─────────────────────────────────────────────
function Logo({ collapsed }: { collapsed: boolean }) {
    const { t, isDark } = useTheme();

    return (
        <div className="flex items-center gap-2 px-4 py-5">
            {isDark ? (
                <span className="text-green-400 font-mono font-bold shrink-0 text-sm">&gt;</span>
            ) : (
                <div className={`w-7 h-7 rounded-full ${t.logoAccent} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">C</span>
                </div>
            )}
            {!collapsed && (
                <span className={`text-sm tracking-widest ${isDark ? "" : "uppercase"} ${t.logoText}`}>
                    {isDark ? "clipsync" : "ClipSync"}
                </span>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
//  NAV ITEM
// ─────────────────────────────────────────────
function NavItem({ item, active, onClick, collapsed }: { item: any, active: string, onClick: (id: string) => void, collapsed: boolean }) {
    const { t, isDark } = useTheme();
    const isActive = active === item.id;

    return (
        <button
            onClick={() => onClick(item.id)}
            title={collapsed ? item.lightLabel : undefined}
            className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
        transition-colors duration-150
        ${isActive ? t.navItemActive : t.navItem}
        ${collapsed ? "justify-center" : ""}
      `}
        >
            {isDark ? (
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? t.dotActive : t.dotIdle}`} />
            ) : (
                <span className="text-base shrink-0">{item.lightIcon}</span>
            )}
            {!collapsed && (
                <span>{isDark ? item.id : item.lightLabel}</span>
            )}
        </button>
    );
}

// ─────────────────────────────────────────────
//  UPGRADE BOX
// ─────────────────────────────────────────────
function UpgradeBox({ collapsed }: { collapsed: boolean }) {
    const { t, isDark } = useTheme();
    if (collapsed) return null;

    return (
        <div className={`mx-3 mb-3 p-3 rounded-xl ${t.upgradeBox}`}>
            <p className={`mb-1 ${t.upgradeTitle}`}>
                {isDark ? "$ upgrade --pro" : "Upgrade to Pro"}
            </p>
            <p className={`mb-3 ${t.upgradeBody}`}>
                {isDark
                    ? "unlock unlimited devices and encrypted sync"
                    : "Unlock unlimited devices and encrypted sync."}
            </p>
            <button className={`w-full py-1.5 px-3 ${t.upgradeBtn}`}>
                {isDark ? "$ run upgrade" : "Upgrade"}
            </button>
        </div>
    );
}


// ─────────────────────────────────────────────
//  USER FOOTER
// ─────────────────────────────────────────────
function UserFooter({ collapsed }: { collapsed: boolean }) {
    const { t, isDark } = useTheme();

    return (
        <div className={`border-t ${t.divider} px-3 py-3 flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${t.dotActive}`} />
            {!collapsed && (
                <span className={`truncate ${t.userText}`}>
                    {isDark ? "alex_chen" : "Alex Chen"}
                </span>
            )}
        </div>
    );
}


// ─────────────────────────────────────────────
//  SIDEBAR
// ─────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: string, setActive: (id: string) => void }) {
    const { t } = useTheme();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
        flex flex-col shrink-0
        ${t.sidebar} ${t.sidebarBorder}
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-14" : "w-56"}
      `}
        >
            <Logo collapsed={collapsed} />

            <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.id}
                        item={item}
                        active={active}
                        onClick={setActive}
                        collapsed={collapsed}
                    />
                ))}
            </nav>

            <UpgradeBox collapsed={collapsed} />
            <UserFooter collapsed={collapsed} />

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className={`mx-3 mb-3 p-1.5 rounded-md flex items-center justify-center transition-colors ${t.collapseBtn}`}
            >
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </aside>
    );
}


// ─────────────────────────────────────────────
//  THEME TOGGLE (top-right of main)
// ─────────────────────────────────────────────
function ThemeToggle() {
    const { isDark, setTheme, t } = useTheme();
    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`px-3 py-1.5 rounded-lg border transition-all duration-200 ${t.toggleBtn}`}
        >
            {isDark ? "$ theme --light" : "Switch to Dark"}
        </button>
    );
}


// ─────────────────────────────────────────────
//  MAIN AREA (placeholder only)
// ─────────────────────────────────────────────
function MainArea({ active }: { active: string }) {
    const { t, isDark } = useTheme();

    return (
        <main className={`flex-1 overflow-y-auto ${t.main} p-8`}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className={t.heading}>
                        {isDark ? `> ${active}` : active.charAt(0).toUpperCase() + active.slice(1)}
                    </h1>
                    <p className={t.subheading}>
                        {isDark
                            ? "# share and sync clipboard across all your devices"
                            : "Share and sync clipboard across all your devices"}
                    </p>
                </div>
                <ThemeToggle />
            </div>

            {/* Placeholder content */}
            <div className={`rounded-xl p-10 text-center ${t.placeholder}`}>
                {t.placeholderText(active)}
            </div>
        </main>
    );
}


// ─────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────
export default function DashboardsPage() {
    const [theme, setTheme] = useState<ThemeName>("light");
    const [active, setActive] = useState("clipboard");

    const t = THEMES[theme as ThemeName];
    const isDark = theme === "dark";

    return (
        <ThemeCtx.Provider value={{ theme, setTheme, t, isDark }}>
            <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#0d0d0d]" : "bg-neutral-100"}`}>
                <Sidebar active={active} setActive={setActive} />
                <MainArea active={active} />
            </div>
        </ThemeCtx.Provider>
    );
}