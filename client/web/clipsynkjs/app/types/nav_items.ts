// ─────────────────────────────────────────────
//  NAV CONFIG
// ─────────────────────────────────────────────
export type NavItem = { id: string; label: string; icon: string };

export const NAV_ITEMS: NavItem[] = [
    { id: "clipboard", label: "clipboard", icon: "◈" },
    { id: "devices",   label: "devices",   icon: "⊞" },
    { id: "history",   label: "history",   icon: "◎" },
    { id: "help",      label: "help",      icon: "?" },
];