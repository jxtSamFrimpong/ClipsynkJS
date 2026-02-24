import { DevicesProvider } from '~/context/DevicesContext';
import DevicesListArea from "./DevicesListArea/DevicesListArea";
import DeviceDetailPanel from "./DeviceDetailPanel/DeviceDetailPanel";

// ─────────────────────────────────────────────
//  DEVICES MAIN AREA
//  Two-column layout: device list (380px) +
//  device detail panel (fill remaining).
//  DevicesProvider owns selected device state
//  and mock data (→ API: GET /devices).
// ─────────────────────────────────────────────
export default function DevicesMainArea() {
    return (
        <DevicesProvider>
            <main
                className="flex flex-1 min-h-0 overflow-hidden"
                style={{ backgroundColor: "#0A0A0A" }}
            >
                <DevicesListArea />
                <DeviceDetailPanel />
            </main>
        </DevicesProvider>
    );
}
