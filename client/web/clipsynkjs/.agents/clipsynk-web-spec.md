# ClipSynkJS Web Client — LLM Spec Document

> This document is written for an LLM agent starting a new session on this codebase.
> Read this before making any changes. It describes what exists, why decisions were made,
> and what must be preserved.

---

## 1. Project Overview

ClipSynkJS is a multi-platform clipboard sync product. The web client is **Phase 5** of a
broader roadmap that also includes CLI daemons (Node.js, Go, Rust) and a Flutter mobile app.

The web client is a **browser-based dashboard** — not a background sync daemon. The browser
Clipboard API cannot monitor the clipboard in the background, so this client acts as a
clipboard manager and history viewer. Users browse clipboard history, copy clips manually,
manage devices, and receive real-time updates via WebSocket.

**Current state**: UI-complete phase. Dashboard, Devices, and all Profile pages are built
with static data. No API integration yet. Auth pages exist as scaffolds.

---

## 2. Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | React Router v7 (framework mode, SSR enabled) |
| Language | TypeScript |
| Styling | Tailwind v4 (`@import "tailwindcss"`) |
| Build tool | Vite |
| Runtime | Node.js |
| State | React Context (no Redux, no Zustand — not needed at this scale) |
| Icons | None — ASCII/Unicode glyphs only |
| UI library | None — all components are hand-built |

React Router v7 framework mode means SSR is active. The server renders HTML on request,
sends it to the client, and React hydrates. This is why FOUC (Flash of Unstyled Content)
is a real concern and must be actively mitigated.

---

## 3. Design Philosophy

### Terminal / Robotic Aesthetic

Every visual decision references a terminal or CLI metaphor:
- Monospace font everywhere (`font-mono`). Design uses JetBrains Mono (titles/labels) and IBM Plex Mono (body/descriptions)
- Dark surfaces: `#0A0A0A` (canvas), `#111111` (elevated panels), `#1F1F1F` (active/hover states)
- Green (`#10B981`) is the **only** action/primary color — CTAs, `>` prompt, active states, success
- Amber (`#F59E0B`) is the **only** warning color — idle states, expiry timers, storage limits
- Red (`#EF4444`) is reserved strictly for broken/error states
- Muted borders: `#2A2A2A` (structural lines), `#1A1A1A` (low-emphasis containers)
- Nav icons are ASCII bracket-wrapped Unicode glyphs: `[◈]`, `[⊞]`, `[◎]`, `[?]`
- Button labels use shell-style naming: `./go_home`, `./go_back`, `./authenticate`
- User identity shown as `>_ username` (expanded) and `[AC]` monogram (collapsed)
- Error messages use terminal notation: `err: path not found`
- Clip type badges have their own distinct colors (cyan, purple, pink) — see Section 13

> **See Section 13 for the complete design token reference.**

### cursor-pointer Convention

**Every** `<button>` element and every `<div>` / `<span>` with an `onClick` handler must
include `cursor-pointer` in its Tailwind class list. This is non-negotiable — the default
cursor on buttons varies across browsers/OS and breaks the terminal aesthetic.

### No External Icon Libraries

Lucide, Heroicons, etc. were deliberately rejected. The bracket-glyph system is:
- Zero dependency
- Consistent with `font-mono`
- Serializable (stored as `string` in `NavItem` type, not as a React component)

The inner glyph is stored in data (`"◈"`). The rendering layer adds the brackets as JSX,
allowing independent color control: brackets are always `neutral-600`, inner glyph transitions
between `neutral-500` (inactive) and `green-400` (active).

### No External UI Component Library

All components are hand-built to maintain full aesthetic control. A component library like
shadcn/ui would import a "friendly SaaS" default aesthetic that conflicts with the terminal look.

---

## 4. File Structure Conventions

### Naming Rules

- **All directories and `.tsx` files**: TitleCase — `NotFound/`, `DashboardSideBar.tsx`
- **Route files**: lowercase matching the URL segment — `dashboards.tsx`, `clipboards.tsx`
  - Exception: `NotFound.tsx` (catch-all, no URL segment to match)
- **Context files**: TitleCase — `AppContext.tsx`, `DashboardContext.tsx`

### Directory Layout

