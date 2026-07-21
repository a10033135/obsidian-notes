---
tags:
  - role/eng
  - type/api-spec
  - module/taskflow
status: approved
owner: Engineering
created: 2026-06-12
---

# API Spec — Tasks

**Base URL：** `/api/tasks`
**對應功能：** [[FEAT-001-待辦事項CRUD]]
**對應實作：** `src/backend/routes/tasks.js`
**架構決策：** [[ADR-001-選擇技術棧]]

## Endpoint: GET /api/tasks

**用途：** 取得所有待辦事項，依建立時間新到舊排序。

**Request：** 無 body

**Response `200`**

```json
[
  {
    "id": "1",
    "title": "寫 PRD",
    "status": "done",
    "created_at": "2026-06-20T02:00:00.000Z",
    "updated_at": "2026-06-20T03:00:00.000Z"
  }
]
```

---

## Endpoint: POST /api/tasks

**用途：** 建立一筆待辦事項，對應 [[US-001-建立待辦事項]]。

**Request**

```json
{ "title": "寫 PRD" }
```

**Response `201`**

```json
{
  "id": "1",
  "title": "寫 PRD",
  "status": "todo",
  "created_at": "2026-06-20T02:00:00.000Z",
  "updated_at": "2026-06-20T02:00:00.000Z"
}
```

**錯誤情況**

| 狀態碼 | 情境 |
|---|---|
| 400 | `title` 缺漏、為空字串、或去除頭尾空白後仍為空 |
| 400 | `title` 超過 200 字 |

---

## Endpoint: PATCH /api/tasks/:id

**用途：** 更新待辦事項狀態，對應 [[US-002-標記完成狀態]]。

**Request**

```json
{ "status": "done" }
```

`status` 僅接受 `"todo"` 或 `"done"`。

**Response `200`**

```json
{
  "id": "1",
  "title": "寫 PRD",
  "status": "done",
  "created_at": "2026-06-20T02:00:00.000Z",
  "updated_at": "2026-06-20T03:00:00.000Z"
}
```

**錯誤情況**

| 狀態碼 | 情境 |
|---|---|
| 400 | `status` 不是 `todo` 或 `done` |
| 404 | `id` 不存在 |

---

## Endpoint: DELETE /api/tasks/:id

**用途：** 刪除待辦事項，對應 [[US-003-刪除待辦事項]]。

**Request：** 無 body

**Response `204`**：無 body

**錯誤情況**

| 狀態碼 | 情境 |
|---|---|
| 404 | `id` 不存在 |
