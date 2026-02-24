import { redirect } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';

const API_BASE = process.env.API_BASE_URL;
if (!API_BASE) throw new Error('[loginAction] API_BASE_URL env variable is not set');

// ─────────────────────────────────────────────
//  LOGIN ACTION
//  Receives FormData with a JSON-stringified
//  "data" field (submitted via useFetcher).
//  Validates, forwards to the backend login
//  endpoint, and redirects to the dashboard on
//  success. The backend sets the access_token
//  httpOnly cookie on its response — the action
//  passes it through via passthrough: true.
// ─────────────────────────────────────────────
export const loginAction = async ({ request }: ActionFunctionArgs) => {
    let body: Record<string, any>;
    try {
        const formData = await request.formData();
        body = JSON.parse(formData.get("data") as string);
    } catch {
        return { error: 'err: invalid request body' };
    }

    const { email, password, deviceFingerprint } = body;

    // ── server-side validation ──────────────────
    if (!email || !password) {
        return { error: 'err: email and password are required' };
    }

    const payload: Record<string, string> = {
        email,
        password,
        ...(deviceFingerprint && { deviceFingerprint }),
    };

    console.log('[loginAction] login attempt:', { email });

    let res: Response;
    try {
        res = await fetch(`${API_BASE}/auth/login`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
        });
    } catch {
        return { error: 'err: could not reach the server' };
    }

    if (res.ok) {
        // Forward the Set-Cookie header from the backend so the browser
        // receives the access_token httpOnly cookie
        const setCookie = res.headers.get('set-cookie');
        console.log('[loginAction] login successful, redirecting to dashboard');

        const response = redirect('/');
        if (setCookie) {
            (response as Response).headers.set('set-cookie', setCookie);
        }
        throw response;
    }

    // ── api error ───────────────────────────────
    // 5xx: server fault — don't expose internal detail to the user
    if (res.status >= 500) {
        console.log('[loginAction] login failed: server error', res.status);
        return { error: 'err: something went wrong, please try again' };
    }

    // 4xx: validation / business logic — surface the backend message
    let message = `err: login failed (${res.status})`;
    try {
        const errBody = await res.json();
        if (typeof errBody?.message === 'string') message = `err: ${errBody.message}`;
        else if (Array.isArray(errBody?.message)) message = `err: ${errBody.message[0]}`;
    } catch { /* non-json error body — keep default */ }

    console.log('[loginAction] login failed:', message);
    return { error: message };
};
