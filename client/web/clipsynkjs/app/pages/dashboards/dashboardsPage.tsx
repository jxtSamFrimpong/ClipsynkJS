import DashboardShell from "~/components/DashboardShell/DashboardShell";
import MainDashboardArea from "~/components/MainArea/MainDashboardArea";

// ─────────────────────────────────────────────
//  CLIPBOARD DASHBOARD PAGE
// ─────────────────────────────────────────────
export default function DashboardsPage() {
    return (
        <DashboardShell>
            <MainDashboardArea />
        </DashboardShell>
    );
}
