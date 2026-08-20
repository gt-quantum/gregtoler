# 003 — Motion study parked; carry-forward elements

**Date:** 2026-08-20
**Status:** Parked, not killed

## Decision

The logo-unfold motion study (`build/prototypes/motion-study-01.html`) is **parked**.
Greg: *"interesting... I don't think we lean too hard into that right now, I want to focus
on the website build."*

Not abandoned. Revisit if a video/brand-motion need comes up, or after V2 ships.

## Known gap in the prototype

It animates **live type** (a typed "G" and "T"), **not Greg's actual GT mark**. So the
connector bar is a drawn line, not the real logo's existing connected stroke between the G
and T. Making it use the real mark requires decomposing `public/favicon.svg` — currently one
merged traced path — into separate G / T-bar / T-stem paths. That is real vector work and it
is out of scope right now.

## Carry forward into the build (Greg approved these directly)

- **Dotted grid background.** Confirmed: *"I like the dot background."*
- **Amber glow on axes/nodes.** Confirmed: *"I don't mind the glow."*
- **Motion is wanted** — *"We need some motions"* — but restrained, per the brief. The one
  big orchestrated moment is the quadrant; everything else is micro-interaction.
- **Film grain overlay.** Built into the prototype via inline SVG `feTurbulence`, no image
  payload. See `build/03-anti-ai-tells.md`.
- **Two-tier node labels** — loud capability nodes, quiet texture nodes. Adapted from
  seunghyuk.com.

## Still unresolved

Display face. The prototype has a live switcher across Archivo Black, Clash Display,
Bricolage Grotesque, Cabinet Grotesk, Anybody, and Space Grotesk if a quick comparison is
ever useful — but the real decision should be made against actual page copy, not a specimen.
