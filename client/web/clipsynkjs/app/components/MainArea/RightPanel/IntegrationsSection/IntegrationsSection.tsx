import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import IntegrationItem from "./IntegrationItem";
import type { IntegrationItemData } from "./IntegrationItem";

// ─────────────────────────────────────────────
//  INTEGRATIONS SECTION
//  "// send_to" header + add button, integration
//  list, and auto-forward hint.
//  TODO: replace static data with API response.
// ─────────────────────────────────────────────
const INTEGRATIONS: IntegrationItemData[] = [
    { id: "email",    icon: "@",  label: "email@workspace.io", status: "→ fwd", statusColor: "#10B981" },
    { id: "discord",  icon: "#",  label: "discord/dev-team",   status: "→ fwd", statusColor: "#10B981" },
    { id: "telegram", icon: "↗",  label: "telegram/personal",  status: "→ fwd", statusColor: "#10B981" },
    { id: "slack",    icon: "□",  label: "slack/engineering",  status: "→ fwd", statusColor: "#10B981" },
    { id: "notion",   icon: "N",  label: "notion/workspace",   status: "→ off", statusColor: "#6B7280" },
];

export default function IntegrationsSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            {/* header */}
            <div className="flex items-center justify-between w-full">
                <SectionLabel label="send_to" color="#6B7280" size={11} />
                <button
                    type="button"
                    className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                    style={{ color: "#10B981", backgroundColor: "transparent" }}
                >
                    + add
                </button>
            </div>

            {/* integration list */}
            <div className="flex flex-col gap-2.5 w-full">
                {INTEGRATIONS.map((item) => (
                    <IntegrationItem key={item.id} {...item} />
                ))}
            </div>

            {/* auto-hint */}
            <div
                className="font-mono text-[11px] w-full"
                style={{
                    color: "#F59E0B",
                    border: "1px solid #1A1A1A",
                    padding: "8px 10px",
                }}
            >
                ~ auto-forward new clips
            </div>
        </div>
    );
}