```
app/
├── app.css                              # Tailwind import + blink keyframe + critical base styles
├── root.tsx                             # App shell, Layout, ErrorBoundary, AppProvider
├── routes.ts                            # Route config (React Router v7 format)
│
├── context/
│   ├── AppContext.tsx                   # Root-level: user/auth state
│   ├── DashboardContext.tsx             # Dashboard-level: collapsed only (NO active/setActive)
│   └── ProfileContext.tsx               # Profile section: ProfileData + updateProfile()
│
├── types/
│   └── nav_items.ts                    # NavItem type + NAV_ITEMS (4 items: clipboard/devices/history/help)
│
├── pages/
│   ├── NotFound/
│   │   └── NotFoundPage.tsx
│   ├── dashboards/
│   │   └── dashboardsPage.tsx          # DashboardShell + MainDashboardArea
│   ├── devices/
│   │   └── DevicesDashboardPage.tsx    # DashboardShell + DevicesMainArea
│   ├── clipboards/
│   │   └── clipboards.tsx              # Stub only
│   └── profile/
│       ├── AccountPage.tsx             # /profile/account — full overview
│       ├── AccountEditPage.tsx         # /profile/account/edit — edit form
│       ├── SyncPage.tsx                # /profile/sync
│       ├── StoragePage.tsx             # /profile/storage
│       ├── PrivacyPage.tsx             # /profile/privacy
│       ├── PlanPage.tsx                # /profile/plan — 3 plan cards
│       └── DangerPage.tsx              # /profile/danger — destructive actions
│
├── components/
│   ├── NotFound/
│   │   ├── ErrorCode/
│   │   │   └── ErrorCode.tsx
│   │   ├── TerminalBlock/
│   │   │   ├── TerminalBlock.tsx
│   │   │   ├── TerminalLine.tsx
│   │   │   └── TerminalCursor.tsx
│   │   └── Actions/
│   │       └── TerminalButton.tsx
│   │
│   ├── DashboardShell/
│   │   └── DashboardShell.tsx          # Shared layout: DashboardProvider + Sidebar + children
│   │
│   ├── ProfileShell/
│   │   ├── ProfileNavItem.tsx          # URL-aware nav item (useLocation active, useNavigate routing)
│   │   ├── ProfileNav.tsx              # 200px column, 6 nav items including danger zone
│   │   └── ProfileShell.tsx            # DashboardShell + ProfileNav + scrollable content
│   │
│   ├── SideBars/
│   │   ├── DashboardSideBar.tsx        # Sidebar orchestrator
│   │   ├── Logo/
│   │   │   └── DashboardLogo.tsx
│   │   ├── NavItems/
│   │   │   └── DashboardNavItems.tsx   # useLocation for active, useNavigate for routing
│   │   ├── UpgradePro/
│   │   │   └── UpradeToPro.tsx         # onClick navigates to /profile/plan
│   │   └── UserProfileFooter/
│   │       └── UserProfileFooter.tsx   # onClick navigates to /profile/account
│   │
│   ├── MainArea/
│   │   ├── MainDashboardArea.tsx       # ClipsArea + RightPanel (two-column)
│   │   ├── Shared/
│   │   │   └── SectionLabel.tsx        # "// label" style section headers
│   │   ├── ClipsArea/
│   │   │   ├── ClipsArea.tsx           # Assembler: PageHeader + FilterBar + ClipsList + StatsSection
│   │   │   ├── PageHeader/
│   │   │   ├── FilterBar/
│   │   │   ├── ClipsList/
│   │   │   └── StatsSection/
│   │   ├── RightPanel/
│   │   │   ├── RightPanel.tsx          # Assembler: IntegrationsSection + DevicesSection + SyncSection
│   │   │   ├── IntegrationsSection/
│   │   │   ├── DevicesSection/
│   │   │   └── SyncSection/
│   │   │       └── SyncItem.tsx        # interface uses `label: string` NOT `key` (React reserved)
│   │   └── DevicesArea/
│   │       ├── DevicesMainArea.tsx     # DevicesListArea (380px) + DeviceDetailPanel (fill)
│   │       ├── DevicesListArea/
│   │       │   ├── DevicesListArea.tsx
│   │       │   ├── DevicesHeader.tsx   # "> devices" + "+ link" button
│   │       │   ├── OverviewStats.tsx   # 4 mini stat chips
│   │       │   ├── DeviceListItem.tsx  # selected: green left border + #1F1F1F bg + [*] badge
│   │       │   └── DeviceList.tsx      # local selectedId state
│   │       └── DeviceDetailPanel/
│   │           ├── DeviceDetailPanel.tsx
│   │           ├── DetailHeader.tsx    # device name + [active] badge + deactivate/unlink
│   │           ├── ActivityHeatmap.tsx # 4 time-band rows × 7 day columns, 5-level green intensity
│   │           ├── DeviceStatsSection.tsx
│   │           ├── ClipGroupsSection.tsx
│   │           └── SyncPrefsSection.tsx
│   │
│   └── Profile/
│       ├── Shared/
│       │   └── KeyValueRow.tsx          # Reusable label/value pair
│       ├── Account/
│       │   └── AccountHeader.tsx        # "// account" label + "edit profile" button
│       ├── AccountEdit/
│       ├── Sync/
│       ├── Storage/
│       ├── Privacy/
│       ├── Plan/
│       └── Danger/
│
└── routes/
    ├── dashboards.tsx
    ├── devices.tsx
    ├── clipboards.tsx
    ├── profile.tsx                      # Layout route: ProfileProvider + ProfileShell + <Outlet>
    │                                    # Also redirects bare /profile → /profile/account
    ├── profile/
    │   ├── account.tsx
    │   ├── account-edit.tsx
    │   ├── sync.tsx
    │   ├── storage.tsx
    │   ├── privacy.tsx
    │   ├── plan.tsx
    │   └── danger.tsx
    ├── auth.tsx                          # Layout route for auth pages
    ├── login.tsx
    ├── signup.tsx
    ├── forgot-password.tsx
    ├── verify-token.tsx
    ├── reset-password.tsx
    └── NotFound.tsx
```

