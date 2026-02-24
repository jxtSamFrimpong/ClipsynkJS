import { useState } from "react";
import SearchSection from "./SearchSection";
import FilterChip from "./FilterChip";

// ─────────────────────────────────────────────
//  FILTER BAR
//  Search input + 4 filter chips in a single
//  bordered 40px row. Owns search state —
//  filter values are static placeholders until
//  API is wired.
// ─────────────────────────────────────────────
export default function FilterBar() {
    const [search, setSearch] = useState("");

    const handleSearch = (value: string) => {
        console.log("[FilterBar] search:", value);
        setSearch(value);
    };

    return (
        <div
            className="flex items-center w-full"
            style={{ height: 40, border: "1px solid #2A2A2A" }}
        >
            <SearchSection value={search} onChange={handleSearch} />

            {/* TODO: make filter chips interactive when API is wired */}
            <FilterChip label="group:" value="all"  valueColor="#10B981" />
            <FilterChip label="type:"  value="any"  valueColor="#FAFAFA" />
            <FilterChip label="device:" value="all" valueColor="#FAFAFA" />
            <FilterChip label="range:" value="7d"   valueColor="#F59E0B" borderRight={false} />
        </div>
    );
}
