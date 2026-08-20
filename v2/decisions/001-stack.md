# 001 — Stack: stay on Astro

**Date:** 2026-08-20
**Status:** Locked
**Supersedes:** The brief's Next.js + Tailwind + shadcn/ui recommendation

## Decision

V2 is built on **Astro 5 + React 19 islands**, inside this existing repo, deployed to
Cloudflare. No migration to Next.js.

## Why

Greg's criteria: most creative flexibility, content-friendly, strong interactivity and
framework/animation work, without sacrificing loading.

| Criterion | Why Astro wins |
|---|---|
| Creative flexibility | No framework opinion on markup or styling. The quadrant can be raw canvas/SVG/vanilla JS with no wrapper tax. |
| Content-friendly | Content collections + MDX already configured in `src/content/config.ts`. Type-safe frontmatter, zero CMS setup. |
| Interactivity | Islands: interactive components hydrate individually, everything else ships as static HTML. |
| Loading | Zero JS by default. The quadrant's JS cost is paid only on the page that uses it. |

Next.js ships a React runtime on every page whether or not it's used. The quadrant is
custom vanilla canvas — it never needed React. shadcn/ui is a React component library the
brief itself said must be "hard-reskinned," which means importing a dependency in order to
fight its defaults.

## What this preserves

- `src/content/config.ts` collections (the CMS requirement, already solved)
- Cloudflare deploy pipeline and `astro.config.mjs`
- Git history and the V1 site, which stays live until cutover

## Styling

Open sub-decision. Astro supports Tailwind, CSS modules, or scoped `<style>` blocks.
The V02 prototype is hand-written CSS custom properties, which suits a token-driven
design system well. Decide when the design direction is locked.

## Reversibility

Moderate. Content collections and component logic would port to Next.js with effort;
the quadrant (vanilla) ports freely. Not a one-way door, but not free either.
