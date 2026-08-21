# Logo Animation — Motion Study 02 (the real lockup)

**Date:** 2026-08-20
**Brief (Greg):** Keep the GT icon and the GT Strategies lockup exactly as they are. Animate
"Greg Toler" with the logo's G and T still connected by the top line, stretching over both
words — then either (A) the name shrinks down over "Greg" while the bar stays out over the
right, or (B) the whole thing collapses and the G and T come together. "Strategies" has to
arrive as part of the same move. Add glow / light-shine. Stay on brand.

**Status:** v3 of the prototype after Greg's second review (same day). Both variants, day + night,
plus MP4 renders. Awaiting Greg's pick.

**Greg's review of v1 → what changed:** (1) entrance should *unravel* — the G starts at its inner
hook, sweeps round to the top, and the line slides all the way over, the T dropping as it crosses
→ rebuilt as a single stroke along the mark's centreline. (2) The G and "oler" didn't close
smoothly / together → the per-letter staggered fold is gone; one ease-in-out drives every piece.
(3) "oler" → Strategies read as a crossover that was "close but not quite" → now a true in-place
crossover: "oler" shrinks and lifts toward Strategies' size and baseline while Strategies grows in
from the same anchor, on the same curve.

**Greg's review of v2 → what changed (geometry, not effects):** v2 had real defects I missed
because I was checking downscaled contact sheets: a bite out of the G's inner edge, a step on
the bar, a floating sliver at the sweep front, and squashed letters during the close. Causes and
fixes: the unravel mask's centreline was measured wrong (left stroke at x=58; real stroke is
46–83, centre 64) → re-measured every stroke centre from the 4× raster, mask stroke 70 wide; the
stretched bar slice magnified the trace's edge wobble → the middle is now two exact rectangles
(the bar is genuinely 37→64 thick left of the stem and 37→62 right of it) under the real G and
tip slices; the stem slice carries 4 units of bar and was dropping before the line reached it
→ it now drops only after the front has crossed it; letters no longer scale — they travel into
the G/T and fade. Verified at 4× zoom on the corner, at 900px and 1280px viewports, and on
16 mid-motion frames at full size. Glow dialled down (Greg: function over light effects).

## What's in the box

| Thing | Where |
|---|---|
| Interactive prototype (A/B switch, scrub, loop, day/night) | `prototypes/motion-study-02-logo.html` |
| Layered vector lockup — the asset 003 said we didn't have | `prototypes/assets/gt-lockup-layered.svg` |
| MP4 renders, 1920×1080 @ 60fps, ~6.8s | `prototypes/renders/gt-lockup-{A,B}-{dark,light}.mp4` |

## The two variants

**Entrance (both).** The mark is one line, and the animation treats it as one: the stroke
starts at the G's inner hook, runs down the stub, along the bottom, up the left side, across
the top, and keeps sweeping right over the name. The stem drops the moment the front crosses it;
each letter rises in the sweep's wake; a spark rides the front. Distance-based, so the speed is
constant along the line (ease-in-out over the whole run).

**A · Crossover.** The name closes into the mark as one object — "reg" compresses into the G
while the T carries "oler" home, bar following, all on one curve. Then "oler" *becomes*
Strategies in place under the bar tip (shrinks + lifts to Strategies' size and baseline while
Strategies grows in from the same anchor).

**B · Collapse.** Both words compress into the mark at once (same single curve), the T slides
to the G, and the bar contracts *past* its resting length to just beyond the stem. Then Strategies **slides out
from behind the stem** and the bar reaches back out to its lockup length — a small breath in
and out that lands on the lockup.

Shared: an olive halo (brand accent = emitted light) swells as the
mark locks and fades as Strategies settles; a skewed specular sheen sweeps the finished
lockup, masked to the ink so it reads as light on the letterforms, not a bar across the
screen; film grain overlay (same as the site, `feTurbulence`, no image payload).

My recommendation: **A**. It is the only one where the bar does the thing Greg described
("stretches out over Toler and shrinks over Greg"), and the oler→Strategies swap under the
same tip is the moment that makes the name and the company read as one object. B is the
stronger *loop* (the breath in/out is nice on repeat) — keep it for a looping ident / favicon
hover if wanted.

## How it stays on brand (nothing redrawn)

003 parked the first study because it animated *live type*, not the real mark, and said the
fix — decomposing the mark into G / bar / stem — was "real vector work." It turned out not to
be, because of a different approach:

