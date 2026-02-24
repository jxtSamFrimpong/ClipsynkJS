import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import SyncItem from "./SyncItem";
import type { SyncItemData } from "./SyncItem";

// ─────────────────────────────────────────────
//  SYNC SECTION
//  "// sync_config" header + 4 config rows.
//  TODO: replace static data with API response.
// ─────────────────────────────────────────────
const SYNC_CONFIG: SyncItemData[] = [
    { id: "auto_sync",     label: "auto_sync",     value: "[on]",  valueColor: "#10B981" },
    { id: "encryption",    label: "encryption",    value: "[e2e]", valueColor: "#10B981" },
    { id: "notifications", label: "notifications", value: "[off]", valueColor: "#6B7280" },
    { id: "clipboard_ttl", label: "clipboard_ttl", value: "30d",   valueColor: "#F59E0B" },
];

export default function SyncSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="sync_config" color="#6B7280" size={11} />
            <div className="flex flex-col gap-2.5 w-full">
                {SYNC_CONFIG.map((item) => (
                    <SyncItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}
