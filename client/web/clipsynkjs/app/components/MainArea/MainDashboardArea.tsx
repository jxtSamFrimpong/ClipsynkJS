import ClipsArea from "./ClipsArea/ClipsArea";
import RightPanel from "./RightPanel/RightPanel";

// ─────────────────────────────────────────────
//  MAIN DASHBOARD AREA
//  Two-column layout: clips area (flex-1) +
//  right panel (300px fixed).
//  TODO: swap ClipsArea based on active nav tab.
// ─────────────────────────────────────────────
export default function MainDashboardArea() {
    return (
        <main
            className="flex flex-1 min-h-0 overflow-hidden"
            style={{ backgroundColor: "#0A0A0A" }}
        >
            <ClipsArea />
            <RightPanel />
        </main>
    );
}
