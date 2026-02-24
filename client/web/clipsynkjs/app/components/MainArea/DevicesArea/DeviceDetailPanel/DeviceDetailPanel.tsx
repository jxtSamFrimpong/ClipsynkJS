import DetailHeader from "./DetailHeader";
import ActivityHeatmap from "./ActivityHeatmap";
import DeviceStatsSection from "./DeviceStatsSection";
import ClipGroupsSection from "./ClipGroupsSection";
import SyncPrefsSection from "./SyncPrefsSection";

// ─────────────────────────────────────────────
//  DEVICE DETAIL PANEL
//  Right column (fill): detail for the selected
//  device — header, activity heatmap, stats,
//  clip groups, and sync preferences.
// ─────────────────────────────────────────────
export default function DeviceDetailPanel() {
    return (
        <div
            className="flex flex-col gap-6 flex-1 min-w-0 overflow-y-auto"
            style={{ padding: 32 }}
        >
            <DetailHeader />
            <ActivityHeatmap />
            <DeviceStatsSection />
            <ClipGroupsSection />
            <SyncPrefsSection />
        </div>
    );
}
