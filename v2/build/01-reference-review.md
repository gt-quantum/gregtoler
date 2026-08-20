# Reference Site Review

**Date:** 2026-08-20
**Source:** `inbox/references/sites.md` (Greg's ranked list)
**Method limitation:** The Chrome extension was not connected, so this is a **code-level
analysis** — fetched HTML, stylesheets, and font payloads. I did not see these sites
render, and I could not observe motion or interaction. Since Greg ranked them on
"style and interaction," the interaction half of this review is still missing.

---

## What each site is actually made of

| # | Site | Display / heading | Body | Mono | Palette |
|---|---|---|---|---|---|
| 1 | seunghyuk.com | **Archivo Black** | Space Grotesk | system mono | `#0a0a0a` / `#e8e8e8`, accent `#30b8ff` electric blue |
| 2 | fplus.ai | **Onest** | IBM Plex Sans | — | Teal-slate `#31505b`, cream `#e9e3d8`, gold `#dbb057`, mint `#a9dbd3` |
| 3 | nicoborja.com | **Origin Display** (Displaay) | Origin Text | Martian Mono + JetBrains Mono | — |
| 4 | daoism.systems | **KH Interference** | — | IBM Plex Mono | Off-white `#efeeec`, slate `#a8aebc`, signal red `#e64749` |
| 5 | senthora.ai | **Nohemi** | Nohemi | — | Near-black `#0E0C12`, violet ramp `#6A4EE8` → `#D6CCFF` |
| 6 | yashahire.info | Sacramento (script) | — | — | (JS-rendered, little signal) |
| 7 | gionatannese.com | LayGrotesk + **Teodor** | LayGrotesk | var(--font-mono) | `#EDEDED` |
| 8 | digitalanthro.co | Roboto | Roboto | monospace | Deep green `#263b35`, `#f4f4f4` |

---

## The single most important finding

**Seven of eight use no serif at all.**

The one exception is #7 gionatannese, and its serif is **Teodor** — a paid Newlyn face,
deliberately chosen, not a Google default.

In every case the "characterful" moment comes from a **display grotesk**, not a serif:
Archivo Black, Onest, Origin Display, KH Interference, Nohemi. These are heavy, wide,
slightly strange sans faces used large.

This directly confirms the concern raised in `00-intake-review.md`. Instrument Serif in
the V02 mockup is the strongest AI-design tell in the file, and Greg's own favorite
references unanimously go the other direction.

## Second finding: mono is load-bearing

IBM Plex Mono, Martian Mono, JetBrains Mono all appear in the top four. Mono is not a
garnish on these sites — it carries labels, navigation, and metadata.

**This is good news.** The brief already specifies mono for "coordinates, numbers, labels,
and anything that should carry an engineering signal," and the V02 mockup already uses
IBM Plex Mono. That part is on-pattern and should stay.

## Third finding: the fonts are self-hosted and mostly not free

Origin (Displaay), KH Interference, Nohemi, Teodor, LayGrotesk are commercial faces.
Archivo Black and Space Grotesk are free but **self-hosted** on seunghyuk.com, with
`rel="preload"` in the document head and zero external font domains.

This is a large part of why none of them read as AI-generated. Reaching for the Google
Fonts CDN and picking from the first screen of results is itself the tell — independent
of which font gets picked.

Two implications:
- Budget question for Greg: is a paid display face in scope? One good display font is the
  cheapest possible way to not look generic.
- Self-hosting is a performance win anyway (no third-party connection, no render-blocking
  external stylesheet), and the brief already demands subsetting and preloading.

## Fourth finding: accents are saturated and singular

Electric blue `#30b8ff`, signal red `#e64749`, violet `#6A4EE8`, mint `#a9dbd3`.
Each site commits to exactly one and uses it sparingly against a near-neutral ground.

Amber/gold shows up only once, as a **minor** in fplus.ai (`#dbb057`), never as the
primary accent.

Worth noting but **not acting on yet** — Greg's instruction is that the palette stays
close to the mockup and V1 for now. The structural lesson (one saturated accent, used as
signal against neutral ground) is already how the brief describes amber-as-emitted-light,
so the concept holds even if the hue is unusual relative to these references.

## Fifth finding: seunghyuk.com inverts on theme

`#0a0a0a` for the intro sequence, `#e8e8e8` for the main page — and under
`prefers-reduced-motion` it skips the intro and starts light. The dark/light split is a
*narrative* device, not a user preference toggle.

Relevant to the open day/night question in `00-intake-review.md` §5. There is a version of
V2 where night is the framework/quadrant mode and day is the reading mode, rather than two
skins of the same thing.

---

## Recommendation

Given Greg's instruction — keep the palette close to the mockup for now, fix the
type instinct:

1. **Keep** the warm-dark schematic palette and amber-as-emitted-light, as-is, provisionally.
2. **Keep** IBM Plex Mono in its engineering-signal role. It is on-pattern with the references.
3. **Replace Instrument Serif** with a display grotesk. This is the one change that does
   almost all the de-genericizing work, and it is consistent with 7 of 8 references.
4. **Self-host and preload** whatever gets chosen. No Google Fonts CDN link in the head.

That is a narrow, cheap change: one font swap, palette untouched.

## Still open

- **Interaction and motion were not observed.** This is the half Greg ranked highest.
  Needs a real browser pass with the extension connected.
- Paid display font in scope, yes or no?
- Does the seunghyuk dark-intro/light-main narrative pattern apply to the quadrant?

---

# Addendum — Live interaction pass

**Date:** 2026-08-20, extension connected.
**Not covered:** gionatannese.com (blocked by site permissions in the extension).

## seunghyuk.com (#1) — the most transferable

The whole homepage is **one scroll-driven diagram that builds itself**. Sequence:

1. Dark `#0a0a0a` intro. A single vertical white line, centered.
2. Inverts to light `#e8e8e8`. The line collapses to a small black square.
3. On scroll, spokes radiate from the square to labeled endpoints. The square grows.
4. Keep scrolling and the square scales up until it swallows the viewport and goes black.
5. `WANNA KNOW?` appears inside the square as it grows — the CTA lives *in* the diagram.

**Two label tiers on the same plane**, separated only by weight and opacity:
- Bold black — capabilities: PRESENTATION, DIRECTION, PROPOSAL, STRATEGY, PLANNING, AI, GRAPHIC DESIGN
- Faint gray — personality: RELENTLESS, CTRL+Z, PRECISION, NIGHT OWL, OBSESSIVE

That second tier is the best idea on the site. It adds texture and humanity to a technical
diagram without adding a paragraph of copy anywhere.

Also: **film grain over the whole light ground.** Subtle, and it does a lot of work to keep
a flat near-white from reading as a default Tailwind page.

**Direct read for V2:** this validates the quadrant concept hard. Same skeleton — a mark
that grows into a diagram as you scroll, labels blooming at thresholds. Two things to steal
outright: the **two-tier label system** (capabilities loud, personality quiet) and the
**grain**. One thing to consider: the CTA living inside the diagram rather than in a box at
the bottom of the page.

## nicoborja.com (#3) — closest to the "plot the work on the map" idea

A navigable map of domains. Color-coded pills across the top — NICO / AI / GROWTH / DATA /
MÚSICA / SOUND — over a 3D particle nebula where individual projects sit as labeled,
color-coded nodes. The footer instruction: click an area to explore, click a project to
preview.

This is **structurally what the brief describes** for section 03: work plotted on the same
framework, explorable by region. Executed as a nebula rather than a cartesian plane.

Type is **mono set very wide** for the wordmark — `N I C O   B O R J A` in Martian Mono with
heavy tracking. Confident and unusual.

**Tension to note:** it color-codes by domain, one hue per area. Greg's brief commits to a
single accent (amber as light). Four quadrant hues would break that rule. Probably keep the
single accent and differentiate quadrants by position and label instead — but worth a
conscious decision rather than defaulting.

## fplus.ai (#2)

Dark navy-to-teal gradient ground with a **particle constellation network** (canvas/WebGL) —
nodes connected by hairlines, drifting. Enormous Onest wordmark, `agence` in white and `f+`
in gold. Theme toggle in the corner.

The constellation reads as "connected systems," thematically adjacent to Greg's positioning.
Notably the gold is confined to two glyphs — it is an accent on a mark, not a surface fill.
That is close to how the brief wants amber handled.

Long stretches of pure particle field between content. Atmospheric, but slow-paced.

## daoism.systems (#4) — a cautionary data point

Opens on a designed preloader: `PLEASE STAND BY`, then `CREATING THE SCENE`, a percentage
counter, a red progress bar, over a dotted CRT-style grid.

**It reached 45% after roughly sixty seconds.** I abandoned it before the site rendered.

The preloader is beautifully art-directed, and none of that matters — this site trades load
time for spectacle, and the trade is bad. Greg's brief explicitly refuses this trade
("must not tank load time," "strong Core Web Vitals," "progressive enhancement").

**Use it as the boundary, not the target.** Whatever V2's quadrant costs, it cannot cost
this. Worth keeping as the concrete example of the failure mode.

## senthora.ai (#5)

Dark violet, wireframe mesh blob behind a phone mockup, big Nohemi headline with a
**gradient-filled second line**.

Honestly the most conventional of the set — gradient headline text on dark violet is itself
a recognizable AI-SaaS tell. Presumably on the list for the mesh/wireframe treatment rather
than the overall direction.

## yashahire.info (#6)

Near-black with a **gold/amber accent** — the closest palette in the set to where V2 is
currently headed. Terminal-prompt device (`> Npm start`), a script face for "I build things,"
a bento grid of cards on the right with testimonials, "currently building," and tech pills.

Useful proof that warm dark + amber can work. Also the busiest and most generic-dev-portfolio
of the eight — the bento card grid is exactly the pattern the brief wants killed from V1.
Worth noting Greg ranked it 6th, below the more restrained entries.

## digitalanthro.co (#8)

Deep green `#263b35`, enormous **light-weight** grotesk headline, a single hairline rule,
body copy at a comfortable measure. No visible motion.

The quiet end of the spectrum. Proof that a consultancy site can be credible on typographic
scale and restraint alone. Relevant to the About/Contact sections, where the brief asks for
restraint after the quadrant spends the boldness.

---

## Revised recommendations

Nothing here changes the type call — if anything it strengthens it. But two additions:

1. **Add grain.** A subtle noise overlay on the base surface. Cheap (one tiled PNG or an
   SVG filter), and it separates the ground from every default dark-mode page on the internet.
2. **Two-tier labels on the quadrant.** Capability nodes loud, personality/texture nodes
   quiet. Adapted from seunghyuk. Adds depth to the plane without adding copy.
3. **Consider the CTA inside the diagram**, per seunghyuk's `WANNA KNOW?`, rather than a
   bordered box at the page bottom. The mockup's current `.cta-box` is the most generic
   element in the V02 file.
4. **daoism.systems is the perf boundary.** Reference it in the build spec as the thing
   not to become.
