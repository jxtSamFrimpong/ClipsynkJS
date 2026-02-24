import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import ClipItem from "./ClipItem";
import type { ClipData } from "./ClipItem";
import Pagination from "./Pagination";

// ─────────────────────────────────────────────
//  CLIPS LIST
//  Section header + bordered clip rows +
//  pagination. Static placeholder data until
//  API is wired.
//  TODO: replace CLIPS with real API response.
// ─────────────────────────────────────────────
const CLIPS: Omit<ClipData, "isLast">[] = [
    {
        id: "c1",
        title: "The quick brown fox jumps over the lazy dog...",
        meta: "user ~ macbook_pro · 2m ago",
        badge: "[text]",
        color: "#10B981",
    },
    {
        id: "c2",
        title: "screenshot_2024_03.png",
        meta: "team ~ iphone_14 · 15m ago",
        badge: "[image]",
        color: "#06B6D4",
    },
    {
        id: "c3",
        title: "github.com/anthropic/claude-code",
        meta: "user ~ linux_desktop · 1h ago",
        badge: "[link]",
        color: "#10B981",
    },
    {
        id: "c4",
        title: "const handleSync = async () => { ... }",
        meta: "user ~ macbook_pro · 2h ago",
        badge: "[code]",
        color: "#A855F7",
    },
    {
        id: "c5",
        title: "project_specs_v3.pdf",
        meta: "design_team ~ ipad_pro · 3h ago",
        badge: "[file]",
        color: "#F472B6",
    },
];

export default function ClipsList() {
    return (
        <div className="flex flex-col gap-3 w-full flex-1">

            {/* section_header */}
            <div className="flex items-center justify-between w-full">
                <SectionLabel label="recent_clips" />
                <span
                    className="font-mono text-[12px]"
                    style={{ color: "#10B981" }}
                >
                    $ ls -la
                </span>
            </div>

            {/* clips_list — bordered container */}
            <div
                className="flex flex-col w-full flex-1"
                style={{ border: "1px solid #2A2A2A" }}
            >
                {CLIPS.map((clip, i) => (
                    <ClipItem
                        key={clip.id}
                        {...clip}
                        isLast={i === CLIPS.length - 1}
                    />
                ))}
            </div>

            <Pagination />

        </div>
    );
}
