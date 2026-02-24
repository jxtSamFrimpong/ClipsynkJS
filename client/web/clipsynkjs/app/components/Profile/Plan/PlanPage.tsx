import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import PlanCard from "./PlanCard";
import type { PlanCardData } from "./PlanCard";

// ─────────────────────────────────────────────
//  PLAN PAGE
//  Three plan cards (free/pro/team) + billing.
// ─────────────────────────────────────────────
const PLANS: PlanCardData[] = [
    {
        badge: "[current plan]", badgeColor: "#10B981",
        name: "free", price: "$0 / month",
        features: ["5 devices", "5 GB storage", "30 day history", "3 clipgroups", "basic integrations", "e2e encryption"],
        featureColor: "#9CA3AF",
        borderColor: "#10B981", bgColor: "#0D3320",
        action: { label: "current plan", filled: false, color: "#10B981" },
    },
    {
        badge: "[recommended]", badgeColor: "#F59E0B",
        name: "pro", price: "$8 / month",
        features: ["unlimited devices", "unlimited storage", "unlimited history", "unlimited clipgroups", "advanced auto-forward", "priority sync", "team clipgroups (50 members)"],
        featureColor: "#FAFAFA",
        borderColor: "#F59E0B",
        action: { label: "upgrade to pro", filled: true, color: "#F59E0B" },
    },
    {
        badge: "[enterprise]", badgeColor: "#A855F7",
        name: "team", price: "custom pricing",
        features: ["everything in pro", "SSO / SAML", "audit logs", "admin dashboard", "SLA & priority support"],
        featureColor: "#9CA3AF",
        borderColor: "#2A2A2A",
        action: { label: "contact sales", filled: false, color: "#2A2A2A" },
    },
];

export default function PlanPage() {
    return (
        <div className="flex flex-col gap-7 w-full" style={{ padding: 32 }}>
            <SectionLabel label="plan_&_billing" size={16} />

            {/* plan cards */}
            <div className="flex gap-4 w-full">
                {PLANS.map((p) => (
                    <PlanCard key={p.name} {...p} />
                ))}
            </div>

            <div style={{ height: 1, backgroundColor: "#1A1A1A" }} />

            {/* billing history */}
            <div className="flex flex-col gap-3">
                <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>billing_history</span>
                <span className="font-mono text-[12px]" style={{ color: "#4B5563" }}>
                    no billing history — you're on the free tier
                </span>
            </div>
        </div>
    );
}
