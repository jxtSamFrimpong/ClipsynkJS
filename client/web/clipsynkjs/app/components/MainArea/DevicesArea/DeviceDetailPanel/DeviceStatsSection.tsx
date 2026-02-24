// ─────────────────────────────────────────────
//  DEVICE STATS SECTION
//  "// device_stats" header + 4 stat cards.
//  TODO (API): stats come from selectedDevice.stats
//  in mock data. Replace with GET /devices/:id/stats
//  Response: { clipsSynced, lastSync, avgPerDay, storageUsed }
// ─────────────────────────────────────────────
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useDevices } from '~/context/DevicesContext';

export default function DeviceStatsSection() {
    const { selectedDevice } = useDevices();
    const s = selectedDevice.stats;

    const STATS = [
        { label: 'clips synced', value: s.clipsSynced.toLocaleString(), valueColor: '#10B981' },
        { label: 'last sync',    value: s.lastSync,                     valueColor: '#FAFAFA' },
        { label: 'avg/day',      value: String(s.avgPerDay),            valueColor: '#FAFAFA' },
        { label: 'storage used', value: s.storageUsed,                  valueColor: '#FAFAFA' },
    ];

    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="device_stats" />

            <div className="flex gap-2 w-full">
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col gap-1 flex-1"
                        style={{ border: "1px solid #2A2A2A", padding: 12 }}
                    >
                        <span
                            className="font-mono font-semibold"
                            style={{ color: stat.valueColor, fontSize: 18 }}
                        >
                            {stat.value}
                        </span>
                        <span
                            className="font-mono"
                            style={{ color: "#6B7280", fontSize: 10 }}
                        >
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
