import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import TwoFASection from "./TwoFASection";
import SessionsSection from "./SessionsSection";
import PrivacyControlsSection from "./PrivacyControlsSection";

// ─────────────────────────────────────────────
//  PRIVACY PAGE
// ─────────────────────────────────────────────
function Divider() {
    return <div style={{ height: 1, backgroundColor: "#1A1A1A", width: "100%" }} />;
}

export default function PrivacyPage() {
    return (
        <div className="flex flex-col gap-7 w-full" style={{ padding: 32 }}>
            <SectionLabel label="privacy_&_security" size={16} />
            <TwoFASection />
            <Divider />
            <SessionsSection />
            <Divider />
            <PrivacyControlsSection />
        </div>
    );
}
