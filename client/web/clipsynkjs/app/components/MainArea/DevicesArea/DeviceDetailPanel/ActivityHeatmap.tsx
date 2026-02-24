// ─────────────────────────────────────────────
//  ACTIVITY HEATMAP
//  "// activity_heatmap" section.
//  4 time-band rows × 7 day columns.
//  Intensity values 0–4 map to green heat colors:
//  0=#1A1A1A  1=#0D3320  2=#064E3B  3=#065F46  4=#10B981
//
//  TODO (API): activityHeatmap currently comes from
//  mock data in DevicesContext. Replace with:
//  GET /devices/:id/activity?range=7d
//  Response: { heatmap: number[][] } — same 4×7 shape,
//  values 0–4 (pre-normalized by the backend).
//  Backend computes this by bucketing SyncEvent rows
//  by dayOfWeek and Math.floor(hour / 6), then
//  normalizing counts to the 0–4 scale.
// ─────────────────────────────────────────────
import { useDevices } from '~/context/DevicesContext';

const DAYS        = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const ROW_LABELS  = ['00h', '06h', '12h', '18h'] as const;
const HEAT_COLORS = ['#1A1A1A', '#0D3320', '#064E3B', '#065F46', '#10B981'] as const;
const LEGEND      = [...HEAT_COLORS] as const;

export default function ActivityHeatmap() {
    const { selectedDevice } = useDevices();
    const heatmap = selectedDevice.activityHeatmap;

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* section header */}
            <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[12px]" style={{ color: "#FFFFFF" }}>
                    // activity_heatmap
                </span>
                <span className="font-mono text-[11px]" style={{ color: "#6B7280" }}>
                    last 7 days
                </span>
            </div>

            {/* grid */}
            <div
                className="flex flex-col gap-0.5 w-full"
                style={{ border: "1px solid #2A2A2A", padding: 16 }}
            >
                {/* day column labels */}
                <div className="flex gap-0.5 w-full" style={{ paddingLeft: 32 }}>
                    {DAYS.map((d) => (
                        <span
                            key={d}
                            className="font-mono text-center flex-1"
                            style={{ color: "#4B5563", fontSize: 9 }}
                        >
                            {d}
                        </span>
                    ))}
                </div>

                {/* time rows */}
                {ROW_LABELS.map((label, rowIdx) => (
                    <div key={label} className="flex gap-0.5 w-full">
                        {/* time label */}
                        <span
                            className="font-mono flex-shrink-0 flex items-center"
                            style={{
                                color: "#4B5563",
                                fontSize: 9,
                                width: 32,
                                lineHeight: "14px",
                            }}
                        >
                            {label}
                        </span>
                        {/* cells */}
                        {(heatmap[rowIdx] ?? [0,0,0,0,0,0,0]).map((intensity, colIdx) => (
                            <div
                                key={colIdx}
                                className="flex-1"
                                style={{
                                    height: 14,
                                    backgroundColor: HEAT_COLORS[Math.min(intensity, 4) as 0|1|2|3|4],
                                    borderRadius: 2,
                                }}
                            />
                        ))}
                    </div>
                ))}

                {/* legend */}
                <div className="flex items-center gap-1.5 justify-end w-full mt-1">
                    <span className="font-mono" style={{ color: "#4B5563", fontSize: 9 }}>
                        less
                    </span>
                    {LEGEND.map((fill) => (
                        <div
                            key={fill}
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: fill,
                                borderRadius: 2,
                            }}
                        />
                    ))}
                    <span className="font-mono" style={{ color: "#4B5563", fontSize: 9 }}>
                        more
                    </span>
                </div>
            </div>
        </div>
    );
}
