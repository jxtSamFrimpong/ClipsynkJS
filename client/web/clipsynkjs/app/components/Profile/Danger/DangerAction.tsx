// ─────────────────────────────────────────────
//  DANGER ACTION
//  Bordered card with title + desc + button.
//  filled=true uses red background (delete account).
// ─────────────────────────────────────────────
export interface DangerActionProps {
    title: string;
    description: string;
    buttonLabel: string;
    filled?: boolean;
    extraContent?: React.ReactNode;
}

export default function DangerAction({ title, description, buttonLabel, filled, extraContent }: DangerActionProps) {
    return (
        <div
            className="flex flex-col gap-2.5 w-full"
            style={{
                border: "1px solid #EF4444",
                backgroundColor: filled ? "#1C0A0A" : "transparent",
                padding: 20,
            }}
        >
            <div className="flex items-center justify-between w-full">
                <span className="font-mono font-medium text-[14px]" style={{ color: "#FAFAFA" }}>{title}</span>
                <button
                    type="button"
                    className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70 flex-shrink-0"
                    style={{
                        color: filled ? "#FFFFFF" : "#EF4444",
                        backgroundColor: filled ? "#EF4444" : "transparent",
                        border: filled ? "none" : "1px solid #EF4444",
                        height: 34,
                        padding: "0 16px",
                        fontWeight: filled ? 600 : 400,
                    }}
                >
                    {buttonLabel}
                </button>
            </div>
            <p className="font-mono text-[11px]" style={{ color: filled ? "#9CA3AF" : "#6B7280", lineHeight: 1.5 }}>
                {description}
            </p>
            {extraContent}
        </div>
    );
}
