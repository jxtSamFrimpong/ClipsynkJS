# ClipSynkJS Web Client — Session Memory Index

> Full detail in `clipsynk-web-spec.md`. This file is the quick-reference index.

## What this project is
ClipSync web client — Phase 5 of a multi-platform clipboard sync product.
React Router v7 + TypeScript + Tailwind v4 + Vite (SSR mode).
Dark terminal aesthetic throughout. No UI library. No icon library.

## Spec doc
→ Read `.agents/clipsynk-web-spec.md` for full architecture, philosophy, and decisions.

## Stack at a glance
- Framework: React Router v7 (framework mode, SSR)
- Styling: Tailwind v4 (`@import "tailwindcss"` in app.css)
- Language: TypeScript
- Runtime: Node.js via Vite dev server

## Critical conventions
- All dirs/files: TitleCase (`NotFound/`, `DashboardSideBar.tsx`, `NotFoundPage.tsx`)
- Route files: lowercase matching URL segment (`dashboards.tsx`, `clipboards.tsx`, `NotFound.tsx`)
- Every page lives in `app/pages/<PageName>/<PageName>Page.tsx`
- Every component lives in `app/components/<Group>/<SubGroup>/<Component>.tsx`
- Context files live in `app/context/`
- **ALL** `<button>` elements and `onClick` divs must have `cursor-pointer` Tailwind class

## Context architecture (3 levels)
- `AppContext` (`app/context/AppContext.tsx`) — root level, `<AppProvider>` in `root.tsx`
  - Provides: `user: { username: string } | null`, `setUser`
  - Hook: `useApp()`
- `DashboardContext` (`app/context/DashboardContext.tsx`) — dashboard level, inside `DashboardShell`
  - Provides: `collapsed: boolean`, `toggleCollapsed: () => void` **only**
  - `active` / `setActive` do NOT exist — nav active state is derived from `useLocation()`
  - Hook: `useDashboard()`
- `ProfileContext` (`app/context/ProfileContext.tsx`) — profile section, inside `routes/profile.tsx`
  - Provides: `profile: ProfileData`, `updateProfile(partial: Partial<ProfileData>)`
  - `ProfileData`: `{ username, email, displayName, timezone, language, plan, memberSince }`
  - Hook: `useProfile()`

## Shell patterns
- `DashboardShell` (`app/components/DashboardShell/DashboardShell.tsx`)
  - Wraps: `<DashboardProvider>` + full-screen flex + `<Sidebar>` + `{children}`
  - Used by: `DashboardsPage`, `DevicesDashboardPage`, and `ProfileShell`
- `ProfileShell` (`app/components/ProfileShell/ProfileShell.tsx`)
  - Wraps: `<DashboardShell>` + `<ProfileNav>` (200px) + scrollable content column
  - Used by: all 7 `/profile/*` pages via `routes/profile.tsx` layout route

## Nav items (4 — pinned and settings removed)
clipboard, devices, history, help
→ `app/types/nav_items.ts` — ROUTE_MAP in DashboardNavItems: clipboard→`/`, devices→`/devices`, history→`/history`, help→`/help`
→ Active state derived from `useLocation().pathname` — NOT from context

## Routes registered (`app/routes.ts`)
- `/` → `routes/dashboards.tsx` → `DashboardsPage`
- `/devices` → `routes/devices.tsx` → `DevicesDashboardPage`
- `/clipboards` → `routes/clipboards.tsx` → stub
- `/profile` → `routes/profile.tsx` (layout route — `ProfileProvider` + `ProfileShell` + `<Outlet>`)
  - `/profile/account` → `routes/profile/account.tsx`
  - `/profile/account/edit` → `routes/profile/account-edit.tsx`
  - `/profile/sync` → `routes/profile/sync.tsx`
  - `/profile/storage` → `routes/profile/storage.tsx`
  - `/profile/privacy` → `routes/profile/privacy.tsx`
  - `/profile/plan` → `routes/profile/plan.tsx`
  - `/profile/danger` → `routes/profile/danger.tsx`
- `/history` → `routes/history.tsx` → `HistoryPage`
- `/help` → `routes/help.tsx` → `HelpPage`
- `/auth` → layout route with: login, signup, forgot-password, verify-token, reset-password
- `*` → `routes/NotFound.tsx`

