import { DashboardProvider } from "~/context/DashboardContext";
import MainDashboardArea from "~/components/MainArea/MainDashboardArea";
import Sidebar from "~/components/SideBars/DashboardSideBar";

// ─────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────
export default function DashboardsPage() {
    return (
        <DashboardProvider>
            <div className="flex h-screen overflow-hidden bg-[#0d0d0d]">
                <Sidebar />
                <MainDashboardArea />
            </div>
        </DashboardProvider>
    );
}
