# CLAUDE.md — Project Knowledge Base

> **Last Updated**: 2026-05-27
> **Status**: Restructuring of documentation complete. Monorepo folder setup, phase templates, task templates, and shell hooks initialized.

---

## What This Project Is

ClipsynkJS is a clipboard syncing application designed to synchronize clipboard contents seamlessly across platforms. The monorepo includes:
* **NestJS API backend** providing databases, authentication, and WebSocket updates.
* **React Router client** providing a dark terminal-themed web dashboard for clip management.

---

## Monorepo Structure

```
ClipsynkJS/
├── backend/
│   └── clipsynkjs-api/             # NestJS API (REST + WebSocket)
│       ├── src/                    # App source (auth, clipboard, users, devices)
│       └── package.json
│
├── client/
│   └── web/clipsynkjs/             # React Router v7 client (Vite SSR + Tailwind v4)
│       ├── app/                    # Web source (pages, components, context, services)
│       └── package.json
│
├── docs/                           # Documentation and planning hub
│   ├── plan/
│   │   ├── phases/                 # Living feature-oriented phase plans
│   │   └── workstreams/            # Active sprint plans (1-week chunks)
│   ├── active/                     # Active task tracker files (TASK_*.md)
│   └── archive/
│       ├── tasks/                  # Archived task trackers (completed tasks)
│       ├── plans/
│       │   └── workstreams/        # Archived completed workstreams
│       └── guides/                 # User/Developer guides (e.g. actions-guide, web-spec)
│
└── .claude/                        # Agentic memory files
    ├── CLAUDE.md                   # This file (monorepo source of truth)
    └── hooks/                      # Automation hooks for compaction and tracking
```

---

## Technical Stack & Commands

### Backend API (`backend/clipsynkjs-api/`)
* **Core**: NestJS + TypeORM + Redis (ioredis)
* **Setup**: `npm install`
* **Development**: `npm run start:dev`
* **Tests**: `npm run test`

### Web Client (`client/web/clipsynkjs/`)
* **Core**: React Router v7 (SSR) + TailwindCSS v4 + TypeScript + Vite
* **Setup**: `npm install`
* **Development**: `npm run dev` (starts on port 5173)
* **Build**: `npm run build`
* **Typecheck**: `npm run typecheck`

---

## Key Coding Conventions

### Naming Conventions
* **Directories & Component Files**: TitleCase (e.g., `DashboardSideBar.tsx`, `NotFoundPage.tsx`).
* **Route Files**: Lowercase matching URL segment (e.g., `routes/dashboards.tsx`, `routes/clipboards.tsx`).
* **Page Files**: `app/pages/<PageName>/<PageName>Page.tsx`.
* **Component Files**: `app/components/<Group>/<SubGroup>/<Component>.tsx`.
* **Context Files**: `app/context/<Name>Context.tsx`.

### Design System & Visual Tokens
* **Void Black Canvas**: `#0A0A0A`
* **Elevated Surfaces**: `#111111`
* **Active/Hover Panel**: `#1F1F1F`
* **Borders**: `#2A2A2A` (or `#1A1A1A` for low-emphasis)
* **Semantic Colors**:
  * **Green (`#10B981`)**: Action, success, primary active status, connected indicators, UI prompts.
  * **Amber (`#F59E0B`)**: Warnings, idle states, capacity boundaries.
  * **Red (`#EF4444`)**: Errors, broken states.
  * **Content Badges**: Cyan (`#06B6D4`, images), Purple (`#A855F7`, code), Pink (`#F472B6`, files).
* **Clickable Rule**: Every `<button>` or custom `onClick` element *must* have the `cursor-pointer` class.

