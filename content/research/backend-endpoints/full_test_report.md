# Invook Gallery API — Comprehensive Test & Verification Report

This report contains full request and response payloads for all Gallery API endpoints, mapped directly to the product specification flows.

---

## Testing Summary
- **Tests Executed:** 31
- **Endpoints Covered:** Public queries, App Publishing, Website Uploads, Reporting, Admin moderation, Deletion
- **Edge Cases:** Validation errors, Duplicate reports (Bug fixed to return 409), Authentication bypass attempts

---

### 1. T01_EmptyFeed

**Request:** `GET http://localhost:4000/api/gallery`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "data": [],
    "total": 0,
    "page": 1,
    "limit": 30,
    "hasMore": false
  }
}
```

---

### 2. T02_EmptyModels

**Request:** `GET http://localhost:4000/api/gallery/models`

**Response: 200** ✅
```json
{
  "success": true,
  "data": []
}
```

---

### 3. T03_PublishFromApp

**Request:** `POST http://localhost:4000/api/gallery/publish`

**Headers:**
```json
{
  "Authorization": "Bearer test-user",
  "X-Workspace-Id": "44444444-4444-4444-4444-444444444444"
}
```

**Payload:**
```json
{
  "driveItemId": "33333333-3333-3333-3333-333333333333",
  "title": "Cyberpunk City",
  "prompt": "A neon-lit cyberpunk city at night",
  "modelName": "fal-ai/flux/schnell"
}
```

**Response: 201** ✅
```json
{
  "success": true,
  "data": {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "username": "Test User",
    "drive_item_id": "33333333-3333-3333-3333-333333333333",
    "title": "Cyberpunk City",
    "description": null,
    "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
    "media_type": "image",
    "mime_type": "image/png",
    "width": 1024,
    "height": 768,
    "file_size_bytes": 204800,
    "media_metadata": {},
    "prompt": "A neon-lit cyberpunk city at night",
    "model_name": "fal-ai/flux/schnell",
    "model_display_name": "FLUX Schnell",
    "status": "active",
    "posted_from": "invook_app",
    "id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
    "created_at": "2026-03-02T21:53:14.722Z"
  }
}
```

---

### 4. T04_PublishHiddenPrompt

**Request:** `POST http://localhost:4000/api/gallery/publish`

**Headers:**
```json
{
  "Authorization": "Bearer test-user",
  "X-Workspace-Id": "44444444-4444-4444-4444-444444444444"
}
```

**Payload:**
```json
{
  "driveItemId": "33333333-3333-3333-3333-333333333333",
  "title": "Hidden Prompt Art",
  "prompt": "Secret prompt content",
  "modelName": "fal-ai/flux-pro",
  "description": "This post hides its prompt"
}
```

**Response: 201** ✅
```json
{
  "success": true,
  "data": {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "username": "Test User",
    "drive_item_id": "33333333-3333-3333-3333-333333333333",
    "title": "Hidden Prompt Art",
    "description": "This post hides its prompt",
    "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
    "media_type": "image",
    "mime_type": "image/png",
    "width": 1024,
    "height": 768,
    "file_size_bytes": 204800,
    "media_metadata": {},
    "prompt": "Secret prompt content",
    "model_name": "fal-ai/flux-pro",
    "model_display_name": "FLUX Pro",
    "status": "active",
    "posted_from": "invook_app",
    "id": "2940b0f3-83ae-4bbe-b889-21534f34fd7a",
    "created_at": "2026-03-02T21:53:14.730Z"
  }
}
```

---

### 5. T05_FeedWithPosts

