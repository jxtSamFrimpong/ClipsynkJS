# ClipSynkJS Web TODO Roadmap

This file is the repo-backed status board for the web app and the backend APIs it
depends on. It replaces the older "API integration TODOs" list, which no longer
matched the real codebase.

Status labels:

- `done`: implemented in code
- `in progress`: partially wired, but not complete or not reliable yet
- `not started`: UI/API exists only as mock data, placeholders, or scaffolding
- `blocked`: depends on backend contracts or auth/ownership rules that are still missing

---

## Current Snapshot

### Done

- Auth session check is wired on protected routes through `app/loaders/auth.ts`
  and `GET /auth/me`.
- Login and signup route actions are wired on the frontend:
  `app/routes/login.tsx`, `app/routes/signup.tsx`.
- Backend auth endpoints exist for signup, login, logout, `me`, and password
  reset flow:
  `backend/clipsynkjs-api/src/auth/auth.controller.ts`.
- Dashboard loader already fetches paginated clipboard data and devices:
  `app/routes/dashboards.tsx`.
- Backend clipboard `POST /clipboard` and `GET /clipboard` already exist.

### In Progress

- Clipboard list render path is partly real, but the write path from the UI is not
  connected yet.
- Clipboard pagination exists on both sides, but the backend skip math is wrong and
  the frontend loader shape does not match the consumer.
- Devices backend CRUD exists, but authorization and ownership scoping are still
  TODOs in the service.
- Devices dashboard UI exists, but it still runs on `DevicesContext` mock data.

### Not Started / Mostly Placeholder

- Forgot password, verify token, and reset password frontend forms.
- History page data loading.
- Help chat API integration.
- Right-side dashboard stats/config/integrations data wiring.
- Dashboard area switching by active nav tab.
- OAuth buttons.
- Meaningful backend unit/integration coverage for auth, clipboard, devices, and
  clipgroups.

---

## Phase 1: Stabilize The Working Clipboard Path

Goal: make the existing clipboard dashboard actually reliable before adding new
surface area.

### Sprint 1.1: Fix read path correctness

Status: `in progress`

Files:

- `client/web/clipsynkjs/app/routes/dashboards.tsx`
- `client/web/clipsynkjs/app/components/MainArea/ClipsArea/ClipsList/ClipsList.tsx`
- `backend/clipsynkjs-api/src/clipboard/clipboard.service.ts`

Tasks left:

- Fix backend pagination skip from `skip: (page - 1)` to
  `skip: (page - 1) * limit`.
- Return a stable object from the service instead of a raw tuple so the controller
  does not have to unpack indexes.
- Align frontend loader output with `ClipsList` consumption.
  Current mismatch:
  loader returns `clipboardData: { total, page, limit }`, while `ClipsList`
  expects `total`, `page`, and `limit` at top level.
- Remove stale placeholder comments in `ClipsList.tsx` once the list is fully
  real-data backed.

Definition of done:

- Page 1, page 2, and next-page navigation return the correct records.
- `Pagination.tsx` renders from real totals.
- No stale mock-data comments remain in the live clipboard list.

### Sprint 1.2: Finish clipboard paste mutation

Status: `in progress`

Files:

- `client/web/clipsynkjs/app/components/MainArea/ClipsArea/PasteZone.tsx`
- `client/web/clipsynkjs/app/routes/dashboards.tsx`
- `client/web/clipsynkjs/app/services/actions/addToClipboard.ts`

Tasks left:

- Export a route `action` from `dashboards.tsx` for clipboard creation.
- Decide whether to revive `addToClipboard.ts` or inline the action logic in the
  route. The helper is currently commented out and still references an outdated
  `/clipboard/add` path.
- From `PasteZone.tsx`, submit text payloads through `useFetcher`.
- Build a valid `CreateClipboardDto` payload:
  `generatedAt`, `deviceFingerprint`, `clientTimestamp`, `mimeType`, `content`,
  `contentHash`, `contentSize`.
- Add a frontend hash helper for text content, or move hash generation server-side.
- Let successful writes trigger a revalidation so the newly pasted item appears at
  the top of the dashboard.

Definition of done:

- `Ctrl+V` or `Cmd+V` on the paste zone creates a clipboard record.
- The dashboard list refreshes without manual reload.
- Validation errors are surfaced in the UI or console with actionable messages.

### Sprint 1.3: Finish clipboard UX polish

Status: `not started`

Files:

- `client/web/clipsynkjs/app/components/MainArea/ClipsArea/FilterBar/FilterBar.tsx`
- `client/web/clipsynkjs/app/components/MainArea/ClipsArea/StatsSection/StatsSection.tsx`
- `client/web/clipsynkjs/app/utils/clipboard/clipboard.utils.ts`

Tasks left:

