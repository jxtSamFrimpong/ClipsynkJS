import DashboardShell from "~/components/DashboardShell/DashboardShell";
import DevicesMainArea from "~/components/MainArea/DevicesArea/DevicesMainArea";

// ─────────────────────────────────────────────
//  DEVICES DASHBOARD PAGE
// ─────────────────────────────────────────────
export default function DevicesDashboardPage() {
    return (
        <DashboardShell>
            <DevicesMainArea />
        </DashboardShell>
    );
}