### Page Pattern

Every page:
1. Lives in `app/pages/<PageName>/<PageName>Page.tsx`
2. Is a default export named `<PageName>Page`
3. Is imported by a thin route wrapper in `app/routes/`
4. Owns navigation handlers (`useNavigate`) and `useEffect` logs
5. Does NOT receive props — reads state from context hooks

### Component Pattern

Every component:
1. Lives in `app/components/<Group>/<SubGroup>/<Component>.tsx`
2. Reads shared state via `useDashboard()`, `useApp()`, or `useProfile()` — no prop drilling for shared state
3. Accepts only the props that are truly local to it
4. Has a section comment header: `// ─── COMPONENT NAME ───`

### Route Wrapper Pattern

Route files are thin wrappers only:
```tsx
import FooPage from "~/pages/Foo/FooPage";
export default function Foo() { return <FooPage />; }
```
`meta`, `loader`, `action` exports go in route files. Logic goes in page files.

---

## 5. Context Architecture

### Three-level hierarchy

```
root.tsx
└── <AppProvider>                    ← root level (auth/user)
    ├── /login, /signup, /auth/*
    └── /dashboard, /devices
        └── <DashboardProvider>      ← inside DashboardShell (sidebar collapse only)
            ├── Sidebar
            └── children (main area)
                └── /profile/*
                    └── <ProfileProvider>  ← inside routes/profile.tsx layout route
                        └── ProfileShell + Outlet
```

### AppContext

```typescript
interface AppContextValue {
    user: { username: string } | null;
    setUser: (user: User | null) => void;
}
```

- `user` is currently hardcoded to `{ username: "alex_chen" }` — a placeholder
- **TODO**: Replace with real auth state (JWT/session) when auth is wired up
- Hook: `useApp()` — throws if used outside `<AppProvider>`

### DashboardContext

```typescript
interface DashboardContextValue {
    collapsed: boolean;
    toggleCollapsed: () => void;
}
```

- `collapsed` defaults to `false`
- **`active` and `setActive` DO NOT EXIST** — they were removed. Active nav state is derived
  entirely from `useLocation().pathname` in `DashboardNavItems`.
- Hook: `useDashboard()` — throws if used outside `<DashboardProvider>`
- `<DashboardProvider>` lives inside `DashboardShell`, not in individual page files

### ProfileContext

```typescript
interface ProfileData {
    username: string;
    email: string;
    displayName: string;
    timezone: string;
    language: string;
    plan: "free" | "pro" | "team";
    memberSince: string;
}

interface ProfileContextValue {
    profile: ProfileData;
    updateProfile: (partial: Partial<ProfileData>) => void;
}
```

- `<ProfileProvider>` lives in `routes/profile.tsx` (layout route), wrapping all `/profile/*`
- `AccountEditPage` reads `profile` to pre-fill form, calls `updateProfile(form)` on save
- `DangerPage` reads `profile.username` for delete confirmation input comparison
- `PlanPage` reads `profile.plan` to show which plan card has the current-plan badge
- Hook: `useProfile()` — throws if used outside `<ProfileProvider>`

### State that does NOT belong in context