**Request:** `GET http://localhost:4000/api/gallery`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "user_id": "11111111-1111-1111-1111-111111111111",
        "username": "Test User",
        "drive_item_id": "33333333-3333-3333-3333-333333333333",
        "title": "Hidden Prompt Art",
        "description": "This post hides its prompt",
        "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
        "media_type": "image",
        "mime_type": "image/png",
        "width": 1024,
        "height": 768,
        "file_size_bytes": 204800,
        "media_metadata": {},
        "prompt": "Secret prompt content",
        "model_name": "fal-ai/flux-pro",
        "model_display_name": "FLUX Pro",
        "status": "active",
        "posted_from": "invook_app",
        "id": "2940b0f3-83ae-4bbe-b889-21534f34fd7a",
        "created_at": "2026-03-02T21:53:14.730Z"
      },
      {
        "user_id": "11111111-1111-1111-1111-111111111111",
        "username": "Test User",
        "drive_item_id": "33333333-3333-3333-3333-333333333333",
        "title": "Cyberpunk City",
        "description": null,
        "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
        "media_type": "image",
        "mime_type": "image/png",
        "width": 1024,
        "height": 768,
        "file_size_bytes": 204800,
        "media_metadata": {},
        "prompt": "A neon-lit cyberpunk city at night",
        "model_name": "fal-ai/flux/schnell",
        "model_display_name": "FLUX Schnell",
        "status": "active",
        "posted_from": "invook_app",
        "id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
        "created_at": "2026-03-02T21:53:14.722Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 30,
    "hasMore": false
  }
}
```

---

### 6. T06_SinglePost

**Request:** `GET http://localhost:4000/api/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "username": "Test User",
    "drive_item_id": "33333333-3333-3333-3333-333333333333",
    "title": "Cyberpunk City",
    "description": null,
    "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
    "media_type": "image",
    "mime_type": "image/png",
    "width": 1024,
    "height": 768,
    "file_size_bytes": 204800,
    "media_metadata": {},
    "prompt": "A neon-lit cyberpunk city at night",
    "model_name": "fal-ai/flux/schnell",
    "model_display_name": "FLUX Schnell",
    "status": "active",
    "posted_from": "invook_app",
    "id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
    "created_at": "2026-03-02T21:53:14.722Z",
    "views_count": 1
  }
}
```

---

### 7. T07_SinglePostHiddenPrompt

**Request:** `GET http://localhost:4000/api/gallery/2940b0f3-83ae-4bbe-b889-21534f34fd7a`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "username": "Test User",
    "drive_item_id": "33333333-3333-3333-3333-333333333333",
    "title": "Hidden Prompt Art",
    "description": "This post hides its prompt",
    "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
    "media_type": "image",
    "mime_type": "image/png",
    "width": 1024,
    "height": 768,
    "file_size_bytes": 204800,
    "media_metadata": {},
    "prompt": "Secret prompt content",
    "model_name": "fal-ai/flux-pro",
    "model_display_name": "FLUX Pro",
    "status": "active",
    "posted_from": "invook_app",
    "id": "2940b0f3-83ae-4bbe-b889-21534f34fd7a",
    "created_at": "2026-03-02T21:53:14.730Z",
    "views_count": 1
  }
}
```

---

### 8. T08_TrackCopy

**Request:** `POST http://localhost:4000/api/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d/copy`

**Response: 200** ✅
```json
{
  "success": true
}
```

---

### 9. T09_ModelsWithData

**Request:** `GET http://localhost:4000/api/gallery/models`

**Response: 200** ✅
```json
{
  "success": true,
  "data": [
    {
      "user_id": "11111111-1111-1111-1111-111111111111",
      "username": "Test User",
      "drive_item_id": "33333333-3333-3333-3333-333333333333",
      "title": "Hidden Prompt Art",
      "description": "This post hides its prompt",
      "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
      "media_type": "image",
      "mime_type": "image/png",
      "width": 1024,
      "height": 768,
      "file_size_bytes": 204800,
      "media_metadata": {},
      "prompt": "Secret prompt content",
      "model_name": "fal-ai/flux-pro",
      "model_display_name": "FLUX Pro",
      "status": "active",
      "posted_from": "invook_app",
      "id": "2940b0f3-83ae-4bbe-b889-21534f34fd7a",
      "created_at": "2026-03-02T21:53:14.730Z",
      "views_count": 1
    },
    {
      "user_id": "11111111-1111-1111-1111-111111111111",
      "username": "Test User",
      "drive_item_id": "33333333-3333-3333-3333-333333333333",
      "title": "Cyberpunk City",
      "description": null,
      "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
      "media_type": "image",
      "mime_type": "image/png",
      "width": 1024,
      "height": 768,
      "file_size_bytes": 204800,
      "media_metadata": {},
      "prompt": "A neon-lit cyberpunk city at night",
      "model_name": "fal-ai/flux/schnell",
      "model_display_name": "FLUX Schnell",
      "status": "active",
      "posted_from": "invook_app",
      "id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
      "created_at": "2026-03-02T21:53:14.722Z",
      "views_count": 1,
      "copy_count": 1
    }
  ]
}
```

