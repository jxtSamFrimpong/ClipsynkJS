import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import DeviceItem from "./DeviceItem";
import type { DeviceItemData } from "./DeviceItem";

// ─────────────────────────────────────────────
//  DEVICES SECTION
//  "// connected_devices" header + 3 device rows.
//  TODO: replace static data with API response.
// ─────────────────────────────────────────────
const DEVICES: DeviceItemData[] = [
    {
        id: "macbook",
        name: "macbook_pro",
        status: "active now",
        dotColor: "#10B981",
        statusColor: "#10B981",
    },
    {
        id: "iphone",
        name: "iphone_14",
        status: "synced 2m ago",
        dotColor: "#10B981",
        statusColor: "#6B7280",
    },
    {
        id: "linux",
        name: "linux_desktop",
        status: "idle · 15m",
        dotColor: "#F59E0B",
        statusColor: "#F59E0B",
    },
];

export default function DevicesSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="connected_devices" color="#6B7280" size={11} />
            <div className="flex flex-col gap-2.5 w-full">
                {DEVICES.map((device) => (
                    <DeviceItem key={device.id} {...device} />
                ))}
            </div>
        </div>
    );
}
