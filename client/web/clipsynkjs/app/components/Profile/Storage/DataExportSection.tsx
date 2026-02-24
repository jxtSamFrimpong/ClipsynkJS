// ─────────────────────────────────────────────
//  DATA EXPORT SECTION
// ─────────────────────────────────────────────
export default function DataExportSection() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="font-mono text-[12px]" style={{ color: "#9CA3AF" }}>data_export</span>
            <p className="font-mono text-[11px]" style={{ color: "#6B7280", lineHeight: 1.4 }}>
                download a complete archive of your clipboard history, settings, and metadata
            </p>
            <div className="flex gap-2">
                {["export .json", "export .csv"].map((label) => (
                    <button
                        key={label}
                        type="button"
                        className="cursor-pointer flex items-center gap-1.5 font-mono text-[11px] transition-opacity hover:opacity-70"
                        style={{ color: "#9CA3AF", border: "1px solid #2A2A2A", height: 34, padding: "0 14px", backgroundColor: "transparent" }}
                    >
                        ↓ {label}
                    </button>
                ))}
            </div>
            <span className="font-mono text-[10px]" style={{ color: "#4B5563" }}>
                last export: feb 15, 2026 · 847 clips · 1.2GB
            </span>
        </div>
    );
}