1. **Traced the real `public/logo.png` at 4×** (Lanczos upscale → threshold → potrace, `-t 3
   -O 0.25 -a 1.2`). Mark and wordmark traced separately by masking (mark = `x < 352 OR
   y < 85` in logo px; wordmark = the rest). Overlay check against the PNG: aligned. This
   is NOT the old `favicon.svg` trace, which START-HERE notes is broken.
2. **Did not split the path.** Instead the one mark path is drawn four times through
   clip rectangles (logo units, 823×249):
   - G body — `x<130` ∪ `130≤x<280, y≥62`
   - bar-mid — `130≤x<400, y<62` → the stretch: `scaleX` about `x=130`
   - bar-tip — `400≤x<500, y<62` → the taper; translates by `270·(sx−1)`
   - stem — `280≤x<330, y≥62`
   The bar's real end caps (the G's top-left curve and the swept taper) are untouched; only
   the straight middle stretches. 9-slice, on a logo. Slices overlap by 2 units so there are no
   anti-aliasing seams.
   The unravel is a `<mask>`: a 64-unit-wide stroke along the hand-measured centreline
   (`M152 132 H232 Q252 132 252 152 V172 Q252 190 232 190 H92 Q58 190 58 156 V83 Q58 49 92 49 H…`)
   with `stroke-dasharray` revealing the real mark underneath. The mark is never redrawn.
3. **Wordmark face identified as Lato 400** (specimen sheet vs. the PNG — the single-storey
   g, the t, the S). "reg" and "oler" are set in Lato at 162 logo units, baseline on the
   mark's baseline (y=204), advances measured from the live font so letter positions are
   real. "Strategies" itself stays the traced vector of the actual wordmark.
4. Colours are the V2 tokens (`src/styles/v2-tokens.css`): charcoal `#17181A` / ink
   `#D8DADC` / olive light `#8A9166`; day `#E8E8E6` / `#1B1C1E`. The accent is used only for
   emitted light (halo, sheen edge, spark), never as a fill — per `03-anti-ai-tells.md`.

### One gotcha worth recording

`clip-path` on the same element as `transform` is resolved in the element's *local*
(post-transform) space. With the potrace `scale(0.1,-0.1)` transform on the path, clip rects
in logo units selected nothing. Fix: clip on a wrapper `<g>`, transform on the inner path.

### Implementation notes

- Everything animated lives once in `<defs><g id="shapes">`; the ink layer, the blurred halo
  layer, and the sheen's `<mask>` all `<use>` it, so one set of JS transforms drives all three.
- Render is a pure function of `p ∈ [0,1]` (`window.__gt.render(p)`). That is what makes
  scrubbing, looping, reduced-motion (jump to `p=1`) and frame-exact video export trivial.
- Export: `?export=1` hides the chrome; `frames.js` (puppeteer-core + system Chrome) steps
  `p` at 60fps and screenshots; ffmpeg → h264. ~400 frames per render.
- Reduced motion honoured; focus states on controls; tokens follow the three-state theme
  pattern (bare `:root` = day, `prefers-color-scheme` guarded by `:not([data-theme=light])`,
  explicit stamp wins).

## Research used

- Remotion skill rules (`timing`, `text-animations`, `light-leaks`, `transitions`) for the
  easing vocabulary — ease-out-expo for the draw, ease-in-out cubic for the fold, `sin(πt)`
  envelopes for glow/sheen — and for the frame-function approach. Did **not** build this in
  Remotion: a DOM/SVG prototype with a `p`-driven render gives the same frame-exactness, runs
  in the site with zero dependencies, and exports to video the same way. If we want audio,
  captions, or a longer reel, the render function ports to a Remotion composition 1:1.
- `04-logo-and-motion.md` (the "T is a cross" observation) — still true; this study does not
  use it, but the layered SVG now makes the quadrant-unfold idea buildable too.

## Where this could go (not built)

- **Site loader / hero ident** — variant A at 60% speed, once per session, reduced-motion
  falls back to the static lockup.
- **Looping ident** for video intros / LinkedIn — variant B with `loop` on.
- **Favicon hover** — the B "breath" at 1.5s on the nav mark.
- Sound — a single soft tick when the mark locks. Out of scope; Remotion path if wanted.

## Open for Greg

1. A or B? (Or A for the site, B for the loop.)
2. Letter size for the name — currently ascenders sit 15 units under the bar, deliberately
   tight so the bar reads as "over" the words. Could go smaller.
3. Glow intensity — currently peaks ~0.9 opacity on night, ~0.55 on day. Easy dial.
