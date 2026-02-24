// ─────────────────────────────────────────────
//  AUTH BUTTON
//  Full-width primary action button for auth
//  forms. Always submit type.
// ─────────────────────────────────────────────
interface AuthButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function AuthButton({ label, onClick, disabled = false }: AuthButtonProps) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={disabled}
            className="cursor-pointer w-full h-11 font-mono font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#10B981", color: "#0A0A0A" }}
        >
            {label}
        </button>
    );
}
