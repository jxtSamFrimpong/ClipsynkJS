# Phase Plan: Devices Phase

## Phase Overview
The Devices phase covers the devices management dashboard. It lets users overview all synced devices (daemons, browsers, and mobile clients), manage their activation states, edit sync preferences, see activity stats (via heatmaps), and view/manage the Clip Groups each device belongs to.

---

## Goals

### Client / Frontend
- [ ] Connect `DevicesContext.tsx` to the backend `GET /devices` endpoint.
- [ ] Implement Overview Stats (`total`, `online`, `idle`, `inactive`) from API counts.
- [ ] Connect `DeviceDetailPanel.tsx` to fetch individual stats (`GET /devices/:id/stats`).
- [ ] Implement `ActivityHeatmap.tsx` using bucketed sync events from the backend (`GET /devices/:id/activity?range=7d`).
- [ ] Wire actions for device deactivation (`PATCH /devices/:id` or `PUT /devices/:id/deactivate`) and unlinking (`DELETE /devices/:id`).
- [ ] Connect clip groups joining/leaving and sync preference edits.

### Backend / API
- [ ] Implement device registration (`POST /devices`), status updates, and deletion endpoints.
- [ ] Build device ping/pong endpoints to compute active/idle/offline status.
- [ ] Implement activity aggregation queries to bucket `SyncEvent` logs by day and hour for the heatmap.
- [ ] Configure `DeviceEntity` database schemas and JWT authorization guard.

---

## Architecture & Design Decisions
- **Heatmap normalization**: The backend is responsible for bucketing raw sync events into a 4x7 grid representing 4-hour blocks across 7 days. Values are normalized from 0-4 representing activity level, allowing the frontend to render the color blocks without complex compute.
- **Device status dots**: Consistent with the design system:
  * Online: `#10B981` (Green)
  * Idle: `#F59E0B` (Amber)
  * Offline/Inactive: `#6B7280` (Gray)

---

## Current Status
- **Current State**: Static mock UI complete in `app/pages/devices/DevicesDashboardPage.tsx` using `MOCK_DEVICES` from context. No backend integration.
- **Active Workstream**: None

---

## Future Enhancements & Roadmap
- [ ] Device peer-to-peer syncing (WebRTC mesh) to bypass the server for large clip transfers.
- [ ] Hardware-based security enrollment (WebAuthn).
