// ─────────────────────────────────────────────
//  TWO FA SECTION
// ─────────────────────────────────────────────
export default function TwoFASection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>two_factor_authentication</span>
            <div
                className="flex items-center justify-between w-full"
                style={{ backgroundColor: "#0D3320", border: "1px solid #10B981", padding: 14 }}
            >
                <div className="flex flex-col gap-1">
                    <span className="font-mono font-semibold text-[14px]" style={{ color: "#10B981" }}>totp enabled</span>
                    <span className="font-mono text-[10px]" style={{ color: "#9CA3AF" }}>
                        authenticator app configured · last verified 2 days ago
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                        style={{ color: "#9CA3AF", border: "1px solid #2A2A2A", height: 32, padding: "0 12px", backgroundColor: "transparent" }}
                    >
                        recovery codes
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer font-mono text-[11px] transition-opacity hover:opacity-70"
                        style={{ color: "#EF4444", border: "1px solid #EF4444", height: 32, padding: "0 12px", backgroundColor: "transparent" }}
                    >
                        disable
                    </button>
                </div>
            </div>
        </div>
    );
}
