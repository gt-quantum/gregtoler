# 08 — Mobile: V1's rules, V2's gaps, and the port plan

**Date:** 2026-08-20 · **Status:** analysis + plan only, no V2 code touched · **Needs:** Greg's
approval on the four decision points in Part C before any code moves.

## TL;DR

- V1's mobile shell is **not** `FluidSpineMenu.jsx` — that file is an unused older variant with
  no responsive rules at all. The live site runs `SpineNavigation.jsx` inside `BaseLayout.astro`,
  with layout tokens in `global.css`. All numbers below come from those three files **and** were
  confirmed by measuring the live site at 390×844 (see "How this was measured").
- V1's answer at ≤768px is a **60px icon rail flush to the left edge**, content from x=76,
  a 298px text column (76% of a 390 screen), 36px item boxes on a 46px stride, and a
  hamburger in the header for the CTA.
- V2 at 390 currently has a 76px text rail at x=18, a **216px** text column (55%), items on a
  30px stride, and three outright bugs Greg's device reports hadn't isolated yet:
  1. the hero and the formed plane are centred 47px too far right and run **61–67px off the
     right edge** of the screen (the `padding-left:94px` on the pin shifts absolutely-positioned
     children by the full 94, not half of it);
  2. both axis panels open as **0–2px slivers** — their `calc(50% − 50vw + 240px)` geometry
     goes negative on a phone;
  3. V2 never resets the browser's default **8px body margin** (desktop too), so nothing is
     where the CSS says it is — `main` starts at (8, 8).
- Plan: fix the three bugs first (no taste calls), then port V1's rail numbers, then re-geometry
  the panels as a bottom sheet for touch. Four decisions for Greg are flagged **D1–D4**.

## How this was measured

Greg's ~55% browser zoom keeps the Chrome extension above the 860px breakpoint, so instead
I drove a **headless Chrome over the DevTools protocol** (mobile emulation, 390×844 @2x, touch
on) against the live site and against `localhost:4321/v2`, pulled `getBoundingClientRect()` for
every shell element, and screenshotted four states: V1 home, V2 hero, V2 formed plane
(scrollY 1400), V2 with each axis panel opened. Everything is in `08-mobile-evidence/`:

- `v1-390.png`, `v2-390-hero.png`, `v2-390-plane.png`, `v2-390-ypanel.png`, `v2-390-xpanel.png`
- `measure.mjs` — re-run with `node measure.mjs <url> <out> 390 844 [scrollY] [clickSelector]`
  (needs Chrome.app; no npm deps). Use it to verify each fix instead of guessing.

This is a desktop Chrome emulating a phone: good for geometry, not for iOS Safari quirks
(URL-bar `100vh` jump, safe areas). Those still need Greg's phone — called out per step.

---

## Part A — V1's mobile rules (the numbers)

### A1. Where they live

| Concern | File | Mechanism |
|---|---|---|
| Shell breakpoint | `src/components/layout/SpineNavigation.jsx:78` | JS: `isMobile = window.innerWidth <= 768` |
| Header, rail, socials | `SpineNavigation.jsx` | inline styles switched on `isMobile` |
| Content column | `src/layouts/BaseLayout.astro:86–119` | CSS `@media` at 1200 / 900 / 768 |
| Layout tokens | `src/styles/global.css:14–30` | `--sidebar-width 147→60`, `--content-top-padding 48→24`, `--layout-gap 24→16` at ≤768 |
| Home content | `src/components/home/HomePage.jsx:997–1084` | `@media` at 1000 and 768 |

V1 uses **one** shell breakpoint (768) and a content-density ladder (1200 → 900 → 768).
There is nothing between: at 769–900 the full 100px text sidebar is still shown.

### A2. Header

| | Desktop | Mobile ≤768 |
|---|---|---|
| Position | fixed, top 0, z 100, gradient fade to transparent | same |
| Padding | 24 / 40 / 24 / 16 | **16 / 16 / 16 / 8** |
| Measured height | 85 | **72** |
| Logo | `logo.png` 37px tall (122×37), `margin-left:26` → x = 42 | same size, **x = 34, y = 17.5** |
| Reserved offset below | 77px (`top:77` on rail, `margin-top:77` on content) | **77px** unchanged — 5px of air under the 72px header |
| Right cluster | theme toggle + "Start a Project" CTA | theme toggle + **hamburger (24px)**; CTA moves into a dropdown at `top:77; right:16`, blurred card, 160px min |

