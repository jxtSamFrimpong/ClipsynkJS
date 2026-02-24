// ─────────────────────────────────────────────
//  SEARCH SECTION
//  "/" vim-style prefix + text input. Fills the
//  remaining width of the filter bar; right
//  border separates it from the filter chips.
// ─────────────────────────────────────────────
interface SearchSectionProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchSection({ value, onChange }: SearchSectionProps) {
    return (
        <div
            className="flex items-center gap-2 flex-1 h-full px-3"
            style={{ borderRight: "1px solid #2A2A2A" }}
        >
            <span
                className="font-mono font-bold text-[13px]"
                style={{ color: "#10B981" }}
            >
                /
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="search clips..."
                className="flex-1 font-mono text-[12px] text-[#FAFAFA] placeholder:text-[#4B5563] focus:outline-none"
                style={{ backgroundColor: "transparent" }}
            />
        </div>
    );
}
