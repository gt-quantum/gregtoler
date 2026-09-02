# /examples — structure and rules

Live at gregtoler.com/examples since 2026-09-02. Source: `src/pages/examples.astro`. Content source of truth: `../../positioning/proof/four-moves.html` (same page as a single file) and the master list in `../../positioning/proof/case-studies.html`.

## Rules Greg set
- No company or people names. Companies are described ("a wire-fraud-protection SaaS"), people are roles.
- No quotes, no results tiles, no captions under images, no pills or tags above headlines.
- Every example is Problem, Build, then visuals. Headlines are plain descriptors ("Account map", "Content bot in Slack").
- No colons or em dashes in copy. Diagram labels use commas, not middle dots or arrows (those fell back to a CJK font in SVG).
- Every diagram node that names a tool carries its logo. Tools without a fetchable mark get an initial chip.
- Screenshots are blurred with the OCR helper (`scratchpad ocr.swift`, Vision framework) rather than by guessed coordinates. Check every capture before it ships; the Desktop timestamp sweep mislabeled several.

## Page anatomy
- `V2Layout` with `robots="index, follow"`. Tokens from `src/styles/v2-tokens.css` (Barlow display, Hanken body, Martian mono, olive accent).
- `.ex-nav` sticky navbar: GT mark left, "Work with me" pill right (links to `/#contact`, the splash intake).
- `.ex-shell` grid: `.ex-toc` sticky left column from 1200px, hidden below; `.ex-page` content, max 1040px.
- Four `<section class="bucket">` groups: Core marketing ops, Marketing ops with automation, Marketing ops with AI in the loop, Custom tools.
- Each `<article class="ex" id="slug">`: `<h3>`, a `.row.noimg > .txt` with Problem and Build, then any of `<figure class="wide">`, `<div class="imgrow cols-2|cols-3">`, `<div class="stack">`, `<figure class="flow" data-flow="key">`.
- Inline script: `ICONS` (paths under `/images/examples/icons/`), `FLOWS` (specs: `cols` of nodes with `t`, `s`, `icon`, `dim`; `edges` as `[from, to, label]`; optional `extra` row), and the renderer that draws each `figure.flow` as inline SVG. A small observer highlights the active TOC item.

## Adding or editing an example
Copy an article block, keep the id unique, add the TOC link, add images to `public/images/examples/`, add a flow spec if needed, run `npx astro build`, commit only the intended paths, push main. The splash footer already links here.
