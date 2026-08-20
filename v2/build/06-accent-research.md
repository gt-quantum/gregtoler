# Accent color research

**Date:** 2026-08-20. Ground is locked neutral charcoal (#17181A). Greg: beige/amber dead,
no AI-telltale colors, research not instinct.

## The documented AI color tells (avoid)

Per shapeof.ai's pattern survey and the AI-Unchained analysis:
- **Purple — "the most dominant color by far"** in AI products (#a855f7, #7c3aed cluster)
- **Electric blue and purple-blue gradients** — "the gradient of vibe-coded software,"
  ubiquity traced to Tailwind defaults
- **Neon cyan/teal** (#06b6d4, #22d3ee)
- **ChatGPT green** (teal-green, secondary AI signature; GitHub Copilot runs green-purple-blue)
- **Random pastels** (Google's AI-response treatment)

Add the brief's own bans: clay/terracotta-on-cream (#D97757 cluster), acid green or
vermilion on near-black. And Greg's: beige/amber/gold in any accent role.

## What research says pairs with charcoal WITHOUT reading tech/AI

Editorial/interiors palette literature (2026 trend surveys):
- **Rust / burnt orange / ochre** — "natural tension, sophisticated without being loud;
  has dominated editorial interiors for years because it simply works"
- **Olive / sage / forest green** — "one of the strongest pairings for charcoal in 2026;
  grounded, contemporary, sophisticated." Distinct hue-family from ChatGPT teal-green.
- **Oxblood / burgundy** — rare in tech entirely; reads editorial/print
- Mustard/gold — research-endorsed but excluded here (Greg killed the amber family)
- Teal/coral — excluded (teal is on the AI list; coral drifts pastel)

## Candidates wired into the audition widget

| Key | Value | Temp | Rationale |
|---|---|---|---|
| Silver (current) | `#CDCFD3` | neutral | Illumination with no hue; drafting-table read |
| Rust | `#C96F4F` | warm | Editorial-endorsed; deeper + darker ground than the banned clay-on-cream cluster |
| Olive | `#A8B08A` | warm-neutral | Strongest researched charcoal pairing; not ChatGPT green (grey-olive vs teal-green) |
| Oxblood | `#B65C5C` | warm | Zero tech associations; print heritage |

A temporary floating switcher on /v2 sets `--v2-light`/`--v2-light-soft` live so all
glows, axes, seam, cursor and lit dots re-tint at once. Remove before cutover.

## Round 2 (Greg: "olive is the best, but not my favorite — find others")

Rust and Oxblood dropped. Widget now explores the olive neighbourhood — muted,
grey-influenced plant greens, none of which touch the ChatGPT teal-green or neon
cyan clusters:

| Key | Value | Character |
|---|---|---|
| Olive (reference) | `#A8B08A` | The benchmark to beat |
| Sage | `#A9BCA4` | Lighter, greyer, calmer than olive |
| Moss | `#98A468` | Deeper, yellower, more saturated — the boldest of the family |
| Lichen | `#B3B28B` | Olive pulled toward stone; the most neutral-adjacent |
| Eucalypt | `#8FA89A` | Grey-green with a cool cast — the only cool-leaning candidate |

All chosen to stay clearly inside "editorial plant green" and outside "tech green."

## Sources
- shapeof.ai/patterns/color — AI product color survey
- ai-unchained.com "AI Picked Our Colors — They're the Most Generic Thing Here"
- skyryedesign / arch-products / superherodesign 2026 palette surveys (charcoal pairings)


## Round 3 (Greg: round 2 "too soft" — punchier, and other families)

Research: chartreuse-on-charcoal is a documented 2026 editorial pairing ("surged past
sage and olive"; "pair with deep charcoal for maximum punch" — oblist/madegooddesigns).
Persimmon appears in heritage/editorial identity palettes (superherodesign). The brief's
ban is on ACID/NEON green-on-black (terminal cluster) — muted chartreuse is a distinct,
print-flavoured neighbour, kept clearly un-neon here.

| Key | Value | Family | Notes |
|---|---|---|---|
| Chartreuse | `#B9BE4E` | yellow-green | The 2026 editorial pick; boldest option. Deliberately muted vs neon. |
| Fern | `#74A55C` | true green | Saturated leaf green; warmer + yellower than any tech green |
| Persimmon | `#D2662F` | orange-red | Heritage/editorial; redder + deeper than the banned clay `#D97757` |
| Madder | `#BD4557` | crimson | Print-dye heritage red; darker + pinker than the banned vermilion cluster |

Silver + Olive retained as references. Sage/Moss/Lichen/Eucalypt dropped (too soft).

Round 3b: Persimmon `#D2662F` → `#A85A34`, Madder `#BD4557` → `#9C4250` — both read too
bright against the charcoal (Greg). Same hue families, luminance pulled down ~20%.
