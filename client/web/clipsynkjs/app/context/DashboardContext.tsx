import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
interface DashboardContextValue {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

// ─────────────────────────────────────────────
//  CONTEXT
// ─────────────────────────────────────────────
const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

// ─────────────────────────────────────────────
//  PROVIDER
// ─────────────────────────────────────────────
export function DashboardProvider({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    function toggleCollapsed() {
        setCollapsed((prev) => !prev);
    }

    return (
        <DashboardContext.Provider value={{ collapsed, toggleCollapsed }}>
            {children}
        </DashboardContext.Provider>
    );
}

// ─────────────────────────────────────────────
//  HOOK
// ─────────────────────────────────────────────
export function useDashboard(): DashboardContextValue {
    const ctx = useContext(DashboardContext);
    if (ctx === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return ctx;
}
