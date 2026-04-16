import type { Route } from "./+types/clipboards";
import ClipboardsPage from "~/pages/clipboards/clipboards";
import { requireAuth } from '~/loaders/auth';

const API_BASE = process.env.API_BASE_URL;

// Loader function to fetch clipboards data and user information
export async function loader({ request }: Route.LoaderArgs) {
    const cookie = request.headers.get('cookie') ?? '';
    const user = await requireAuth(request);
    const res = await fetch(`${API_BASE}/clipboard`, {
        headers: {
            cookie,
            'Content-Type': 'application/json',
        }
    })

    const clipboards = await res.json()
    return { user, clipboards }
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