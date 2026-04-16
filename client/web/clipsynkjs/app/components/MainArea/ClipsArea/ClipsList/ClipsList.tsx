import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import ClipItem from "./ClipItem";
import type { ClipData } from "./ClipItem";
import Pagination from "./Pagination";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/dashboards"


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
        title: "github.com/anthropic/claude-code", //TODO: if its a media or a file, it'll pick up the filename, else its a summary of the content
        meta: "user ~ linux_desktop · 1h ago", // TODO: add real meta combines data from clipboard event like createdAt, device name, and clipgroup name
        badge: "[link]", //TODO: the badge is generated from the content mimetype, for text based content the badge is generated from analysing the code, to tell if its just text or link or code dependig of if its a valid link or could pass as a codeblock (probably AI assistance), if its a file, we can tell if its an image, video ... any other file
        color: "#10B981", //TODO: the color would be determined in the frontend, from what the badge is
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
    {
        id: "c6",
        title: "intro_demo_v2.mp4",
        meta: "user ~ linux_desktop · 4h ago",
        badge: "[video]",
        color: "#F472B6",
    },
    {
        id: "c7",
        title: "npm install @anthropic-ai/sdk",
        meta: "user ~ macbook_pro · 5h ago",
        badge: "[code]",
        color: "#A855F7",
    },
];



export default function ClipsList() {
    console.info(`[ClipsList] about to render`)
    console.info(`[ClipsList] about to retrieve data`)
    const { user, devices, clipboards, total, page, limit } = useLoaderData<typeof loader>();
    const totalPages = Math.ceil(total / limit);

    console.debug(`[ClipsList] user retrieved`, user)
    console.debug(`[ClipsList] devices retrieved`, devices)
    console.debug(`[ClipsList] user clipboards retrieved`, clipboards)
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
                {clipboards.map((clip, i) => (
                    <ClipItem
                        key={clip.id}
                        {...clip}
                        isLast={i === clipboards.length - 1}
                    />
                ))}
            </div>

            <Pagination currentPageId={page} totalPages={totalPages} />

        </div>
    );
}
