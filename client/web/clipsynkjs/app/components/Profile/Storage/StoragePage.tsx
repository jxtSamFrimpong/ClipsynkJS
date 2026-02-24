import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import StorageOverview from "./StorageOverview";
import RetentionSection from "./RetentionSection";
import DataExportSection from "./DataExportSection";

// ─────────────────────────────────────────────
//  STORAGE PAGE
// ─────────────────────────────────────────────
function Divider() {
    return <div style={{ height: 1, backgroundColor: "#1A1A1A", width: "100%" }} />;
}

export default function StoragePage() {
    return (
        <div className="flex flex-col gap-7 w-full" style={{ padding: 32 }}>
            <SectionLabel label="storage_&_history" size={16} />
            <StorageOverview />
            <Divider />
            <RetentionSection />
            <Divider />
            <DataExportSection />
        </div>
    );
}
