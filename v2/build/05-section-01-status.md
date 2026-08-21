# Section 01 — Hero → Framework: build status

**Date:** 2026-08-20
**Route:** `/v2` (dev: http://localhost:4321/v2) — `noindex`, V1 untouched and still live
**Scope:** Hero + framework morph only, per Greg. Not the whole site.

## Files

| File | Role |
|---|---|
| `src/styles/v2-tokens.css` | Palette, type roles, grain, focus, skip link |
| `src/layouts/V2Layout.astro` | Meta, OG, Person schema, font preload, no-flash theme |
| `src/components/v2/HeroFramework.astro` | The section |
| `src/pages/v2/index.astro` | Preview route + nav + theme toggle |
| `public/fonts/v2/*.woff2` | Self-hosted, 63KB total |

## What's built

**The morph.** Hero holds → clears by p0.14 → line stretches into X (p0.12–0.44) → Y grows
from centre (p0.20–0.50) → grid blooms radially (p0.38–0.62) → capabilities bloom (p0.58–0.64)
→ work plots (p0.66–0.71) → texture labels (p0.72–0.78) → **settled hold p0.78–1.0**, plane
goes interactive at p0.80.

**Three tiers on the plane:**
- Capabilities — loud, Archivo Black, one per quadrant
- Plotted work — unlabelled amber points scattered on intersections (Greg's "real plotted
  scatter" over tidy quadrant clusters)
- Texture — quiet mono, personality not capability (from seunghyuk.com)

**Grid-relative coordinates.** 12×8 cells, `background-size: calc(100%/12) calc(100%/8)`.
Nodes snap to true intersections at any viewport instead of floating near them.

## Anti-tell work already in

- Self-hosted subset woff2, preloaded, **no Google Fonts CDN**; metric-adjusted fallback so
  the swap doesn't reflow
- Film grain via inline SVG turbulence, zero image payload
- All copy server-rendered — the page works and is crawlable with JS off
- `prefers-reduced-motion` → static finished framework, stage collapses to normal flow
- Axis labels are real `<button>`s with `aria-expanded` / `aria-controls`; visible focus rings
- Skip link, `::selection`, `text-wrap: balance` / `pretty`
- Contour canvas **pauses off-screen and on tab blur**, DPR capped at 2 (V02 mockup looped
  it forever at full DPR)
- Radius is 2px, not a uniform 16px
- Theme persists to localStorage, applied inline before paint — no flash

## Fixed during this pass

1. Nodes bloomed at 0.72–0.92 and were still arriving as the pin released — you never saw the
   finished framework. Retimed to finish by 0.78.
2. Grid dots used `--v2-line` and were invisible. Added a dedicated `--v2-dot` token.
3. Rotated axis labels collided with plane content. Offset −22px → −40px.
4. Texture nodes sat on the axes and on plot points. Re-laid out with placement rules.

## Known rough edges

- "Came up in GTM" and "Diagnoses first" crowd nearby plot dots. Needs a collision pass, or
  fewer texture labels.
- Plane is 1.55:1 — wide. Worth testing 1.4:1 for more vertical breathing room.
- Mobile is coded (tap replaces hover, texture tier hidden, 1:1.15 ratio) but **untested on a
  real device**.
- No perf measurement yet. Needs a Lighthouse pass against the `daoism.systems` boundary.

## Open for Greg

- Display face is a single token (`--v2-display`). Currently Archivo Black.
- Sidebar vs top nav still undecided — top nav is in as a placeholder.
- Scroll length is 340vh. Faster or slower?

---

# Pass 2 — cohesion rework (2026-08-20)

Greg's critique: *"It feels like two completely separate sections... doesn't feel like one
cohesive thing."* Plus: gold too bright, no grid across the whole site, no hover bulge,
not using his actual assets, background too fast and too faint, and it should be centred.

## What changed

**1. The seam is now one continuous element.**
The bronze rule under the headline **is** the X axis. It is never faded out and never
re-created — it slides down and widens (p0.06→0.46). Previously the headline had no rule at
all and the axis was a separate element that appeared from nothing, which is precisely why
the two halves read as unrelated.

**2. Everything centre-aligned.**
Greg: *"I assume it needs to be center-aligned for things to scroll and connect properly."*
Correct — a left-aligned headline can't hand its underline off to a centred axis without a
visible horizontal jump. Now the seam only ever changes width and Y.

**3. The dot grid is global.**
New `src/components/v2/Backdrop.astro` — one fixed canvas for the whole site, mounted in
`V2Layout`. The grid used to live inside the framework's plane, which was the structural
cause of the disconnect. The framework now only *biases* the shared surface via
`window.v2Backdrop.setFocus()`.

**4. Cursor bulge — "a ball underneath the dotted grid."**
Dots within 210px of the pointer are pushed radially outward by `1 + 0.45·f²` and brightened,
so the lattice domes up as if something is pressing it from below. Site-wide, since the
backdrop is global. This replaces the old cursor-light glow, which was part of the brightness
problem.

**5. Using V1's actual assets.**
- The background is now V1's **SilkFabricBackground** model — filled bezier sheets stacked
  bottom-up with gradient fills — ported from `src/components/backgrounds/SilkFabricBackground.jsx`,
  not reinvented. The previous pass used stroked hairlines, a completely different thing,
  which is why it barely registered. The brief said to keep this: *"the waves read as
  stacking systems that move together."*
- **Slowed down ~10x.** V1 drove it off elapsed *seconds* with speeds 0.10–0.18. The first
  pass advanced a counter per frame and drifted far too fast to read as fabric.
- New `src/components/v2/GTMark.astro` — Greg's **real** GT logo, the vector path from
  `public/favicon.svg`, now in the header. Previously the brand was text only.

**6. Gold → bronze.**
`--v2-light` `#EBB668` → `#C89257` (day `#B87A1E` → `#9C6B24`). `--v2-light-soft` alpha
0.16 → 0.10. Axis and seam glow reduced from `18px -4px` to `14px -5px`.

## Still open

- Silk layers went from invisible to fairly present. May want desaturating — it reads
  a little brown/muddy in the lower half.
- The GT mark is still one merged path, so it can't animate apart. See `003`.
- Header's gradient backdrop makes a faint horizontal edge near the top of the viewport.
- Mobile and perf still unmeasured.

---

# Pass 4 — darker, tighter, custom cursor (2026-08-20)

## The "cutoff square" was a real bug

The backdrop canvas sized its bitmap from `window.innerWidth/innerHeight`, which **include
the scrollbar**, while the element's CSS box does not. The drawing was therefore scaled
slightly and left an uncovered strip down the right edge — the hard edge Greg saw. Now sized
from `canvas.clientWidth/clientHeight`.

## Palette taken several stops down

The literal reference palette (#222831 / #393E46 / #948979 / #DFD0B8) read far too bright at
full-screen scale. Same family, much darker:

| | was | now |
|---|---|---|
| base | `#222831` | `#131820` |
| surface | `#2B313A` | `#1A212A` |
| dot | `#4E555F` | `#2F3742` |
| silk | `57 62 70` | `34 41 51` |
| ink | `#DFD0B8` (cream) | `#D3D8DE` (cool grey) |

**Beige is now an accent only, never the field.** Greg: *"maybe I don't like the beige...
I don't like that at scale."* Body ink went cool grey; cream (`#DFD0B8`) survives only as
emitted light — the axes, the seam, the highlighted word, the cursor.

Silk layer alphas roughly halved (0.62→0.30 down to 0.24→0.10). Lamp blooms 0.085→0.040.

## Grid and bulge

- Lattice spacing **34 → 24px** — the pattern read too coarse.
- Bulge radius **210 → 132 → 88px**, strength 0.52 → 0.30. It suggests a ball rather than
  announcing one.

## Header and nav

- Header is now **fully transparent with blur only** — no tint, no bottom rule.
- The spine lost its 620px cap and takes all available width. The open connector now runs
  most of the header, so the stretch is the dominant motion. Transition slowed .55s → .7s.

## Custom cursor (new)

`src/components/v2/Cursor.astro`. A ring that lerps toward the pointer (0.18 per frame, so it
lags and feels weighted) plus a hard dot at the true position that never lags — precision is
unaffected. Over anything interactive the ring expands to 56px and the dot fades; on press it
contracts.

Safeguards: only mounts for `pointer: fine`, disabled under `prefers-reduced-motion`, and
`cursor: none` is injected **from JS**, never static CSS — so a script failure can't leave
anyone without a pointer.

## Still open

- Dot grid may now be *too* subtle after the darkening — worth a look.
- Bulge still stays lit at the last pointer position after scrolling; wants a decay.
- Glassmorphism is on the anti-tell list (`03-anti-ai-tells.md`) and is currently confined to
  the header blur. Deliberate, flagged.

---

# Pass 5 — in-place axis modes, real logo, layered backdrop (2026-08-20)

## The logo, third attempt, correct

Greg caught that the traced version *recreated* the logo — filled counters in a/e/g,
thicker GT strokes. Root cause: potrace at threshold inevitably redraws. Fix: **use the
actual `public/logo.png`** recoloured with a CSS filter (`brightness(0) invert(.92)`) —
exactly V1's technique in FluidSpineMenu.jsx. The artwork is never redrawn. The long
sepia/hue-rotate filter chain also proved unpredictable and was cut to two steps.
The trace experiment files are gone; favicon.svg remains broken (renders "GI") — flagged
for replacement at cutover.

## Axis interaction is now in place, not a drawer

- Mode "y": vertical axis slides to 24% left, panel stretches open (scaleX) to its right.
  X axis dims to .18, nodes recede to .1.
- Mode "x": the seam slides up to 22%, its GTM/Operations labels ride along (they're
  positioned off `--xy`), panel stretches down beneath it. Y axis dims.
- Click-out anywhere, or Escape, restores the grid. Verified both modes live.
- The seam gets its transition ONLY during mode switches (`seamEase()` applies it for
  850ms, then removes it) — a permanent transition would lag the scroll morph.
- Arrow glyphs beside the axis words deleted; the lines carry their own arrowheads.

## Nav

- Numbers gone.
- A leading connector before the first item opens when NOTHING is active (active = -1,
  i.e. the hero), pushing the whole run right. Scroll back above 40vh → hero state again.
- Section-follow works against four new placeholder sections (02–05) that exist purely
  so the connector-stretch motion is visible end to end.

## Backdrop

- Layer separation: silk alphas now 0.42→0.09 (was 0.30→0.10) and speeds 0.030→0.106
  (was ~0.04–0.08), so near sheets are dense/slow and far sheets thin/quick.
- **Dots ride the silk**: each dot belongs to the layer nearest its depth band and drifts
  with that layer's wave (`layerWave()` × 0.16), with size/alpha scaled by depth. The
  lattice now has the same parallax as the sheets instead of sitting flat on top.
- `--v2-dot` lifted `#2F3742` → `#3D4854`.

## Cursor

Ring 24px (was 30), hover 38px (was 56), press 18px. Hover delta much smaller per Greg.

## Open

- Logo filter is plain white-ish; could tint toward cream ink later if wanted.
- Panels use backdrop blur — same deliberate glass exception as the header.
- Perf/Lighthouse still unmeasured. Mobile untested on device.

---

# Pass 6 — dots live ON the layers; nav mapping fixed (2026-08-20)

## Backdrop restructured

- Each sheet now has its own **luminance** (`lum` 0.72→1.55) as well as alpha, so adjacent
  layers are visibly different values instead of one same-colour mass.
- **Dots are painted interleaved with the sheets**: sheet 0, its dots, sheet 1 (partly
  covering them), its dots… Each dot belongs to the layer at its depth band, rides that
  layer's wave (`layerWave × 0.18`), and is occluded by nearer sheets. The lattice is now
  IN the stack, not floating on it.
- Base dot alpha no longer depends on being lit — always visible (≈0.30–0.55 by depth),
  then brightened additively by cursor bulge / framework focus.

## Two real bugs fixed

1. **Nav sections were off by one.** The axis-interaction rewrite deleted the `#framework`
   anchor; the IntersectionObserver filtered the missing target out of a flat array, which
   shifted every index — Approach highlighted Framework, Work highlighted Approach. Fix:
   a `#framework` wrapper div restored, and the observer now keeps (itemIndex, element)
   pairs so a missing target can never shift the others. Hero also wins over the observer
   above 40vh, so the "items slid right" state holds at the top.
2. **Backdrop crashed to nothing.** Two stacked string-edit collisions: the old `drawDots`
   survived a failed replace (`computeDots is not defined`), and the layers array lost its
   new `lum`/`dot` fields (`rgba(NaN NaN NaN)`). Both blocks rebuilt wholesale by line
   range. Lesson recorded: replace whole blocks, not drifted substrings.

---

# Pass 7 — neutral charcoal, cursor centring, layers lowered (2026-08-20)

- **Cursor off-centre was a box-model bug**: the ring's 1px border sat OUTSIDE its 24px
  box, so its visual centre was ~1px down-right of the translate point while the dot was
  dead-centred. `box-sizing: border-box` fixes all three states at once.
- **Ground is now dead-neutral charcoal** (#17181A / #1E1F22 / …): hue-free greys, no blue
  lean, no brown lean, so an accent of either temperature can sit on it. Beige is dead as
  an accent per Greg.
- **Accent is provisionally neutral silver** (#CDCFD3 as pure illumination) and remains a
  ONE-TOKEN swap (`--v2-light` + `--v2-light-soft`). Candidates to audition when Greg
  wants: ember (warm), steel (cool), electric (seunghyuk-adjacent). Day theme rebuilt to
  match (paper-grey ground, charcoal ink).
- **Silk stack lowered as a unit** (+0.08–0.09 baseY) so the top sheet no longer clips
  under the header's blur band.

---

# Pass 8 — even lattice restored (2026-08-20)

Displacing dots by each band's wave warped the grid into looking broken rather than
layered — the movement was too slow/subtle to read as parallax, so it just read as
uneven (Greg). Reverted to a **perfectly even lattice**, uniform dot size and alpha
everywhere. Depth is now done entirely by **paint order**: dots are still painted
interleaved between the sheets, so the translucent sheets veil the deeper dots along
their wavy edges. The grid stays crisp; the layering happens over it, not to it.

---

# Pass 9 — nav tracker, full-plane panels, researched type (2026-08-20)

## Nav actually anchored now
The IntersectionObserver could never track the Framework section: a 240vh pinned stage
produces almost no boundary crossings while pinned and a structurally tiny intersection
ratio next to normal sections, so Framework never won. Replaced with a deterministic
scroll tracker (active = last section whose top passed the viewport midline; <30vh = hero,
nothing active). Clicks on pinned sections scroll to the section's END minus a viewport —
the settled grid — since their anchor top is the hero. Tracker pauses during the
programmatic scroll so the clicked item holds.

## Axis panels take the plane
y-mode axis → 7% left, x-mode axis → 8% up; panels now cover the full plane (inset 0),
glass density 74%→86%, panel copy up to clamp(15px…19px), grid recedes to 0.04.

## Type — researched, not instinct (Greg's instruction)
Sources: impeccable.style/slop, aiskill.market "Banning Inter", fontalternatives.com
neo-grotesk-fatigue, typewolf, madegooddesigns.
- Documented AI tells: **Inter, Geist, Space Grotesk, Instrument Serif** (+Roboto).
- Clash Display: template-fatigued, and its Fontshare CSS also silently bundled a serif
  (Gambetta) that my weight-keyed download overwrote files with — root cause of the
  serif node labels. Files purged.
- **Display = Barlow 500/600** — DIN-influenced; DIN is the lettering heritage of
  technical drawings, i.e. the site's own concept. Research-recommended for engineering
  credibility.
- **Body = Hanken Grotesk stays** — independently validated ("strongest free body
  workhorse", not on any tell list).
- **Mono = Martian Mono stays** — from Greg's #3 reference.
Font payload now: barlow 500/600 (30K), hanken (34K), martian (23K). Clash/Archivo/Plex
files deleted.

---

# Pass 10 — layer ramp, dark-only, slowed morph (2026-08-20)

- **Layer colours are now explicit, evenly-stepped values** ("27 28 31" → "53 55 61",
  ~5-6 pts per step over bg #17181A), drawn top-sheet-first at a=0.96 so each band's
  visible colour IS its own fill. The lum-multiplier version bunched layers 1-3 together
  then cliffed to the bg. Band→dot assignment now by explicit y-thresholds.
- **Dark-only**: day/night toggle hidden (mechanism kept), stored day preference cleared
  on load. Day palette parked in the tokens file.
- **Spine spacing**: item padding 12→20px, open-connector margin 14→18px.
- **Morph slowed**: stage 240→300vh, seam stretch now p0.06–0.44, axes/labels/nodes all
  retimed later, settle at p0.80. Node thresholds shifted +~0.15.
- **Framework nav click** hand-drives the scroll so the morph actually plays (native
  smooth skipped it in ~0.5s). Direction-aware: down = 2.4s full sequence; back up from
  a later section = 1s (already formed, per Greg).

---

# Pass 11 — axis-panel polish round, nav chrome (2026-08-20, evening)

## Axis panels, final geometry (all Greg-directed, iterated live)
- Both windows share ONE box size — the y-panel's ("the perfect size"): width vw-544,
  height 90% of the plane. The x-panel centres that box under its raised line.
- y-mode: axis inset == panel far-inset (240px + 64px label clearance) → composition
  centred. x-mode: line Y is COMPUTED per-click so line+gap+panel centres vertically
  in the viewport (fixed inset stopped centring when the panel size changed).
- With a panel open, everything else zeroes out completely (was ghosting through).
- Copy block centred in the box (was left-hugged, which read as misalignment).
- × close button (SVG cross — text glyph wouldn't centre), 90° rotate on hover.
  Four ways out: ×, Escape, click-out, re-click the label.

## Nav chrome
- Day/night slot → LinkedIn icon (V1's exact SVG + link), nav-ink colours.
- Logo .72 / icon .65 resting opacity, ~.95 hover — solid shapes needed a handicap
  against the thin mono nav. Approved: "perfect".

## Two silent-failure lessons hit today
1. A python-replace anchored on since-deleted CSS (`.v2-next`) no-opped — the LinkedIn
   styles never existed while we "tuned" them. Assert on replacement now.
2. Page-scoped CSS can't reach into a child component (`.v2-brand .v2-gtmark` never
   matched — GTMark has its own Astro scope). Style the wrapper instead.

## Open
- Accent finalist (widget live; olive vs madder leading)
- Perf pass — STILL unmeasured, flagged repeatedly, do before section 02
- Section 02 Approach next build item

---

# Pass 12 — mobile rail, accent locked, session close (2026-08-20, night)

## Accent: LOCKED — dark olive `#8A9166`
Chosen by Greg from the researched audition (3 rounds, `06-accent-research.md`).
Soft variant `rgba(138,145,102,0.11)`. Audition widget fully removed (markup, CSS,
script); stored picks cleared on load so the token always wins.

## Nav chrome (final for now)
- Logo .72 / LinkedIn .65 resting opacity ("perfect").
- Desktop: LinkedIn replaced the parked day/night toggle, far right.

## Mobile rail — V1's sidebar layout, ported
Iterated right-side-for-thumb first, then Greg called it back to V1's left-under-logo
as the better aesthetic fit for now (thumb-side parked, two-line flip to revisit):
- Fixed left rail below the logo, full height (top 92px → bottom 78px), inset 18px so
  the rail column centres under the GT mark.
- Same connector mechanic as desktop/V1: only connectors adjacent to the active item
  open; hero state pushes the stack down.
- Divider + LinkedIn at the rail's foot (V1's sidebar footer grammar).
- Content pads 94px (18 inset + 76 rail); pinned framework re-centres; plane capped
  `calc(92vw - 94px)`; GTM/Ops axis labels tuck INSIDE the plane on small screens
  (they clipped off-viewport when hanging outside, per Greg's screenshot).

## ⚠ MOBILE IS NOT DONE — priority flag for a future session

Greg, verbatim intent: V1 took a LOT of mobile time and V2 is "not near done" on it.
Known-open at close:
- Content layout/alignment vs the rail: spacing between rail, logo and main content
  is "really close, but proportionally not quite there".
- Main-content formatting at small sizes generally unaudited (hero scale, panel
  geometry on touch, section padding).
- The rail's item spacing vs V1's generous full-height spread.
- My browser-side verification was blocked all session (Greg's page zoom ~55% keeps
  CSS width above the 860px breakpoint) — every mobile fix here was shipped on
  Greg's device reports + code reasoning, NOT visually verified by me.

**The plan when we take this up: analyse the CURRENT LIVE SITE's mobile treatment
directly** — V1 solved this already (spacing, logo/sidebar/content relationships,
`FluidSpineMenu.jsx` + section components) — and port its decisions rather than
re-deriving them. Benchmark screenshot in the session log (V1 sidebar, image 11).

## Also still open (unchanged)
- Perf pass — unmeasured all session; do before section 02 grows the page.
- Section 02 Approach, then 03–05 (placeholders live).
- Day/night: parked, dark-only. favicon.svg is a broken trace ("GI") — replace at cutover.
- Case studies: placeholders with `placeholder: true` interlock (`decisions/002`).

---

# Pass 13 — plane decluttered; pushed to staging (2026-08-20, close)

- Texture-tier labels ("Diagnoses first", "Came up in GTM", "Builds it himself",
  "Ships, not decks") AND the unlabelled glowing plot dots removed entirely — Greg found
  them distracting. The plane is now: 4 quadrant titles, 2 axes, 4 labels, hint line.
  The plotted-work idea returns in SECTION 03 with real case-study coordinates
  (schema ready in v2/content/case-studies/) — not as decoration on the intro.
- Removal side-effect caught: a dangling selector merged the node-recede rule into the
  axis-dim rule; both restored (nodes → 0, inactive axis → 0 in panel modes).
- Work pushed to `staging` branch → github.com/gt-quantum/gregtoler. If the Cloudflare
  Pages project is connected to the repo, the branch gets an automatic preview URL
  (…staging….pages.dev) shareable for feedback. The /v2 route is `noindex`.

---

# Pass 14 — mobile audit, plan only (2026-08-20, late)

No V2 code touched. Output: `08-mobile-plan.md` + `08-mobile-evidence/`.

- V1's mobile shell is `SpineNavigation.jsx` (JS `innerWidth <= 768`) + `BaseLayout.astro`
  media queries + `global.css` tokens. `FluidSpineMenu.jsx` is an unused older variant.
- Measured the live site and `/v2` at 390×844 with headless Chrome over CDP (script saved in
  the evidence folder — this is the workaround for Greg's 55% zoom blocking the extension).
- V1 at ≤768: 60px icon rail flush left (top 77 → bottom 0, padding 16 8 24), 36px item
  boxes on a 46px stride (10px ghost connector), divider 30/12/16, content margin-left 60 +
  padding 24 16 32 16 → 298px text column. Header 72 tall, logo 37px at x=34.
- V2 at 390, beyond the known rail-proportion debt: hero + formed plane centred at x=289
  instead of 242 and running 61–67px off the right edge (pin `padding-left` shifts abs-pos
  children by the full amount); both axis panels open at 0–2px wide (desktop-only calc
  geometry); no `body{margin:0}`/`box-sizing` reset so `main` starts at (8,8) everywhere;
  text column 216px; item stride 30px (flex-basis 0 kills the ghost spacing); `100vh` pin.
- Plan: step 0 resets + dvh + safe-area → 1 hero/plane insets → 2 rail port (V1 numbers) →
  3 hero scale → 4 plane geometry → 5 panels as bottom sheet → 6 breakpoints 860 + 768.
- Decisions for Greg: D1 rail glyph (recommend the unused `01–05` numerals), D2 rail flush
  left at 60px vs inset 76, D3 swap 720→768, D4 bottom-sheet panels.

---

# Pass 14 — full page built out (2026-08-20, late)

All sections from `09-positioning-and-sections.md` now exist for real:
- Hero: INTERIM headline "Most consultants hand you a deck. I hand you the fix."
  (candidate A — Greg approved NONE; workshop stays open.) Lede carries the plane.
- 03 Approach: three beats (V1 taglines, lines-not-paragraphs), per-pillar case-slot
  comments, CTAs deep-linking the intake pre-filled (#contact?situation=…).
- 04 Slim CTA band ("Sound familiar?" → #contact).
- 05 Proof: monochrome logo MARQUEE (real V1 brand assets, ink-flattened, pauses on
  hover + reduced-motion) + two OBVIOUSLY-fake quote placeholders.
- 06 About: V1 bio compressed 5→3 paragraphs; "design problems" line kept; stats +
  4 focus areas. Headshot deliberately not yet placed.
- 07 Work: thin placeholder rows by design (may fold into Approach later).
- 08 Contact: `ContactIntake.astro` — V1's 4-step conversational form ported React→
  vanilla, reskinned; designed pending/error/success states, aria-live, double-submit
  guard, deep-link prefill; POSTs to existing /api/contact (Slack).
- Nav reordered to match page: Framework · Approach · About · Work · Contact.
- Bug caught live: `.v2-sec { padding: 110px 0 }` zeroed .v2-wrap's horizontal
  padding (shorthand on the same element) — sections lost their left edge. Now
  padding-top/bottom only.

Open: headline workshop; real quotes; real case studies; SLACK_WEBHOOK_URL env needed
in CF for the form to deliver in production (works via /api/contact locally only if
env is set — verify before staging share).

---

# Pass 15 — mobile port shipped + desktop section measure (2026-08-20, late)

Greg approved 08-mobile-plan.md with all four recommendations (numerals, flush-left 60px
rail, 720→768, bottom-sheet panels) on the condition that desktop is untouched.

**Desktop guarantee:** every mobile rule is inside `@media (max-width: 860px)` / `768px`.
Measured at 1440×900 before and after (hero, formed plane, both panels): pixel-identical.
The body-margin reset is scoped to ≤860 for the same reason.

**Shipped (files: v2-tokens.css, SpineNav.astro, HeroFramework.astro, index.astro):**
- Tokens: `--v2-rail: 60px`, `body.v2 { margin: 0 }` at ≤860; `.v2-wrap` padding 16.
- Rail: left 0, top 84, bottom 73 (+safe-area), 36px item boxes, 10px ghost connectors →
  46px stride (V1's exact numbers). Labels hidden, `01–05` numerals shown; active = accent.
  Tracker now walks sections in page order (About sits above Work).
- Hero/plane: pin padding removed; hero and plane use insets 0 inside main's rail padding →
  centred at x=225 on a 390 screen (was 289, off-screen). Plane = column width, 1/1.15.
  Thesis floor 2rem; eyebrow stacks at ≤768; "Tap an axis" on hover:none.
- Panels at ≤860: fixed bottom sheet (rail+16 → 16, max 58dvh, scrollable). Axis still
  slides (y → 16%, x → 12% of the plane). Axis labels get a 44px hit area.
- Foot: LinkedIn 20px glyph, box centred on x=30, 24px off the bottom, 30px divider.
- Sections 02–08 at ≤768: 64px vertical padding, tighter beat grid, stacked work rows.
- **Desktop (Greg's request mid-session):** sections ran full 1440 while hero/plane are a
  ~800px centred composition. New token `--v2-measure: 880px`; `.v2-sec, .v2-ctaband`
  take it as max-width. Measured at 1440: sections 280→1160, plane 342→1098, same centre.

**Verified headless (390×844 touch, 820×1100, 1440×900, 1920×1080)** — screenshots in
the scratch session only; re-run `08-mobile-evidence/measure.mjs` to regenerate.

**Greg's phone checklist (the part headless can't do):**
1. Scroll the morph: no jump when Safari's bar collapses (100dvh).
2. Rail numerals sit left of the logo like V1's icons; nothing scrolls sideways.
3. Tap Strategy / Go-to-market: sheet rises, closes via ×, tap-out, re-tap.
4. LinkedIn clears the home indicator; landscape on a notched phone — rail not under it.
5. Intake form: the 4 steps are usable with the keyboard up.

---

# Pass 16 — sections re-cut in the plane's grammar (2026-08-20, late)

Greg: the new sections "feel disconnected from all the good work" — correct diagnosis:
passes 14's sections were V1's editorial grammar (left rows, bordered cards, boxed
lists) in V2's clothes. Re-cut in the hero/framework's own vocabulary:
- Every section head: centred, mono index above, THE SEAM quoted as a centred glowing
  rule beneath the title.
- Approach: three stations ON a glowing vertical axis (stroke+glow identical to the
  plane's Y axis, arrowhead at the foot, plot-dot nodes) — centred, not rows.
- Quotes: floating, halo-dot above, display-face text — no cards, no borders.
- About: single centred column; stats as coordinate readouts; focus areas as one
  mono line. Side-column grid gone.
- Work rows: plot-dot glow + olive coordLabels (the framework's readout style).
- Class names preserved so pass 15's mobile rules still bind.
Committed together with pass 15 (mobile port) — same files, both Greg-approved.

---

# Pass 17 — About: drawn, not told (2026-08-20)

Greg: still text-heavy in places. Biggest offender was About's 3-paragraph bio.
Replaced with the bio AS A DIAGRAM: a glowing X-axis traverse (the plane's own axis
stroke, arrowhead and node dots) with three waypoints — Go-to-market ops → Embedded
operator → Builder — each carrying a mono label + 3-word descriptor. One line of
prose survives, set large in the display face: "Most operational problems aren't
technology problems. They're design problems." (olive on the payoff). ~120 words of
biography became a one-viewport composition in the site's grammar.

---

# Pass 18 — Lucid grammar + named sections (2026-08-20)

Greg: "I build with boxes, lines, arrows in Lucidchart… charts and frameworks to
represent process and strategy — that's how my brain works." New DESIGN PRINCIPLE
alongside the plane grammar: **flowchart grammar** — diagram primitives in the
site's material (hairline boxes, 2px radius, glass fill; connectors with the axes'
stroke+glow; border-triangle arrowheads; diamond decision nodes).

First application — Approach IS a decision tree, so it's drawn as one:
  ◇ "Something's off" → riser → distribution rail → three arrowed drops →
  [Fix it] [Build it] [Scale it] process boxes → merge rail → single arrow →
  lands on the "Tell me what's going on" terminator pill (CTA band, now bordered
  like a Lucid terminator; #approach bottom padding zeroed so the arrow connects).

Also per Greg: numbered section eyebrows ("02/03/04/05") replaced with NAMES
(Approach/About/Work/Contact); beat numerals dropped (box titles carry the names).

Primitives documented in the CSS comment block for reuse: .fdiamond, .v2-beat box,
.riser/.rail/.fdrop/.drop connectors. Future candidates: case-study rows as
[Problem]→[Built]→[Result] micro-flows; the framework panels' pillar links.

---

# Addendum (post-close, 2026-08-20): peer-session corrections

- **The 880px measure rule** (`.v2-sec, .v2-ctaband { max-width: var(--v2-measure) }`,
  Greg-requested) was accidentally dropped by pass 16's wholesale style-block rewrite —
  the flip side of the "replace whole blocks" lesson: whole-block replaces clobber a
  peer's insertions. Peer restored it with a KEEP comment. **Preserve it.**
- **About is temporarily TWO stacked review variants** (Option A portrait /
  Option B atmosphere, `.v2-about-a`/`.v2-about-b`, assets in `public/images/v2/`),
  replacing the pass-17 journey diagram while Greg sends it to a reviewer. Do NOT
  restore the journey markup until Greg picks; the journey version lives in git
  history (commit b4d320b) if it returns.

---

# Pass 19 — About A/B for review, portrait asset, intake rebuilt (2026-08-20, late)

- **About = two stacked review variants** (Greg is sending to a reviewer): A portrait-left
  (`public/images/v2/portrait-feather.png`), B atmosphere-behind + stacked stats
  (`portrait-atmos.png`). Headline "I build the systems that help businesses run."
  Journey diagram removed from About (recoverable from b4d320b). Delete the loser +
  `.v2-optlabel` spans when decided; `id="about"` is on A.
- **Portrait pipeline** in `v2/build/prototypes/portrait/`: Apple Vision person mask
  (`segment.swift`), 85% colour on the body, neutral-grey halo at 36% with a left→right
  balance, continuous 80px falloff, rounding anchored on the head (crown solid), bottom
  fade. `portrait-options.html` = the 13-variant study Greg chose from.
- **Sections all share `--v2-measure` (880px)** — re-added after a wholesale style
  rewrite dropped it; Work rows and the intake card lost their own narrower caps.
- **Intake rebuilt per Greg:** step 1 auto-advances (no Continue); step 2 needs ≥1;
  step 3 needs ≥40 chars (live counter); step 4 = name*, email*, phone, LinkedIn,
  "best way to reach you" (email/call/text, optional; call/text asks for a phone);
  inputs box-sized inside the card; success state reveals an embedded booking calendar.
  `api/contact.js` now carries phone + LinkedIn to Slack.
- **NEEDS GREG:** `BOOKING_URL` in `ContactIntake.astro` is empty — paste the Google
  Calendar appointment-schedule embed URL (Share → Embed, ends `?gv=true`). Until then
  the calendar block stays hidden and the confirmation copy still shows.
- **Tech debt (Greg's idea):** gate the calendar on an AI read of the message — show
  booking only for substantive submissions. Today the gate is form validation only.
  Sketch: POST the payload to a small endpoint that asks the model for
  `{qualified: bool, reason}`; render the calendar on `qualified`. Needs an API key in CF
  env and a fallback that shows the calendar if the call fails.

---

# Pass 19 — page reorder (Greg, 2026-08-20 late)

New narrative order: Hero → Framework → **About** (both A/B review variants, moved up)
→ **Proof** (logos marquee only — quote placeholders HIDDEN in a comment wrapper until
real quotes exist) → Approach (flowchart) → CTA band (still the flow's terminator) →
Selected work → Contact. Logic: who → what → the person → proof attached to the person
→ how we'd work → examples → act.

Nav reordered to match. Contact section + ContactIntake.astro deliberately untouched —
another editor is working the form live. (Also fixed self-inflicted: a regex edit
flattened SpineNav's items array onto its comment line, which blanked the entire nav;
rebuilt cleanly.)

---

# Pass 20 — vertical rhythm tightened (Greg)

Section padding 120→72px across the board ("drive people through the page"), plus:
proof hugs About (padding-top 20px) so the brands label enters the viewport while
About is still on screen; the stacked A/B review variants share one section's worth
of air (28/28+32) instead of two. Verified: About + "Brands I've worked with" co-visible
in one viewport. Note: with both A/B variants stacked the About area is temporarily
double-height — rhythm will tighten further automatically when the losing variant is
deleted after review.

# Pass 20 — intake: work-email gate, Claude qualification, LinkedIn reach (2026-08-20)

- Step legends lose their numerals (the step strip already numbers them); step 1 card
  collapses to its content (nav row hidden, no fieldset floor, empty status hidden).
- "Best way to reach you" gains LinkedIn (asks for the URL if chosen).
- **Work email required.** `src/lib/free-email-domains.js` (shared list, registrable-label
  match) blocks gmail/yahoo/outlook/icloud/etc. client-side; `/api/contact` re-checks
  when `source:"v2"` → 422. V1's form is untouched. Trade-off: solo operators on gmail
  are blocked — flip by removing the two `isFreeEmail` checks.
- **`/api/qualify`** (new, OpenAI `gpt-5-mini` via fetch, HMAC-gated): asks
  whether the submission is a genuine request for Greg's services → `{qualified, reason}`.
  The form calls it after `/api/contact` succeeds; calendar shows only on `true`.
  Fails closed (no key / error / refusal → thank-you only).
- **NEEDS GREG:** (1) `OPENAI_API_KEY` + `QUALIFY_SECRET` — Cloudflare Pages → Settings → Environment
  variables (Production + Preview); locally `.dev.vars` at repo root (now gitignored).
  (2) The booking embed: paste the iframe `src` into `BOOKING_URL` in
  `ContactIntake.astro` (or hand me the embed code and I'll wire it).

# Pass 21 — qualification live on OpenAI, booking wired (2026-08-20, late)

- `/api/qualify` switched to OpenAI (`gpt-5-nano`, `reasoning_effort: minimal`, JSON mode,
  600-token cap — the first run returned empty content because nano spent a 120-token cap
  on reasoning). Checks name / work-email / message; all three must pass.
- **Protection:** HMAC proof-of-submission token (`src/lib/qualify-token.js`) issued by
  `/api/contact` after a Slack post, 5-min TTL, bound to the email; `/api/qualify` → 401
  without it. Body cap 16KB, message cap 4,000 chars, 12s timeout, fails closed.
- **Tested** (`scripts/qualify-test.mjs`): 6/6 correct — two real requests qualified, SEO
  pitch / gibberish / printer support / recruiter rejected; no-token and forged-token → 401.
  ~1–2s per call. Watch item: the name check is a touch eager ("could be a placeholder")
  — harmless so far because those samples also fail on message.
- Booking URL (Greg's Google appointment schedule) is in `ContactIntake.astro`; shows
  beneath the confirmation only on `qualified: true`.
- Local secrets in `.env` (gitignored). Cloudflare needs: OPENAI_API_KEY, QUALIFY_SECRET,
  SLACK_WEBHOOK_URL, optional OPENAI_MODEL.

---

# Pass 21 — horizontal-scroll audit, all breakpoints (2026-08-20)

Method: same-origin iframe probes of /v2 at 340/390/400/480/560/640/720/861/1024px,
measuring scrollWidth overflow and walking each overflowing element's ancestor chain
for the un-clipped culprit. Three found, three fixed:
1. `.v2-atmos` (Option B portrait, fixed 793px) — clipped via `.v2-about-b{overflow:hidden}`
2. `.v2-portrait img` (Option A, 560-696px, max-width:none + negative margins) —
   same clip on `.v2-about-a`
3. `.v2-beats` flowchart grid — stayed 3-across on phones (mobile pass predates the
   flowchart). New ≤768 rule appended AFTER the peer's mobile blocks: boxes stack,
   rails/per-box drops hide, diamond → riser → stack → merge arrow survives vertically.
Verified 0px overflow at every probed width. (If the reviewer keeps a portrait variant,
consider responsive image sizing instead of clipping as the finish-work.)
