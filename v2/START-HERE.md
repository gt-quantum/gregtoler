# gregtoler.com 2.0 — Start Here

**Owner:** Greg Toler
**Goal:** Design and build the next iteration of gregtoler.com to eventually replace the current V1/MVP in production.
**Status (2026-08-20, end of day):** FULL PAGE built and **live on staging**:
`https://staging.gregtoler.pages.dev/v2` (root `/` is still V1 by design). 23 passes in
`build/05-section-01-status.md`. Greg's verdict on the staging build: "for the most part
it's working and looks pretty good — there are some changes" (**not yet specified; ask
him first thing**). Perf pass still owed. V1 untouched.

## Status table

| Area | State | Notes |
|---|---|---|
| Brief | Received | `inbox/brief/gregtoler-v2-brief.md` |
| Mockup | Received | `inbox/mockups/gt-strategies-v02.html` — v01 was NOT dropped |
| Review of inputs | Done | `build/00-intake-review.md` |
| Stack | **Locked — Astro** | `decisions/001-stack.md` |
| Case studies | **Placeholders** | `decisions/002-case-study-placeholders.md`, content in `content/case-studies/` |
| Reference review | Done | `build/01-reference-review.md` + `build/11-flow-motion-research.md` (what "animated workflow" sites actually do) |
| Type direction | Locked | Barlow / Hanken Grotesk / Martian Mono, self-hosted |
| Anti-AI-tells checklist | Done | `build/03-anti-ai-tells.md` — use as build gate |
| Design direction | **Locked** | Neutral charcoal ground; accent **`#7A8058`** (darkened from `#8A9166` on 2026-08-20 — 4.3:1 on the ground; one more step darker would fail the 10px mono labels). ALL accent use goes through `--v2-light` / `--v2-light-soft` — zero hard-coded hexes |
| **Mobile** | **Ported + verified on staging** | `build/08-mobile-plan.md`. Three nav tiers: desktop horizontal spine >860; vertical NAMES 641–860 (header's exact type, rail 98px inset 10); ICONS ≤640 (V1's 60px rail, 22px glyphs). Rail geometry = tokens `--v2-rail-x/-w`. Measured on the deployed build at 390: rail 0/60, plane 76→374, no overflow. Greg's iOS pass (URL bar, safe areas, Reduce Motion) still informal |
| Nav | Done | Tracker walks sections in page order. Mobile rail colour rule = header's (faint → ink when current) |
| Motion study (logo) | **Study 02 built — Greg to pick A/B** | `build/10-logo-animation.md`; layered lockup `prototypes/assets/gt-lockup-layered.svg`. Study 01 parked per `decisions/003` |
| **Section 01 hero→framework** | **Built** | In-place axis modes, real logo, custom cursor. Hero headline still INTERIM ("Most consultants hand you a deck. I hand you the fix.") — workshop open, `build/09` |
| **About** | **TEMP: two variants stacked for a reviewer** | A = **plain headshot** (`public/images/v2/headshot.jpg`, no cutout — Greg switched to this via the other session late on 2026-08-20; the Vision-cut `portrait-feather.png` is still in the repo if he wants it back), B = atmosphere behind + left-aligned stats 12+/50+/15+ in accent. Labels removed, 120px apart. **Decision pending** → delete the loser, keep `id="about"`. Portrait pipeline + 13-variant study in `build/prototypes/portrait*` |
| **Approach** | **Built, animated** | Entry node "How to work with me" → Fix/Build/Scale cards with icon nodes → converging bezier lines into the **"Start the conversation"** pill (arrow node at its front). Lines draw with scroll (lerp), each comet starts when its own line is drawn. Phone = left spine, straight segments, left-aligned cards. Recipe in `build/11` |
| Proof | Half real | 8 real logos in monochrome marquee; quote placeholders HIDDEN in a comment until Greg supplies real ones |
| Work | Stubs | Plain rows + hover pulse (tracing beam removed at Greg's request). Real case studies plot back onto the map later |
| **Contact intake** | **Built + gated (Greg: "perfect")** | `ContactIntake.astro`: step 1 auto-advances; ≥1 area; ≥40-char story w/ counter; name*/work-email*/phone/LinkedIn + reach chips (Email/Call/Text/LinkedIn). Free mailboxes blocked (`src/lib/free-email-domains.js`, re-checked in `/api/contact` → 422). `/api/qualify` = OpenAI `gpt-5-nano`, minimal reasoning, **HMAC token gate** (`src/lib/qualify-token.js`, issued by `/api/contact` after the Slack post, 5-min TTL) → 401 without it; fails closed. 6/6 on `scripts/qualify-test.mjs`. Qualified → Google booking calendar inline (URL in the component) |
| **API routes** | Fixed | `prerender = false` on `/api/contact` + `/api/qualify` — they were being built STATIC, so every POST dropped its body (V1's live form was broken too) |
| Footer + legal | Built (drafts) | Footer (mark, tagline, mail, site + legal links, "Yes, I built this website."). `/v2/privacy`, `/v2/terms` via `LegalPage.astro` — DRAFTS, `[CONFIRM]` markers for state/address/retention. Greg asked whether Terms is needed → answer: optional; fold the 3 disclaimer lines into Privacy if dropped |
| **Deploy/staging** | **LIVE** (`3a6d8ca`) | `origin/staging` → Cloudflare Pages auto-preview `staging.gregtoler.pages.dev`. Runbook `build/07-deploy-runbook.md` (push as `gt-quantum`). **Form on preview needs CF env (Preview scope): `OPENAI_API_KEY`, `QUALIFY_SECRET`, `SLACK_WEBHOOK_URL`** — not confirmed set. Local `.env` holds them (gitignored) |
| Cutover plan | Not started | Prereqs at the end of the runbook; root `/` stays V1 until then |
| V1 fabricated content | **Live on prod** | Audit found fake case studies/apps still shipping |

## Pick up here (new session — token-cheap path)

1. **Ask Greg what the "some changes" are** from his staging review (2026-08-20 night).
2. This file (status table = current truth)
3. Tail of `build/05-section-01-status.md` — passes 19–23 are today's build; pass 22 has
   the flow-motion design, pass 23 the accent/dots change
4. Only if touching that area: `decisions/*`, `build/03-anti-ai-tells.md`,
   `build/08-mobile-plan.md` (mobile rules + numbers), `build/11-flow-motion-research.md`

**Run it:** `npx astro dev` in the repo root → http://localhost:4321/v2. `.env` at the repo
root carries the form secrets locally; restart the server after editing it.
**Test the gate:** `node scripts/qualify-test.mjs` (dev server running; ~$0.0004 total).
**Measure, don't eyeball:** `node v2/build/08-mobile-evidence/measure.mjs <url> <out> <w> <h> [scrollY] ["css || js:expr || …"]`
— headless Chrome over CDP, no deps; works on localhost AND the staging URL.

**What's built (V2 code only; V1 untouched except the two API routes' prerender fix):**
- `src/pages/v2/index.astro` — the page: header/nav, framework mount, About A/B, proof,
  Approach (flow script lives here), Work, Contact, footer. Section CSS + motion CSS
- `src/pages/v2/privacy.astro`, `terms.astro` + `src/components/v2/LegalPage.astro`
- `src/components/v2/ContactIntake.astro` — 4-step intake, token handoff, calendar reveal
- `src/pages/api/contact.js` (Slack + work-email check + token issue), `api/qualify.js` (OpenAI gate)
- `src/lib/free-email-domains.js`, `src/lib/qualify-token.js`
- `src/components/v2/HeroFramework.astro`, `SpineNav.astro`, `Backdrop.astro`, `Cursor.astro`, `GTMark.astro`
- `src/layouts/V2Layout.astro`, `src/styles/v2-tokens.css` (ALL tokens incl. rail + measure)
- `public/images/v2/portrait-*.png`, `public/fonts/v2/*.woff2`
- `scripts/qualify-test.mjs`; `v2/build/prototypes/portrait/segment.swift` (Apple Vision person mask)

**Next work, in order:** ① Greg's staging change list → ② About A/B decision → ③ perf pass
(never measured; 3 rAF loops + blurs + now the flow SVG) → ④ hero headline workshop
(`build/09`) → ⑤ logo motion A/B (`build/10`) → ⑥ real quotes + case studies → ⑦ CF env
for the preview form, legal `[CONFIRM]`s → cutover.

**Session gotchas:** replace whole code blocks, not drifted substrings; page-scoped Astro
CSS can't style child components (style wrappers) and **can't style JS-created SVG nodes
either — use `:global()`**; Greg's ~55% browser zoom means extension-side responsive
testing never trips 860px — use `measure.mjs`; V1's mobile shell is
`SpineNavigation.jsx` + `BaseLayout.astro`, NOT `FluidSpineMenu.jsx`; two sessions edited
the same files today — whole-block rewrites clobbered a peer's rule once (`--v2-measure`);
`.v2-sec` sets padding-top/bottom ONLY (the shorthand zeroes `.v2-wrap`'s sides);
`gpt-5-nano` needs `reasoning_effort: minimal` + headroom or it returns empty content.

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