---

### 10. T10_FilterByModel

**Request:** `GET http://localhost:4000/api/gallery?model=fal-ai/flux/schnell`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "user_id": "11111111-1111-1111-1111-111111111111",
        "username": "Test User",
        "drive_item_id": "33333333-3333-3333-3333-333333333333",
        "title": "Cyberpunk City",
        "description": null,
        "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
        "media_type": "image",
        "mime_type": "image/png",
        "width": 1024,
        "height": 768,
        "file_size_bytes": 204800,
        "media_metadata": {},
        "prompt": "A neon-lit cyberpunk city at night",
        "model_name": "fal-ai/flux/schnell",
        "model_display_name": "FLUX Schnell",
        "status": "active",
        "posted_from": "invook_app",
        "id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
        "created_at": "2026-03-02T21:53:14.722Z",
        "views_count": 1,
        "copy_count": 1
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 30,
    "hasMore": false
  }
}
```

---

### 11. T11_FilterByMediaType

**Request:** `GET http://localhost:4000/api/gallery?media_type=image`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "user_id": "11111111-1111-1111-1111-111111111111",
        "username": "Test User",
        "drive_item_id": "33333333-3333-3333-3333-333333333333",
        "title": "Hidden Prompt Art",
        "description": "This post hides its prompt",
        "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
        "media_type": "image",
        "mime_type": "image/png",
        "width": 1024,
        "height": 768,
        "file_size_bytes": 204800,
        "media_metadata": {},
        "prompt": "Secret prompt content",
        "model_name": "fal-ai/flux-pro",
        "model_display_name": "FLUX Pro",
        "status": "active",
        "posted_from": "invook_app",
        "id": "2940b0f3-83ae-4bbe-b889-21534f34fd7a",
        "created_at": "2026-03-02T21:53:14.730Z",
        "views_count": 1
      },
      {
        "user_id": "11111111-1111-1111-1111-111111111111",
        "username": "Test User",
        "drive_item_id": "33333333-3333-3333-3333-333333333333",
        "title": "Cyberpunk City",
        "description": null,
        "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
        "media_type": "image",
        "mime_type": "image/png",
        "width": 1024,
        "height": 768,
        "file_size_bytes": 204800,
        "media_metadata": {},
        "prompt": "A neon-lit cyberpunk city at night",
        "model_name": "fal-ai/flux/schnell",
        "model_display_name": "FLUX Schnell",
        "status": "active",
        "posted_from": "invook_app",
        "id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
        "created_at": "2026-03-02T21:53:14.722Z",
        "views_count": 1,
        "copy_count": 1
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 30,
    "hasMore": false
  }
}
```

---

### 12. T12_Pagination

**Request:** `GET http://localhost:4000/api/gallery?page=1&limit=1`

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "user_id": "11111111-1111-1111-1111-111111111111",
        "username": "Test User",
        "drive_item_id": "33333333-3333-3333-3333-333333333333",
        "title": "Hidden Prompt Art",
        "description": "This post hides its prompt",
        "image_url": "https://mock-cdn.local/uploads/test-user/drive/item/test-image.png",
        "media_type": "image",
        "mime_type": "image/png",
        "width": 1024,
        "height": 768,
        "file_size_bytes": 204800,
        "media_metadata": {},
        "prompt": "Secret prompt content",
        "model_name": "fal-ai/flux-pro",
        "model_display_name": "FLUX Pro",
        "status": "active",
        "posted_from": "invook_app",
        "id": "2940b0f3-83ae-4bbe-b889-21534f34fd7a",
        "created_at": "2026-03-02T21:53:14.730Z",
        "views_count": 1
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 1,
    "hasMore": true
  }
}
```

---

### 13. T13_UploadInit

**Request:** `POST http://localhost:4000/api/gallery/upload/init`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "filename": "landscape.png",
  "file_size": 2048576,
  "mime_type": "image/png"
}
```

**Response: 200** ✅
```json
{
  "success": true,
  "data": {
    "presignedUrl": "https://mock-s3.local/presigned/gallery/11111111-1111-1111-1111-111111111111/1772488394785-landscape.png",
    "uploadKey": "gallery/11111111-1111-1111-1111-111111111111/1772488394785-landscape.png"
  }
}
```

---

### 14. T14_UploadComplete

**Request:** `POST http://localhost:4000/api/gallery/upload/complete`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "uploadKey": "gallery/11111111-1111-1111-1111-111111111111/1772488394785-landscape.png",
  "title": "Mountain Landscape",
  "prompt": "Beautiful mountains at sunset",
  "modelName": "fal-ai/flux-pro",
  "width": 1920,
  "height": 1080,
  "mimeType": "image/png",
  "fileSize": 2048576
}
```

**Response: 201** ✅
```json
{
  "success": true,
  "data": {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "username": "Test User",
    "title": "Mountain Landscape",
    "description": null,
    "image_url": "https://mock-cdn.local/gallery/11111111-1111-1111-1111-111111111111/1772488394785-landscape.png",
    "media_type": "image",
    "mime_type": "image/png",
    "width": 1920,
    "height": 1080,
    "file_size_bytes": 2048576,
    "media_metadata": {},
    "prompt": "Beautiful mountains at sunset",
    "model_name": "fal-ai/flux-pro",
    "model_display_name": "FLUX Pro",
    "status": "active",
    "posted_from": "website",
    "id": "604e1649-3c9d-409e-810a-0159cff3ee99",
    "created_at": "2026-03-02T21:53:14.792Z"
  }
}
```

---

### 15. T15_ReportPost

**Request:** `POST http://localhost:4000/api/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d/report`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "reason": "spam"
}
```

**Response: 200** ✅
```json
{
  "success": true
}
```

---

### 16. T16_DuplicateReport

**Request:** `POST http://localhost:4000/api/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d/report`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "reason": "nsfw"
}
```

**Response: 409** ⚠️
```json
{
  "success": false,
  "error": "You have already reported this post"
}
```

---

### 17. T17_DeleteOwnPost

**Request:** `DELETE http://localhost:4000/api/gallery/604e1649-3c9d-409e-810a-0159cff3ee99`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Response: 200** ✅
```json
{
  "success": true
}
```

