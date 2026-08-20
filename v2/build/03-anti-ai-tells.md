# Anti-AI-Tells Checklist

**Date:** 2026-08-20
**Why this exists:** Greg's #1 constraint. The current site "reads as generic AI app design"
and that is the core problem V2 fixes. This is the working checklist — the things that make
a site obviously machine-made, and the things machines reliably forget.

Sources at the bottom. Greg's framing: *"Claude-designed apps tend to forget skeleton
loaders, so it's obvious."* That specific example is app-shaped, but the **category** is
exactly right and it generalizes to marketing sites. The category is:
**AI builds the happy path and skips every other state.**

---

## Part 1 — The presence tells (things that scream AI when present)

### Color
- [ ] **No purple-to-blue gradient.** The single most cited tell. Anywhere: hero, CTA, background.
- [ ] **No gradient-filled headline text.** (senthora.ai does this — it is why that reference reads most conventional.)
- [ ] **No glassmorphism / frosted-glass cards.** Second most cited tell.
- [ ] **No floating blurred gradient orbs** as background decoration.
- [ ] Color must be **semantic, not decorative**. Amber = emitted light = signal. It never becomes a fill because a section looked empty.

### Type
- [ ] **No Inter.** The default-typeface tell.
- [ ] **No Instrument Serif** — current-generation equivalent, already flagged in `01-reference-review.md`.
- [ ] Not picked from the first screen of Google Fonts. See `02-type-candidates.md`.
- [ ] Real hierarchy: display / body / mono doing genuinely different jobs, not three sizes of one face.

