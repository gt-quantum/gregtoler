# Type candidates — free, self-hosted only

**Constraint (Greg, 2026-08-20):** No paid fonts. Everything self-hosted. Custom work is
ours to build; free/open component libraries are fair game for commodity parts.

## The insight

The references don't avoid looking generic because their fonts cost money. They avoid it
because the fonts were **chosen** rather than taken off the first screen of Google Fonts.

Google Fonts' default sort is the tell. Instrument Serif, Playfair, Inter, DM Sans,
Space Grotesk — all free, all fine, all instantly recognizable as "picked from the top of
the list." The fix is not budget. It is sourcing.

**Libre foundries with genuinely characterful faces, all free for commercial use:**

- **Velvetyne** (velvetyne.fr) — libre, deliberately strange, very rarely seen in SaaS
- **Collletttivo** (collletttivo.it) — Italian libre foundry, strong grotesks
- **Uncut** (uncut.wtf) — curated free display faces
- **Fontshare** (fontshare.com, Indian Type Foundry) — free for commercial, high production quality

These give the "someone made a decision here" signal at zero cost.

## Shortlist — display / heading

Replacing Instrument Serif. Target: heavy, slightly strange grotesk set large, per the
pattern in 7 of 8 references.

| Face | Source | License | Read |
|---|---|---|---|
| **Clash Display** | Fontshare | Free commercial | Heavy, wide, confident. Closest free analog to Nohemi/Origin Display. Strong default. |
| **Bricolage Grotesque** | Google/OFL | OFL | Variable, quirky, has optical sizing. Characterful without being costume. Less spent than its Google neighbors. |
| **Anybody** | Velvetyne | OFL | Variable width, genuinely unusual. High-risk/high-reward — could be the whole identity. |
| **Cabinet Grotesk** | Fontshare | Free commercial | Cleaner, more restrained. Safe pick if Clash reads too loud next to the quadrant. |
| **Archivo Black / Expanded** | Google/OFL | OFL | What seunghyuk.com (#1 reference) actually uses. Proven against Greg's own taste. |
| **Uncut Sans** | Uncut | OFL | Neutral-but-considered. Good body candidate too. |

## Mono — keep

**IBM Plex Mono** stays. Already in the V02 mockup, appears in the top-four references
(daoism.systems uses it directly), and reads as engineering rather than costume.

Alternative if it needs more character: **Martian Mono** (nicoborja uses it) or
**Departure Mono** (free, pixel-adjacent, more opinionated).

## Body

**Uncut Sans**, **Switzer** (Fontshare), or **Space Grotesk**. Body copy is the one place
where "boring and legible" is correct — the brief says spend boldness on the quadrant.
Space Grotesk is a mild tell but acceptable in a body role where nobody reads it as a choice.

## Non-negotiable regardless of pick

- Self-host as woff2. **No Google Fonts CDN link in the head.**
- Subset to Latin + the specific glyphs the mono labels need.
- `rel="preload"` for display + body, `font-display: swap`.
- Exactly what seunghyuk.com does — worth copying wholesale as a loading pattern.

## Component libraries (free, for commodity parts only)

The brief's rule stands: use for structure, then fully reskin.

- **shadcn/ui** — MIT, copy-paste not dependency. Works in Astro via React islands.
- **HyperUI**, **Preline** — free Tailwind component sets, no attribution
- **Motion Primitives** — free motion component patterns

Commodity parts here are small: nav, footer, contact form. The quadrant is ours.

## Open

Pick a display face. Recommend prototyping the top three against the actual hero line
rather than deciding from specimens.
