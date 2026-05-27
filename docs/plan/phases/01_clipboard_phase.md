# Phase Plan: Home / Clipboard Phase

## Phase Overview
This phase focuses on the main dashboard home page, which serves as the Clipboard view. Users can browse their clipboard history, view, filter, create, delete, and copy clips. It is a critical feature representing Phase 5 of the product roadmap.

---

## Goals

### Client / Frontend
- [ ] Connect the main dashboard view `MainDashboardArea.tsx` with real API data.
- [ ] Implement the `ClipsList` component using data loaded from the backend.
- [ ] Wire the `FilterBar` to filter clips by search query and type (text, link, image, code, file).
- [ ] Enable copying clips to the local system clipboard using browser clipboard APIs.
- [ ] Handle pagination and real-time WebSocket updates for newly synced clips.

### Backend / API
- [ ] Implement robust `GET /clips` endpoint with search, type-filtering, and pagination.
- [ ] Implement `POST /clips` to receive new clips from clients and push real-time updates via WebSockets.
- [ ] Implement `DELETE /clips/:id` to remove clips from sync history.
- [ ] Configure TypeORM schema for clips (e.g. content, type, hash, creation date).

---

## Architecture & Design Decisions
- **Real-time updates**: Web client uses standard socket.io/websocket client to subscribe to user-specific clip events. When backend receives a clip via `POST /clips` from any device, it pushes it to the user's connected socket channels.
- **Visual badges**: Clips list displays type badges matching specification colors:
  * `[text]` / `[link]`: `#10B981` (Green)
  * `[image]`: `#06B6D4` (Cyan)
  * `[code]`: `#A855F7` (Purple)
  * `[file]`: `#F472B6` (Pink)

---

## Current Status
- **Current State**: Static mock UI complete in `app/pages/dashboards/dashboardsPage.tsx`. No backend integration yet.
- **Active Workstream**: None

---

## Future Enhancements & Roadmap
- [ ] Large file clip transfers (chunking/S3 direct upload).
- [ ] Text clipping compression.
- [ ] Local encrypted cache for offline viewing.
