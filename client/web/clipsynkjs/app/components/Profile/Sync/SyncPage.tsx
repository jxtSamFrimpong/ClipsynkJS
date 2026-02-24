import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import SyncModeSection from "./SyncModeSection";
import EncryptionSection from "./EncryptionSection";
import BandwidthSection from "./BandwidthSection";
import ConnectionStatusSection from "./ConnectionStatusSection";

// ─────────────────────────────────────────────
//  SYNC PAGE
// ─────────────────────────────────────────────
function Divider() {
    return <div style={{ height: 1, backgroundColor: "#1A1A1A", width: "100%" }} />;
}

export default function SyncPage() {
    return (
        <div className="flex flex-col gap-7 w-full" style={{ padding: 32 }}>
            <SectionLabel label="sync_&_connectivity" size={16} />
            <SyncModeSection />
            <Divider />
            <EncryptionSection />
            <Divider />
            <BandwidthSection />
            <Divider />
            <ConnectionStatusSection />
        </div>
    );
}
