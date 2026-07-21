---
tags:
  - role/uiux
  - type/design-system
  - module/taskflow
status: approved
owner: UIUX
created: 2026-06-08
---

# TaskFlow Design System

## 色彩 (Colors)

| Token | Hex | 用途 |
|---|---|---|
| `color-primary` | #2F6FED | 主要按鈕、連結、勾選框選中狀態 |
| `color-success` | #1FA97A | 完成狀態標籤 |
| `color-danger` | #E5484D | 刪除、錯誤訊息 |
| `color-text` | #1A1A1A | 內文文字 |
| `color-text-muted` | #6B7280 | 次要文字（已完成事項的刪除線文字） |
| `color-border` | #E2E2E2 | 卡片邊框、分隔線 |
| `color-bg` | #FAFAFA | 頁面背景 |

## 字體 (Typography)

| Token | 字級 | 字重 | 用途 |
|---|---|---|---|
| `text-title` | 20px | 600 | 頁面標題「我的待辦事項」 |
| `text-body` | 15px | 400 | 待辦事項標題 |
| `text-caption` | 13px | 400 | 輔助文字（建立時間） |

## 間距 (Spacing)

8px 為基準單位：`4 / 8 / 16 / 24 / 32`。

## 元件規範 (Components)

### Task Item（待辦事項列）
- 結構：勾選框 + 標題文字 + 刪除按鈕
- 狀態：
  - 預設：`color-text`、`color-bg` 白底
  - 已完成：文字加刪除線、顏色轉 `color-text-muted`，勾選框填滿 `color-success`
  - hover：顯示刪除按鈕（預設隱藏，避免視覺雜訊）

### Primary Button
- 背景 `color-primary`，文字白色，圓角 6px，padding 8px 16px

### Input（新增待辦事項輸入框）
- 邊框 `color-border`，focus 時邊框轉 `color-primary`
- placeholder：「輸入待辦事項…」

## 對應實作

以上 token 對應到 [[FEAT-001-待辦事項CRUD]] 與 `src/frontend/style.css`。