- `NAV_ITEMS` — static config, imported directly from `~/types/nav_items`
- Nav active state — derived from `useLocation()`, not stored anywhere
- Tooltip open/close — ephemeral UI state, local `useState` when implemented
- Individual form field values — local state
- `selectedId` in `DeviceList` — local state (single-page selection)

---

## 6. Nav Item System

```typescript
// app/types/nav_items.ts
export type NavItem = { id: string; label: string; icon: string };

export const NAV_ITEMS: NavItem[] = [
    { id: "clipboard", label: "clipboard", icon: "◈" },
    { id: "devices",   label: "devices",   icon: "⊞" },
    { id: "history",   label: "history",   icon: "◎" },
    { id: "help",      label: "help",      icon: "?" },
];
```

`pinned` and `settings` were removed — they have no implemented pages and clutter the nav.

**ROUTE_MAP in `DashboardNavItems`:**
```typescript
const ROUTE_MAP: Record<string, string> = {
    clipboard: "/",
    devices:   "/devices",
    history:   "/history",
    help:      "/help",
};
```

**Active state derivation:**
```tsx
const isActive = item.id === "clipboard"
    ? location.pathname === "/"
    : location.pathname === route || location.pathname.startsWith(route + "/");
```

**Key decision**: `icon` is a `string` (inner glyph only, not bracket-wrapped).
The render layer adds brackets as JSX so brackets and glyph can be styled independently:
```tsx
<span className="text-neutral-600">[</span>
<span className={isActive ? "text-green-400" : "text-neutral-500"}>{item.icon}</span>
<span className="text-neutral-600">]</span>
```

---

## 7. Shell Patterns

### DashboardShell

Shared layout wrapper used by every dashboard-level page.

```tsx
// app/components/DashboardShell/DashboardShell.tsx
export default function DashboardShell({ children }: { children: ReactNode }) {
    return (
        <DashboardProvider>
            <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
                <Sidebar />
                {children}
            </div>
        </DashboardProvider>
    );
}
```

Used by: `DashboardsPage`, `DevicesDashboardPage`, and indirectly by `ProfileShell`.

### ProfileShell

Extends `DashboardShell` with the profile-specific left nav (200px) and a scrollable content column.

```tsx
// app/components/ProfileShell/ProfileShell.tsx
export default function ProfileShell({ children }: { children: ReactNode }) {
    return (
        <DashboardShell>
            <div className="flex flex-1 min-h-0 overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
                <ProfileNav />
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </DashboardShell>
    );
}
```

`ProfileShell` is rendered inside `routes/profile.tsx` (the layout route), so all 7
`/profile/*` sub-routes automatically get the shell without each page importing it.

### ProfileNav items (6)

| Label | Route |
|-------|-------|
| account | `/profile/account` |
| sync & connectivity | `/profile/sync` |
| storage & history | `/profile/storage` |
| privacy & security | `/profile/privacy` |
| plan & billing | `/profile/plan` |
| danger zone | `/profile/danger` — `isDanger` prop makes text `#EF4444` |

---

## 8. Sidebar Behaviour

- Expanded width: `w-56` (224px)
- Collapsed width: `w-14` (56px)
- Collapse toggle button: yellow (`text-yellow-400`), hidden when collapsed
- When collapsed, the `>` in the Logo becomes a clickable expand button
- Both the toggle button and the Logo button call `toggleCollapsed()` — same action, uniform API
- `UpgradeToPro` returns `null` when collapsed (no hidden/show, full unmount)
  - **When clicked** → navigates to `/profile/plan`
- `UserProfileFooter` shows `[AC]` monogram when collapsed, `>_ alex_chen` when expanded
  - **When clicked** → navigates to `/profile/account`
- `deriveMonogram(username)` — splits on `[_\-\s.]+`, takes first char of first two parts, uppercased

### Tooltip status

Nav item labels are currently shown via the native HTML `title` attribute on hover.
This was a compromise after the CSS-only tooltip approach (group + absolute positioning)
failed because `overflow-y-auto` on `<nav>` clips absolutely positioned children.

**Planned fix**: React portal tooltip using `getBoundingClientRect()` + `ReactDOM.createPortal`
rendered into `document.body`. No external library needed.

---

## 9. Logging Standard

Based on the fullstackopen principle: "write lots of console.log statements to make sure
you understand how the code and tests behave and to help pinpoint problems."

### Rules
- Every `useEffect` that watches state logs the new value
- Every user interaction handler logs before calling the state mutation
- Every provider logs on mount with initial state
- Format: `[ComponentName] description: value`
- Log state transitions as `{ previous: x, next: y }` where useful

