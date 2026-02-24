// ─────────────────────────────────────────────
//  FORM FOOTER
//  Gray text + green action link. Shared by all
//  auth forms that have a single "switch page"
//  footer (login, signup, forgot, reset).
//  Verify Token has its own bespoke footer.
// ─────────────────────────────────────────────
interface FormFooterProps {
    text: string;
    linkLabel: string;
    onAction: () => void;
}

export default function FormFooter({ text, linkLabel, onAction }: FormFooterProps) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="font-mono text-[#6B7280] text-[13px]">{text}</span>
            <button
                type="button"
                onClick={onAction}
                className="cursor-pointer font-mono font-medium text-[13px] hover:opacity-80 transition-opacity"
                style={{ color: "#10B981", backgroundColor: "transparent" }}
            >
                {linkLabel}
            </button>
        </div>
    );
}