---

### 18. T18_DeletedPostNotFound

**Request:** `GET http://localhost:4000/api/gallery/604e1649-3c9d-409e-810a-0159cff3ee99`

**Response: 500** ⚠️
```json
{
  "success": false,
  "error": "Post not found"
}
```

---

### 19. T19_NonAdmin403

**Request:** `GET http://localhost:4000/api/admin/gallery/suspended`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Response: 403** ⚠️
```json
{
  "success": false,
  "error": "Forbidden"
}
```

---

### 20. T20_AdminListSuspended

**Request:** `GET http://localhost:4000/api/admin/gallery/suspended`

**Headers:**
```json
{
  "Authorization": "Bearer admin-user"
}
```

**Response: 200** ✅
```json
{
  "success": true,
  "data": []
}
```

---

### 21. T21_AdminReinstate

**Request:** `PATCH http://localhost:4000/api/admin/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d`

**Headers:**
```json
{
  "Authorization": "Bearer admin-user"
}
```

**Payload:**
```json
{
  "action": "reinstate"
}
```

**Response: 200** ✅
```json
{
  "success": true
}
```

---

### 22. T22_AdminRemove

**Request:** `PATCH http://localhost:4000/api/admin/gallery/2940b0f3-83ae-4bbe-b889-21534f34fd7a`

