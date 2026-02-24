import IntegrationsSection from "./IntegrationsSection/IntegrationsSection";
import DevicesSection from "./DevicesSection/DevicesSection";
import SyncSection from "./SyncSection/SyncSection";

// ─────────────────────────────────────────────
//  RIGHT PANEL
//  Fixed 300px column: integrations, devices,
//  and sync config stacked with dividers.
// ─────────────────────────────────────────────
export default function RightPanel() {
    return (
        <div
            className="flex flex-col gap-8 flex-shrink-0"
            style={{
                width: 300,
                borderLeft: "1px solid #2A2A2A",
                padding: "32px 24px",
            }}
        >
            <IntegrationsSection />

            <div style={{ height: 1, backgroundColor: "#1A1A1A" }} />

            <DevicesSection />

            <div style={{ height: 1, backgroundColor: "#1A1A1A" }} />

            <SyncSection />
        </div>
    );
}
