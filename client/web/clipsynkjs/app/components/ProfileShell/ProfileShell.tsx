import type { ReactNode } from "react";
import DashboardShell from "~/components/DashboardShell/DashboardShell";
import ProfileNav from "./ProfileNav";

// ─────────────────────────────────────────────
//  PROFILE SHELL
//  Extends DashboardShell with the profile nav
//  column (200px) + scrollable content slot.
//  Used by every /profile/* page.
// ─────────────────────────────────────────────
interface ProfileShellProps {
    children: ReactNode;
}

export default function ProfileShell({ children }: ProfileShellProps) {
    return (
        <DashboardShell>
            <div className="flex flex-1 min-h-0 overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
                <ProfileNav />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </DashboardShell>
    );
}