### Example from DashboardContext
```typescript
function toggleCollapsed() {
    console.log("[DashboardContext] toggleCollapsed called, current:", collapsed, "→ next:", !collapsed);
    setCollapsed((prev) => !prev);
}
```

---

## 10. FOUC (Flash of Unstyled Content) Prevention

This is an SSR app. The browser receives HTML, starts parsing, encounters `<link rel="stylesheet">`,
begins fetching it. There is a window between HTML parse and CSS load where no Tailwind classes apply.

### Strategy

**Layer 1 — Dark canvas (inline on html/body)**
In `root.tsx` `Layout` component:
```tsx
<html lang="en" style={{ backgroundColor: "#0d0d0d" }}>
  <body style={{ backgroundColor: "#0d0d0d" }}>
```
Inline styles travel in the HTML payload. No fetch required. Body is always dark.

**Layer 2 — Inline critical CSS reset (in `<head>`)**
```tsx
<style dangerouslySetInnerHTML={{ __html: `
  *, *::before, *::after { box-sizing: border-box; }
  button, input, select, textarea { background-color: transparent; appearance: none; }
`}} />
```
Resets browser-default white/gray backgrounds on form elements before Tailwind Preflight loads.

**Layer 3 — `app.css` base styles (after CSS loads)**
```css
html, body { background-color: #0d0d0d; color-scheme: dark; }
```
Reinforces the dark background once the stylesheet is parsed.

**Layer 4 — Per-component inline styles (for brand-critical colors)**
Components where the color IS the content (buttons, 404 page containers) use inline `style`
props alongside Tailwind classes:
```tsx
style={{ backgroundColor: "#10B981", color: "#0A0A0A" }}
```

### Mental model
- `html`/`body` = dark canvas, always
- Most elements = `transparent` by default = dark canvas shows through = no flash
- `<button>` etc. = reset to transparent by inline `<style>` in `<head>`
- Brand colors on interactive elements = inline `style` props

---

## 11. 404 Page

Source of truth: Pencil design file at `/home/jxtsamfrimpong/Dev/Design/clipsynkjs.pen`,
node `UU2sf` ("ClipSync - 404").

### Component tree
```
NotFoundPage
├── ErrorCode           — "404", 120px, #10B981, letter-spacing -4px
├── TerminalBlock
│   ├── TerminalLine    — line 1: "> cd /requested/route"
│   ├── TerminalLine    — line 2: "err: path not found..."
│   └── TerminalLine    — line 3: "> [cursor]"
│       └── TerminalCursor  — 8×18px green block, animate-blink
├── <p>                 — description text, gray, centered
└── <div> actions
    ├── TerminalButton variant="filled"   — "~ ./go_home"
    └── TerminalButton variant="outline"  — "< ./go_back"
```

### TerminalButton props
```typescript
interface TerminalButtonProps {
    icon: string;               // "~" or "<"
    label: string;              // "./go_home" or "./go_back"
    variant?: "filled" | "outline";
    onClick: () => void;
}
```

### ErrorBoundary vs catch-all route
- Catch-all route (`*`) handles unmatched URLs → renders `NotFoundPage` — no error thrown
- `ErrorBoundary` handles: loader-thrown 404s, loader errors, runtime component errors
- The separation is intentional — `ErrorBoundary` is for broken things, `*` is for missing routes

### animate-blink
Defined in `app.css` `@theme` block:
```css
--animate-blink: blink 1s step-end infinite;
@keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}
```
`step-end` gives hard on/off (real terminal cursor), not a fade.

---

## 12. Known TODOs / Compromises

| Item | Current state | Planned fix |
|------|--------------|-------------|
| Nav item tooltips | Native `title` attribute (unstyled, 500ms delay) | React portal tooltip via `getBoundingClientRect()` + `createPortal` |
| Auth / user | `user` hardcoded as `{ username: "alex_chen" }` in `AppContext` | Wire real auth (JWT/OAuth), derive from session |
| Profile data | Hardcoded in `ProfileContext` initial state | Wire to real user API |
| Static clip data | All static arrays in components (`CLIPS`, `DEVICES`, etc.) | Replace with API-fetched data |
| Static device detail | `DetailHeader`, `ActivityHeatmap`, `DeviceStatsSection` all have hardcoded data | Accept selected device as prop from real state |
| `selectedId` in DeviceList | Local state, resets on navigate | Lift to URL param or context when implementing real device selection |
| ClipboardsPage | Stub: `<div>clipboards</div>` | Full clipboard history UI |
| Font | `font-mono` system stack | Consider adding JetBrains Mono via Google Fonts (design uses it) |
| `SyncItemData.label` | Was `key` — React reserves this prop name, renamed to `label` | Done — never use `key` as a prop interface field |
| Active nav from URL | ~~Hardcoded useState~~ | Done — `useLocation()` in `DashboardNavItems` |
| DashboardContext `active` | ~~Context stored active nav~~ | Done — removed entirely, derived from URL |
| UpgradeToPro button | ~~No onClick~~ | Done — navigates to `/profile/plan` |
| MainDashboardArea | ~~Placeholder~~ | Done — ClipsArea + RightPanel |

