// ─────────────────────────────────────────────
//  OVERVIEW STATS
//  4 bordered mini-stat chips: total, online,
//  idle, inactive — each with a label + value.
//  TODO (API): counts are derived from mock data in
//  DevicesContext. Replace with GET /devices/stats
//  or compute from the devices list response.
// ─────────────────────────────────────────────
import { useDevices } from '~/context/DevicesContext';

export default function OverviewStats() {
    const { totalCount, onlineCount, idleCount, inactiveCount } = useDevices();

    const STATS = [
        { label: 'total',    value: String(totalCount),    valueColor: '#FAFAFA' },
        { label: 'online',   value: String(onlineCount),   valueColor: '#10B981' },
        { label: 'idle',     value: String(idleCount),     valueColor: '#F59E0B' },
        { label: 'inactive', value: String(inactiveCount), valueColor: '#6B7280' },
    ];

    return (
        <div className="flex gap-2.5 w-full">
            {STATS.map((s) => (
                <div
                    key={s.label}
                    className="flex flex-col gap-0.5 flex-1"
                    style={{
                        border: "1px solid #2A2A2A",
                        padding: "10px 12px",
                    }}
                >
                    <span
                        className="font-mono"
                        style={{ color: "#6B7280", fontSize: 9 }}
                    >
                        {s.label}
                    </span>
                    <span
                        className="font-mono font-bold"
                        style={{ color: s.valueColor, fontSize: 18 }}
                    >
                        {s.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
