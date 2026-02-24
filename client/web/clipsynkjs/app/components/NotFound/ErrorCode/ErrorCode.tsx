// ─────────────────────────────────────────────
//  ERROR CODE
// ─────────────────────────────────────────────
export default function ErrorCode({ code = "404" }: { code?: string }) {
    return (
        <h1
            className="font-mono font-bold text-[#10B981] leading-none"
            style={{ fontSize: "120px", letterSpacing: "-4px" }}
        >
            {code}
        </h1>
    );
}
