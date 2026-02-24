import type { Route } from "./+types/clipboards";
import ClipboardsPage from "~/pages/clipboards/clipboards";
import { requireAuth } from '~/loaders/auth';

export async function loader({ request }: Route.LoaderArgs) {
    return requireAuth(request);
}


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