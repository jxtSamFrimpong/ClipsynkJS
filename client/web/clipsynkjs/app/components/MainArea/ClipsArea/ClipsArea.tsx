import PageHeader from "./PageHeader";
import PasteZone from "./PasteZone";
import FilterBar from "./FilterBar/FilterBar";
import ClipsList from "./ClipsList/ClipsList";
import StatsSection from "./StatsSection/StatsSection";

// ─────────────────────────────────────────────
//  CLIPS AREA
//  Left column of the dashboard: header, paste
//  zone, filter bar, clip list, and stat cards.
// ─────────────────────────────────────────────
export default function ClipsArea() {
    return (
        <div
            className="flex flex-col gap-6 flex-1 min-w-0"
            style={{ padding: "32px" }}
        >
            <PageHeader />
            <PasteZone />
            <FilterBar />
            <ClipsList />
            <StatsSection />
        </div>
    );
}
