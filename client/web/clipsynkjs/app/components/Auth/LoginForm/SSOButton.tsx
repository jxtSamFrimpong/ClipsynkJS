import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  SSO BUTTON
//  Single OAuth provider button. Accepts any
//  icon (string or ReactNode) + a label.
//  Border/bg via inline styles to prevent FOUC.
// ─────────────────────────────────────────────
interface SSOButtonProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}

export default function SSOButton({ icon, label, onClick }: SSOButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer flex items-center justify-center gap-2 h-full w-full font-mono text-[13px] text-[#FAFAFA] transition-opacity hover:opacity-80"
            style={{ border: "1px solid #2a2a2a", backgroundColor: "transparent" }}
        >
            <span className="font-bold text-base leading-none">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