### Layout
- [ ] **No uniform border radius everywhere.** The literal tell is `16px` on every element. Mockup uses `--radius: 2px`, which is already a deliberate choice — keep that discipline.
- [ ] **No identical padding on everything** (`24px` is the named tell).
- [ ] **No three-column feature card grid.** This is V1's "boxy flexi-modal card grid" — already slated for death in the brief.
- [ ] **No bento grid.** (yashahire.info, ranked #6, uses one — note Greg ranked the restrained sites higher.)
- [ ] **No equal-height card row** where content is forced to match.
- [ ] Density should **vary deliberately** across the page. AI output has one rhythm from top to bottom.
- [ ] **No eyebrow label above every single section.** Named tell: "stacked like receipts." The mockup uses `01 / 02 / 03` numbering, which is justified *because the content is genuinely a sequence* — the brief says so explicitly. That is the bar: a label must earn its place.

### Imagery
- [ ] No stock photos of diverse groups around a laptop.
- [ ] No AI-generated illustration with that smooth plastic quality.
- [ ] No fake logo bar. **The V1 audit already flagged this** — eight brands, no story attached to any.

### Copy
- [ ] **No em-dash overuse.** LLMs overuse them to a comical degree. Greg's real copy should be audited for this specifically.
- [ ] None of: "Build the future of work," "Your all-in-one platform," "Scale without limits," "Empowering teams to build better products," "best-in-class," "cutting-edge."
- [ ] No hedging ("may help you," "can potentially").
- [ ] The brief says V1's core copy is strong and stays. **Good — real copy is the strongest anti-AI signal there is.**

---

## Part 2 — The absence tells (Greg's actual point)

Research finding, NNGroup analysis of 50 AI-generated dashboards:
**92% had no empty state. 78% had no error state. 100% used a generic spinner instead of a
real loading state.**

AI assumes data exists, the network is fast, and nothing fails. On a marketing site the
equivalent off-happy-path states are:

### Form states (the contact flow — the one interactive thing that matters)
- [ ] Submit button has a **pending state**. Not a spinner — a real state with the button disabled and label changed.
- [ ] **Validation errors** are designed, inline, and specific. Not a red border and nothing else.
- [ ] **Submission failure** state. Network died, Formspree is down. What does the user see?
- [ ] **Success** state that is designed, not an alert.
- [ ] Errors are announced to screen readers (`aria-live`), not just colored.
- [ ] Double-submit is prevented.

### Font loading
- [ ] `font-display: swap` **plus** a fallback with adjusted metrics (`size-adjust`, `ascent-override`) so the swap doesn't shift layout. AI ships `swap` and calls it done — the resulting reflow is itself a tell.
- [ ] Self-hosted, preloaded, subset. (Copy seunghyuk.com's pattern.)

### The quadrant's own states
- [ ] **What does it look like before JS runs?** Progressive enhancement is a brief requirement.
- [ ] `prefers-reduced-motion` → static final state. The V02 mockup already does this correctly — keep it.
- [ ] Canvas paused when off-screen and on tab blur. **The mockup does NOT do this** — flagged in `00-intake-review.md`.
- [ ] Touch: hover has no meaning. Tap must replace it.
- [ ] What happens on a 320px-wide screen?
- [ ] What happens if a case study has no coordinate?

### Focus and keyboard
- [ ] **Visible focus rings on everything interactive.** The single most common accessibility miss. `:focus-visible`, not a removed outline.
- [ ] Logical tab order through the quadrant's clickable axes.
- [ ] Skip-to-content link.
- [ ] The axis drawers are keyboard-operable, not mouse-only.

### Page-level states
- [ ] A designed **404**. AI never builds one.
- [ ] Images have explicit `width`/`height` → no CLS.
- [ ] `::selection` styled to the palette. Tiny, and almost nobody does it.
- [ ] Scroll position restoration on back-navigation from a case study.
- [ ] Print stylesheet — a prospect may well print the About page.
- [ ] Real favicon set and a real OG image. (V1 audit flagged missing share metadata.)

---

## Part 3 — The craft signals AI doesn't add

Presence and absence tells are about avoiding negatives. These are the positives that read
as "a person made deliberate decisions here."

- [ ] **Grain / noise texture** on the base surface. seunghyuk.com does this and it does enormous work. Cheap: one tiled PNG or an SVG `feTurbulence`.
- [ ] **`text-wrap: balance`** on headlines, `text-wrap: pretty` on body. Kills orphans. Almost nobody does it; it reads as typeset rather than dumped.
- [ ] **Optical alignment**, not mathematical — a large quote mark or icon hung slightly into the margin.
- [ ] **Deliberate asymmetry.** AI centers everything.
- [ ] **Varied easing and duration.** AI gives every transition the same `0.3s ease`. Different elements should move with different weight.
- [ ] **Micro-copy with a voice.** The mockup's "Send me the situation in a few sentences" is good — specific, human, not "Get in touch."
- [ ] **Non-round numbers.** Real metrics are `$847K` and `11 weeks`, never `$1M` and `3 months`. (Blocked on real case studies — see `002`.)
- [ ] **Two-tier information density** on the quadrant — capability nodes loud, personality nodes quiet. Stolen from seunghyuk.
- [ ] **A custom cursor treatment** on the quadrant. seunghyuk ships SVG data-URI cursors.
- [ ] **Hover states that ease rather than snap**, and that actually exist on every interactive element.

---

## Part 4 — Prompting rule for this project

The named cause of generic output is a vague prompt: a vague prompt produces a generic page,
a specific structured one produces something that looks design-team-built.

Practical rule for the build: **never ask for "a hero section."** Ask for a specific
composition with named constraints, tokens, and the anti-tells above already excluded. Any
component pulled from a library (`shadcn`, HyperUI) gets **fully reskinned to these tokens
before it ships** — the brief's rule, and the reason pulled components drag a site back
toward generic.

---

## Sources

- [925 Studios — AI Slop Web Design Guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [Vibe Coder — Empty, Loading, Error States: The UX AI Forgets](https://blog.vibecoder.me/empty-states-loading-states-error-states)
- [UX Planet — How To Spot AI-Generated Design](https://uxplanet.org/how-to-spot-ai-generated-design-697aaabe76c8)
- [Originality.AI — How to Identify AI-Generated Websites](https://originality.ai/blog/how-to-identify-ai-generated-websites)
- [Accessibility.build — Accessible Loading, Empty, Success, Error States](https://accessibility.build/blog/accessible-loading-empty-error-states)
- [Sikora — Top 10 Signs a Website Was Built by AI](https://sikora.software/blog/ai-website-design)
- [Benzatine — 3 Telltale Signs You Used AI To Make Your App](https://benzatine.com/news-room/spotting-ai-crafted-apps-3-key-indicators-of-inadequate-design)