### A3. Rail (the `<aside>`)

| | Desktop | Mobile ≤768 |
|---|---|---|
| Box | fixed, left 0, **top 77, bottom 0**, width 100, `margin-left:10` | fixed, left 0, **top 77, bottom 0, width 60**, margin 0 |
| Padding | 24 / 20 / 40 / 37 | **16 / 8 / 24 / 8** |
| Column centre | x = 68.5 | **x = 30** |
| Item | text 14px, padding 4/20 → 38.4 tall | **icon 20px, padding 8 → 36×36 box** (labels are hidden) |
| Item stride (collapsed) | 54.4 (= 38.4 + 16px ghost connector) | **46 (= 36 + 10px ghost connector)** |
| Ghost connector | collapsed connectors keep dots 4+4 + line `min-height:8` = 16px, opacity 0 | dots **3+3 + line `min-height:4` = 10px**, opacity 0 — this is what spaces the stack |
| Open connector | `flex-grow:1`, margin 10/10, dots 4px, line 1px | `flex-grow:1`, **margin 6/6, dots 3px**, line 1px |
| Active colour | `--accent-color` (#5E8C61 / #7DB880 dark), weight 500 | accent icon, inactive icons at 0.6 opacity |
| Divider | 40×1, margin 20 top / 28 bottom | **30×1, margin 12 top / 16 bottom** |
| Socials | 20px icons, gap 24 | **20px icons, gap 16** |
| Measured (390×844) | — | first icon centre y=111; open connector 135→555; icons at y=561/607/653/699; LinkedIn cy=774; YouTube cy=810; bottom padding 24 |

Mechanic is identical at both sizes and is the one V2 already ports: only the connectors
adjacent to the active item open (`shouldShowLineForIndex`), so the "generous full-height
spread" is just `flex-grow:1` on one connector inside a rail that runs **header → screen bottom**.

### A4. Content column

| Width | `margin-left` | padding (T R B L) | text column at 390 |
|---|---|---|---|
| > 1200 | 147 | 48 / 64 / 64 / 24 | — |
| ≤ 1200 | 147 | 40 / 40 / 48 / 20 | — |
| ≤ 900 | 120 | 32 / 24 / 40 / 16 | — |
| **≤ 768** | **60** | **24 / 16 / 32 / 16** | **x 76 → 374 = 298px (76%)** |

`margin-top:77` always. Content and rail share the same 77px top line.

### A5. Home content at ≤768

Cards go single-column (`gap:16`), card padding 24, hero photo swaps to a wide crop at 200px
tall, logo bar becomes a 3-column grid, stats wrap. **Type does not scale**: the hero h1 is a
fixed `2rem` (32px) / 1.3 at every width; V1 never uses `clamp()` or `vw` type.

### A6. The relationships V1 actually holds (derived, not stated anywhere in the code)

- **Desktop:** rail column centre (68.5) sits under the centre of the "GT" glyph (~72). The
  text labels hang under the mark.
- **Mobile:** the rail column (x 20–40) sits **entirely left of the logo** (x 34–156): column
  centre 30 ≈ logo left edge − 4; icon right edge (40) ≈ "GT" glyph left edge (41). The rail
  reads as a gutter, the logo starts where the content starts breathing.
- Content starts at x=76, i.e. under the tail of the "GT" — content and logo share a left
  region, the rail owns the outer 60px.
- Vertical rhythm: header 72 → 5px air → rail/content top at 77 → first item centre at 111.

That mobile relationship (narrow gutter left of the logo) is what V2 currently does **not** do:
V2 centres a wider rail under the GT glyph, which is the *desktop* V1 relationship.

---

## Part B — V2 at 390×844, measured

| Element | V1 (live) | V2 (now) | Δ / note |
|---|---|---|---|
| Header height / padding | 72 / 16 16 16 8 | 80 / 16 22 | fine |
| Logo box | 122×37 at (34, 17.5) | 132×40 at (26, 20) | near-identical box; V2 8px further left |
| Rail box | x0 w60, top 77 → bottom 0 | x18 w76, top 92 → bottom 78 | V2 rail is floating, not edge-anchored |
| Rail column centre | 30 | 56 | V2 = desktop-V1 relationship |
| Item box | 36×36 icon | 29.9 tall, 9px text, pad 8/10 | "FRAMEWORK" is **85px wide in a 76px rail** (overhangs 4.5px each side) |
| Item stride | 46 | 29.9 | V2 collapsed connectors are `flex-basis:0` → 0px ghost; stack is 35% tighter than V1 |
| Open connector (hero state) | 420px | 504px | fine |
| Divider | 30×1, 12/16 | 26×1 at −12 | ok |
| Foot icon | 20px, bottom pad 24 | 18px in 34px box, `bottom:16` | no safe-area inset |
| `main` origin | (60, 77) | **(8, 8)** | **bug: no `body{margin:0}` reset** — also on desktop |
| Text column | 76→374 = **298px** | 134→350 = **216px** | `main` pad 94 + `.v2-wrap` pad 32 + 8 body margin |
| Hero block | — | x 127 → 451, centre 289 | **off-screen right by 61px**; content centre should be 242 |
| Thesis | 32px fixed | 35.2px (clamp floor 2.2rem) | ok-ish; eyebrow wraps to 2 lines with 30px gap |
| Formed plane | — | 335×420 at x 121 → 457 | **67px off-screen**; "Operations" label centre at x=399; right-column nodes clipped |
| y-panel open | — | width **2px** at x=406 | **unusable** |
| x-panel open | — | width **2px** at x=366 | **unusable** |
| Axis label hit area | — | 23px tall | below 44px touch minimum |
| Pin height | — | `100vh` | iOS URL-bar jump risk on a 260vh pinned stage |
| 820px width | desktop sidebar | rail mode | V2 flips at 860, V1 at 768 |

### Why the hero/plane are off-centre (so the fix is the right one)

`.v2-pin { padding-left: 94px }` was meant to centre the composition in the space right of
the rail. But `.v2-hero` and `.v2-plane` are `position:absolute` children of a flex container:
their static position is computed against the **padding box**, then offset by the padding, so
the centre lands at 195 + 94 = 289 instead of (94 + 390) / 2 = 242. Padding on the pin is the
wrong tool; the children need `left`/`right` insets (Part C, step 1).

### Why the panels collapse

`.v2-panel-y { right: calc(50% − 50vw + 240px) }` and `.v2-panel-x { left/right: calc(50% − 50vw
+ 272px) }` assume ≥ ~700px of viewport. At 390 the insets cross over and the box has negative
width; the browser clamps it to the border. `EDGE_X = 240` in the script has the same
assumption. The panel geometry is desktop-only by construction and needs its own mobile mode,
not a tweak.

---

## Part C — Fix plan, in order

Each step is independently shippable and verifiable with `measure.mjs`. Steps 0–1 have no
design judgement in them; do them first, on their own, and get a phone check before the rail
work so the two don't blur together.

### Step 0 — Foundation (no decisions)

Files: `src/styles/v2-tokens.css`, `src/components/v2/HeroFramework.astro`, `src/pages/v2/index.astro`

- `*, *::before, *::after { box-sizing: border-box }` and `body { margin: 0 }` in the `.v2`
  base block. V1's `global.css` has both; V2 inherited neither.
  *Risk:* the header, hero and panels were tuned with content-box sizing and an 8px body
  margin present. Expect ≤8px shifts on desktop; re-measure `.v2-head`, `.v2-hero`,
  `.v2-panel-*` at 1440 before/after and correct any drift in the same commit.
- `.v2-pin { height: 100dvh }` with the `100vh` line kept above it as fallback. The stage
  maths (`stage.offsetHeight − innerHeight`) is unaffected.
- Rail foot: `bottom: max(16px, env(safe-area-inset-bottom))`. `viewport-fit=cover` is already
  set, so without this the LinkedIn icon sits in the home-indicator zone on iPhones.

**Phone check:** scroll through the morph once — no jump when the Safari bar collapses.

### Step 1 — Hero and plane centring (bug)

File: `HeroFramework.astro` (the `@media (max-width: 860px)` block)

- Remove `.v2-pin { padding-left: 94px }`.
- Introduce `--v2-rail: 94px` (becomes 60–76 after step 2) on `.v2` at ≤860 and give the
  absolutely-positioned children real insets:
  `.v2-hero { left: var(--v2-rail); right: 0; width: auto; }`
  `.v2-plane { left: var(--v2-rail); right: 0; margin-inline: auto; }` (plane keeps its
  aspect-ratio; `max-width: calc(100vw − var(--v2-rail) − 32px)`).
- The seam is already centred via `left:50%` on the pin — it needs `left: calc(50% + var(--v2-rail)/2)` at ≤860 or it will sit 47px left of the new plane centre. Check with
  `measure.mjs` that `.v2-seam.cx === .v2-plane.cx` in the formed state.
- The 720px rule `.v2-plane { max-width: 86vw }` currently **overrides** the 860 rule (same
  specificity, later in source) — that is why the plane is 335 wide. Delete it; the rail-aware
  cap above is the only one.

**Target numbers at 390:** hero and plane centre = 242 (with today's 94 rail) → 225 with a
60 rail; plane width = 264 → 298; nothing with `x + w > 390`.

### Step 2 — Port V1's rail proportions  **(D1, D2)**

Files: `SpineNav.astro` (≤860 block), `index.astro` (`.v2-linkedin`, `main`)

Port these V1 numbers verbatim, mapped onto V2's header (80px vs V1's 72 → top line 84
instead of 77, keeping V1's 4–5px of air):

| Property | V1 value → V2 target |
|---|---|
| Rail box | `left:0; top:84px; bottom:0; width:60px; padding:16px 8px 24px` |
| Item box | 36×36 (content 20px + 8px padding), centred |
| Ghost connector | keep `flex-basis:auto` (not 0), dots 3+3, line `min-height:4px`, opacity 0 → 10px |
| Open connector | `margin: 6px 0`, dots 3px, line 1px |
| Divider | 30×1, `margin: 12px auto 16px` — as a real element in the rail's flow, not a `::before` on the icon |
| Foot | LinkedIn 20px glyph, in-flow at the rail's bottom (V1 stacks socials inside the aside; V2 fixes it separately — move it into the nav's flow so `bottom:0` + padding 24 positions it and it can't drift from the rail) |
| Content | `main { padding-left: 60px }`, `.v2-wrap { padding: 0 16px }` at ≤860 → text column x 76→374 = 298px, same as V1 |

**D1 — what goes in a 60px rail instead of 9px words.** The text labels are the reason the
rail is 76 wide and still overflows. V1's answer was icons. Options:

1. **Numerals `01`–`05` in Martian Mono, 11px** *(recommended)*. `SpineNav.astro` already
   carries `n: "01"…"05"` on every item — unused. They fit a 36px box, read as the technical-
   drawing language the whole site uses, need no icon design, and the active one can take the
   accent. `aria-label` keeps the full word for screen readers.
2. **Icons, V1-style** (20px line icons per section). Faithful port, but five new glyphs to
   design in V2's idiom, and "Framework / Approach" don't have obvious icons.
3. **Keep words, rotate 90°** (`writing-mode: vertical-rl`). Fits 60px, but kills the
   dot–line–dot read between items and is the one layout that didn't come from V1.

**D2 — rail at x=0 (V1 mobile) or inset under the GT glyph (what V2 does now).** V1 mobile
puts the column at centre 30, entirely left of the logo, and gains 16px of content width for
it. Recommend V1's placement: it is the thing Greg's eye knows from the live site, and the
"not quite there" feeling matches the mismatch in A6. If Greg prefers the under-the-glyph
version, keep `left:18px` and accept a 76-wide rail with numerals — everything else in this
step still applies.

**Phone check:** rail top aligns with the content's first line; "01" sits under/left of the
GT mark the way the home icon does on gregtoler.com today; the foot icon clears the home
indicator.

### Step 3 — Hero scale at phone widths

File: `HeroFramework.astro`

- Thesis: `clamp(2rem, 5.4vw, 4.8rem)` — floor to V1's 32px. At 298px wide that wraps to 5–6
  lines; if that is too tall, drop `max-width: 24ch` to `20ch` on ≤768 rather than shrinking type.
- Eyebrow: stack the two spans (`flex-direction: column; gap: 6px`) on ≤768 instead of a 30px
  wrap gap; `margin-bottom: 20px`.
- Lede: `margin-top: 36px` (now 58), `font-size: 15px`, `max-width: 34ch`.
- Hint text: "Tap an axis to break it down" via a `@media (hover: none)` swap.

### Step 4 — Plane geometry on a portrait screen

File: `HeroFramework.astro`

- Plane: `width: 100%` of the content column (298), `aspect-ratio: 1 / 1.15`, `max-height:
  52dvh`. Axis labels already tuck inside the plane at ≤860 — keep that. Node type `.78rem`
  stays; confirm "RevOps & BizOps" at the 75% column does not leave the plane (x + w ≤ 374).
- Axis label buttons: `min-height: 44px` via padding, or a transparent `::after` hit-area 44×44,
  so the tap targets meet the minimum without moving the visible text.

### Step 5 — Axis panels on touch  **(D4)**

File: `HeroFramework.astro` (CSS + `applyMode`)

The desktop panels span from the axis to the viewport edge. On a phone there is no edge to span
to. Proposal: at ≤860 the panel becomes a **bottom sheet** and the axis motion stays:

- y-mode: the vertical axis still slides left (to `EDGE_X = 16` inside the plane, not 240).
  x-mode: the seam still rises. The plane keeps telling the story; only the copy box changes.
- Panel: `position: fixed; left: calc(var(--v2-rail) + 16px); right: 16px; bottom:
  max(16px, env(safe-area-inset-bottom)); top: auto; height: auto; max-height: 58dvh;
  overflow-y: auto; transform-origin: bottom center; transform: scaleY(.015)` → `scaleY(1)`.
  Same surface, blur, border, radius. `.inner { padding: 22px 20px }`, body 15px/1.6.
- Close: 40×40, top-right of the sheet; Escape/click-out/re-tap still close it.
- `applyMode` guards the `--yx`/`--xy` conversion with the rail-aware edge values
  (`EDGE_X = isMobile ? 16 : 240`; x-mode `edgeY` uses `max(84, …)` for the shorter header).

Alternative if Greg wants the panel *inside* the plane: `inset: 0` on the plane, full-bleed
card over the grid. Simpler, but hides the axis that was just tapped — the sheet keeps it visible.

**Phone check:** tap "Strategy" → axis slides, sheet rises from the bottom, copy readable
without zoom, close by tapping the plane.

### Step 6 — Breakpoints  **(D3)**

- Keep **860** as the rail flip. The horizontal spine needs the width; V1's 768 applies to a
  sidebar that was already vertical.
- Replace V2's second breakpoint **720 → 768** so the density rules (hero padding, eyebrow stack,
  panel sheet text size) share V1's number, and add V1's 900 step for the content column if
  section 02+ needs it. Two numbers, both from V1: 860 (V2-only, structural) and 768.

### Step 7 — Device verification (Greg, ~5 minutes)

On the phone at `/v2` after steps 0–2, then again after 3–6:

1. Portrait: rail hugs the left edge, "01" top aligns with the hero's first line, nothing
   scrolls horizontally (`document.documentElement.scrollWidth === innerWidth`).
2. Scroll the morph end-to-end: no jump when the URL bar collapses; seam lands on the plane's
   horizontal centre.
3. Formed plane: all four node labels and "Operations" fully on screen.
4. Tap each axis: sheet opens, closes three ways.
5. Landscape (notched phone): rail not under the notch — if it is, add
   `padding-left: env(safe-area-inset-left)` to the rail and `main`.
6. Compare side-by-side with gregtoler.com: rail width, stride, logo offset should *feel* the
   same; numbers above say they will be within 4px.

### Not in this plan (tracked elsewhere)

- **Perf pass** (START-HERE, next work ①) — three rAF loops + backdrop blur on a phone GPU.
  Step 0's `dvh` change does not touch this. Do the measurement before section 02.
- Thumb-side (right) rail — parked by Greg in pass 12; this plan keeps left.
- Header right cluster on mobile: V1 shows toggle + hamburger; V2 is dark-only, single-page, so
  the header's right side is intentionally empty. If a Contact CTA is wanted later, V1's
  dropdown pattern (`top:77; right:16`, blurred card) is the port.
- Section 02–05 content formatting: the `.v2-wrap` padding change in step 2 is the only rule
  they need until they exist.

## Decisions needed from Greg

| # | Question | Recommendation |
|---|---|---|
| D1 | Rail item glyph: numerals / icons / rotated words | Numerals `01–05` (already in the data) |
| D2 | Rail placement: flush left (V1 mobile) or inset under the GT glyph | Flush left, 60px, V1's numbers |
| D3 | Breakpoints: 860 + 768 (replace 720) | Yes |
| D4 | Panels on touch: bottom sheet vs in-plane card | Bottom sheet |

Approve these and steps 0–1 can ship in one pass, 2 in a second, 3–6 in a third, each with a
`measure.mjs` diff in the status log.
