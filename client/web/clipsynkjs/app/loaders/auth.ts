import { redirect } from 'react-router'

const API_BASE = process.env.API_BASE_URL;
if (!API_BASE) throw new Error('[auth.loader] API_BASE_URL env variable is not set');

export const requireAuth = async (request: Request) => {
    console.log('[auth.loader] requireAuth: checking session');
    console.debug('[auth.loader] requireAuth: cookie header:', request.headers.get('cookie'));
    const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { cookie: request.headers.get('cookie') ?? '' },
    });

    if (!res.ok) {
        console.log('[auth.loader] requireAuth: not authenticated, redirecting to login');
        throw redirect('/auth/login');
    }

    return res.json();
}

export const requireGuest = async (request: Request) => {
    console.log('[auth.loader] requireGuest: checking session');
    const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { cookie: request.headers.get('cookie') ?? '' },
    });

    if (res.ok) {
        console.log('[auth.loader] requireGuest: already authenticated, redirecting to dashboard');
        throw redirect('/');
    }
    return null;
}