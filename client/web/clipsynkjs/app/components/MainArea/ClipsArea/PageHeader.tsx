// ─────────────────────────────────────────────
//  PAGE HEADER
//  "> clipboard" title row + "$ paste" button.
// ─────────────────────────────────────────────
export default function PageHeader() {
    const handlePaste = () => {
        console.log("[PageHeader] $ paste clicked");
        // TODO: wire to clipboard paste action
    };

    return (
        <div className="flex items-center justify-between w-full">

            {/* title_row */}
            <div className="flex items-center gap-3">
                <span
                    className="font-mono font-bold"
                    style={{ color: "#10B981", fontSize: 28 }}
                >
                    &gt;
                </span>
                <span
                    className="font-mono font-bold text-[#FAFAFA]"
                    style={{ fontSize: 24 }}
                >
                    clipboard
                </span>
            </div>

            {/* btn_paste */}
            <button
                type="button"
                onClick={handlePaste}
                className="cursor-pointer flex items-center justify-center font-mono font-medium text-[12px] transition-opacity hover:opacity-90"
                style={{
                    backgroundColor: "#10B981",
                    color: "#0A0A0A",
                    height: 36,
                    padding: "0 16px",
                }}
            >
                $ paste
            </button>

        </div>
    );
}
