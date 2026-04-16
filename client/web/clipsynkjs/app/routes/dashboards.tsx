import type { Route } from "./+types/dashboards";
import DashboardsPage from "~/pages/dashboards/dashboardsPage";
import { requireAuth } from '~/loaders/auth';
import type { PaginatedClipboardResponse } from '~/types/clipboard';
import type { ClipData } from '~/components/MainArea/ClipsArea/ClipsList/ClipItem';
import { toClipData } from '~/utils/clipboard/clipboard.utils';
// import { addToClipboardAction } from "~/services/actions/addToClipboard";

export async function loader({ request }: Route.LoaderArgs) {
    const API_BASE = process.env.API_BASE_URL;
    const cookie = request.headers.get('cookie') ?? '';
    const user = await requireAuth(request);

    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '7';

    const clipboardRes = await fetch(`${API_BASE}/clipboard?page=${page}&limit=${limit}`, {
        headers: {
            cookie,
            'Content-Type': 'application/json',
        }
    })
    const devicesRes = await fetch(`${API_BASE}/devices`, {
        headers: {
            cookie,
            'Content-Type': 'application/json',
        }
    })

    const clipboardData: PaginatedClipboardResponse = await clipboardRes.json()
    const devices = await devicesRes.json()
    const clipboards: Omit<ClipData, 'isLast'>[] = clipboardData.data.map(toClipData)
    return {
        user, clipboards, devices, clipboardData: {
            total: clipboardData.total, page: Number(page), limit: Number(limit)
        }
    }
}

// export const actions = addToClipboardAction;


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ClipSynkJS" },
        { name: "description", content: "Welcome to ClipSynkJS!" },
    ];
}

export default function dashboards() {
    return (
        <DashboardsPage />
    )
}