## Next planned work
- All nav pages are now implemented. Remaining work is API integration (replace static data).
- Design source: `/home/jxtsamfrimpong/Dev/Design/clipsynkjs.pen` (Pencil MCP — check it's active before starting)

## Pages implemented
- `DashboardsPage` — `DashboardShell` + `MainDashboardArea` (ClipsArea + RightPanel)
- `DevicesDashboardPage` — `DashboardShell` + `DevicesMainArea`
- `NotFoundPage` — 404, terminal aesthetic, two `TerminalButton` actions
- `ClipboardsPage` — stub only
- `AccountPage` — full overview: account info + section summaries
- `AccountEditPage` — form prefilled from `ProfileContext`; saves via `updateProfile()`
- `SyncPage`, `StoragePage`, `PrivacyPage` — key-value info pages
- `PlanPage` — 3 plan cards (free/pro/team); free shows current plan
- `DangerPage` — 3 action cards; delete account requires username confirmation input
- `HistoryPage` — 4-state view machine: history (default+selection), doc_builder, share
  - `HistoryMainArea` owns state (`selectedIds: Set<string>`, `view: 'history'|'doc_builder'|'share'`)
  - `HistorySection` (controlled) + `DocPanel`/`SelectionPanel`/`DocBuilderArea`/`ShareArea`
- `HelpPage` — two-state view: `chatOpen: false` → DocsArea + FaqPanel; `chatOpen: true` → DocsArea + ChatPanel
  - `HelpMainArea` owns `chatOpen` state
  - `DocsArea`: HelpHeader + TopicNav (5 tabs, local state) + GettingStartedContent (steps + kb shortcuts)
  - `FaqPanel` (360px): 7-item FAQ accordion (local `openIdx`), support links, mini chatbot widget
  - `ChatPanel` (400px, leftBorder 2px `#10B981`): full chatbot with messages, suggestions, input bar

## Key navigation wiring
- `UserProfileFooter` → navigates to `/profile/account` on click
- `UpgradeToPro` wrapper div → navigates to `/profile/plan` on click
- Bare `/profile` → redirects to `/profile/account` (handled in layout route)

## Actions pattern
→ Full guide in `.agents/actions-guide.md`

- Actions live in `app/services/actions/<name>Action.ts` — named export, never default
- Use `ActionFunctionArgs` from `'react-router'` (not route-generated types)
- `API_BASE` from `process.env.API_BASE_URL` — checked at module load, throws if unset
- Body parsing: `formData.get("data")` → `JSON.parse(...)` (see FormData note below)
- Return `{ error: string }` on failure — `throw redirect(path)` on success (never `return redirect`)
- Cookie forwarding: read `res.headers.get('set-cookie')`, set on the redirect response manually
- Forward session cookie to backend: `headers: { cookie: request.headers.get('cookie') ?? '' }`
- Register on route file: `export const action = exampleAction`

### Component side (useFetcher)
- `useFetcher<typeof actionFn>()` — generic gives typed `fetcher.data`
- Submit: `const fd = new FormData(); fd.set("data", JSON.stringify(payload)); fetcher.submit(fd, { method: "post" })`
- **Why FormData not `encType: "application/json"`**: React Router's `JsonValue` index-signature constraint rejects named TS interfaces with nested objects. `FormData` is an unambiguous `SubmitTarget` with no such constraint.
- Loading: `fetcher.state !== "idle" || navigation.state !== "idle"`
- Errors: `fetcher.data?.error` — display below the submit button in `#EF4444`

### Validation split
| Where | What |
|---|---|
| Component (reactive) | Format checks (email regex, password strength/length), cross-field (confirm ≠ password) |
| Action (server) | Presence checks, password match guard, IP/ipType derivation from request headers |
| Backend | Full DTO validation — source of truth for all rules |

### Device fingerprint (`app/utils/device.ts`)
- `buildFingerprint()` — GPU-bound (WebGL renderer + canvas). Stable across browser updates.
- `buildDeviceInfo()` — full device object for signup (fingerprint + os + osVersion + platformInfo)
- Called **client-side at submit time** (inside `handleSubmit`), never in actions (SSR has no browser APIs)
- Login uses `buildFingerprint()` only; signup uses `buildDeviceInfo()`

### Implemented actions
- `app/services/actions/signUpAction.ts` — POST `/auth/signup`, derives IP/ipType server-side, forwards Set-Cookie to browser
- `app/services/actions/loginAction.ts` — POST `/auth/login`, forwards Set-Cookie to browser

### Error handling in actions (5xx vs 4xx)
- 5xx → return `{ error: 'err: something went wrong, please try again' }` — never expose internal detail
- 4xx → parse NestJS error body, surface `errBody.message` (string or array[0]) to the UI
- Both `signUpAction` and `loginAction` follow this pattern

### Device object — empty string stripping
- Backend DTO uses `@IsOptional() @IsNotEmpty()` — field can be absent but cannot be `''`
- Linux UA returns `osVersion: ''` — strip it before sending
- Pattern in `signUpAction`: `Object.fromEntries(Object.entries(device).filter(([, v]) => v !== ''))`

## Backend auth — known gotchas

### cookie-parser is required
`cookie-parser` must be registered in `main.ts` for `req.cookies` to be populated:
```ts
import cookieParser from 'cookie-parser';
app.use(cookieParser());
```
Without it, `req.cookies` is `undefined` and the JWT strategy's `req?.cookies?.access_token`
always returns `null` — every `/auth/me` call returns 401.

### JWT payload structure
The token payload wraps user data under a `user` key:
```json
{ "user": { "id": "...", "email": "...", ... }, "device": {...}, "iat": ..., "exp": ... }
```
The `validate()` function in `auth.passport.strategy.ts` must read `payload.user.id` /
`payload.user.email`, not `payload.id` / `payload.email`.

### Cookie maxAge calculation
`appconfig.auth.jwtExpiration` is a string like `'1h'`, `'15m'`, `'7d'`.
Use the `parseExpirationMs()` helper in `auth.controller.ts` to convert to milliseconds.
Slicing the string directly (e.g. `.slice(0, length - 2)`) gives `0` for 2-char strings like `'1h'`.

### Auth controller — auth guard files
- `src/auth/guards/auth.guard.jwt.ts` — `JwtAuthGuard extends AuthGuard('jwt')`
- `src/auth/guards/auth.passport.strategy.ts` — `JwtStrategy` reads cookie via `req.cookies.access_token`
- `src/auth/guards/auth.guard.ts` — `PasswordResetAuthGuard` (for password reset flow)

### Auth loader (`app/loaders/auth.ts`)
- `requireAuth(request)` — fetches `/auth/me`, throws `redirect('/auth/login')` if 401
- `requireGuest(request)` — fetches `/auth/me`, throws `redirect('/')` if already authenticated
- Both forward the session cookie: `headers: { cookie: request.headers.get('cookie') ?? '' }`
- `API_BASE` must be absolute (SSR Node.js fetch rejects relative URLs)
- Cookie header and set-cookie values are logged at `console.debug` level (sensitive — suppressed in prod)

### Env requirement
`.env` must have `API_BASE_URL=http://localhost:3000` — loaders and actions throw at startup without it.
Copy from `.env.example` which is committed to the repo.

## Logging standard (fullstackopen)
Every meaningful state change, user interaction, and mount uses `console.log`.
Format: `[ComponentName] description: value`
Never log on every render — only on events and `useEffect` state watchers.

## FOUC prevention pattern
- `<html>` and `<body>` have inline `style={{ backgroundColor: "#0d0d0d" }}`
- Inline `<style>` in `<head>` resets `button, input, select, textarea { background-color: transparent; appearance: none }`
- Components that need pre-CSS colors use inline `style` props alongside Tailwind classes
- This pattern must be followed for any new page that has a non-transparent background

## ErrorBoundary role (`root.tsx`)
- 404 from unmatched routes → handled by catch-all `*` route (NOT ErrorBoundary)
- 404 from loader throws → ErrorBoundary renders `NotFoundPage`
- Runtime errors / other HTTP errors → ErrorBoundary renders generic error UI

## Key design tokens (inline-style-safe values)
- Background dark: `#0d0d0d`, `#0A0A0A`
- Sidebar bg: `#111`, active item: `#1a1a1a`
- Border: `#222`, `#2a2a2a`
- Green accent: `#10B981`
- Amber: `#F59E0B`
- Red error: `#EF4444` / `red-500`
- Muted text: `#6B7280` / `gray-500`
- Yellow accent: `yellow-400` (collapse button, UpgradeToPro)

## Design system — authoritative visual language (see spec Section 13 for full tables)

### Surfaces
- Canvas: `#0A0A0A` · Elevated panel: `#111111` · Raised/hover: `#1F1F1F`
- Border: `#2A2A2A` · Subtle border: `#1A1A1A`

### Text hierarchy
- `#FFFFFF` section headers · `#FAFAFA` primary · `#9CA3AF` labels
- `#6B7280` muted/metadata · `#4B5563` dimmed/placeholders

### Semantic colors (strict rules — do not mix)
- Green `#10B981` — **only** action/primary color (CTAs, `>` prompt, active, success, positive deltas)
- Amber `#F59E0B` — **only** warning color (idle, expiry timers, nearing limits, upgrade border)
- Red `#EF4444` — **only** error/broken states (`err:` messages, failed states)
- Cyan `#06B6D4` — `[image]` clip badge only
- Purple `#A855F7` — `[code]` clip badge only
- Pink `#F472B6` — `[file]` clip badge only

### Design principles
- Green = clickable or working. Amber = needs attention. Red = broken.
- Content-type colors (cyan/purple/pink) **never** used for status — clip badges only.
- Gray shades carry hierarchy only — no semantic meaning attached to any gray shade.
