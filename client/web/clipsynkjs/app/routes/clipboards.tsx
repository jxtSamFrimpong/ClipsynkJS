import type { Route } from "./+types/clipboards";
import ClipboardsPage from "~/pages/clipboards/clipboards";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ClipSynkJS" },
        { name: "description", content: "Clipboards" },
    ];
}

export default function Clipboards() {
    return (
        <ClipboardsPage />
    )
}