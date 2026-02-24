// ─────────────────────────────────────────────
//  STAT CARD
//  Bordered card: dimmed label on top,
//  large value + colored delta side by side.
// ─────────────────────────────────────────────
interface StatCardProps {
    label: string;
    value: string;
    delta: string;
    deltaColor: string;
}

export default function StatCard({ label, value, delta, deltaColor }: StatCardProps) {
    return (
        <div
            className="flex flex-col gap-1.5 flex-1"
            style={{ border: "1px solid #2A2A2A", padding: "14px 16px" }}
        >
            <span
                className="font-mono text-[10px]"
                style={{ color: "#6B7280" }}
            >
                {label}
            </span>
            <div className="flex items-baseline gap-2">
                <span
                    className="font-mono font-bold text-[#FAFAFA]"
                    style={{ fontSize: 20 }}
                >
                    {value}
                </span>
                <span
                    className="font-mono text-[10px]"
                    style={{ color: deltaColor }}
                >
                    {delta}
                </span>
            </div>
        </div>
    );
}
