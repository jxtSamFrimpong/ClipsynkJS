# Phase Plan: Authentication Flow Phase

## Phase Overview
The Authentication flow handles user identity, secure sessions, password recovery, and device verification. It restricts access to dashboard features using React Router loaders that forward user session cookies to verify identity against the NestJS API.

---

## Goals

### Client / Frontend
- [ ] Connect `signUpAction.ts` to `POST /auth/signup` sending name, email, password, and device fingerprint.
- [ ] Connect `loginAction.ts` to `POST /auth/login` sending email, password, and device fingerprint.
- [ ] Implement `requireAuth` and `requireGuest` loaders in `app/loaders/auth.ts` to verify session via `GET /auth/me`.
- [ ] Implement client-side format checks (email regex, password length/strength) and password matching.
- [ ] Implement device fingerprinting (`buildFingerprint()` / `buildDeviceInfo()`) using GPU WebGL/canvas metrics.

### Backend / API
- [ ] Finalize JWT-based HTTP-only session cookie management.
- [ ] Register `cookie-parser` in `main.ts` so authentication cookies are read properly on request headers.
- [ ] Validate registration DTOs ensuring fields are trimmed and not empty.
- [ ] Configure `AuthGuard` and Passport JWT strategy to extract `access_token` from cookies.

---

## Architecture & Design Decisions
- **Session mechanism**: Cookie-based authentication. The browser client automatically attaches the cookie, but during server-side rendering (SSR), the Node.js runner must explicitly capture `request.headers.cookie` and forward it in headers to the backend NestJS service.
- **Fingerprinting**: Browser clients compile stable hardware device information upon submission. Signup requests map this metadata to the newly registered device in the database.

---

## Current Status
- **Current State**: Auth forms and loaders exist as stubs/scaffolds. Real signup and login actions are pending end-to-end integration.
- **Active Workstream**: None

---

## Future Enhancements & Roadmap
- [ ] Multi-factor authentication (MFA) via TOTP.
- [ ] OAuth2 providers (Google, GitHub).
- [ ] Magic link email logins.
