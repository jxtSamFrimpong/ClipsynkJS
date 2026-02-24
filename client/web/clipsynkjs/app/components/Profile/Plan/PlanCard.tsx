// ─────────────────────────────────────────────
//  PLAN CARD
//  Displays a pricing tier (free / pro / team).
// ─────────────────────────────────────────────
export interface PlanCardData {
    badge: string;
    badgeColor: string;
    name: string;
    price: string;
    features: string[];
    featureColor: string;
    borderColor: string;
    bgColor?: string;
    action: { label: string; filled: boolean; color: string };
    onAction?: () => void;
}

export default function PlanCard({
    badge, badgeColor, name, price, features, featureColor,
    borderColor, bgColor, action, onAction,
}: PlanCardData) {
    return (
        <div
            className="flex flex-col gap-3 flex-1"
            style={{ border: `1px solid ${borderColor}`, backgroundColor: bgColor ?? "transparent", padding: 20 }}
        >
            <span className="font-mono text-[9px]" style={{ color: badgeColor }}>{badge}</span>
            <span className="font-mono font-bold text-[20px]" style={{ color: "#FAFAFA" }}>{name}</span>
            <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>{price}</span>
            <div style={{ height: 1, backgroundColor: "#1A1A1A" }} />
            {features.map((f) => (
                <span key={f} className="font-mono text-[11px]" style={{ color: featureColor }}>· {f}</span>
            ))}
            <button
                type="button"
                onClick={onAction}
                className="cursor-pointer font-mono font-semibold text-[12px] w-full transition-opacity hover:opacity-80 mt-2"
                style={{
                    color: action.filled ? "#0A0A0A" : "#9CA3AF",
                    backgroundColor: action.filled ? action.color : "transparent",
                    border: action.filled ? "none" : "1px solid #2A2A2A",
                    height: 38,
                }}
            >
                {action.label}
            </button>
        </div>
    );
}