### Actions Pattern (React Router)
* Named exports only inside `app/services/actions/<name>Action.ts`.
* Use `ActionFunctionArgs` from `'react-router'` for type parameters.
* Submit form data by enclosing stringified JSON inside a single `"data"` key:
  ```ts
  const fd = new FormData();
  fd.set("data", JSON.stringify(payload));
  fetcher.submit(fd, { method: "post" });
  ```
  *(Avoids JSON index signature assignment issues on React Router's target type).*
* SSR fetch calls must manually forward browser cookies via `request.headers.get('cookie')` to verify session on backend endpoints.

### Logging Standard
* Log mounts, state updates, and events using:
  `console.log("[ComponentName] description: value")`

## Client Design & Specification Index

For full design requirements, visual layouts, and styling tokens, refer to the following sections in [clipsynk-web-spec.md](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md):

* **Robotic/Terminal Aesthetic Rules** ([clipsynk-web-spec.md: L45-84](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L45-L84)): Monospace fonts, standard bracket-wrapped glyphs, and general aesthetic guidelines.
* **Directory Layout & Conventions** ([clipsynk-web-spec.md: L86-252](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L86-L252)): Rules for TitleCase folder names, route structures, and file locations.
* **Context State Hierarchy** ([clipsynk-web-spec.md: L254-332](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L254-L332)): Breakdown of the 3-level context layer and how states are accessed.
* **Navigation Item Mapping** ([clipsynk-web-spec.md: L334-375](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L334-L375)): Mapping URL routes to items and glyphs.
* **Shell Components Layout** ([clipsynk-web-spec.md: L377-431](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L377-L431)): Layout of `DashboardShell`, `ProfileShell`, and side menus.
* **Sidebar Collapse Rules** ([clipsynk-web-spec.md: L433-455](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L433-L455)): Width dimensions and expanding triggers.
* **FOUC (Flash of Unstyled Content) Reset** ([clipsynk-web-spec.md: L479-522](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L479-L522)): Reset stylesheet headers and inline elements background colors.
* **404 Terminal Page Structure** ([clipsynk-web-spec.md: L524-570](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L524-L570)): Layout of the terminal cursor, custom lines, and boundaries.
* **Design Token Reference** ([clipsynk-web-spec.md: L609-680](file://$HOME/Dev/Backend/JS/ClipsynkJS/docs/archive/guides/clipsynk-web-spec.md#L609-L680)): Authoritative hex codes for surfaces, text hierarchy, badges, and status colors.

## Agent Roles & Workflows

This monorepo project uses specific sub-agent roles to separate concerns and ensure structural quality. Refer to these roles for task assignment, plan reviews, and bug diagnostics.

### 1. Principal Architect (`principal-architect`)
* **Scope**: All backend database schemas, API architecture, configuration files, and system designs.
* **Responsibilities**:
  * **Planning**: Planning of backend phases, workstreams, and tasks.
  * **Troubleshooting**: Diagnosing system errors, database mismatches, connection failures, and other backend misbehaviors.
  * **Review**: Reviews implementation code changes on the backend.

### 2. Architect Wizard (`architect-wizard`)
* **Scope**: Web client components, contexts, layouts, styles, actions, loaders, and routing.
* **Responsibilities**:
  * **Planning**: Planning client-side structures, pages, and components.
  * **Implementation**: Coding, styling, and testing frontend client pages and components.
  * **Review**: Performs reviews of all phase, workstream, and task plans (both frontend and backend) to ensure logic and architectural alignment.

### 3. Backend Systems Engineer (`backend-system-engineer`)
* **Scope**: Execution of backend API code, migrations, database queries, and CLI tools.
* **Responsibilities**:
  * **Implementation**: Implementing database changes, service methods, REST endpoints, and automated tests.
  * **Tracking**: Creating and managing task trackers (`docs/active/TASK_*.md`) during implementation.

### Troubleshooting Handoff (PA → BSE / AW)
1. **Diagnosis (Step 1)**: When a command fails or a bug is encountered, `principal-architect` is invoked first. It follows the Log Analysis Protocol, diagnoses the exact failure mechanism, and writes the diagnosis to the task tracker under `docs/active/`.
2. **Proposal**: `principal-architect` proposes a fix with trade-offs and risks, but **does not write the code**.
3. **Approval**: The user reviews and approves the proposal.
4. **Execution**: The appropriate engineering agent implements the fix:
   * Backend changes are written and tested by `backend-system-engineer`.
   * Frontend changes are written and tested by `architect-wizard`.

---

## Session State

### Current Session (2026-05-27)

**What was completed**:
* **[Agentic Restructuring]** ✅: Created `docs/` subdirectory structures (`plan/phases`, `plan/workstreams`, `active`, `archive/tasks`, `archive/plans/workstreams`, `archive/guides`). Moved `actions-guide.md` and `clipsynk-web-spec.md` into `docs/archive/guides/`.
* **[Templates & Hooks]** ✅: Initialized templates for tasks, phases, and workstreams. Created bash hook scripts under `.claude/hooks/` and initialized this `CLAUDE.md` file.

**What is being worked on**:
* Initial setup and monorepo structural validation.

**Active task trackers**:
* None.

**What is next**:
1. **Phase 1: Clipboard Integration** — Map React Router loader and fetcher events to backend Rest API for listing, creating, and deleting clipboard entries.
2. **Phase 3: Auth Integration** — Wire signup, login, and token verification end-to-end.

**Open decisions for user**:
* None.
