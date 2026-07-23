---
tags:
  - role/cross
  - type/feature-spec
  - module/taskflow
status: shipped
owner: PM + UIUX + Engineering
created: 2026-06-15
---

# FEAT-001-待辦事項 CRUD

## 來源文件

- PRD：[[PRD-001-TaskFlow待辦事項管理]]
- Epic：[[EPIC-001-待辦事項管理]]
- 設計：[[User Flow - 建立待辦事項]] / [[Design System]]
- 架構決策：[[ADR-001-選擇技術棧]]
- API：[[API Spec]]
- 資料庫：[[Database Schema]]

## 功能描述

使用者可以在單一頁面建立待辦事項、檢視所有待辦事項、切換完成狀態、刪除待辦事項。所有操作即時反映在畫面上，資料透過 REST API 與後端同步。

## 使用者故事涵蓋範圍

- [[US-001-建立待辦事項]]
- [[US-002-標記完成狀態]]
- [[US-003-刪除待辦事項]]

## 互動流程

1. 使用者開啟首頁，前端呼叫 `GET /api/tasks` 取得清單並渲染。
2. 使用者於輸入框輸入標題並送出 → 呼叫 `POST /api/tasks` → 成功後將回傳的新事項插入清單最上方。
3. 使用者點擊勾選框 → 呼叫 `PATCH /api/tasks/:id` 帶 `status` → 成功後更新該筆項目的樣式（刪除線）。
4. 使用者點擊刪除並確認 → 呼叫 `DELETE /api/tasks/:id` → 成功後從畫面移除該筆項目。

## 資料模型摘要

見 [[Database Schema]] 的 `tasks` 表：`id / title / status / created_at / updated_at`。

## API 摘要

見 [[API Spec]]：`GET /api/tasks`、`POST /api/tasks`、`PATCH /api/tasks/:id`、`DELETE /api/tasks/:id`。

## 驗收條件

- [x] 建立、檢視、標記完成、刪除四個操作皆正常運作且即時反映在畫面
- [x] 標題空白時無法建立，並顯示提示
- [x] 刪除前需經過確認對話框
- [x] 前端樣式符合 [[Design System]] 的 Task Item / Input / Primary Button 規範

## 對應程式碼

- Backend：`src/backend/server.js`、`src/backend/db.js`、`src/backend/routes/tasks.js`
- Frontend：`src/frontend/index.html`、`src/frontend/style.css`、`src/frontend/app.js`

## 上線檢查清單

- [x] 手動驗證四個 CRUD 操作（見開發時以 curl 測試 `docs/03-Engineering/API Spec.md` 中列出的所有 endpoint）
- [x] 文件 status 更新為 shipped
- [x] [[Roadmap]] 勾選完成
