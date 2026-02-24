# API Integration TODOs

All components currently using mock data. Each entry shows the file path,
the API call needed, and the expected response shape.

---

## Devices Page

### Context / Data Layer

**`app/context/DevicesContext.tsx`**
- `TODO (API)`: Replace `MOCK_DEVICES` with data from `GET /devices`
- Response: `Device[]`
- Each `Device` maps 1-to-1 to a `DeviceEntity` from the backend.

---

### Devices List Area

**`app/components/MainArea/DevicesArea/DevicesListArea/OverviewStats.tsx`**
- `TODO (API)`: Counts are derived from mock data in DevicesContext.
- Replace with `GET /devices/stats` **or** compute from the list response.
- Response: `{ total, online, idle, inactive: number }`

**`app/components/MainArea/DevicesArea/DevicesListArea/DeviceList.tsx`**
- `TODO (API)`: Device list comes from mock data in DevicesContext.
- Replace with `GET /devices`
- Response: `Device[]`

---

### Device Detail Panel

**`app/components/MainArea/DevicesArea/DeviceDetailPanel/DetailHeader.tsx`**
- `TODO (API) deactivate`: `PATCH /devices/:id` — body: `{ status: 'inactive' }`
- `TODO (API) unlink`: `DELETE /devices/:id`

**`app/components/MainArea/DevicesArea/DeviceDetailPanel/DeviceStatsSection.tsx`**
- `TODO (API)`: Stats come from `selectedDevice.stats` in mock data.
- Replace with `GET /devices/:id/stats`
- Response: `{ clipsSynced: number, lastSync: string, avgPerDay: number, storageUsed: string }`

**`app/components/MainArea/DevicesArea/DeviceDetailPanel/ActivityHeatmap.tsx`**
- `TODO (API)`: `activityHeatmap` currently comes from mock data in DevicesContext.
- Replace with `GET /devices/:id/activity?range=7d`
- Response: `{ heatmap: number[][] }` — same 4×7 shape, values 0–4 (pre-normalized by backend).
- Backend computes this by bucketing `SyncEvent` rows by `dayOfWeek` and `Math.floor(hour / 6)`,
  then normalizing counts to the 0–4 scale.

**`app/components/MainArea/DevicesArea/DeviceDetailPanel/ClipGroupsSection.tsx`**
- `TODO (API)`: clipGroups comes from `selectedDevice.clipGroups` in mock data.
- Replace with `GET /devices/:id/groups`
- Response: `{ groups: ClipGroup[] }`
- `TODO (API) + join`: `POST /groups/:groupId/members` — body: `{ deviceId }`
- `TODO (API) leave`: `DELETE /groups/:groupId/members/:deviceId`

**`app/components/MainArea/DevicesArea/DeviceDetailPanel/SyncPrefsSection.tsx`**
- `TODO (API)`: syncPrefs comes from `selectedDevice.syncPrefs` in mock data.
- Replace with `GET /devices/:id/prefs`
- Response: `{ prefs: SyncPrefs }`

---

## History Page

> No context-driven mock data yet — history list will need its own context/loader.

**`app/components/MainArea/HistoryArea/`** _(entire directory)_
- History items are currently hardcoded inline.
- Replace with `GET /clips?page=1&limit=50`
- Response: `{ items: ClipItem[], total: number, page: number }`

---

## Help Page

> No API calls needed for static docs/FAQ content (static markdown or CMS later).
> The AI chatbot widget will need its own endpoint.

**`app/components/MainArea/HelpArea/ChatPanel/ChatPanel.tsx`**
- `TODO (API)`: Chat messages are currently hardcoded.
- Replace with `POST /support/chat` — body: `{ message: string, sessionId: string }`
- Response: `{ reply: string }`

---

## Auth

**`app/services/actions/signUpAction.ts`**
- `TODO (API)`: POST to `${API_BASE}/auth/signup`
- Body: `{ name, email, password, device: { fingerprint, name } }`

**`app/loaders/auth.ts`**
- `TODO (API)`: `GET /auth/me` — verifies session and returns current user.

---

## Notes

- All `// TODO (API):` markers in source files are paired with an entry here.
- When a TODO is resolved (API wired up), remove the `// TODO (API):` comment
  from the source file and delete the corresponding entry from this file.
- Mock data lives in `app/context/DevicesContext.tsx` (devices) and inline in
  component files (history, help). Do not delete mock data until the API is
  tested end-to-end.
