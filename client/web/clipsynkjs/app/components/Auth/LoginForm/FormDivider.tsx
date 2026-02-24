// ─────────────────────────────────────────────
//  FORM DIVIDER
//  Horizontal rule with centred "or" text.
//  Lines via inline style to prevent FOUC.
// ─────────────────────────────────────────────
export default function FormDivider() {
    return (
        <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a2a" }} />
            <span className="font-mono text-[#6B7280] text-xs">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a2a" }} />
        </div>
    );
}
