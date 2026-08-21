# 11 — Flow motion research (Approach + Work)

**Date:** 2026-08-20 · **Trigger:** Greg: "I've seen better versions of this on other
websites… moving workflows… not like I just designed it in Claude."

## What the reference sites actually do

| Site | Motion | Verdict for us |
|---|---|---|
| seunghyuk.com (#1) | One diagram that **builds itself with scroll**. Lenis smooth-scroll + Motion; `lerp` on scroll position; `strokeDashoffset` draws. Never "plays once" — it follows the wheel with inertia. | The feel to copy: scroll-linked + smoothed, not entry-triggered |
| fplus.ai (#2) | three.js particle constellation, GSAP. Atmosphere, not diagram. | Already echoed by the backdrop |
| nicoborja.com (#3) | 3D nebula map of projects. | Section 03 (Work) long-term idea |
| gionatannese.com (#7) | WebGL/3D design portfolio, 11 `.webm` loops. **No workflow diagrams**; blocks headless render. | Not the one Greg remembers |

Greg's "moving workflows" memory matches the SaaS pattern family, not these eight:
**Magic UI "Animated Beam"** (bezier path between two DOM elements, travelling gradient
beam, `curvature` prop), **Aceternity "Tracing Beam"** (scroll-linked beam down a page
rail with a glowing head), and a cluster on 21st.dev ("AI Agent Pipeline", "Trigger to
Action", "Circuit Board", "Routing Indicator"). 21st.dev pages don't expose source to a
fetch, but the recipe is consistent:

1. **Curved bezier connectors**, not right-angle elbows. Computed from real element boxes.
2. A **short bright segment travelling the path** with a blurred halo (comet), base path
   very faint. Loops, staggered per connector.
3. **Glass node tiles with line icons** at the ends of connectors — the icon is the node.
4. Restraint: 1px base strokes at ~.35 opacity; the beam is the only bright thing.
5. Scroll-linked build with inertia (seunghyuk) reads "designed"; a one-shot entry
   animation reads "component".

## Why not import a 21st.dev / Magic UI component

They are React + Tailwind + framer-motion. This page has no React islands by design,
its own token CSS, and a perf pass still owed. Porting the *technique* is ~200 lines
of vanilla; porting a component drags in ~120KB of runtime to then fight its styling.

## What was built (pass 22)

- `index.astro` Approach: entry node (diamond glyph) → three cards with icon nodes
  (wrench / blocks / growth) → exit node (arrow, links to contact). Connectors are
  cubic beziers built at runtime in an SVG overlay; **draw is driven by scroll
  progress through the section, lerp-smoothed (0.11/frame)**; cards rise as their
  connector arrives (`--p` per card); when the draw completes, **comets** (core 1.4px +
  5px blurred halo, dash-based, per-path duration from length) loop on each route.
  Phone: entry top-left, curves sweep down-and-right into each card, exit below.
- Work: a **tracing beam** down the plot-dot column, lit length and head follow scroll
  with inertia; rows and dots light as the head passes; hover pulses the dot.
- Reduced motion: everything at its finished state, no comets.

## Dials

`index.astro` script: lerp factor (0.11 / 0.12), progress windows per connector
(`a`,`b`), comet length `k` (≤90px), duration `2.6s + len/400`, stagger `0.55s`.
CSS: base opacity `.38`, halo peak `.45`.
