// ─────────────────────────────────────────────
//  PASSWORD REQUIREMENTS
//  Static checklist block shown under the
//  password fields on the Reset Password form.
//  Green "+" prefix, bordered container.
// ─────────────────────────────────────────────
const REQUIREMENTS = [
    "min 8 characters",
    "one uppercase letter",
    "one number or symbol",
] as const;

export default function PasswordRequirements() {
    return (
        <div
            className="flex flex-col gap-2 w-full"
            style={{ border: "1px solid #1a1a1a", padding: 16 }}
        >
            <p
                className="font-mono text-[12px]"
                style={{ color: "#4B5563", fontFamily: "IBM Plex Mono" }}
            >
                # password requirements:
            </p>
            <div className="flex flex-col gap-1.5">
                {REQUIREMENTS.map((req) => (
                    <div key={req} className="flex items-center gap-2">
                        <span
                            className="font-mono font-bold text-[12px] leading-none"
                            style={{ color: "#10B981" }}
                        >
                            +
                        </span>
                        <span
                            className="font-mono text-[12px]"
                            style={{ color: "#6B7280", fontFamily: "IBM Plex Mono" }}
                        >
                            {req}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
