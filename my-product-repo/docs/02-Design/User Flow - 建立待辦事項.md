---
tags:
  - role/uiux
  - type/user-flow
  - module/taskflow
status: approved
owner: UIUX
created: 2026-06-09
---

# User Flow - 建立待辦事項

**對應 User Story：** [[US-001-建立待辦事項]]

## 流程圖

```
[進入 TaskFlow 首頁]
        │
        ▼
[看到待辦事項清單 + 頂部輸入框]
        │
        ▼
[在輸入框輸入標題] ──(標題為空)──▶ [送出按鈕 disabled，不可點擊]
        │
   (標題非空)
        ▼
[點擊「新增」或按 Enter]
        │
        ▼
[前端呼叫 POST /api/tasks]
        │
   ┌────┴────┐
   ▼         ▼
[成功]     [失敗，如 500]
   │         │
   ▼         ▼
[清單頂部    [顯示錯誤提示，
 出現新事項， 輸入框內容保留，
 輸入框清空]  可重新送出]
```

## 畫面狀態

1. **空清單狀態**：顯示插圖 + 文字「還沒有待辦事項，新增第一筆吧」
2. **有資料狀態**：輸入框在最上方，清單依建立時間新到舊排序
3. **載入中**：送出後按鈕短暫顯示 loading spinner，避免重複送出

## 對應規格

- API：[[API Spec]] 的 `POST /api/tasks`
- 元件樣式：[[Design System]] 的 Task Item / Input / Primary Button
