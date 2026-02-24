import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import StatCard from "./StatCard";

// ─────────────────────────────────────────────
//  STATS SECTION
//  "// stats" label + 4 stat cards in a row.
//  TODO: replace static data with API response.
// ─────────────────────────────────────────────
const STATS = [
    { label: "total_clips",  value: "2,847", delta: "++12%",  deltaColor: "#10B981" },
    { label: "synced_today", value: "184",   delta: "++8%",   deltaColor: "#10B981" },
    { label: "devices",      value: "3",     delta: "online", deltaColor: "#10B981" },
    { label: "storage",      value: "128mb", delta: "64%",    deltaColor: "#F59E0B" },
] as const;

export default function StatsSection() {
    return (
        <div className="flex flex-col gap-2.5 w-full">
            <SectionLabel label="stats" color="#6B7280" size={11} />
            <div className="flex gap-3 w-full">
                {STATS.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>
        </div>
    );
}
