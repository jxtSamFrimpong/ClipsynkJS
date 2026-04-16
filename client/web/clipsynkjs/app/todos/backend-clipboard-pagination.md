# Backend: Paginated `GET /clipboard`

Implement server-side pagination for the clipboard endpoint so the frontend
can request a specific page of results rather than the full dataset.

---

## Steps

### 1. Update `ClipboardService.findAll()`
**File:** `backend/clipsynkjs-api/src/clipboard/clipboard.service.ts`

- [ ] Change the method signature to accept `page: number` and `limit: number`
- [ ] Replace `this.clipboardEventRepository.find()` with `findAndCount()` using:
  - `take: limit`
  - `skip: (page - 1) * limit`
  - `order: { createdAt: 'DESC' }` — most recent clips first
- [ ] Update the return type to `Promise<{ data: ClipboardEvent[]; total: number }>`
- [ ] Return `{ data, total }` from the destructured `findAndCount` result

---

### 2. Update `ClipboardController.findAll()`
**File:** `backend/clipsynkjs-api/src/clipboard/clipboard.controller.ts`

- [ ] Add `@Query('page') page: string = '1'` parameter
- [ ] Add `@Query('limit') limit: string = '7'` parameter
- [ ] Parse both to `Number` before passing to the service
- [ ] Forward `Number(page)` and `Number(limit)` to `clipboardService.findAll()`

---

## Expected response shape

```json
{
  "data": [ ...ClipboardEvent[] ],
  "total": 42
}
```

`total` is the full record count across all pages.
The frontend computes `totalPages = Math.ceil(total / limit)`.

---

## Notes

- Default params (`page=1`, `limit=7`) mean existing callers with no query params keep working.
- `limit=7` matches the agreed `PAGE_SIZE` from the eye test.
- No new DTOs needed — `data` items are the existing `ClipboardEvent` entity shape.
- Auth guard (`@UseGuards(JwtAuthGuard)`) remains unchanged on the controller.