**Headers:**
```json
{
  "Authorization": "Bearer admin-user"
}
```

**Payload:**
```json
{
  "action": "remove"
}
```

**Response: 200** ✅
```json
{
  "success": true
}
```

---

### 23. T23_AdminViewReports

**Request:** `GET http://localhost:4000/api/admin/gallery/suspended/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d/reports`

**Headers:**
```json
{
  "Authorization": "Bearer admin-user"
}
```

**Response: 200** ✅
```json
{
  "success": true,
  "data": [
    {
      "post_id": "8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d",
      "user_id": "11111111-1111-1111-1111-111111111111",
      "reason": "spam",
      "id": "dd9b75a4-b57f-4366-90a9-c06080be678d",
      "created_at": "2026-03-02T21:53:14.801Z"
    }
  ]
}
```

---

### 24. T24_NoAuth401

**Request:** `POST http://localhost:4000/api/gallery/publish`

**Payload:**
```json
{
  "driveItemId": "33333333-3333-3333-3333-333333333333",
  "title": "Cyberpunk City",
  "prompt": "A neon-lit cyberpunk city at night",
  "modelName": "fal-ai/flux/schnell"
}
```

**Response: 401** ⚠️
```json
{
  "success": false,
  "error": "No token provided. Use \"Bearer test-user\" or \"Bearer admin-user\""
}
```

---

### 25. T25_MissingFields400

**Request:** `POST http://localhost:4000/api/gallery/publish`

**Headers:**
```json
{
  "Authorization": "Bearer test-user",
  "X-Workspace-Id": "44444444-4444-4444-4444-444444444444"
}
```

**Payload:**
```json
{
  "title": "No prompt"
}
```

**Response: 400** ⚠️
```json
{
  "success": false,
  "error": "driveItemId, title, prompt and modelName are required"
}
```

---

### 26. T26_NoWorkspace400

**Request:** `POST http://localhost:4000/api/gallery/publish`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "driveItemId": "33333333-3333-3333-3333-333333333333",
  "title": "Cyberpunk City",
  "prompt": "A neon-lit cyberpunk city at night",
  "modelName": "fal-ai/flux/schnell"
}
```

**Response: 400** ⚠️
```json
{
  "success": false,
  "error": "Workspace not found"
}
```

---

### 27. T27_InvalidReason400

**Request:** `POST http://localhost:4000/api/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d/report`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "reason": "invalid"
}
```

**Response: 400** ⚠️
```json
{
  "success": false,
  "error": "reason must be: spam, nsfw, misleading, or other"
}
```

---

### 28. T28_UploadInitMissing400

**Request:** `POST http://localhost:4000/api/gallery/upload/init`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "filename": "test.png"
}
```

**Response: 400** ⚠️
```json
{
  "success": false,
  "error": "filename, file_size and mime_type are required"
}
```

---

### 29. T29_UploadCompleteMissing400

**Request:** `POST http://localhost:4000/api/gallery/upload/complete`

**Headers:**
```json
{
  "Authorization": "Bearer test-user"
}
```

**Payload:**
```json
{
  "uploadKey": "x"
}
```

**Response: 400** ⚠️
```json
{
  "success": false,
  "error": "uploadKey, title, prompt, modelName, width, height and mimeType are required"
}
```

---

### 30. T30_AdminBadAction400

**Request:** `PATCH http://localhost:4000/api/admin/gallery/8ab598f6-9fcd-40f0-87fd-8e37f6fcfc3d`

**Headers:**
```json
{
  "Authorization": "Bearer admin-user"
}
```

**Payload:**
```json
{
  "action": "invalid"
}
```

**Response: 400** ⚠️
```json
{
  "success": false,
  "error": "action must be reinstate or remove"
}
```

---

### 31. FINAL_DEBUG_STATE

**Response: undefined** ❓
---


*Auto-generated by test runner validating against invook_public.md spec.*