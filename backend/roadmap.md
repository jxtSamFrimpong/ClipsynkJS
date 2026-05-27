# ClipSynk Roadmap

> Clipboard sync across every surface: CLI daemons, a web dashboard, and a mobile app. Ship the backend and CLI first, then expand to web and mobile.

---

## Strategy

### CLI Daemon Clients

| Phase | Language | Weeks | Goal |
|-------|----------|-------|------|
| 1 | Node.js | 1 -- 3 | MVP on npm |
| 2 | Go | 4 -- 6 | Performance port |
| 3 | Rust | 7 -- 10 | Systems-level port |
| 4 | Decision | 11 | Pick production client |

All three CLI implementations share the same backend API, auth flow, config path, CLI commands, and platform support -- they are interchangeable.

### Web & Mobile Clients

| Phase | Platform | Weeks | Goal |
|-------|----------|-------|------|
| 5 | Web (React) | 12 -- 16 | Desktop dashboard & clipboard manager |
| 6 | Flutter (iOS + Android) | 17 -- 22 | Mobile clipboard sync app |

---

## Phase 1 -- Node.js MVP

Ship a working CLI daemon with browser auth and text clipboard sync.

<details>
<summary>Project structure</summary>

```
clipsynk-node/
├── package.json
├── bin/clipsynk.js
├── src/
│   ├── cli/        # Commander commands
│   ├── daemon/     # Main daemon logic
│   ├── auth/       # Browser auth
│   ├── api/        # HTTP client
│   └── config/     # Config management
└── test/
```

</details>

<details>
<summary>Dependencies</summary>

| Package | Purpose |
|---------|---------|
| `clipboardy` | Clipboard access |
| `commander` | CLI framework |
| `node-fetch` | HTTP client |
| `open` | Browser launcher |
| `conf` | Config store |

</details>

---

## Phase 2 -- Go

<details>
<summary>What you'll learn</summary>

- Go syntax and idioms
- Goroutines and channels
- Error handling patterns
- Interface design
- Testing in Go
- Cross-compilation

</details>

<details>
<summary>Project structure</summary>

```
clipsynk-go/
├── go.mod
├── cmd/clipsynk/main.go
├── internal/
│   ├── daemon/     # Daemon with goroutines
│   ├── cli/        # Cobra commands
│   ├── auth/       # Browser auth
│   └── api/        # HTTP client
└── test/
```

</details>

<details>
<summary>Dependencies</summary>

| Module | Purpose |
|--------|---------|
| `github.com/atotto/clipboard` | Clipboard access |
| `github.com/spf13/cobra` | CLI framework |
| `net/http` | HTTP client (stdlib) |
| `github.com/skratchdot/open-golang` | Browser launcher |
| `github.com/spf13/viper` | Config store |

</details>

<details>
<summary>Resources</summary>

