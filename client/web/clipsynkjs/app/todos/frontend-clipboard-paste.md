# Frontend: Integrate Paste Action (`POST /clipboard`)

Implement the frontend integration to capture the system clipboard text when the `$ paste` button is clicked and send it to the backend `POST /clipboard` endpoint.

---

## Steps

### 1. Backend Adjustments (Optional but Recommended)
**File:** `backend/clipsynkjs-api/src/clipboard/dto/create-clipboard.dto.ts`

- [ ] `generatedAt` is currently typed as a `string` but uses the `@IsDate()` decorator. If the frontend sends an ISO string, class-validator will reject it. Consider changing `@IsDate()` to `@IsDateString()`, or transforming the payload.
- [ ] If the frontend does not have all the required metadata right away (e.g. `deviceFingerprint`), consider validating how those are provided or making them `@IsOptional()` based on your requirements.

---

### 2. Implement the `action` in `dashboards` route
**File:** `client/web/clipsynkjs/app/routes/dashboards.tsx`

Since Remix/React Router v7 uses route actions for data mutations, you should export an `action` function to handle the POST request.

- [ ] Export an `action` function in `dashboards.tsx`.
- [ ] Read the form data (or JSON body) from the request.
- [ ] Extract the cookie and pass it to the `fetch` call to `${API_BASE}/clipboard` with `method: 'POST'`.
- [ ] Return the response (or redirect/json) so the loader automatically re-fetches the updated paginated list.

---

### 3. Update the `PageHeader` Component
**File:** `client/web/clipsynkjs/app/components/MainArea/ClipsArea/PageHeader.tsx`

The `PageHeader` has a hardcoded `$ paste` button. You'll need to trigger the action here.

- [ ] Import `useFetcher` from `react-router`.
- [ ] Inside `handlePaste`, read the user's clipboard using the standard Web API: `const text = await navigator.clipboard.readText();`.
- [ ] Construct the payload matching `CreateClipboardDto` (you might need helper functions for cryptographic hashing, getting the device fingerprint, etc.):
  ```ts
  const payload = {
    generatedAt: new Date().toISOString(),
    deviceFingerprint: "fingerprint-from-context-or-localstorage", // provide the real one
    clientTimestamp: Date.now(),
    mimeType: "text/plain",
    content: text,
    // Provide a simple hash (e.g., SHA-256) or let the backend do it if you choose to move hash generation to the backend
    contentHash: "hash-of-text", 
    contentSize: new Blob([text]).size,
  };
  ```
- [ ] Use `fetcher.submit(payload, { method: "post", action: "/dashboards", encType: "application/json" })` to trigger the backend call and automatically invalidate the loader.

---

## Notes

- **Browser Permissions:** The `navigator.clipboard.readText()` API will prompt the user for permission the first time it is triggered.
- **Auto-Refresh:** By using React Router's `useFetcher` to submit the data to a route action, the `loader` for `/dashboards` will be automatically re-triggered upon success, ensuring the `ClipsList` updates with the newly pasted item at the top!
- **Binary/Complex Types:** Right now `readText()` only drops plain text. Later, you can upgrade to `navigator.clipboard.read()` if you wish to read file BLOBS (images, etc.) from the clipboard dashboard.
