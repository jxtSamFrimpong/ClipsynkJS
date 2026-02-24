// ─────────────────────────────────────────────
//  TERMINAL BUTTON
//  Reusable button primitive for terminal-style
//  actions. Variant controls fill vs outline.
// ─────────────────────────────────────────────
interface TerminalButtonProps {
    icon: string;
    label: string;
    variant?: "filled" | "outline";
    onClick: () => void;
}

export default function TerminalButton({
    icon,
    label,
    variant = "filled",
    onClick,
}: TerminalButtonProps) {
    const base = "cursor-pointer flex items-center gap-2 h-11 px-6 font-mono text-sm transition-opacity hover:opacity-80";

    const variantClasses = {
        filled:  "font-semibold",
        outline: "",
    };

    // Inline styles carry the critical colors in the HTML bytes themselves,
    // before the CSS file is fetched — prevents FOUC on the buttons.
    const variantStyles: Record<string, React.CSSProperties> = {
        filled:  { backgroundColor: "#10B981", color: "#0A0A0A" },
        outline: { backgroundColor: "transparent", border: "1px solid #2a2a2a", color: "#FAFAFA" },
    };

    return (
        <button
            onClick={onClick}
            className={`${base} ${variantClasses[variant]}`}
            style={variantStyles[variant]}
        >
            <span className="font-bold text-base">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
