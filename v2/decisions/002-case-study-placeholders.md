# 002 — Case studies: build against placeholders

**Date:** 2026-08-20
**Status:** Locked

## Decision

V2 is built against **placeholder case studies**. Greg supplies real content later.

Placeholders live in `v2/content/case-studies/` and move to `src/content/case-studies/`
when the V2 build starts consuming them.

## Rules

- Every placeholder is **obviously fake**. Titles read `[Placeholder]`, clients read
  `[Client]`, metrics read `[Metric]`. Nothing invents a plausible-looking client or number.
- This is deliberate. The 2026-08-11 audit found fabricated case studies live on V1 with
  invented clients and invented metrics. Placeholders that look real are how that happens.
- **No placeholder ships to production.** Cutover checklist blocks on replacing all of them.

## Why placeholders are enough to build against

The quadrant plots case studies by coordinate. What the build needs is the *shape* of the
data — coordinates, a title, a quadrant label, a coordinate readout string — not the prose.
Six placeholders spanning all four quadrants exercise every layout and collision case.

## Schema

See `v2/content/case-studies/_SCHEMA.md`.