- Make filter chips interactive.
- Replace static clip stats with backend-derived data or computed values.
- Improve badge/title/meta derivation for text vs link vs code vs file.
- Replace raw `toLocaleTimeString()` meta formatting with relative time formatting.

Definition of done:

- Filters affect the rendered list or query params.
- Stats panel reflects live clipboard data.
- Clip rows show useful titles and metadata instead of fallback IDs.

---

## Phase 2: Devices Dashboard Migration

Goal: replace the mock-driven devices area with authenticated backend data.

### Sprint 2.1: Replace `DevicesContext` mocks

Status: `in progress`

Files:

- `client/web/clipsynkjs/app/context/DevicesContext.tsx`
- `client/web/clipsynkjs/app/routes/devices.tsx`
- `backend/clipsynkjs-api/src/devices/devices.controller.ts`
- `backend/clipsynkjs-api/src/devices/devices.service.ts`

Tasks left:

- Stop treating `GET /devices` as globally readable; scope it to the signed-in user.
- Add a real devices loader on the frontend instead of only `requireAuth`.
- Replace `MOCK_DEVICES` with loader data and keep selection state local or in a
  slimmer context.
- Define a stable API response shape that the current device UI can actually use.
  The frontend mock shape is richer than the current backend entity/service output.

Definition of done:

- Devices page loads from the backend only.
- No mock device records remain in `DevicesContext.tsx`.
- Logged-in users only see their own devices.

### Sprint 2.2: Device detail API surface

Status: `blocked`

Files:

- `app/components/MainArea/DevicesArea/DeviceDetailPanel/*`
- `backend/clipsynkjs-api/src/devices/*`
- `backend/clipsynkjs-api/src/clipgroup/*`

Tasks left:

- Decide whether to extend `GET /devices/:id` or add dedicated endpoints for:
  stats, activity heatmap, groups, and sync preferences.
- Wire:
  `DeviceStatsSection.tsx`,
  `ActivityHeatmap.tsx`,
  `ClipGroupsSection.tsx`,
  `SyncPrefsSection.tsx`,
  `DetailHeader.tsx`.
- Implement device deactivate/unlink against the actual backend routes.
  Current backend routes are `PUT :id/deactivate` and `DELETE :id`; older docs
  referenced different contracts.
- Implement join/leave group endpoints if clipgroup membership is required by the UI.
  Current `clipgroup` service is still scaffolded.

Definition of done:

- Selecting a device shows backend-backed stats, heatmap, groups, and sync prefs.
- Deactivate and unlink actions mutate real records.
- Group membership actions are authorized and functional.

### Sprint 2.3: Ownership and authorization hardening

Status: `not started`

Files:

- `backend/clipsynkjs-api/src/devices/devices.service.ts`

Tasks left:

- Enforce owner-only access for `findAll`, `findOne`, `update`, `remove`,
  `deactivate`, `reactivate`, and `promoteToPrimary`.
- Stop using broad repository queries with no user scope.
- Define how primary-device promotion demotes the old primary device.
- Define ping/pong authorization rules instead of leaving them as comments.

Definition of done:

- Device operations cannot affect other users' devices.
- Primary device state remains consistent.
- Ping/pong endpoints have implemented access rules or are removed from the public API.

---

## Phase 3: Fill The Non-Clipboard Dashboard Surfaces

Goal: move history, help, and right-panel sections off hardcoded UI content.

### Sprint 3.1: History page data integration

Status: `not started`

Files:

- `app/routes/history.tsx`
- `app/components/MainArea/HistoryArea/*`

Tasks left:

- Add a loader for history instead of only `requireAuth`.
- Replace inline timeline items with `GET /clipboard` or a dedicated history query.
- Preserve current selection and pull-to-doc UX while moving item data to real API results.
- Decide whether history is a separate query mode or a styled view over the same
  clipboard dataset.

Definition of done:

- History page renders authenticated backend data.
- Selection and batch actions work on real item IDs.

### Sprint 3.2: Help chat integration

Status: `not started`

Files:

- `app/components/MainArea/HelpArea/ChatPanel/ChatPanel.tsx`
- backend support/chat endpoint to be created

Tasks left:

- Add real chat state instead of hardcoded conversation blocks.
- Create or wire a backend endpoint for support/chat.
- Preserve the current panel UX while switching messages to request/response data.

Definition of done:

- Help chat accepts user input and returns backend responses.
- Hardcoded transcript content is removed from the live component.

### Sprint 3.3: Right panel live data

Status: `not started`

Files:

- `app/components/MainArea/RightPanel/DevicesSection/DevicesSection.tsx`
- `app/components/MainArea/RightPanel/SyncSection/SyncSection.tsx`
- `app/components/MainArea/RightPanel/IntegrationsSection/IntegrationsSection.tsx`

Tasks left:

- Replace static `DEVICES`, `SYNC_CONFIG`, and `INTEGRATIONS`.
- Decide whether this panel uses dashboard loader data, its own loader, or a shared context.
- Add real integrations add/remove/toggle actions if the product still intends to expose them.

