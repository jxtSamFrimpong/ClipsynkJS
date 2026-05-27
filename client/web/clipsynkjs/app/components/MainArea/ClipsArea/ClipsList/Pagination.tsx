import { useSearchParams } from "react-router";

// ─────────────────────────────────────────────
//  PAGINATION
//  [1] [2] [3] >> row centred below the clips
//  list. Active page is white, others are gray.
// ─────────────────────────────────────────────
export default function Pagination({
    currentPageId,
    totalPages
}: {
    currentPageId: number;
    totalPages: number;
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePage = (page: number | "next") => {
        let nextPage = page;
        if (page === "next") {
            nextPage = Math.min(currentPageId + 1, totalPages);
        }
        if (nextPage === currentPageId) return;

        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(nextPage));
        setSearchParams(newParams);
    };

    if (totalPages <= 1) return null;

    const pages = [];
    let startPage = Math.max(1, currentPageId - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    if (endPage - startPage < 2 && totalPages >= 3) {
        startPage = Math.max(1, endPage - 2);
    }
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 w-full">
            {pages.map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => handlePage(n)}
                    className="cursor-pointer font-mono text-[12px] font-bold transition-opacity hover:opacity-70"
                    style={{
                        color: n === currentPageId ? "#FAFAFA" : "#6B7280",
                        backgroundColor: "transparent",
                    }}
                >
                    [{n}]
                </button>
            ))}
            {currentPageId < totalPages && (
                <button
                    type="button"
                    onClick={() => handlePage("next")}
                    className="cursor-pointer font-mono text-[12px] transition-opacity hover:opacity-70"
                    style={{ color: "#6B7280", backgroundColor: "transparent" }}
                >
                    &gt;&gt;
                </button>
            )}
        </div>
    );
}
