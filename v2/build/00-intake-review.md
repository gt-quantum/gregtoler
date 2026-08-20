# V2 Intake Review

**Date:** 2026-08-20
**Inputs reviewed:** `inbox/brief/gregtoler-v2-brief.md`, `inbox/mockups/gt-strategies-v02.html`
**Also read:** `../documentation/2026-08-11-site-audit.md`, `../documentation/DESIGN_SYSTEM.md`, `src/content/config.ts`
**Missing:** `gt-strategies-v01.html` (referenced in brief, not dropped)

Nothing here is a decision. This is a read on the inputs and the open questions
that gate the build.

---

## What's strong

**The positioning is the real asset.** The strategy/execution × GTM/operations plane is
a genuine differentiator and it solves a stated business problem (people boxing Greg into
RevOps hire or fractional COO). It is also *structurally* good: it gives the site a spine,
gives case studies a coordinate system, and gives the nav a logic. Most personal sites have
a look. This one has an argument.

**Plotting case studies on the same plane closes the loop.** This is the best idea in the
brief. The framework stops being a diagram and becomes an index. It's also the piece most
at risk from the content problem below.

**The brief correctly identifies the V1 failure.** "Boxy flexi-modal card grid" is the
right diagnosis. The audit independently reached the same place: the shell is distinctive,
the content containers are generic.

**The V02 scroll mechanic is well-built for a prototype.** Single `render()` driven off one
scroll position, rAF-throttled, segment-based easing, honest `prefers-reduced-motion`
static-final-state fallback. Whoever built it understood the assignment.

---

## Tensions to resolve

### 1. The stack recommendation fights the requirements (highest-leverage decision)

The brief recommends Next.js + Tailwind + shadcn/ui. The existing site is Astro 5 +
React 19 on Cloudflare, with content collections already defined in `src/content/config.ts`.

Every engineering requirement in the brief argues *for* Astro, not away from it:

| Requirement | Astro | Next.js |
|---|---|---|
| Server-render content for crawlers | Default, zero-JS by default | Yes, but with a JS baseline |
| "Keep JS lean, prefer vanilla" | Islands — ship JS only where used | Ships React runtime regardless |
| Progressive enhancement | Native — HTML works if JS fails | Requires deliberate work |
| CMS for case studies | Content collections, already built | Needs to be added |
| Core Web Vitals | Structurally advantaged | Achievable with care |

The quadrant is custom vanilla JS/canvas — it does not need React. shadcn/ui is a React
component library that the brief itself says must be "hard-reskinned"; that's importing a
dependency in order to fight it. The commodity parts here (nav, footer, form) are small.

**Recommendation: stay on Astro.** Rebuild the site inside this repo rather than starting
a new Next.js project. This preserves the content collections, the deploy pipeline, and the
git history, and it is the better-suited tool for the stated bar. Migrating would cost weeks
and buy nothing the brief asks for.

*Counter-argument worth hearing:* if the 21st.dev / shadcn component pipeline is something
Greg wants to lean on heavily across projects, React-first has ecosystem gravity. But the
brief's own reskin rule undercuts that.

### 2. The mockup partially violates the brief's #1 rule

The brief's most emphatic instruction is to avoid default AI design instincts, and it names
the tells: cream background + high-contrast serif + clay/terracotta accent.

The V02 day mode is `#F2ECE0` cream, Instrument Serif headlines, `#B87A1E` amber accent.
That is adjacent to the exact cluster the brief bans. Instrument Serif in particular is
currently one of the strongest AI-design tells in circulation — it is to 2026 what Inter
was to 2022.

Night mode is more defensible: the warm near-black schematic reads as its own idea, and
amber-as-emitted-light is a real concept rather than a palette choice.

**This needs a decision, not a patch.** Options:
- Keep the amber-as-light concept, replace the serif with something less spent
- Commit to night-primary and treat day mode as a genuine second design, not an inversion
- Revisit the accent entirely

The brief says "spend boldness in one place, the quadrant, and keep everything around it
quiet." The type is currently spending boldness too.

### 3. Content integrity is a blocker, and the brief and the audit disagree

The brief says content is "not a constraint" and case studies are "ready to go across all
four quadrants."

The audit (2026-08-11) says the opposite: 5 fabricated case studies, 10 fabricated products
with fake version numbers, 2 fabricated blog posts, 2 gated downloads that don't exist, and
four apps with `videoUrl` pointing at a Rickroll — **live on gregtoler.com right now**.
It also notes zero testimonials and an eight-brand logo bar with no story attached.

Two separate problems:

- **Right now, independent of V2:** fabricated client work is live on a credibility site.
  A prospect who clicks Work → Projects sees invented clients and invented metrics. This
  should come down whether or not V2 ever ships.
- **For V2:** section 03 plots case studies by coordinate. That requires real engagements
  with real coordinates. If "ready to go" means raw material in Greg's head rather than
  written case studies, section 03 is the critical path, not the quadrant.

**Needs from Greg:** does written case study content exist, or is it raw material? How many
are real and nameable? Which quadrant does each land in?

### 4. Performance risk in the signature element

The brief demands strong Core Web Vitals. The mockup has three things in tension with that:

- **340vh pinned scroll stage.** The hero is inside a pinned container with a canvas behind
  it. LCP element is inside an animating layer.
- **The contour canvas never stops.** `requestAnimationFrame` loops forever, redrawing 7
  wave paths across the full viewport regardless of visibility. Battery and INP cost that
  runs the entire session.
- **Mobile.** At 680px the mockup hides the chips and shrinks the plane, but 340vh of
  scroll-jack on a phone is a different experience than on a desktop, and it is untested.

None of these are unsolvable — pause the canvas off-screen and on blur, decouple the LCP
text from the animated layer, define a distinct mobile treatment rather than a squeeze.
But they need to be designed in, not patched later.

### 5. Genuinely open, needs Greg's call

- **Nav:** keep the V1 sidebar spine, or the numbered top nav from the mockup? The brief
  leaves this open. The sidebar is one of the more distinctive things V1 has.
- **Quadrant plotting:** do case study nodes snap to grid intersections and scatter as a
  real plotted dataset, or stay as the mockup's four tidy quadrant labels + chips? The
  scatter is more honest to the "plotted on the same map" idea and more visually alive,
  but it's harder to keep legible.
- **Grid density, aspect ratio, scroll pacing.** All flagged in the brief as open.
- **Day/night:** is day mode a first-class design or a fallback?

---

## Suggested sequence

1. Pull fabricated content off the live V1 site (independent of everything else)
2. Lock the stack decision — Astro vs Next.js
3. Resolve type + palette against the anti-AI-design rule
4. Inventory real case studies and assign coordinates
5. Prototype the quadrant standalone, at the real performance bar, before building around it
6. Build the surrounding sections
7. Cutover plan

The quadrant is the thing most likely to eat unlimited time. Building it standalone first,
against real perf targets, keeps that contained.
