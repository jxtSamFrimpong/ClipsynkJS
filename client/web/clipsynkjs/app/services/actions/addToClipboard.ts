// ─────────────────────────────────────────────────────────────────────────────
//  OBSOLETE — DO NOT USE
//
//  Purpose (original):
//    Standalone action helper for creating clipboard events. It was designed to
//    be called from a React Router action or directly from a component to POST
//    clipboard data to the backend.
//
//  Why it is obsolete:
//    1. It targets a removed endpoint (`/clipboard/add`). The backend now
//       exposes `POST /clipboard` via ClipboardController.
//    2. It does not forward the session cookie, so JWT auth would fail.
//    3. Its payload shape is incomplete — only `content` and `deviceFingerprint`
//       are sent, but the backend DTO now requires `generatedAt`,
//       `clientTimestamp`, `mimeType`, and `contentSize` as well.
//    4. All of this functionality has been replaced by the route action exported
//       from `app/routes/dashboards.tsx`, which:
//         - Correctly forwards the cookie header for JWT auth.
//         - Sends the full CreateClipboardDto-compatible payload.
//         - Returns a discriminated { success } | { error } shape consumed
//           by PasteZone via useFetcher.
//         - Triggers loader revalidation on success automatically.
//
//  This file is kept for historical reference. It is entirely commented out
//  and has no imports anywhere in the codebase.
// ─────────────────────────────────────────────────────────────────────────────
//
// import type { ActionFunctionArgs } from "react-router";

// const API_BASE = process.env.API_BASE_URL;
// if (!API_BASE) throw new Error("[addToClipboard] API_BASE_URL env variable is not set");

// // ─────────────────────────────────────────────
// //  ADD TO CLIPBOARD ACTION
// //  Receives FormData with a JSON-stringified
// //  "data" field (submitted via useFetcher).
// //  Validates, forwards to the backend add_to_clipboard
// //  endpoint, and redirects to the dashboard on
// //  success. The backend sets the access_token
// //  httpOnly cookie on its response — the action
// //  passes it through via passthrough: true.
// // ─────────────────────────────────────────────
// export const addToClipboardAction = async ({ request }: ActionFunctionArgs) => {
//     let body: Record<string, any>;
//     try {
//         const formData = await request.formData();
//         body = JSON.parse(formData.get("data") as string);
//     } catch {
//         return { error: 'err: invalid request body' };
//     }

//     const { content, deviceFingerprint } = body;

//     // ── server-side validation ──────────────────
//     if (!content) {
//         return { error: 'err: content is required' };
//     }

//     const payload: Record<string, string> = {
//         content,
//         ...(deviceFingerprint && { deviceFingerprint }),
//     };

//     console.log('[addToClipboardAction] add to clipboard attempt:', { content });

//     let res: Response;
//     try {
//         res = await fetch(`${API_BASE}/clipboard/add`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//         });
//     } catch {
//         return { error: 'err: could not reach the server' };
//     }

//     if (res.ok) {
//         // Forward the Set-Cookie header from the backend so the browser
//         // receives the access_token httpOnly cookie
//         const setCookie = res.headers.get('set-cookie');
//         console.log('[addToClipboardAction] add to clipboard successful, redirecting to dashboard');

//         return { success: true };
//     }

//     // ── api error ───────────────────────────────
//     // 5xx: server fault — don't expose internal detail to the user
//     if (res.status >= 500) {
//         console.log('[addToClipboardAction] add to clipboard failed: server error', res.status);
//         return { error: 'err: something went wrong, please try again' };
//     }

//     // 4xx: validation / business logic — surface the backend message
//     let message = `err: add to clipboard failed (${res.status})`;
//     try {
//         const errBody = await res.json();
//         if (typeof errBody?.message === 'string') message = `err: ${errBody.message}`;
//         else if (Array.isArray(errBody?.message)) message = `err: ${errBody.message[0]}`;
//     } catch { /* non-json error body — keep default */ }

//     console.log('[addToClipboardAction] add to clipboard failed:', message);
//     return { error: message };
// };