---

## 13. Commands

```bash
# Development server
npm run dev

# Build
npm run build

# Type check
npm run typecheck
```

Working directory: `/home/jxtsamfrimpong/Dev/Backend/JS/ClipSynkJS/client/web/clipsynkjs`

---

## 14. Design System — Visual Language

This is the single source of truth for all color decisions. Every new component must use
these tokens. Do not introduce ad-hoc colors.

### Core Surfaces

| Name | Hex | Role |
|------|-----|------|
| Void Black | `#0A0A0A` | Canvas background — the terminal itself |
| Surface | `#111111` | Elevated panels (branding panels on auth pages) |
| Raised | `#1F1F1F` | Active nav items, hover states |
| Border | `#2A2A2A` | All structural lines — separators, input outlines, card edges |
| Subtle Border | `#1A1A1A` | Low-emphasis containers (password requirements, hint blocks) |

### Text Hierarchy

| Name | Hex | Role | Used For |
|------|-----|------|----------|
| White | `#FFFFFF` | Section headers | `// recent_clips`, `// sync_config` — structural labels |
| Off-white | `#FAFAFA` | Primary content | Clip titles, device names, stat values, form input text |
| Light Gray | `#9CA3AF` | Labels | Form field labels, feature list text |
| Mid Gray | `#6B7280` | Muted | Metadata, timestamps, descriptions, subtitles (`# comment` style) |
| Dark Gray | `#4B5563` | Dimmed | Input placeholders, inactive steps, disabled filter values |

### Semantic Colors

| Name | Hex | Meaning | Used For |
|------|-----|---------|----------|
| Green | `#10B981` | Active / Success / Primary | CTAs (`./create_account`), online status dots, connected integrations, active filter values, `>` prompt, positive deltas |
| Amber | `#F59E0B` | Warning / Attention | Idle devices, storage nearing capacity, token expiry timers, degraded states, upgrade box border |
| Red | `#EF4444` | Error / Danger | `err:` messages, failed states — reserved strictly for broken things |
| Cyan | `#06B6D4` | Media content | `[image]` clip type — visual/rich content |
| Purple | `#A855F7` | Code / Technical | `[code]` clip type — structured/programmatic data |
| Pink | `#F472B6` | Files / Documents | `[file]` clip type — attachments, PDFs, documents |

### Status Dots

| Color | Meaning |
|-------|---------|
| Green `#10B981` | Online / Connected / Active |
| Amber `#F59E0B` | Idle / Pending / Needs attention |
| Gray `#6B7280` | Offline / Disconnected / Not configured |

### Clip Type Badges

| Badge | Color | Rationale |
|-------|-------|-----------|
| `[text]` | Green `#10B981` | Default content type — aligns with primary brand color |
| `[link]` | Green `#10B981` | URLs are text-adjacent, shares green |
| `[image]` | Cyan `#06B6D4` | Visual content gets its own cool-toned distinction |
| `[code]` | Purple `#A855F7` | Technical/developer content — distinct and recognizable |
| `[file]` | Pink `#F472B6` | Documents/attachments — warm tone, separate from status colors |

### Design Principles

1. **Green is the only action color.** Every CTA, every `>` prompt, every interactive accent is
   green. If it's green, you can click it or it's telling you things are working.

2. **Amber never means "good".** It always signals something that needs awareness: expiring,
   nearing limits, idle.

3. **Red is rare.** Only appears when something is genuinely broken. It should feel alarming
   when you see it.

4. **Content-type colors (cyan, purple, pink) are never used for status.** They only appear on
   clip badges and their dots. This prevents confusion between "what type is this" and "what
   state is this in."

5. **Gray scales carry hierarchy, not meaning.** Lighter gray = more important, darker gray =
   less important. No semantic meaning attached to any shade of gray.
