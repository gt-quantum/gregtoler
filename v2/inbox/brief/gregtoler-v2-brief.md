# gregtoler.com V2 — Design and Build Brief

## What this is

This is the direction brief for V2 of gregtoler.com, the personal and GT Strategies brand site.

It is a **starting point and a direction, not a spec and not a replica to copy**. Two prototype files (`gt-strategies-v01.html` and `gt-strategies-v02.html`) sit alongside this brief. Treat them as creative inspiration and mechanics to react against, not as pixel targets. The job of the real build is to **up-level past them**, not reproduce them.

This is a reengineer and redesign of the existing site, not a teardown. The old build stays in the folder as V1 and will be replaced once V2 is ready. We keep what works, replace what does not, and raise the craft ceiling across the board.

## Do not use default AI design instincts

This matters more than anything else in the brief. The current site already reads as generic "AI app design," and that is the core problem we are fixing.

Avoid the design clusters that every AI-generated site defaults to:
- Cream or off-white background with a high-contrast serif and a terracotta or clay accent. The clay accent near #D97757 is a particularly common tell.
- Near-black background with a single bright acid-green or vermilion accent.
- Broadsheet or newspaper layout with hairline rules and dense columns.

Every color and type decision should derive from this brief's own direction (warm dark schematic, engineering meets design), not from a template. Spend boldness in one place, the quadrant, and keep everything around it quiet and disciplined.

## Who the site is for

Primarily people checking Greg out before a call or before hiring him. Operations and go-to-market leaders at companies bringing him in as a contractor, plus founders, operators, and VCs looking for support.

This is a credibility and trust page, not a lead-gen funnel. Most visitors already know the name. The site's job is to make them feel "this person gets it, thinks differently, I trust them" before they read a word of detail. Feeling first, explanation second.

## The positioning (the heart of the site)

Greg sits at a rare intersection of strategy and execution. Most operators are either top-down thinkers who hand off the work, or bottom-up builders who need direction. He diagnoses the problem at the strategic level and then builds the fix himself.

Expressed as a plane:
- Y axis: Strategy (top) to Execution (bottom)
- X axis: Go-to-market (left) to Operations (right)

He flexes up and down and across. He came up in go-to-market, then moved horizontally into the operational and BizOps layer underneath it. That GTM plus BizOps range is a strength and proof of the positioning, not a problem to hide. Wide horizontally because deep vertically.

The problem the site solves: people try to box him into a category they already know (RevOps hire, fractional COO). V2 needs to communicate the full range in a way that is consistent, distinctive, and easy to consume, without a wall of text.

## The signature element

The interactive quadrant is the centerpiece and it is custom-built, never pulled off a component shelf.

Target behavior, drawn from the V02 prototype:
- A scroll-choreographed reveal. A single centered line under the hero stretches wide into the X axis, the Y axis grows out of the center to form the cross, a dotted grid blooms outward from the middle, and pop-ups appear across the plane as it forms, all riding on the moving background. The framework appears to build itself as you scroll.
- Axes are clickable and expand to explain the spectrum (Strategy vs Execution, GTM vs Operations).
- A cursor-proximity light roams the plane and lifts whatever region it is near.
- Case studies are plotted on the quadrant by coordinate, so the work maps back to the framework and closes the loop.

Open refinements for the build: whether pop-ups snap to grid intersections and scatter across all four quadrants like a real plotted scatter of his work, the density of the grid, the aspect ratio and breathing room, and the pacing of the scroll sequence.

## Structure (directional)

1. Hero thesis. The positioning stated plainly, the lean-in moment.
2. 01 Framework. The interactive quadrant.
3. 02 Approach. Fix, Build, Scale as a three-beat sequence, not boxes.
4. 03 Work. Case studies plotted on the same map, CMS-driven.
5. About and contact. Restrained CTA.

## Design language (directional)

The concept is a warm dark schematic. An architect's drafting table at night, not a SaaS landing page. It should read as the intersection of engineering, architecture, process, and frameworks with real design and interactivity.

Palette direction: warm near-black base, warm charcoal surfaces, warm hairline lines, a parchment off-white for ink, a muted taupe for secondary text, and amber used strictly as emitted light, a lamp, never as a decorative gold fill. Greg does not want a gold-forward look. The amber is luminance only.

Type direction, by role rather than by exact family (families are swappable, the role split is the concept):
- A characterful serif for the human and positioning moments.
- A mono for coordinates, numbers, labels, and anything that should carry an engineering signal.
- A clean grotesque for body copy.

Motion: the orchestrated scroll reveal is the one big moment. Everything else stays as restrained micro-interaction. Avoid scattered effects that make it feel AI-generated.

Numbered structure (01, 02, 03) is used because the content genuinely is a sequence.

## What to keep from V1

- The layered moving background. The waves read as stacking systems that move together, which is good positioning.
- Day and night mode.
- The interactive, mini-application feel.
- The GT Strategies wordmark and brand identity.
- The core copy and positioning, which is strong. "Fix what's broken, build what's missing, scale what works" stays.

## What to fix or kill

- The boxy flexi-modal card grid. This is the main thing that makes the site feel stiff, dated, and generic. Replace it with the type-forward, motion-driven approach above.
- The text-heavy, stiff feel throughout.
- Open question: keep the sidebar nav or replace it with a numbered top nav. The sidebar has a nice flex feel but may undermine the content. Decide during the build.

## Engineering requirements (equal weight to design)

Design and framing impact are not the only bar. V2 has to be technically strong.

**SEO**
- Semantic HTML and a proper heading hierarchy.
- Complete meta and Open Graph tags, plus structured data (Person and ProfessionalService schema).
- The heavy interactive quadrant must not hide the core positioning text from crawlers. Server-render the meaningful content so it is indexable even though the experience is interactive.
- Descriptive title and meta description, real alt text.

**Loading and performance**
- The scroll animation and any canvas or WebGL must stay smooth and must not tank load time.
- Server-side render or statically generate the content. Lazy-load below-the-fold work.
- Optimize fonts (subset, preload, font-display swap) and images.
- Keep JS lean. Prefer vanilla where a library is not earning its weight.
- Target strong Core Web Vitals (LCP, CLS, INP).
- Progressive enhancement: the positioning and content stay readable even if the animation or JS fails.

**Functionality and accessibility**
- Day/night preference persists.
- Mobile: the quadrant collapses gracefully, tap replaces hover.
- Keyboard navigation, visible focus states, and a reduced-motion fallback are baseline, not extras.
- Working contact and CTA flow.
- A CMS layer for case studies so work can be added without touching code.

## Recommended stack

Next.js plus Tailwind plus shadcn/ui. This serves SEO and performance through SSR/SSG, and lets commodity parts (nav, footer, forms, marquee) be pulled from a component library such as 21st.dev and then hard-reskinned to these tokens. The quadrant is custom-built. A CMS or MDX layer handles case studies.

Rule for any pulled component: use it for structure, then fully reskin it to this brief. Off-the-shelf components ship with a default look that will drag the site back toward generic if left as-is.

## Content status

Not a constraint. Greg has case studies and examples across all four quadrants ready to go: RevOps strategy and execution, products, apps, and workflows built, GTM strategy and execution, onboarding systems, integrations, and agents.

## How to treat the prototypes

`gt-strategies-v01.html` shows the static interactive quadrant and the core aesthetic. `gt-strategies-v02.html` shows the scroll-morph sequence. Study the mechanics and the feeling. Do not copy either one pixel for pixel. The real build should exceed them in craft, polish, and performance.
