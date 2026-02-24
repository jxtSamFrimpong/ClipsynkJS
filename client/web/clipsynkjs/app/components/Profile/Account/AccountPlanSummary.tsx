import { useNavigate } from "react-router";
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useProfile } from "~/context/ProfileContext";

// ─────────────────────────────────────────────
//  ACCOUNT PLAN SUMMARY
//  Current plan card + pro features list.
// ─────────────────────────────────────────────
const PRO_FEATURES = [
    "unlimited devices & storage",
    "unlimited history retention",
    "priority sync & advanced auto-forward",
    "team clipgroups (up to 50 members)",
] as const;

export default function AccountPlanSummary() {
    const { profile } = useProfile();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="plan_&_billing" size={14} />

            {/* plan card */}
            <div
                className="flex items-center justify-between w-full"
                style={{ border: "1px solid #F59E0B", padding: 16 }}
            >
                <div className="flex flex-col gap-1">
                    <span className="font-mono font-semibold text-[14px]" style={{ color: "#FAFAFA" }}>
                        {profile.plan} tier
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: "#6B7280" }}>
                        5 devices · 5GB storage · 30d history
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/profile/plan")}
                    className="cursor-pointer font-mono font-semibold text-[12px] transition-opacity hover:opacity-80"
                    style={{ color: "#0A0A0A", backgroundColor: "#F59E0B", height: 34, padding: "0 16px" }}
                >
                    upgrade
                </button>
            </div>

            {/* pro features */}
            <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px]" style={{ color: "#6B7280" }}>pro includes:</span>
                {PRO_FEATURES.map((f) => (
                    <span key={f} className="font-mono text-[11px]" style={{ color: "#9CA3AF" }}>
                        &nbsp;&nbsp;· {f}
                    </span>
                ))}
            </div>
        </div>
    );
}
