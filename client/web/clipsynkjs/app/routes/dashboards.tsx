import type { Route } from "./+types/dashboards";
import DashboardsPage from "~/pages/dashboards/dashboardsPage";
import { requireAuth } from '~/loaders/auth';
import type { PaginatedClipboardResponse } from '~/types/clipboard';
import type { ClipData } from '~/components/MainArea/ClipsArea/ClipsList/ClipItem';
import { toClipData } from '~/utils/clipboard/clipboard.utils';

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

/**
 * Route action — handles POST submissions to /dashboards.
 *
 * Triggered by PasteZone via `fetcher.submit({ data: JSON.stringify({...}) }, { method: 'POST' })`.
 * The clipboard payload arrives as a JSON string inside the `data` FormData key.
 *
 * Responsibilities:
 *   1. Parse the `data` field from FormData and deserialize the JSON payload.
 *   2. Forward the request Cookie header to the backend so the JWT session is preserved.
 *   3. POST the deserialized payload to `API_BASE/clipboard` as JSON.
 *   4. Normalize all outcomes into a plain object so `fetcher.data` can be read
 *      by PasteZone without triggering a navigation event.
 *
 * Return shape (discriminated by presence of `success` or `error`):
 *   { success: true }                        — 2xx from backend
 *   { error: 'invalid request body' }        — FormData `data` field missing or not valid JSON
 *   { error: 'server error, try again' }     — backend responded with 5xx
 *   { error: string }                        — backend responded with 4xx; message extracted
 *                                              from backend's { message: string | string[] } body
 *   { error: 'could not reach the server' }  — fetch itself threw (network failure, timeout, etc.)
 */
export async function action({ request }: Route.ActionArgs) {
    const API_BASE = process.env.API_BASE_URL;
    const cookie = request.headers.get('cookie') ?? '';

    // Step 1: Extract and deserialize the JSON payload from FormData.
    let body: unknown;
    try {
        const formData = await request.formData();
        body = JSON.parse(formData.get('data') as string);
    } catch {
        return { error: 'invalid request body' };
    }

    // Step 2: Forward to backend, passing the session cookie for JWT auth.
    try {
        const res = await fetch(`${API_BASE}/clipboard`, {
            method: 'POST',
            headers: { cookie, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (res.ok) return { success: true };

        if (res.status >= 500) return { error: 'server error, try again' };

        // 4xx — backend sends { message: string | string[] }
        const { message } = await res.json();
        return { error: Array.isArray(message) ? message[0] : message };
    } catch {
        return { error: 'could not reach the server' };
    }
}

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