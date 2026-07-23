---
tags:
  - meta/規範
---

# Tags 說明

Obsidian tag 用於跨資料夾檢索（例如「找出所有 status: in-review 的文件」不容易用 tag 做到，仍需搭配 frontmatter 的 `status` 欄位 + Dataview 外掛查詢；tag 主要用於分類與角色篩選）。

## 分類系統

### 角色 (role/*)
- `role/pm` — Product Manager 產出或主責
- `role/uiux` — 設計師產出或主責
- `role/eng` — 工程師產出或主責
- `role/cross` — 跨角色共同產出（04-Features）

### 文件類型 (type/*)
- `type/prd`
- `type/epic`
- `type/user-story`
- `type/design-system`
- `type/user-flow`
- `type/adr`
- `type/api-spec`
- `type/db-schema`
- `type/feature-spec`

### 產品線 / 模組 (module/*)
依實際產品拆分，例如：
- `module/taskflow` — TaskFlow 待辦事項管理模組

新增產品線時，於此新增一個 `module/<名稱>` 並在下方登記，避免同義詞（例如 `module/task` 與 `module/tasks` 並存）。

### Meta (meta/*)
- `meta/規範` — 本資料夾內的規範類文件本身使用，不加在產品文件上

## 使用規則

1. 每份產品文件至少要有一個 `role/*`、一個 `type/*`、一個 `module/*` tag。
2. Tag 一律小寫、用連字號 `-` 不用底線。
3. 不要新增與既有 tag 語意重複的 tag，先來這裡查詢是否已存在。
