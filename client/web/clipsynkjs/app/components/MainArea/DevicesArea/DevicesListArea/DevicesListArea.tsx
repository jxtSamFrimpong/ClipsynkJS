import DevicesHeader from "./DevicesHeader";
import OverviewStats from "./OverviewStats";
import DeviceList from "./DeviceList";

// ─────────────────────────────────────────────
//  DEVICES LIST AREA
//  Left column (380px): header, overview stats,
//  and the scrollable device list.
// ─────────────────────────────────────────────
export default function DevicesListArea() {
    return (
        <div
            className="flex flex-col gap-6 flex-shrink-0 min-h-0"
            style={{
                width: 380,
                borderRight: "1px solid #2A2A2A",
                padding: "32px 24px",
            }}
        >
            <DevicesHeader />
            <OverviewStats />
            <DeviceList />
        </div>
    );
}
