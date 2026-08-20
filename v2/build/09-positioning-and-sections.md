# V2 Positioning & Section Architecture

**Date:** 2026-08-20 · Drafted from: V1 live copy (HomePage/About/Contact/Services
components), SERVICES_FRAMEWORK.md, the V2 brief, and everything built so far.
**Status: PROPOSAL — Greg approves before any section gets built.**

---

## The positioning spine (two claims, layered)

V1 and V2 each hold one half of the story. They are not competing — they stack:

1. **Identity claim** (V2 hero, already built):
   *"I diagnose it at the strategy level, then build the fix myself."*
   WHO he is: the thinker-builder dichotomy. The plane proves it spatially.
2. **Engagement claim** (V1's strongest copy, kept per the brief):
   *"Fix what's broken, build what's missing, scale what works."*
   HOW you hire him. Three doors, matching how clients actually arrive.

The site's narrative arc: **who → what → how → proof → person → act.**
Every section below is one beat of that arc. Nothing else earns a slot.

---

## Mining V1: lines, not paragraphs

Greg's verdict (correct, and the brief agrees): **V1 is way too text-heavy and
verbose.** So the rule for every port below: V1 contributes SENTENCES, never blocks.
If a V2 section needs a paragraph where V1 had five, we compress; if it can be a
line, it's a line. The plane, the panels and the tags carry meaning that V1 spelled
out in prose.

**The gold — V1 lines worth keeping verbatim (little else survives):**
1. *"Most consultants diagnose problems and hand you a deck. I do the work."* — the
   dichotomy in plain speech. Best sentence on the old site.
2. *"Fix what's broken, build what's missing, scale what works."* — the offer in
   nine words. Section 03's whole heading.
3. *"Most operational problems aren't technology problems. They're design problems."*
   — the worldview line; earns a spot in About or as a pull-quote.
4. *"I build the systems that make businesses run."* — clean About headline.
5. The pillar taglines (one line each): "Something isn't working and it's costing you
   time, money, or both." / "You have a gap and nothing off the shelf fills it." /
   "It works today but it won't survive growth."
6. *"Think strategically and get their hands dirty. Not one or the other."* — the
   plane's Y axis in words.

**The V1 patterns we do NOT port:** 70-word subheadlines (audit flagged the hero
burying the offer), 5-paragraph bios, example-lists inside every card, unattributed
result ranges, prose that explains what layout should show.

## Section order (REVISED per Greg, 2026-08-20 night)

| # | Section | Job | Status |
|---|---------|-----|--------|
| 01 | Hero | The identity claim, felt | Built; headline being re-cut |
| 02 | Framework | WHAT I do — the plane + axis panels | **Built** |
| 03 | Approach | HOW I do it — Fix / Build / Scale | Placeholder |
| 04 | Contact CTA | Slim mid-page band → links #contact | Not stubbed |
| 05 | Proof band | Monochrome logos (locked) + quote placeholders | Not stubbed |
| 06 | About | The person behind the plane | Placeholder |
| 07 | Work | "More work examples" — linked case studies | Placeholder |
| 08 | Contact | THE form (single instance; every link targets it) | Placeholder |
| — | Content/CMS | Separate page, later; nav slot reserved | Deferred |

**Approach ↔ Work relationship (open, by design):** Greg intends case studies to be
EMBEDDED/LINKED inside the Approach pillars once written ("when I write and link those
in the right section"). So: build Approach with a per-pillar slot for 1-2 case links;
keep 07 as the fuller "more examples" index. If embedding fully wins later, 07 can
shrink or fold away — don't over-invest in 07 until real case studies exist.

**Contact appears exactly twice:** the slim CTA band at 04 (post-Approach, when the
reader is warmest) and the full form at 08. Menu "Contact", the CTA band, pillar
links, and anything else all target #08. Deep-link prefill (`?situation=`) — locked yes.

---

## 01 · Hero — built, one copy decision open

Current: *"I diagnose it at the strategy level, then build the fix myself."*
V1's hero: *"I help B2B companies fix what's broken, build what's missing, and scale
what works."*

Both are good; they do different jobs. Recommendation: **keep the dichotomy line as
the H1** (it's the differentiator; fix/build/scale is the offer and gets its own
section), and consider pulling ONE sentence of V1's subheadline under it — the killer
line is: *"Most consultants diagnose problems and hand you a deck. I do the work."*
That sentence IS the dichotomy in plain speech. Current V2 lede says similar, softer.
**Open for Greg:** swap V2's lede for the "hand you a deck" line, or blend.

## 02 · Framework — built

The plane = "what I do." Quadrant titles carried: GTM strategy / RevOps & BizOps /
GTM execution / Systems & automation. Axis panels explain the two spectrums.
Later (with 04): real case-study dots return, plotted by coordinate.

## 03 · Approach — "You come to me one of three ways"

Fix / Build / Scale as a **three-beat sequence, not boxes** (brief's rule). V1's copy
is strong and current — port and compress:

- **Fix It** — "Something isn't working and it's costing you time, money, or both."
  Tags: leaking pipeline · bloated stack · manual work
- **Build It** — "You have a gap and nothing off the shelf fills it."
  Tags: internal tools · automation · pipelines · AI
- **Scale It** — "It works today but won't survive growth."
  Tags: SOPs · onboarding systems · frameworks

Each beat ends with a quiet CTA that deep-links the intake **pre-filled**:
`/#contact?situation=broken|build|scale` — V1's ContactSection already supports
`?situation=` param. The three doors literally open the form on the right step.
Result ranges from SERVICES_FRAMEWORK (15-25 hrs/week reclaimed, 20-40% cost cuts)
are available but **unattributed ranges read as marketing** (audit's point) — hold
them until a real case study can carry them.

## 04 · Work — plotted case studies

Rows + dots on the plane, driven by the case-studies collection (schema ready,
`placeholder: true` interlock blocks production). **Template per case study:**

    Title · Client (or industry if NDA) · coordLabel (e.g. "Ops · Strategy + Execution")
    1. The situation (what was broken/missing/unscalable — ties to a pillar)
    2. What I actually did (hands-on specifics, tools named)
    3. What shipped (artifact list — the "I do the work" receipts)
    4. What changed (REAL numbers only — non-round numbers read as true)
    Plot: x/y on the plane · pillar tag: Fix/Build/Scale

That template makes every case study re-argue the positioning: strategic read → built
artifact → measured result.

## 05 · Proof band — logos (real) + quotes (placeholder)

- **Logos:** V1's eight are real assets in the repo already: State Farm, Siemens,
  BambooHR, Parsable, CertifID, nrev.ai, Medix, Sayers (+ CRC Group as text).
  V2 treatment: one quiet marquee/strip, monochrome (ink-tinted, like the logo),
  label "Brands I've worked with." Upgrade path per the audit: attach a one-line
  story to each logo eventually — a logo with a sentence is proof; alone it's decor.
- **Quotes:** 2-3 rotating or stacked pull-quotes, mono attribution line.
  **Placeholder rule (hard):** placeholders must be OBVIOUSLY fake —
  "[Quote placeholder — Greg supplies]" — never plausible invented praise
  (CLAUDE.md: don't invent proof; the audit already caught V1 doing this).
- Placement: after Work — proof lands hardest right after the evidence section.

## 06 · About — compress V1's bio, keep its arc

V1's about copy is genuinely good and matches the V2 positioning almost line for
line (it independently says "think strategically and get their hands dirty. Not one
or the other."). Port with edits:
- Headline: keep V1's *"I build the systems that make businesses run."* or echo the
  plane: open question for Greg.
- Bio: V1's 5 paragraphs → compress to 3 (origin in GTM ops → "most operational
  problems are design problems" → embedded-COO/AI-builder breadth). The GTM→ops
  horizontal move IS the X axis — say so explicitly to tie About back to the plane.
- Keep: focus areas (4), the human interests (photography/building — texture that
  was cut from the plane belongs HERE), stats (10+ yrs / 40+ projects / 12 tools —
  real, non-round enough).
- Headshot exists (`images/profile image/`).

## 07 · Contact — port V1's intake, restyle to V2

V1's ContactSection is already the "typeform-style" interactive intake Greg wants:
4 steps, situation cards, involvement-area chips, Formspree + /api/contact wiring,
`?situation=` deep-link. **Port the logic, reskin to V2 tokens** (dark, olive accent,
Barlow/Martian, glass panel consistent with the axis panels). Situation options map
1:1 to the pillars + "ongoing" + "not sure yet" — keep all five.
Anti-tell requirements from `03-anti-ai-tells.md` apply here hardest: designed
pending/error/success states, aria-live, double-submit guard.

## Content/CMS — deferred, slot reserved

Nav gets "Content" only when the page exists. V1's content collections remain in the
repo. Not part of the current build.

---

## Decisions logged (Greg, 2026-08-20 night)

- Monochrome logos: **YES, locked.**
- Prefilled intake deep-links from Approach: **YES.**
- Section order revised (table above); Approach may absorb case links over time.
- Headline: current line to be replaced — candidates below, Greg picks.

## Hero headline — candidates (pick one / redline)

Current (to beat): "I diagnose it at the strategy level, then build the fix myself."
Criteria: distinct, clear, short, carries the dichotomy, zero consultant-speak.

A. **"Most consultants hand you a deck. I hand you the fix."**
   Contrast does the work; concrete noun vs noun; "the fix" takes the accent color.
   Lede then carries the plane: "Strategy to execution, go-to-market to operations —
   I frame the problem and ship the system that solves it."
B. **"I find problems like a strategist and fix them like a builder."**
   The dichotomy stated as a skill, not a category.
C. **"Strategy that ships."**
   Three words; the plane and lede do the explaining. Boldest cut, most poster-like.
D. **"The thinking and the building. One person."**
   Blunt version of V1's "not one or the other."
E. **"I draw the map, then build the road."**
   Metaphor pair; pairs eerily well with a site whose hero literally draws axes.

Recommendation: **A** — clearest and most distinct, weaponizes V1's best sentence,
and instantly disqualifies the deck-consultant category Greg keeps being boxed into.
C as the daring alternate if A feels long.