Definition of done:

- Right panel reflects the signed-in user's current data.
- "Add" and toggle affordances are either wired or removed.

---

## Phase 4: Complete Auth Recovery And Session UX

Goal: finish the parts of auth that are visible in the UI but still fake.

### Sprint 4.1: Password recovery frontend

Status: `in progress`

Files:

- `app/components/Auth/ForgotPasswordForm/ForgotPasswordForm.tsx`
- `app/components/Auth/VerifyTokenForm/VerifyTokenForm.tsx`
- `app/components/Auth/ResetPasswordForm/ResetPasswordForm.tsx`
- `backend/clipsynkjs-api/src/auth/auth.controller.ts`

Backend status:

- `POST /auth/requestUpdatePassword` exists.
- `POST /auth/verifyForgotPasswordCode` exists.
- `POST /auth/updatePassword` exists behind `PasswordResetAuthGuard`.

Tasks left:

- Add frontend route actions or fetcher submissions for all three steps.
- Pass the email or masked email between steps through route state or URL/search state.
- Persist the password-reset token returned from verify step so it can authorize
  the update-password request.
- Redirect the user cleanly back to login after success.

Definition of done:

- A user can request a code, verify it, and set a new password from the web UI.

### Sprint 4.2: OAuth and auth shell cleanup

Status: `not started`

Files:

- `app/components/Auth/LoginForm/LoginForm.tsx`
- `app/components/Auth/SignUpForm/SignUpForm.tsx`
- `app/context/AppContext.tsx`

Tasks left:

- Either implement Google/GitHub OAuth or remove the inactive buttons.
- Replace the fake `AppContext` user state with real route-derived auth data, or
  delete the context if route loaders already cover the session model.
- Replace placeholder auth branding/session stats if they are meant to be real.

Definition of done:

- No fake auth state remains in the app shell.
- Every auth CTA either works or is intentionally removed.

---

## Phase 5: Backend Hardening, Contracts, And Test Coverage

Goal: move from "feature demo" quality to a safer implementation baseline.

### Sprint 5.1: Contract cleanup

Status: `in progress`

Files:

- `backend/clipsynkjs-api/src/utils/config.ts`
- `backend/clipsynkjs-api/src/app.module.ts`
- `backend/clipsynkjs-api/src/auth/auth.service.ts`
- `backend/clipsynkjs-api/src/users/users.service.ts`
- `backend/clipsynkjs-api/src/users/entities/user/user.ts`

Tasks left:

- Type and validate app config rather than relying on raw `process.env`.
- Move connection config into a dedicated typed module.
- Remove hardcoded or duplicated JWT settings.
- Make bcrypt salt rounds configurable.
- Add transactional handling around signup instead of manual partial rollbacks.

Definition of done:

- App startup fails early on invalid config.
- Signup/auth behavior is consistent across environments.

### Sprint 5.2: Clipgroup completion

Status: `not started`

Files:

- `backend/clipsynkjs-api/src/clipgroup/clipgroup.controller.ts`
- `backend/clipsynkjs-api/src/clipgroup/clipgroup.service.ts`

Tasks left:

- Fix guard usage in the controller.
- Replace scaffold return strings with repository-backed reads/writes.
- Add membership operations if devices UI depends on join/leave flows.

Definition of done:

- Clipgroup endpoints are real and authorized.
- Devices/group UI can rely on a supported backend contract.

### Sprint 5.3: Testing pass

Status: `not started`

Files:

- `backend/clipsynkjs-api/src/**/*.spec.ts`

Current state:

- Many specs are still Nest-generated smoke tests such as "should be defined".

Tasks left:

- Add service tests for clipboard pagination and create behavior.
- Add auth tests for signup, login, `me`, and password reset flow.
- Add devices tests for user scoping and mutation rules.
- Add controller or e2e coverage for cookie-based auth behavior.

Definition of done:

- Core auth, clipboard, and devices flows have behavioral test coverage.
- Regressions in pagination and ownership checks are caught by tests.

---

## Suggested Sprint Order

1. Phase 1.1: pagination and loader-shape fixes
2. Phase 1.2: clipboard paste mutation
3. Phase 4.1: password recovery frontend
4. Phase 2.1: devices loader + mock removal
5. Phase 2.3: device ownership and authorization
6. Phase 3.1 and 3.3: history + right panel live data
7. Phase 3.2 and Phase 5.2: help chat + clipgroup completion
8. Phase 5.1 and 5.3: config hardening + test coverage

---

## Notes

- When a repo task is completed, remove the corresponding in-code TODO markers and
  update the status in this file.
- Prefer aligning docs to actual route/controller names. Some older notes referenced
  endpoints that differ from the current implementation.
- Keep clipboard work first. It is the only feature path that is already close to
  end-to-end.
