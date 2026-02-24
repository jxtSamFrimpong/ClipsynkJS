import { redirect } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';

const API_BASE = process.env.API_BASE_URL;
if (!API_BASE) throw new Error('[signUpAction] API_BASE_URL env variable is not set');

// ─────────────────────────────────────────────
//  SIGN UP ACTION
//  Receives a JSON body (submitted via useFetcher
//  with encType: "application/json"). Validates,
//  appends server-derived IP/ipType, then posts
//  the full payload to the backend. The backend
//  only takes inputs — all derivation happens here.
// ─────────────────────────────────────────────
export const signUpAction = async ({ request }: ActionFunctionArgs) => {
    let body: Record<string, any>;
    try {
        const formData = await request.formData();
        body = JSON.parse(formData.get("data") as string);
    } catch {
        return { error: 'err: invalid request body' };
    }

    const { firstName, lastName, email, password, device } = body;

    // ── server-side validation ──────────────────
    // confirm is validated client-side and never sent — not checked here
    if (!firstName || !email || !password) {
        return { error: 'err: all fields are required' };
    }

    const name = `${firstName.trim()} ${lastName.trim() ?? ''}`.trim();

    // ── derive client IP from request headers ───
    // x-forwarded-for may be a comma-separated list; take the first (original client)
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
        ?? request.headers.get('x-real-ip')
        ?? undefined;

    const ipType = rawIp?.includes(':') ? 'IPv6'
        : rawIp ? 'IPv4'
            : undefined;

    // Strip empty-string values from device — backend uses @IsOptional() @IsNotEmpty()
    // which means a field can be absent but cannot be an empty string.
    // Linux UA strings often produce osVersion: '' — omit it rather than sending ''.
    const cleanDevice = Object.fromEntries(
        Object.entries(device as Record<string, unknown>).filter(([, v]) => v !== '')
    );

    const payload = {
        name,
        email,
        password,
        device: {
            ...cleanDevice,
            ...(rawIp && { ip: rawIp }),
            ...(ipType && { ipType }),
        },
    };

    console.log('[signUpAction] signup attempt:', { name, email, device: payload.device });

    let res: Response;
    try {
        res = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch {
        return { error: 'err: could not reach the server' };
    }

    if (res.ok) {
        const setCookie = res.headers.get('set-cookie');
        console.debug('[signUpAction] signup successful, set-cookie:', setCookie);
        console.log('[signUpAction] signup successful, redirecting to dashboard');

        const response = redirect('/');
        if (setCookie) {
            (response as Response).headers.set('set-cookie', setCookie);
        }
        throw response;
    }

    // ── api error ───────────────────────────────
    // 5xx: server fault — don't expose internal detail to the user
    if (res.status >= 500) {
        console.log('[signUpAction] signup failed: server error', res.status);
        return { error: 'err: something went wrong, please try again' };
    }

    // 4xx: validation / business logic — surface the backend message
    let message = `err: signup failed (${res.status})`;
    try {
        const errBody = await res.json();
        if (typeof errBody?.message === 'string') message = `err: ${errBody.message}`;
        else if (Array.isArray(errBody?.message)) message = `err: ${errBody.message[0]}`;
    } catch { /* non-json error body — keep default */ }

    console.log('[signUpAction] signup failed:', message);
    return { error: message };
};
