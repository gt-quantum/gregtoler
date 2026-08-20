# Logo, Mark, and Motion

**Date:** 2026-08-20
**Constraint:** No paid assets. Free/self-hosted, or we build it. Nothing off the table
on approach.

## What we already have

| Asset | Location | Notes |
|---|---|---|
| Full lockup (raster) | `public/logo.png` | 823×249 PNG. "GT" ligature + "Strategies" in a light grotesk. |
| **GT mark as vector** | `public/favicon.svg` | **A single continuous SVG path.** Theme-aware via `prefers-color-scheme`. |
| Brand logos | `public/images/brands/` | Client/employer marks — separate concern, and the V1 audit flagged the logo bar as proof-free. |
| Headshots | `images/profile image/` | Raw + extended. |

The brief says the wordmark and brand identity **stay**. Good — and we are not starting from
nothing, because the mark already exists as clean vector geometry we can manipulate.

## The observation worth acting on

Look at what the GT mark actually is: a heavy rounded **G** with a **T** whose crossbar
extends across the top and whose stem drops through the center.

**The T is a cross. A horizontal axis and a vertical axis meeting at a center point.**

Now read the brief's description of the signature scroll mechanic:

> A single centered line under the hero stretches wide into the X axis, the Y axis grows
> out of the center to form the cross, a dotted grid blooms outward from the middle...

That is the T. The framework's core gesture is already sitting inside the logo.

### The idea

**The logo unfolds into the quadrant.** One continuous gesture, used as both the load
sequence and the scroll reveal:

1. Page opens on the GT mark, centered, small. It is the loading state.
2. The **T crossbar detaches and stretches** left and right → becomes the X axis.
3. The **T stem extends** up and down → becomes the Y axis.
4. The **G unwinds** — it is a spiral/arc form — and its curve resolves into the dotted grid
   blooming outward, or into the axis-label arcs.
5. Nodes bloom. The plane is live.

Reverse it for the footer, or for navigation transitions.

**Why this is worth the effort:**
- It makes the logo *mean* something instead of sitting in a corner. The identity and the
  positioning framework become the same object.
- It solves the loading state, the hero, and the framework reveal with **one** asset.
- It is unambiguously custom. No library produces this. It is the opposite of an AI tell.
- It is cheap: one SVG path, `stroke-dasharray` / `transform` / path morphing. No WebGL,
  no 3D, no payload. Directly serves the perf bar.
- It gives day/night and reduced-motion honest fallbacks — the static end state is just
  the quadrant.

### What it needs
- The mark decomposed into separately addressable paths (G, T-bar, T-stem) rather than the
  current single merged path. That is vector cleanup, doable by hand.
- Care that the "logo" reads as the logo before it deforms.

## Techniques on the table (all free)

| Technique | Use | Cost |
|---|---|---|
| `stroke-dasharray` / `dashoffset` draw-on | Mark drawing itself in | Trivial |
| SVG path morphing | G → grid, T → axes | Low; hand-authored keyframes |
| CSS transforms on split paths | The unfold | Trivial |
| SVG `feTurbulence` | Grain overlay (see `03-anti-ai-tells.md`) | Trivial, no image payload |
| Canvas 2D | Contour background (already in mockup) | Low — but must pause off-screen |
| View Transitions API | Page-to-page continuity, Astro has native support | Low |
| Variable font axis animation | Display face flexing on interaction | Free if the face is variable (Bricolage, Anybody) |

**Explicitly not on the table:** WebGL/Three.js for the sake of it. `daoism.systems` — Greg's
own #4 reference — took over a minute to reach 45% loaded. That is the failure mode the
brief refuses.

## Logo redesign — recommendation: don't

The brief says keep the wordmark and identity. I agree, and the unfold idea is a stronger
reason to keep it than to change it: **the existing mark already contains the framework's
central gesture.** Redrawing it would throw that away.

What *is* worth doing:
- Clean up / redraw the mark as **proper layered vector** (currently one merged traced path).
- Decide the "Strategies" wordmark's face — it currently reads as a generic light grotesk and
  should be set in whatever display or body face V2 lands on.
- Build a **mono-set lockup** variant for small/UI use, matching the mockup's
  `Greg Toler` + `GT STRATEGIES` header treatment.

## Skills / tooling available if we want them

Available in this environment, all usable at no cost to Greg:
- `anthropics-frontend-design` / `frontend-design` — production frontend craft
- `ui-ux-pro-max`, `design-toolkit` — design orchestration
- `dataviz` — relevant to plotting case studies on a coordinate plane
- `remotion` — React video, if a motion study or a shareable demo reel is ever wanted
- `nano-banana-2-skill` — image generation (costs credits; probably not needed here)

Recommend `frontend-design` + `dataviz` when we build the quadrant prototype. Skip image
generation entirely — this identity is vector and typographic, not illustrative.

## Open

- Approve the **logo-unfolds-into-quadrant** concept before I prototype it?
- Redraw the mark as layered vector — I can do this, needs your eye on the result.
