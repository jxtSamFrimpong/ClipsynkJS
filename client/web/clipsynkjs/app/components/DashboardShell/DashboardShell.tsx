import type { ReactNode } from "react";
import { DashboardProvider } from "~/context/DashboardContext";
import Sidebar from "~/components/SideBars/DashboardSideBar";

// ─────────────────────────────────────────────
//  DASHBOARD SHELL
//  Shared layout used by every dashboard page:
//  context provider + sidebar + content slot.
//  Each dashboard page passes its main area
//  as `children`.
// ─────────────────────────────────────────────
interface DashboardShellProps {
    children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
    return (
        <DashboardProvider>
            <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
                <Sidebar />
                {children}
            </div>
        </DashboardProvider>
    );
}