- [A Tour of Go](https://tour.golang.org)
- [Go by Example](https://gobyexample.com)
- [Effective Go](https://golang.org/doc/effective_go)
- *The Go Programming Language* (book)

</details>

---

## Phase 3 -- Rust

<details>
<summary>What you'll learn</summary>

- Ownership and borrowing
- Lifetimes
- Pattern matching
- Trait system
- Error handling with `Result` / `Option`
- Async/await with Tokio

</details>

<details>
<summary>Project structure</summary>

```
clipsynk-rust/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── daemon/     # Daemon with tokio
│   ├── cli/        # Clap commands
│   ├── auth/       # Browser auth
│   └── api/        # Reqwest client
└── tests/
```

</details>

<details>
<summary>Dependencies</summary>

| Crate | Purpose |
|-------|---------|
| `clipboard` | Clipboard access |
| `clap` | CLI framework |
| `reqwest` | HTTP client |
| `open` | Browser launcher |
| `confy` | Config store |
| `tokio` | Async runtime |

</details>

<details>
<summary>Resources</summary>

- [The Rust Book](https://doc.rust-lang.org/book)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example)
- [Rustlings](https://github.com/rust-lang/rustlings)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)

</details>

---

## Core Daemon Logic

The same algorithm runs in every implementation.

```
1. Load config       (~/.clipsynk/config.json)
2. Verify API key
3. Start two concurrent tasks:

   Watch clipboard (every 500ms):
     content = read_clipboard()
     hash    = sha256(content)
     if hash != last_hash:
       last_hash = hash
       POST /api/clipboard { content, hash }

   Poll for updates (every 5s):
     events = GET /api/clipboard/sync?since_sequence=N
     for event in events:
       if event.device_id != my_device_id:
         write_clipboard(event.content)
         last_sequence = event.sequence
```

---

## Architecture Evolution

### MVP -- Polling

```
Client (Node.js)              Backend (NestJS)
├── Poll clipboard (500ms)    ├── REST API
└── Poll API (5s)             └── PostgreSQL
```

### Intermediate -- WebSocket

```
Client (Go)                   Backend (NestJS)
├── OS event listener         ├── REST API
└── WebSocket connection      ├── WebSocket Gateway
                              ├── Redis pub/sub
                              └── PostgreSQL
```

### Production -- Event-Driven

```
Client (Rust)                 Backend (NestJS)
├── Native OS events          ├── REST API
├── WebSocket (tokio)         ├── WebSocket Gateway
└── Zero-copy operations      ├── Redis Cluster
                              └── PostgreSQL
```

### HTTP Polling vs WebSocket

| Aspect | HTTP Polling | WebSocket |
|--------|-------------|-----------|
| Latency | ~5 s | < 100 ms |
| Server load | High (constant polls) | Low (on change only) |
| Bandwidth | Wasted on empty polls | Data only |
| Complexity | Simple | Medium |
| Offline handling | Automatic (fails silently) | Needs reconnect logic |
| Scaling | Poor | Good |

---

## Production Clipboard Listeners

Moving from polling to native OS events for instant detection.

<details>
<summary>macOS -- NSPasteboard notifications</summary>

```objc
- (void)pasteboardDidChange:(NSNotification *)notification {
    NSPasteboard *pasteboard = [NSPasteboard generalPasteboard];
    NSString *content = [pasteboard stringForType:NSPasteboardTypeString];
    // Push to API instantly
}

[[NSNotificationCenter defaultCenter]
    addObserver:self
    selector:@selector(pasteboardDidChange:)
    name:NSPasteboardDidChangeNotification
    object:nil];
```

</details>

<details>
<summary>Windows -- AddClipboardFormatListener</summary>

```c
AddClipboardFormatListener(hwnd);

// In window procedure
case WM_CLIPBOARDUPDATE: {
    HANDLE hData = GetClipboardData(CF_TEXT);
    // Push to API instantly
    break;
}
```

</details>

<details>
<summary>Linux -- XFixes selection events</summary>

```c
XFixesSelectSelectionInput(display, root, XA_PRIMARY,
    XFixesSetSelectionOwnerNotifyMask);

XEvent event;
while (XNextEvent(display, &event)) {
    if (event.type == XFixesSelectionNotify) {
        // Push to API instantly
    }
}
```

</details>

<details>
<summary>Cross-platform integration per language</summary>

**Node.js** -- use a library wrapper, no native code needed.

```js
const clipboardEvent = require('node-clipboard-event');

clipboardEvent.on('change', async (content) => {
    await pushToAPI(content);
});
```

**Go** -- library for quick wins, CGo for full control.

```go
// Option A: cross-platform library
import "github.com/golang-design/clipboard"

ch := clipboard.Watch(context.Background(), clipboard.FmtText)
for data := range ch {
    pushToAPI(string(data))
}

// Option B: platform-specific via build tags
// clipboard_darwin.go  -> CGo + Cocoa
// clipboard_windows.go -> syscall + Win32
// clipboard_linux.go   -> X11 / Wayland
```

**Rust** -- conditional deps per target OS.

```toml
[target.'cfg(target_os = "macos")'.dependencies]
cocoa = "0.25"

[target.'cfg(target_os = "windows")'.dependencies]
winapi = "0.3"

[target.'cfg(target_os = "linux")'.dependencies]
x11-clipboard = "0.7"
```

```rust
#[tokio::main]
async fn main() {
    watch(|content| {
        tokio::spawn(push_to_api(content));
    });

    let socket = connect_ws("wss://api.clipsynk.com").await?;
    socket.on("clipboard:update", |event| {
        apply_clipboard(event.content);
    });
}
```

</details>

---

---

## Phase 5 -- Web Desktop Client (React)

A browser-based dashboard for managing and browsing clipboard history, triggering manual copies, and configuring devices.

<details>
<summary>Core features</summary>

| Feature | Description |
|---------|-------------|
| Clipboard history | Searchable, filterable list of all synced clips |
| Manual copy/paste | Click to copy any historical clip to the local clipboard |
| Device management | View connected devices, rename, revoke access |
| Real-time updates | WebSocket-driven live feed of new clips across devices |
| Rich content preview | Render text, URLs, images, and code snippets inline |
| Pinned clips | Star/pin frequently used clips for quick access |
| Settings | Manage account, sync preferences, notifications |

</details>

<details>
<summary>Project structure</summary>

```
clipsynk-web/
├── package.json
├── public/
├── src/
│   ├── app/              # Next.js App Router / layout
│   ├── components/
│   │   ├── clipboard/    # ClipCard, ClipList, ClipDetail
│   │   ├── devices/      # DeviceList, DeviceCard
│   │   ├── layout/       # Sidebar, Header, SearchBar
│   │   └── ui/           # Shared design-system primitives
│   ├── hooks/            # useClipboard, useWebSocket, useAuth
│   ├── lib/
│   │   ├── api.ts        # REST client (fetch / axios)
│   │   ├── ws.ts         # WebSocket manager
│   │   └── auth.ts       # Token storage & refresh
│   ├── store/            # Zustand / Redux slices
│   └── types/            # Shared TypeScript types
├── tailwind.config.ts
└── tests/
```

</details>

<details>
<summary>Tech stack</summary>

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | Framework, SSR, routing |
| React 18+ | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Client state management |
| TanStack Query | Server state, caching, pagination |
| Socket.IO Client | Real-time WebSocket connection |
| Clipboard API | Browser clipboard read/write |
| NextAuth.js / custom | Authentication (OAuth + device token) |

</details>

<details>
<summary>Key pages</summary>

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Live clip feed + quick copy |
| `/history` | History | Full searchable clip history with filters |
| `/devices` | Devices | Connected devices, status, actions |
| `/settings` | Settings | Account, sync prefs, notifications |
| `/login` | Auth | OAuth login / device pairing |

</details>

<details>
<summary>Milestones</summary>

**Week 12 -- Scaffold & Auth**
- Project setup (Next.js, Tailwind, TypeScript)
- Auth flow: OAuth login, token storage, protected routes
- API client with interceptors for auth headers

**Week 13 -- Clipboard Core**
- Clipboard history list with pagination (TanStack Query)
- Clip detail view with rich content rendering
- Copy-to-clipboard via Clipboard API
- Search and filter clips by content, device, date

**Week 14 -- Real-Time & Devices**
- WebSocket integration for live clip feed
- Device list with online/offline status
- Device rename and revoke actions
- Toast notifications for incoming clips

**Week 15-16 -- Polish & Ship**
- Pinned/starred clips
- Keyboard shortcuts (Ctrl+K search, navigation)
- Responsive design for large screens
- Dark/light theme
- E2E tests (Playwright)
- Deploy to Vercel / self-hosted

</details>

### Browser Clipboard Constraints

The Clipboard API in browsers is more restrictive than native OS access.

| Capability | Supported | Notes |
|------------|-----------|-------|
| Read clipboard | Partial | Requires user gesture + `clipboard-read` permission |
| Write clipboard | Yes | `navigator.clipboard.writeText()` works after user gesture |
| Background monitoring | No | Cannot poll clipboard in background like CLI daemon |
| Rich content (images) | Partial | `ClipboardItem` API for blobs, limited browser support |

The web client acts primarily as a **clipboard manager and history viewer**, not a background sync daemon. Users copy clips manually from the history or receive real-time notifications of new clips from other devices.

---

## Phase 6 -- Flutter Mobile Client (iOS + Android)

A native mobile app for clipboard sync, built with Flutter for iOS and Android from a single codebase.

<details>
<summary>Core features</summary>

| Feature | Description |
|---------|-------------|
| Clipboard sync | Automatic detection of copied text on mobile |
| Clip history | Scrollable list of all synced clips |
| Quick copy | Tap any clip to copy it to the device clipboard |
| Share sheet integration | Receive shared text/URLs from other apps |
| Push notifications | Notify when a new clip arrives from another device |
| Device management | View and manage connected devices |
| Background sync | Listen for new clips while the app is backgrounded |
| Offline queue | Cache outbound clips when offline, sync when reconnected |

</details>

<details>
<summary>Project structure</summary>

```
clipsynk-flutter/
├── pubspec.yaml
├── lib/
│   ├── main.dart
│   ├── app/
│   │   ├── app.dart              # MaterialApp, routing, theme
│   │   └── routes.dart           # GoRouter route definitions
│   ├── features/
│   │   ├── auth/
│   │   │   ├── data/             # AuthRepository, token storage
│   │   │   ├── domain/           # AuthState, User model
│   │   │   └── presentation/     # LoginScreen, OAuthWebView
│   │   ├── clipboard/
│   │   │   ├── data/             # ClipRepository, API calls
│   │   │   ├── domain/           # Clip model, ClipboardService
│   │   │   └── presentation/     # ClipListScreen, ClipCard
│   │   ├── devices/
│   │   │   ├── data/             # DeviceRepository
│   │   │   ├── domain/           # Device model
│   │   │   └── presentation/     # DeviceListScreen
│   │   └── settings/
│   │       └── presentation/     # SettingsScreen
│   ├── core/
│   │   ├── api/                  # Dio HTTP client, interceptors
│   │   ├── ws/                   # WebSocket manager
│   │   ├── notifications/        # FCM + local notifications
│   │   ├── storage/              # Hive / SharedPreferences
│   │   └── theme/                # AppTheme, colors, typography
│   └── shared/
│       └── widgets/              # Reusable UI components
├── android/
├── ios/
└── test/
```

</details>

<details>
<summary>Tech stack</summary>

| Package | Purpose |
|---------|---------|
| `flutter_riverpod` | State management |
| `dio` | HTTP client with interceptors |
| `web_socket_channel` | WebSocket connection |
| `go_router` | Declarative routing |
| `flutter_secure_storage` | Secure token persistence |
| `hive` | Local clip cache / offline queue |
| `firebase_messaging` | Push notifications (FCM) |
| `flutter_local_notifications` | Foreground notification display |
| `share_plus` | Share sheet integration (receive) |
| `clipboard` / `super_clipboard` | Clipboard read/write |
| `workmanager` | Background task scheduling |
| `connectivity_plus` | Network state monitoring |

</details>

<details>
<summary>Key screens</summary>

| Screen | Description |
|--------|-------------|
| Login | OAuth web view + device registration |
| Clip Feed | Live list of recent clips, pull-to-refresh |
| Clip Detail | Full content view, copy/share/pin actions |
| Devices | List of synced devices, status indicators |
| Settings | Sync preferences, notification toggles, account |

</details>

<details>
<summary>Platform-specific considerations</summary>

**iOS**
- `UIPasteboard` for clipboard access -- requires the app to be in the foreground
- iOS 16+ shows a paste permission prompt ("App would like to paste from...") -- users must approve
- Background fetch via `BGTaskScheduler` for periodic sync
- APNs via Firebase for push notifications
- Share Extension to receive text from other apps

**Android**
- `ClipboardManager` with `OnPrimaryClipChangedListener` for real-time clipboard events
- Android 10+ restricts background clipboard read -- use foreground service or accessibility service
- Android 13+ requires `POST_NOTIFICATIONS` runtime permission
- `WorkManager` for reliable background task execution
- Intent filters for share sheet integration

</details>

<details>
<summary>Milestones</summary>

**Week 17-18 -- Scaffold & Auth**
- Flutter project setup with Riverpod, GoRouter, Dio
- OAuth login via in-app web view
- Device registration on first launch (device name, platform, unique ID)
- Secure token storage and auto-refresh
- Base theme (Material 3, light/dark)

**Week 19 -- Clipboard Core**
- Clip list screen with infinite scroll pagination
- Clip detail view with copy and share actions
- Local clipboard read/write integration
- Pull-to-refresh and optimistic UI updates
- Search and filter clips

**Week 20 -- Real-Time & Notifications**
- WebSocket connection for live clip stream
- FCM integration for push notifications when app is backgrounded
- Local notification display for incoming clips
- Background sync via WorkManager (Android) / BGTaskScheduler (iOS)
- Offline queue: cache clips in Hive, flush on reconnect

**Week 21 -- Devices & Share Sheet**
- Device list with online/offline indicators
- Device rename and disconnect actions
- Share Extension (iOS) / Intent filter (Android) to receive shared text
- Clipboard monitoring service (Android foreground service)

**Week 22 -- Polish & Ship**
- Animations and transitions
- Error states, empty states, loading skeletons
- Widget tests and integration tests
- App Store / Play Store submission prep (icons, screenshots, metadata)
- Beta distribution via TestFlight / Firebase App Distribution

</details>

### Mobile Clipboard Sync Flow

```
Foreground (app open):
  1. Read clipboard on app resume (ClipboardManager / UIPasteboard)
  2. Hash content, compare with last known hash
  3. If changed → POST /api/clipboard
  4. WebSocket receives remote clips → write to local clipboard

Background (app minimized):
  Android:
    - Foreground service with ClipboardManager listener → instant push
    - Fallback: WorkManager periodic task (min 15 min interval)
  iOS:
    - BGTaskScheduler for periodic fetch (system-controlled interval)
    - Push notification triggers background fetch
    - No direct clipboard monitoring in background

Offline:
  1. Queue outbound clips in Hive local storage
  2. Monitor connectivity with connectivity_plus
  3. On reconnect → flush queue via POST /api/clipboard/batch
  4. Pull missed clips via GET /api/clipboard/sync?since_sequence=N
```

---

## Core Daemon Logic

The same algorithm runs in every CLI implementation.

```
1. Load config       (~/.clipsynk/config.json)
2. Verify API key
3. Start two concurrent tasks:

   Watch clipboard (every 500ms):
     content = read_clipboard()
     hash    = sha256(content)
     if hash != last_hash:
       last_hash = hash
       POST /api/clipboard { content, hash }

   Poll for updates (every 5s):
     events = GET /api/clipboard/sync?since_sequence=N
     for event in events:
       if event.device_id != my_device_id:
         write_clipboard(event.content)
         last_sequence = event.sequence
```

---

## Architecture Evolution

### MVP -- Polling

```
Client (Node.js)              Backend (NestJS)
├── Poll clipboard (500ms)    ├── REST API
└── Poll API (5s)             └── PostgreSQL
```

### Intermediate -- WebSocket

```
Client (Go)                   Backend (NestJS)
├── OS event listener         ├── REST API
└── WebSocket connection      ├── WebSocket Gateway
                              ├── Redis pub/sub
                              └── PostgreSQL
```

### Production -- Full Platform

```
CLI (Rust)                    Backend (NestJS)         Web (React)
├── Native OS events          ├── REST API             ├── Dashboard UI
├── WebSocket (tokio)         ├── WebSocket Gateway    ├── WebSocket live feed
└── Zero-copy operations      ├── Redis Cluster        └── Clipboard API
                              ├── PostgreSQL
Mobile (Flutter)              ├── FCM push service
├── Clipboard monitoring      └── S3 (media clips)
├── WebSocket + FCM push
├── Offline queue
└── Share sheet integration
```

### HTTP Polling vs WebSocket

| Aspect | HTTP Polling | WebSocket |
|--------|-------------|-----------|
| Latency | ~5 s | < 100 ms |
| Server load | High (constant polls) | Low (on change only) |
| Bandwidth | Wasted on empty polls | Data only |
| Complexity | Simple | Medium |
| Offline handling | Automatic (fails silently) | Needs reconnect logic |
| Scaling | Poor | Good |

---

## Production Clipboard Listeners

Moving from polling to native OS events for instant detection.

<details>
<summary>macOS -- NSPasteboard notifications</summary>

```objc
- (void)pasteboardDidChange:(NSNotification *)notification {
    NSPasteboard *pasteboard = [NSPasteboard generalPasteboard];
    NSString *content = [pasteboard stringForType:NSPasteboardTypeString];
    // Push to API instantly
}

[[NSNotificationCenter defaultCenter]
    addObserver:self
    selector:@selector(pasteboardDidChange:)
    name:NSPasteboardDidChangeNotification
    object:nil];
```

</details>

<details>
<summary>Windows -- AddClipboardFormatListener</summary>

```c
AddClipboardFormatListener(hwnd);

// In window procedure
case WM_CLIPBOARDUPDATE: {
    HANDLE hData = GetClipboardData(CF_TEXT);
    // Push to API instantly
    break;
}
```

</details>

<details>
<summary>Linux -- XFixes selection events</summary>

```c
XFixesSelectSelectionInput(display, root, XA_PRIMARY,
    XFixesSetSelectionOwnerNotifyMask);

XEvent event;
while (XNextEvent(display, &event)) {
    if (event.type == XFixesSelectionNotify) {
        // Push to API instantly
    }
}
```

</details>

<details>
<summary>Cross-platform integration per language</summary>

**Node.js** -- use a library wrapper, no native code needed.

```js
const clipboardEvent = require('node-clipboard-event');

clipboardEvent.on('change', async (content) => {
    await pushToAPI(content);
});
```

**Go** -- library for quick wins, CGo for full control.

```go
// Option A: cross-platform library
import "github.com/golang-design/clipboard"

ch := clipboard.Watch(context.Background(), clipboard.FmtText)
for data := range ch {
    pushToAPI(string(data))
}

// Option B: platform-specific via build tags
// clipboard_darwin.go  -> CGo + Cocoa
// clipboard_windows.go -> syscall + Win32
// clipboard_linux.go   -> X11 / Wayland
```

**Rust** -- conditional deps per target OS.

```toml
[target.'cfg(target_os = "macos")'.dependencies]
cocoa = "0.25"

[target.'cfg(target_os = "windows")'.dependencies]
winapi = "0.3"

[target.'cfg(target_os = "linux")'.dependencies]
x11-clipboard = "0.7"
```

```rust
#[tokio::main]
async fn main() {
    watch(|content| {
        tokio::spawn(push_to_api(content));
    });

    let socket = connect_ws("wss://api.clipsynk.com").await?;
    socket.on("clipboard:update", |event| {
        apply_clipboard(event.content);
    });
}
```

</details>

---

## Summary

**Weeks 1-3 (CLI MVP)** -- Poll clipboard every 500 ms, poll API every 5 s. Ship Node.js daemon.

**Weeks 4-10 (CLI Production)** -- Native OS event listeners + WebSocket. Port to Go and Rust.

**Weeks 12-16 (Web Desktop)** -- React dashboard with clipboard history, real-time feed, and device management.

**Weeks 17-22 (Flutter Mobile)** -- iOS + Android app with clipboard sync, push notifications, offline queue, and share sheet integration.

Start simple, expand across platforms.
