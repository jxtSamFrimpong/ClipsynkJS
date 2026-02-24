// ─────────────────────────────────────────────
//  PAGINATION
//  [1] [2] [3] >> row centred below the clips
//  list. Active page is white, others are gray.
//  TODO: wire to real pagination state.
// ─────────────────────────────────────────────
export default function Pagination() {
    const handlePage = (page: number | "next") => {
        console.log("[Pagination] navigate to:", page);
        // TODO: wire to real page state
    };

    return (
        <div className="flex items-center justify-center gap-2 w-full">
            {[1, 2, 3].map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => handlePage(n)}
                    className="cursor-pointer font-mono text-[12px] font-bold transition-opacity hover:opacity-70"
                    style={{
                        color: n === 1 ? "#FAFAFA" : "#6B7280",
                        backgroundColor: "transparent",
                    }}
                >
                    [{n}]
                </button>
            ))}
            <button
                type="button"
                onClick={() => handlePage("next")}
                className="cursor-pointer font-mono text-[12px] transition-opacity hover:opacity-70"
                style={{ color: "#6B7280", backgroundColor: "transparent" }}
            >
                &gt;&gt;
            </button>
        </div>
    );
}
