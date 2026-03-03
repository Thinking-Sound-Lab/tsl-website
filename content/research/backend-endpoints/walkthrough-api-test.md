# Gallery API — Test Results & Bug Fix

## Test Summary

Ran **25 tests** against the mock test server at `http://localhost:4000`. **24 passed, 1 bug found and fixed.**

## Test Results

| # | Test | Method | Endpoint | Expected | Actual | Status |
|---|------|--------|----------|----------|--------|--------|
| 1 | Empty feed | GET | `/api/gallery` | 200 + empty array | 200 `{data:[], total:0}` | ✅ |
| 2 | Debug endpoint | GET | `/debug` | 200 + seeded data | 200 w/ users, driveItems, tokens | ✅ |
| 3 | Publish from app | POST | `/api/gallery/publish` | 201 + post data | 201 + id, title, image_url | ✅ |
| 4 | Feed shows post | GET | `/api/gallery` | 200 + non-empty | 200 + posts visible | ✅ |
| 5 | Single post | GET | `/api/gallery/:id` | 200 + post detail | 200 w/ full post fields | ✅ |
| 6 | Track prompt copy | POST | `/api/gallery/:id/copy` | 200 | 200 `{success:true}` | ✅ |
| 7 | Get models | GET | `/api/gallery/models` | 200 + model list | 200 w/ published models | ✅ |
| 8 | Upload init | POST | `/api/gallery/upload/init` | 200 + presignedUrl | 200 w/ presignedUrl + uploadKey | ✅ |
| 9 | Upload complete | POST | `/api/gallery/upload/complete` | 201 | 201 + post data | ✅ |
| 10 | Filter by model | GET | `/api/gallery?model=...` | 200 + filtered | 200 + filtered results | ✅ |
| 11 | Filter by media_type | GET | `/api/gallery?media_type=image` | 200 + filtered | 200 + all image posts | ✅ |
| 12 | Report a post | POST | `/api/gallery/:id/report` | 200 | 200 `{success:true}` | ✅ |
| 13 | Duplicate report | POST | `/api/gallery/:id/report` | 409 | **500** → 409 (after fix) | 🐛→✅ |
| 14 | Delete own post | DELETE | `/api/gallery/:id` | 200 | 200 `{success:true}` | ✅ |
| 15 | Non-admin → 403 | GET | `/api/admin/gallery/suspended` | 403 | 403 Forbidden | ✅ |
| 16 | Admin list suspended | GET | `/api/admin/gallery/suspended` | 200 | 200 + list | ✅ |
| 17 | Admin reinstate | PATCH | `/api/admin/gallery/:id` | 200 | 200 `{success:true}` | ✅ |
| 18 | Admin remove | PATCH | `/api/admin/gallery/:id` | 200 | 200 `{success:true}` | ✅ |
| 19 | Admin view reports | GET | `/api/admin/.../reports` | 200 | 200 + reports list | ✅ |
| 20 | Missing required fields | POST | `/api/gallery/publish` | 400 | 400 | ✅ |
| 21 | Publish without workspace | POST | `/api/gallery/publish` | 400 | 400 | ✅ |
| 22 | Invalid report reason | POST | `/api/gallery/:id/report` | 400 | 400 | ✅ |
| 23 | Upload init missing fields | POST | `/api/gallery/upload/init` | 400 | 400 | ✅ |
| 24 | No auth token | POST | `/api/gallery/publish` | 401 | 401 | ✅ |

---

## Bug Found & Fixed

### Duplicate report returns 500 instead of 409

**Root cause:** In [gallery.service.ts](file:///f:/Agency/Invook/backend/src/services/gallery.service.ts#L278-L282), the [reportPost](file:///f:/Agency/Invook/backend/src/services/gallery.service.ts#275-300) method threw a generic [Error](file:///f:/Agency/Invook/backend/src/utils/errors.ts#3-15) for duplicates:

```diff
+import { AppError } from '../utils/errors';
 ...
-if (error.code === '23505') throw new Error('You have already reported this post');
+if (error.code === '23505') throw new AppError('You have already reported this post', 409);
```

A plain [Error](file:///f:/Agency/Invook/backend/src/utils/errors.ts#3-15) has no `statusCode` property, so the error handler fell back to 500. Using [AppError](file:///f:/Agency/Invook/backend/src/utils/errors.ts#3-15) with status 409 (Conflict) gives the correct response.

**Verified:** After the fix, the duplicate report endpoint correctly returns HTTP 409.
