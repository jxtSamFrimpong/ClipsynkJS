# Actions in ClipSynkJS — Setup Guide

This documents the exact pattern used in this project. Follow it for every new action.

---

## What an action is

A React Router action is a **server-side function** that handles mutations — form submissions, API calls that change state. It runs on the Node.js SSR server, never in the browser. It receives the incoming `Request` object and must either return data (shown to the form) or throw a redirect.

---

## Step 1 — Create the action file

Actions live in `app/services/actions/`. One file per action, named after what it does.

```ts
// app/services/actions/exampleAction.ts
import { redirect } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';

const API_BASE = process.env.API_BASE_URL;
if (!API_BASE) throw new Error('[exampleAction] API_BASE_URL env variable is not set');

export const exampleAction = async ({ request }: ActionFunctionArgs) => {
    // 1. Parse the body
    let body: Record<string, any>;
    try {
        const formData = await request.formData();
        body = JSON.parse(formData.get("data") as string);
    } catch {
        return { error: 'err: invalid request body' };
    }

    // 2. Validate
    const { field } = body;
    if (!field) return { error: 'err: field is required' };

    // 3. Call the backend
    let res: Response;
    try {
        res = await fetch(`${API_BASE}/some/endpoint`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ field }),
        });
    } catch {
        return { error: 'err: could not reach the server' };
    }

    // 4. Handle response
    if (res.ok) {
        throw redirect('/some/route');
    }

    // 5. Surface API errors
    let message = `err: request failed (${res.status})`;
    try {
        const errBody = await res.json();
        if (typeof errBody?.message === 'string') message = `err: ${errBody.message}`;
        else if (Array.isArray(errBody?.message)) message = `err: ${errBody.message[0]}`;
    } catch { /* non-json error body — keep default */ }

    return { error: message };
};
```

**Rules:**
- Always export a named `const`, not a default export
- Use `ActionFunctionArgs` from `'react-router'` — not route-specific generated types, since the action is defined outside the route file
- `API_BASE` check at module load — fails loudly at startup rather than silently at runtime
- Return `{ error: string }` for all failure paths, `throw redirect(path)` for success
- Never `return redirect(...)` — always `throw` it

---

## Step 2 — Register the action on the route file

Route files are thin wrappers. The action export is the only addition needed.

```ts
// app/routes/example.tsx
import ExamplePage from "~/pages/Example/ExamplePage";
import { exampleAction } from "~/services/actions/exampleAction";

export const action = exampleAction;

export default function Example() {
    return <ExamplePage />;
}
```

---

## Step 3 — Submit from the component using `useFetcher`

The form component uses `useFetcher` (not `<Form>`) because the payload is complex or structured. Simple flat string forms could use `<Form method="post">` directly, but `useFetcher` is the standard here.

```tsx
import { useFetcher, useNavigation } from "react-router";
import type { exampleAction } from "~/services/actions/exampleAction";

export default function ExampleForm() {
    const fetcher    = useFetcher<typeof exampleAction>();
    const navigation = useNavigation();

    const [field, setField] = useState("");

    const loading    = fetcher.state !== "idle" || navigation.state !== "idle";
    const actionData = fetcher.data;

    const handleSubmit = () => {
        console.log("[ExampleForm] submit:", { field });

        // client-side guards (block silently — UI already shows the error)
        if (!field) return;

        const fd = new FormData();
        fd.set("data", JSON.stringify({ field }));
        fetcher.submit(fd, { method: "post" });
    };

    return (
        <div>
            <input value={field} onChange={(e) => setField(e.target.value)} />

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "submitting..." : "./submit"}
            </button>

            {actionData?.error && (
                <p style={{ color: "#EF4444" }}>{actionData.error}</p>
            )}
        </div>
    );
}
```

**Why `FormData` with a stringified `"data"` field instead of `encType: "application/json"`:**

`fetcher.submit` accepts a `SubmitTarget` type. React Router's `JsonValue` constraint (used for JSON submissions) requires all values to satisfy `{ [key: string]: JsonValue }` with an explicit index signature. Named TypeScript interfaces don't satisfy this even when all their properties are individually valid JSON — TypeScript can't verify arbitrary key access. `FormData` is an unambiguous member of `SubmitTarget` with no such constraint. The action reads the payload back with `JSON.parse(formData.get("data"))`, which is functionally identical.

---

## Step 4 — Handle cookies (authenticated routes only)

When the backend sets a cookie on its response (e.g., login), the action must forward it explicitly. The SSR server is the one making the backend fetch — the browser never sees the backend response directly.

```ts
if (res.ok) {
    const setCookie = res.headers.get('set-cookie');
    const response  = redirect('/');
    if (setCookie) {
        (response as Response).headers.set('set-cookie', setCookie);
    }
    throw response;
}
```

For protected routes that forward the session cookie to the backend:

```ts
res = await fetch(`${API_BASE}/some/endpoint`, {
    headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
    },
    // ...
});
```

---

## Step 5 — Protect routes with loaders

Actions handle writes. Loaders handle reads and access control. Use `requireAuth` / `requireGuest` from `app/loaders/auth.ts`:

```ts
// app/routes/protected.tsx
import { requireAuth } from '~/loaders/auth';
import { someAction }  from '~/services/actions/someAction';

export async function loader({ request }: { request: Request }) {
    return requireAuth(request); // redirects to /auth/login if no session
}

export const action = someAction;
```

---

## Full file map for one action

```
app/
├── services/
│   └── actions/
│       └── exampleAction.ts     ← action logic (server)
├── components/
│   └── .../
│       └── ExampleForm.tsx      ← useFetcher + submit (browser)
├── pages/
│   └── Example/
│       └── ExamplePage.tsx      ← assembles the form component
└── routes/
    └── example.tsx              ← export action + export default page
```

---

## What goes where

| Concern | Where |
|---|---|
| Fetch to backend API | Action (`app/services/actions/`) |
| Redirect on success | Action — `throw redirect(path)` |
| Cookie forwarding | Action |
| IP / server-side metadata | Action — read from `request.headers` |
| Field presence validation | Action (last line of defence) |
| Format validation (email, password) | Component — reactive, shown inline |
| Cross-field validation (confirm ≠ password) | Component — reactive, shown inline |
| Device fingerprint | Component — browser APIs, collected at `handleSubmit` |
| Loading state | Component — `fetcher.state !== "idle"` |
| Error display | Component — `fetcher.data?.error` |
