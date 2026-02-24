import AccountHeader from "./AccountHeader";
import AccountInfo from "./AccountInfo";
import AccountSyncSummary from "./AccountSyncSummary";
import AccountStorageSummary from "./AccountStorageSummary";
import AccountPrivacySummary from "./AccountPrivacySummary";
import AccountPlanSummary from "./AccountPlanSummary";
import AccountDangerSummary from "./AccountDangerSummary";

// ─────────────────────────────────────────────
//  ACCOUNT PAGE
//  Full-page scrollable overview of all profile
//  sections. Each section links to the detail
//  page via the profile nav.
// ─────────────────────────────────────────────
function Divider() {
    return <div style={{ height: 1, backgroundColor: "#1A1A1A", width: "100%" }} />;
}

export default function AccountPage() {
    return (
        <div className="flex flex-col gap-8 w-full" style={{ padding: 32 }}>
            <AccountHeader />
            <AccountInfo />
            <Divider />
            <AccountSyncSummary />
            <Divider />
            <AccountStorageSummary />
            <Divider />
            <AccountPrivacySummary />
            <Divider />
            <AccountPlanSummary />
            <Divider />
            <AccountDangerSummary />
        </div>
    );
}
