# / — the home page (structure and rules)

Built 2026-09-02 on top of the 2026-09-01 splash. Source `src/pages/index.astro`, framework component `src/components/v2/HeroFramework.astro`, nav `src/components/v2/SpineNav.astro`, shared example data `src/lib/examples.ts`.

## Sections, in order
1. **Hero → Framework** (`#framework`). The splash hero, verbatim (mark, eyebrow, "Go-to-Market and Operations Support", lede, Work with me, Connect on LinkedIn). On scroll the rule under the headline slides down and becomes the X axis of the map, the V2 morph. Work with me smooth-scrolls to `#contact`.
2. **About** (`#about`). Plain headshot, `public/images/v2/headshot.jpg`, two paragraphs.
3. **Work** (`#work`). One row per entry in `examples.ts`, each row a link to `/examples#slug`, with the group and the map position. Then a link to `/examples`.
4. **Contact** (`#contact`). The four-step intake, same component as before, same `/api/contact` and `/api/qualify` flow. `#contact?situation=` prefill still works.
5. Footer. Framework, About, Work, Contact, Examples, LinkedIn.

The V2 Approach section and the Privacy / Terms pages stay on the `staging` branch only. The menu is Framework, About, Work, Contact.

## The map and its pins
- The map has the two axes (Strategy to Execution, Go-to-market to Operations) and four quadrant labels. Clicking an axis opens the axis panel, as on staging.
- **Pins** are the small breathing dots. Each is one example from `examples.ts`, placed at `x` (0 = GTM, 1 = Ops) and `y` (0 = Strategy, 1 = Execution). Clicking a pin opens a panel over the map with the coordinate, title, Problem, Build, and "See the full example" linking to `/examples#slug`. Escape, the close button, or a click outside closes it. On phones the panel is a bottom sheet.
- Only the first three examples per quadrant in file order get a pin (`pinned` in `examples.ts`). Every example, pinned or not, is in the Work table.

## Adding, moving, or swapping a pin
1. Add or edit the entry in `src/lib/examples.ts`. `slug` must equal the article id on `/examples`. Keep `problem` and `build` to two or three sentences, they are the panel copy.
2. Set `x` and `y`. Keep pins at least 8% clear of the quadrant labels at (.25,.25) (.75,.25) (.25,.75) (.75,.75) and 6% off either axis.
3. To pin it, put it among the first three of its quadrant in the file. To unpin, move it below.
4. If the example is new, add its article to `/examples` too (`documentation/examples-page.md`). Text-only examples (`textOnly: true`) render their long Problem and Build from `examples.ts`.
5. `npx astro build`, check `/` and `/examples#slug`, commit the intended paths only.

## Copy rules (same as /examples)
No company or people names, companies are described. No colons, no em dashes in copy. Plain descriptor titles. Problem then Build.
