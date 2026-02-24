import SessionStat from "./SessionStat";

// ─────────────────────────────────────────────
//  SESSION STATS
//  TODO: replace placeholder values with real
//  data from the API when auth is wired up
// ─────────────────────────────────────────────
export default function SessionStats() {
    return (
        <div className="flex flex-col gap-4">
            <SessionStat color="#10B981" text="3 devices synced" />
            <SessionStat color="#F59E0B" text="last sync: 2 min ago" />
            <SessionStat color="#6366F1" text="2,847 clips stored" />
        </div>
    );
}
