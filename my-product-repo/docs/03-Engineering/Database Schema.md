---
tags:
  - role/eng
  - type/db-schema
  - module/taskflow
status: approved
owner: Engineering
created: 2026-06-12
---

# Database Schema — TaskFlow

**架構決策：** [[ADR-001-選擇技術棧]]（MVP 階段實際以記憶體陣列模擬下列結構，見 `src/backend/db.js`）

## Table: `tasks`

| 欄位 | 型別 | 限制 | 說明 |
|---|---|---|---|
| `id` | TEXT / UUID | PRIMARY KEY | 遞增字串 ID（MVP 用遞增數字字串模擬） |
| `title` | VARCHAR(200) | NOT NULL | 待辦事項標題，禁止空白字串 |
| `status` | VARCHAR(10) | NOT NULL, DEFAULT `'todo'` | 僅允許 `todo` / `done` |
| `created_at` | TIMESTAMP | NOT NULL | 建立時間，UTC ISO 8601 |
| `updated_at` | TIMESTAMP | NOT NULL | 最後更新時間，UTC ISO 8601 |

## 索引 (Indexes)

- `created_at` 建立索引，供清單依時間排序查詢使用（MVP 資料量小暫不需要，正式導入 PostgreSQL 時補上）。

## 未來擴充預留（v2，見 [[Roadmap]]）

- `owner_id`：多使用者支援時，用於區分待辦事項所屬使用者
- `due_date`：截止日期
- `description`：詳細描述

## 對應 API

所有欄位皆對應 [[API Spec]] 回傳的 JSON 欄位，命名保持一致（`snake_case`），不做前後端欄位轉換。
