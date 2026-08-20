# gregtoler.com 2.0 — Start Here

**Owner:** Greg Toler
**Goal:** Design and build the next iteration of gregtoler.com to eventually replace the current V1/MVP in production.
**Status:** Section 01 complete (12 passes, see `build/05-section-01-status.md`). Accent locked (dark olive). ⚠ Mobile not done — port V1's mobile treatment in a dedicated session. Perf pass still owed. V1 untouched.

## Status table

| Area | State | Notes |
|---|---|---|
| Brief | Received | `inbox/brief/gregtoler-v2-brief.md` |
| Mockup | Received | `inbox/mockups/gt-strategies-v02.html` — v01 was NOT dropped |
| Review of inputs | Done | `build/00-intake-review.md` |
| Stack | **Locked — Astro** | `decisions/001-stack.md` |
| Case studies | **Placeholders** | `decisions/002-case-study-placeholders.md`, content in `content/case-studies/` |
| Reference review | Done | `build/01-reference-review.md` — incl. live interaction pass |
| Type direction | Shortlist ready | `build/02-type-candidates.md` — free/self-hosted only |
| Anti-AI-tells checklist | Done | `build/03-anti-ai-tells.md` — research-backed, use as build gate |
| Design direction | **Locked** | Neutral charcoal ground, dark-olive accent `#8A9166`, Barlow/Hanken/Martian (researched) |
| **Mobile** | **⚠ NOT DONE** | Rail ported V1-style but layout/alignment unfinished — analyse live site's mobile and port it |
| Nav | Done | Desktop: horizontal spine (V1 mechanic rotated). Mobile: V1's left rail. LinkedIn in chrome |
| Motion study | **Parked** | `decisions/003-motion-study-parked.md` — carry-forward: dots, glow, grain, restrained motion |
| **Section 01 hero→framework** | **Built, live at /v2** | `build/05-section-01-status.md` — 5 passes, in-place axis modes, real logo, custom cursor |
| Placeholder sections 02–05 | Stubbed | On `/v2` so nav motion is visible |
| **Deploy/staging** | **Ready, push held** | Local `staging` branch committed. Runbook: `build/07-deploy-runbook.md` (incl. the gh account-switch gotcha). Push when copy + mobile are ready |
| Cutover plan | Not started | Prereqs listed at the end of the runbook |
| V1 fabricated content | **Live on prod** | Audit found fake case studies/apps still shipping |

## Pick up here (new session — token-cheap path)

Intake is DONE. Do not re-read the brief/mockup/audit unless a question actually
depends on them; everything decided from them is already distilled below and in
`decisions/`.

1. This file (status table above = current truth)
2. Tail of `build/05-section-01-status.md` — the 12-pass build log; the last 2–3
   passes tell you exactly where work stopped
3. Only if touching that area: `decisions/*` (3 files, short), `build/03-anti-ai-tells.md`
   (the design gate), `build/06-accent-research.md` (accent history)

**Run it:** `npx astro dev` in the repo root → http://localhost:4321/v2
(Greg usually has this tab open; it hot-reloads — don't keep re-opening it.)

**What's built (all V2 code, nothing else touched):**
- `src/pages/v2/index.astro` — preview route: header, spine nav mount, LinkedIn,
  placeholder sections 02–05, `noindex`
- `src/layouts/V2Layout.astro` — meta/OG/schema, font preloads, backdrop + cursor mounts
- `src/styles/v2-tokens.css` — ALL tokens (locked palette + accent `#8A9166`, type, fonts)
- `src/components/v2/HeroFramework.astro` — section 01: scroll morph + axis panels
- `src/components/v2/SpineNav.astro` — connector nav (horizontal desktop / left rail mobile)
- `src/components/v2/Backdrop.astro` — global canvas: silk layers, dot lattice, bulge
- `src/components/v2/Cursor.astro` — ring+dot cursor
- `src/components/v2/GTMark.astro` — real logo.png recoloured (favicon.svg is a broken trace)
- `public/fonts/v2/*.woff2` — Barlow 500/600, Hanken 400, Martian Mono 400

**Next work, in order:** ① perf pass (never measured; 3 rAF loops + blurs at risk),
② mobile port from V1 (see status table ⚠ row — analyse the LIVE site first),
③ section 02 Approach.

**Session gotchas:** replace whole code blocks, not drifted substrings (two silent
no-op edits burned time); page-scoped Astro CSS can't style child components — style
wrappers; Greg's ~55% browser zoom means extension-side responsive testing never
trips the 860px breakpoint — verify mobile on his device.

## Intake references (rarely needed now)

- `inbox/brief/` + `inbox/mockups/` — original direction (superseded by decisions/)
- `../documentation/2026-08-11-site-audit.md` — V1 audit (fabricated-content issue still open)
- `../documentation/DESIGN_SYSTEM.md` — V1 tokens (V2 has its own in v2-tokens.css)

## Do not read / archived

- `../mvp/` — superseded V1 scratch work
- `../documentation/completed-plans/` — historical, already shipped
- `../bugs/` — V1 bug screenshots, not relevant to 2.0

## Ground rules

- The mockup is a starting point, not a spec. Nothing in `inbox/` is a decision.
- A thing becomes a decision only when it's written into `decisions/`.
- V1 keeps shipping and stays live until 2.0 is ready to cut over.

## Folders

- `inbox/` — raw drops from Greg. Unedited source material.
- `decisions/` — locked choices, one file per decision, dated.
- `build/` — specs, IA, component plans, implementation notes.
