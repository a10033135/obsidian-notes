# my-product-repo

一個 **Spec-Driven Development (SDD)** 為基礎的專案範例。`docs/` 是一個 Obsidian Vault，存放跨角色（PM / UIUX / 工程）的規格文件；`src/` 是依照這些規格實作出來的最小可運行專案骨架。

所有文件範例都圍繞同一個假想產品 **TaskFlow**（一個簡化的待辦事項管理功能），方便你對照著讀完整條 SDD 產出鏈：

```
PRD → Epic → User Stories → (Design / Architecture) → Feature Spec → 程式碼
```

## 資料夾結構

```
my-product-repo/
├── .obsidian/              # Obsidian 設定檔（版控共享，用 Obsidian 開啟 my-product-repo/ 即為一個 Vault）
├── docs/                   # SDD 核心
│   ├── 00-Meta/            # 共通規範、Templates、Tags 說明
│   ├── 01-Product/         # [PM 主責]      PRD、Epic、Roadmap、User Stories
│   ├── 02-Design/          # [UIUX 主責]    Design System、User Flow、Figma 連結
│   ├── 03-Engineering/     # [工程主責]     Architecture (ADR)、API Spec、Database Schema
│   └── 04-Features/        # [跨角色協作]   具體功能規格書 (Feature Specs)
├── src/
│   ├── backend/            # Node.js 內建 http 模組實作的 REST API（零外部相依）
│   └── frontend/           # 純 HTML/CSS/JS 前端
├── package.json
└── Dockerfile
```

## 如何閱讀這份範例

1. 用 Obsidian 開啟 `my-product-repo/` 這個資料夾（會被視為獨立 Vault）。
2. 先看 `docs/00-Meta/共通規範.md`，了解命名規則、狀態標籤、SDD 工作流程。
3. 依序讀 `docs/01-Product` → `docs/02-Design` → `docs/03-Engineering` → `docs/04-Features`，透過 `[[wikilink]]` 雙向連結可以互相跳轉。
4. 對照 `docs/04-Features/FEAT-001-待辦事項CRUD.md` 底部的「對應程式碼」，看規格如何對應到 `src/` 的實作。

## 執行專案

不需要 `npm install`（`src/backend` 沒有任何外部相依套件）：

```bash
npm start
# 或
node src/backend/server.js
```

開啟 http://localhost:3000 即可看到 TaskFlow 待辦事項清單畫面。

或用 Docker：

```bash
docker build -t taskflow .
docker run -p 3000:3000 taskflow
```

> 注意：目前資料儲存在記憶體中（見 [[ADR-001-選擇技術棧]]），重啟服務會清空資料，僅適用於 Demo/開發環境。

## 新增你自己的功能

1. 複製 `docs/00-Meta/Templates/` 內對應的樣板。
2. 依 `docs/00-Meta/共通規範.md` 的命名規則與工作流程，依序在 `01-Product → 02-Design → 03-Engineering → 04-Features` 建立文件。
3. 依 `04-Features` 的 Feature Spec 實作 `src/` 程式碼。
