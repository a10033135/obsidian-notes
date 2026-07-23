---
name: sdd-scaffold
description: Scaffold a Spec-Driven Development (SDD) folder structure for a product repo — docs/00-Meta through 04-Features (PRD, Epic, User Stories, Design System, ADR, API Spec, DB Schema, Feature Spec) plus a minimal runnable src/ skeleton. Use when the user asks to set up SDD, spec-driven development docs, a PRD/Epic/ADR folder structure, or a docs/-based Obsidian product spec system.
---

# SDD Scaffold

Generates the folder structure below for a product repo, populated with a fully cross-referenced example (not empty stubs), plus a minimal runnable code skeleton that implements the example. A worked reference instance already exists at `my-product-repo/` in this vault — read a file or two there if you want to see finished output before generating a new one.

```
<target>/
├── .obsidian/              # minimal shared Obsidian config (app.json, appearance.json, community-plugins.json)
├── docs/
│   ├── 00-Meta/            # 共通規範.md, Tags 說明.md, Templates/ (6 templates)
│   ├── 01-Product/         # [PM]      PRD/, Epic/, User Stories/, Roadmap.md
│   ├── 02-Design/          # [UIUX]    Design System.md, User Flow - *.md, Figma 連結.md
│   ├── 03-Engineering/     # [Eng]     Architecture/ (ADR), API Spec.md, Database Schema.md
│   └── 04-Features/        # [cross]   FEAT-*.md tying the above together
├── src/                    # minimal runnable implementation of the one example feature
├── README.md
├── package.json
└── Dockerfile
```

## Step 1 — Resolve open decisions before writing files

Don't guess on these; ask via AskUserQuestion if not already stated in the conversation:

1. **Target location** — new top-level folder at the repo/vault root, or nested under an existing folder (e.g. an existing `Work/` area)?
2. **Code skeleton depth** — a fully runnable minimal skeleton (recommended — it's what makes the docs verifiable rather than aspirational), or doc-only with placeholder stub files for `src/`?
3. **Product/domain name and one example feature** — if the user gave a product name, use it. If not, pick one concrete, simple feature (CRUD-shaped is easiest to make runnable) rather than an abstract placeholder — a worked example is far more useful than a templated skeleton with `<...>` everywhere.

## Step 2 — Create directories

```bash
mkdir -p <target>/.obsidian \
  <target>/docs/00-Meta/Templates \
  "<target>/docs/01-Product/PRD" "<target>/docs/01-Product/Epic" "<target>/docs/01-Product/User Stories" \
  <target>/docs/02-Design \
  "<target>/docs/03-Engineering/Architecture" \
  <target>/docs/04-Features \
  <target>/src
```

## Step 3 — Populate `00-Meta`

Copy the templates bundled in this skill's `templates/` directory verbatim into `<target>/docs/00-Meta/`:

- `templates/共通規範.md` → conventions doc: role↔folder mapping, naming rules (`PRD-<n>-<name>.md`, `EPIC-`, `US-`, `ADR-`, `FEAT-`), the `status` field vocabulary (`draft/in-review/approved/in-progress/shipped/deprecated`), the SDD workflow (PRD → Epic/Stories → Design → ADR/API/Schema → Feature Spec → code), and the wikilink rule (downstream links to upstream, never the reverse).
- `templates/Tags 說明.md` → tag taxonomy (`role/*`, `type/*`, `module/*`, `meta/*`). Add a `module/<product-slug>` entry for the new product when adapting.
- `templates/*-Template.md` → copy into `docs/00-Meta/Templates/` unchanged; these are generic and not product-specific.

Also write a short `docs/00-Meta/README.md` describing the folder's purpose (see `my-product-repo/docs/00-Meta/README.md` for the pattern).

## Step 4 — Generate ONE coherent example thread, not disconnected samples

Pick a single example feature and carry the same IDs through every layer so the docs are genuinely cross-referenced with `[[wikilink]]`s, matching `my-product-repo`'s TaskFlow thread:

| Layer | File | Must reference |
|---|---|---|
| `01-Product/PRD/PRD-001-*.md` | background, goals, non-goals, success metrics, scope | links down to the Epic |
| `01-Product/Epic/EPIC-001-*.md` | acceptance criteria | links to PRD, User Stories, design/eng/feature-spec docs |
| `01-Product/User Stories/US-00N-*.md` (2-3 of them) | Given/When/Then, edge cases | links to Epic |
| `01-Product/Roadmap.md` | quarters, what's explicitly out of scope | links to PRD |
| `02-Design/Design System.md` | color/type/spacing tokens, component states | referenced by Feature Spec and by the actual CSS in `src/` |
| `02-Design/User Flow - *.md` | ASCII flow diagram, screen states | links to the User Story it satisfies and the API endpoint it calls |
| `02-Design/Figma 連結.md` | placeholder Figma URLs (note clearly they're placeholders) | |
| `03-Engineering/Architecture/ADR-001-*.md` | context/options/decision/consequences for the stack choice | links to Feature Spec, API Spec, DB Schema |
| `03-Engineering/API Spec.md` | every endpoint the code implements, request/response JSON, error table | links to the User Stories and Feature Spec each endpoint serves |
| `03-Engineering/Database Schema.md` | table(s) with types/constraints, matching the API's JSON fields exactly | links to ADR |
| `04-Features/FEAT-001-*.md` | links to every doc above, interaction flow, acceptance checklist, "對應程式碼" section pointing at real file paths in `src/` | this is the file a PR description should link back to |

Frontmatter on every doc: `tags` (role/type/module), `status`, `owner`, `created` (use today's date).

## Step 5 — Build the runnable skeleton (if chosen in Step 1)

Default to **zero or minimal external dependencies** so `npm install` isn't required to prove it works — this matters because a skeleton nobody can run makes the "spec-driven" claim unverifiable. `my-product-repo/src/backend` uses Node's built-in `http` module with an in-memory store; reuse that pattern unless the user's stack requires otherwise:

- `src/backend/db.js` — in-memory store whose shape matches `Database Schema.md` exactly
- `src/backend/routes/<resource>.js` — implements every endpoint in `API Spec.md`, including its documented error codes
- `src/backend/server.js` — static file serving for the frontend + delegates `/api/*` to the route handler
- `src/frontend/` — plain HTML/CSS/JS implementing the flow in `User Flow - *.md`, styled per `Design System.md` tokens; render user-controlled text via `textContent`, never `innerHTML`, to avoid XSS
- Guard static file serving against path traversal (resolve the path and verify it stays under the frontend directory before reading)

## Step 6 — Root files

`README.md` (structure diagram, how to read the docs in order, how to run, what's explicitly not implemented yet), `package.json` (`start`/`dev` scripts), `Dockerfile`, `.gitignore`. Keep `package.json` dependency-free if Step 5 used zero dependencies.

## Step 7 — Verify before declaring done

If a runnable skeleton was built, actually start it and `curl` every endpoint from `API Spec.md`, including the documented error cases (missing required field, bad enum value, unknown id). Don't report success on doc consistency alone — confirm the code matches what the docs claim.

## Notes

- Use TaskCreate/TaskUpdate to track progress — this is a 15-25 file task and losing track mid-way produces inconsistent cross-links.
- Don't invent a `.obsidian` config beyond the three minimal files (`app.json`, `appearance.json`, `community-plugins.json`) — a nested Vault only needs enough to open cleanly, not a full plugin setup.
- If the target is nested inside an existing Obsidian vault, note in a comment that opening the subfolder itself as its own Vault in Obsidian is what makes the nested `.obsidian/` meaningful (Obsidian treats each folder with a `.obsidian/` as a separate vault).
