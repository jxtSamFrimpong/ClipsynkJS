// ─────────────────────────────────────────────
//  SECTION LABEL
//  "// label" pattern used as a header in every
//  section across the dashboard content area.
//  Defaults to white #FFFFFF at 12px.
// ─────────────────────────────────────────────
interface SectionLabelProps {
    label: string;
    color?: string;
    size?: number;
}

export default function SectionLabel({
    label,
    color = "#FFFFFF",
    size = 12,
}: SectionLabelProps) {
    return (
        <span
            className="font-mono"
            style={{ color, fontSize: size }}
        >
            // {label}
        </span>
    );
}
