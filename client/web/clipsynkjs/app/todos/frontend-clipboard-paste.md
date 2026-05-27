# Frontend Clipboard Paste Integration

This workstream is partially implemented already. The remaining job is to connect
the paste UI to the existing backend clipboard create endpoint.

Current code:

- `client/web/clipsynkjs/app/components/MainArea/ClipsArea/PasteZone.tsx`
- `client/web/clipsynkjs/app/routes/dashboards.tsx`
- `client/web/clipsynkjs/app/services/actions/addToClipboard.ts`
- `backend/clipsynkjs-api/src/clipboard/clipboard.controller.ts`
- `backend/clipsynkjs-api/src/clipboard/dto/create-clipboard.dto.ts`

Current status: `done`

---

## What Is Already Done

- The dashboard loader already fetches paginated clipboard data from the backend.
- `PasteZone.tsx` already listens for `Ctrl+V` / `Cmd+V`.
- `PasteZone.tsx` already reads clipboard items using `navigator.clipboard.read()`.
- The backend already exposes `POST /clipboard`.
- `generatedAt` already accepts ISO strings through `@IsDateString()`.
- Device fingerprint generation already exists in `app/utils/device.ts`.

---

## Resolved Gaps

### Gap 1: no route action wired on `/dashboards` — `resolved`

`app/routes/dashboards.tsx` now exports an `action` function that:

- Reads the submitted payload from FormData (`data` field, JSON-stringified).
- Forwards the cookie header to `${API_BASE}/clipboard` for JWT auth.
- Returns a discriminated `{ success: true }` or `{ error: string }` shape.
- Triggers loader revalidation on success automatically (React Router default).

Note: the dashboard route is registered as an index route (mapped to `/`), so
`PasteZone` submits to `/?index` to disambiguate from the root layout.

### Gap 2: `PasteZone` stops at logging — `resolved`

`PasteZone.tsx` now:

- Detects `text/plain` clipboard content.
- Builds the full payload: `generatedAt`, `clientTimestamp`, `deviceFingerprint`,
  `mimeType`, `content`, `contentSize`.
- Submits via `fetcher.submit()` to `/?index` (the dashboard route action).
- Guards against empty/whitespace-only pastes.
- No `// TODO` comments remain in the text path.

### Gap 3: stale helper action — `resolved`

`app/services/actions/addToClipboard.ts` is entirely commented out and obsolete.

- It targeted a removed endpoint (`/clipboard/add`).
- It did not forward cookies for JWT auth.
- Its payload shape was incomplete.
- A deprecation header has been added documenting why it is obsolete and what
  replaced it (the route action in `dashboards.tsx`).
- Nothing in the codebase imports this file.

### Gap 4: payload construction is incomplete — `resolved`

All required fields are now sent by `PasteZone`:

- `generatedAt` — `new Date().toISOString()`
- `deviceFingerprint` — `buildFingerprint()`
- `clientTimestamp` — `Date.now()`
- `mimeType` — `"text/plain"`
- `content` — clipboard text
- `contentSize` — `new Blob([text]).size`

`contentHash` is intentionally omitted — it is `@IsOptional()` in the DTO and the
backend service computes a fallback SHA-256 hash when absent.

Backend DTO fixes applied:

- Added `@IsString()` to `deviceFingerprint` and `mimeType`.
- Added `@IsNumber()` to `clientTimestamp` and `contentSize`.
- Added optional `@IsUUID() clipboardgroup?` field.
- These were required because the global `ValidationPipe` uses
  `forbidNonWhitelisted: true`, rejecting properties without decorators.

Backend service fixes applied:

- `ClipboardService.create()` now accepts `userId` from the controller.
- When no `clipboardgroup` is provided, it queries the user's default clipgroup
  (`isDefaultGroup: true`) and assigns it automatically.
- `sourceUserId` is also set from the authenticated user.

### Gap 5: no user-facing success/error handling — `resolved`

`PasteZone` now handles all scenarios:

- **Permission denied** — sets a local `clipboardError` state with a specific
  message about browser clipboard settings.
- **Empty clipboard** — silently skips (`if (!text.trim()) return`).
- **Backend validation failure** — displays `actionData.error` from the route
  action (extracted from backend's `{ message }` response).
- **Successful save** — displays green `✓ saved`.
- **Submitting state** — dims the paste zone and disables pointer events via
  `fetcher.state !== "idle"`.

---

## Sprint Status

### Sprint A: Wire the route action — `done`

### Sprint B: Submit text clips from `PasteZone` — `done`

### Sprint C: Error and status handling — `done`

### Sprint D: Expand beyond plain text — `later`

Files:

- `app/components/MainArea/ClipsArea/PasteZone.tsx`
- backend clipboard service/entity logic

Tasks:

- Decide how to support images and other binary clipboard payloads.
- Populate `binaryContent`, `fileName`, `fileExtension`, `metadata`, and storage strategy as needed.
- Align frontend and backend on upload strategy for large files.

Definition of done:

- Image and file pastes follow a supported backend contract instead of logging only.

---

## Exit Criteria

- [x] User presses `Ctrl+V` or `Cmd+V` inside the paste zone.
- [x] Clipboard text is read successfully.
- [x] Frontend submits a valid `CreateClipboardDto`-compatible payload.
- [x] Backend persists the item through `POST /clipboard`.
- [x] The dashboard refreshes and shows the new clip at the top.
