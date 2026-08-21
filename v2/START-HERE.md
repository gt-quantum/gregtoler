# gregtoler.com 2.0 — Start Here

**Owner:** Greg Toler
**Goal:** Design and build the next iteration of gregtoler.com to eventually replace the current V1/MVP in production.
**Status:** FULL PAGE built (18 passes, `build/05-section-01-status.md`). All sections live at /v2: hero (interim headline — workshop open), framework, Approach-as-flowchart, CTA band, proof marquee + quote placeholders, About (TEMP: two stacked review variants A/B replacing the journey diagram — awaiting Greg's reviewer; journey is in git b4d320b), work stubs, 4-step intake with work-email gate + OpenAI qualification → booking calendar. Two design grammars locked: the PLANE (axes/nodes/glow) + LUCID (boxes/connectors/arrows/diamonds — Greg thinks in flowcharts; primitives in index.astro CSS). Mobile ported per approved 08-mobile-plan (verify on device). Perf pass still owed. V1 untouched.

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
| **Mobile** | **Ported — needs Greg's phone check** | `build/08-mobile-plan.md` steps 0–6 shipped (pass 15): V1's 60px rail with `01–05` numerals, 298px text column, hero/plane centred, panels as bottom sheet, 860 + 768 breakpoints. Verified headless at 390/820; desktop 1440 measured pixel-identical. Still owed: Greg's device pass (iOS URL bar, safe areas) — checklist in pass 15 |
| Nav | Done | Desktop: horizontal spine (V1 mechanic rotated). Mobile: V1's left rail. LinkedIn in chrome |
| Motion study | **Study 02 built — Greg to pick A/B** | `build/10-logo-animation.md`. Real lockup, layered vector now exists (`prototypes/assets/gt-lockup-layered.svg`). Study 01 remains parked per `decisions/003` |
| **Section 01 hero→framework** | **Built** | In-place axis modes, real logo, custom cursor |
| **Full page (all sections)** | **Built** | `build/09-positioning-and-sections.md` = the architecture; passes 14–18 = the build. Approach is a decision-tree FLOWCHART; About bio is drawn as an X-axis traverse; sections named, not numbered |
| Hero headline | **INTERIM — workshop open** | "Most consultants hand you a deck. I hand you the fix." Greg approved NONE of the candidates; revisit |
| Contact intake | **Built + gated (Greg: "perfect")** | `ContactIntake.astro`: step 1 auto-advances, ≥1 area, ≥40-char story, name*/work-email*/phone/LinkedIn, reach-method chips. Free mailboxes blocked (`lib/free-email-domains.js`, re-checked in `/api/contact`). `/api/qualify` (OpenAI gpt-5-nano, HMAC-token-gated, fails closed) decides whether the Google booking calendar shows after send — 6/6 on `scripts/qualify-test.mjs`. Both API routes now `prerender=false` (they were static → every POST 500'd, V1 too). **CF env needed before preview:** OPENAI_API_KEY, QUALIFY_SECRET, SLACK_WEBHOOK_URL (local `.env` has them, gitignored). Passes 19–21 |
| Proof | Half real | 8 real logos in monochrome marquee; quotes are OBVIOUS placeholders awaiting Greg |
| **Deploy/staging** | **PUSHED 2026-08-20** (`4b05be0`) | `origin/staging` live on github.com/gt-quantum/gregtoler. Runbook: `build/07-deploy-runbook.md`. Preview URL comes from Cloudflare Pages (dashboard → project → Deployments → `staging`); `/v2` is the route. **Before the form works on preview:** set OPENAI_API_KEY, QUALIFY_SECRET, SLACK_WEBHOOK_URL in CF env (Preview scope) |
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
- `src/pages/v2/index.astro` — preview route: header/nav/LinkedIn + ALL page sections
  (Approach flowchart, CTA band, proof, About diagram, work stubs, contact), `noindex`.
  Lucid diagram primitives live in its CSS (.fdiamond/.riser/.rail/.fdrop)
- `src/components/v2/ContactIntake.astro` — 4-step intake (V1 port), posts /api/contact
- `src/layouts/V2Layout.astro` — meta/OG/schema, font preloads, backdrop + cursor mounts
- `src/styles/v2-tokens.css` — ALL tokens (locked palette + accent `#8A9166`, type, fonts)
- `src/components/v2/HeroFramework.astro` — section 01: scroll morph + axis panels
- `src/components/v2/SpineNav.astro` — connector nav (horizontal desktop / left rail mobile)
- `src/components/v2/Backdrop.astro` — global canvas: silk layers, dot lattice, bulge
- `src/components/v2/Cursor.astro` — ring+dot cursor
- `src/components/v2/GTMark.astro` — real logo.png recoloured (favicon.svg is a broken trace)
- `public/fonts/v2/*.woff2` — Barlow 500/600, Hanken 400, Martian Mono 400

**Next work, in order:** ① perf pass (never measured; 3 rAF loops + blurs at risk),
② mobile port from V1 — SHIPPED (pass 15, uncommitted at close); Greg's phone check is the
only open item. Sections 02+ now share `--v2-measure` (880px) so they sit in the framework's column,
③ sections per `build/09-positioning-and-sections.md` (PROPOSAL awaiting Greg's answers
to its 5 open questions): Approach → Contact → Proof band → About → Work.

**Session gotchas:** replace whole code blocks, not drifted substrings (two silent
no-op edits burned time); page-scoped Astro CSS can't style child components — style
wrappers; Greg's ~55% browser zoom means extension-side responsive testing never
trips the 860px breakpoint — for geometry use
`node v2/build/08-mobile-evidence/measure.mjs <url> <out> 390 844` (headless Chrome over
CDP, no deps); for iOS behaviour use Greg's phone. V1's mobile shell is
`SpineNavigation.jsx` + `BaseLayout.astro`, NOT `FluidSpineMenu.jsx` (unused).

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
