// ─────────────────────────────────────────────
//  STEP ITEM
//  Single row in the password-reset step list.
//  active  → green number, light text
//  done    → dimmed number + text, green "done"
//  upcoming → dimmed number + text, no badge
// ─────────────────────────────────────────────
export type StepState = "active" | "done" | "upcoming";

interface StepItemProps {
    number: string;
    text: string;
    state: StepState;
}

export default function StepItem({ number, text, state }: StepItemProps) {
    const isActive = state === "active";
    const isDone   = state === "done";

    return (
        <div className="flex items-center gap-3">
            <span
                className="font-mono font-bold text-[13px]"
                style={{ color: isActive ? "#10B981" : "#4B5563" }}
            >
                {number}
            </span>
            <span
                className="font-mono text-[13px]"
                style={{
                    color: isActive ? "#9CA3AF" : "#4B5563",
                    fontFamily: "IBM Plex Mono",
                }}
            >
                {text}
            </span>
            {isDone && (
                <span
                    className="font-mono font-semibold text-[11px]"
                    style={{ color: "#10B981" }}
                >
                    done
                </span>
            )}
        </div>
    );
}
