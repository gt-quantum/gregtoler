# GT Strategies — Design Refresh Plan
## Improving Color Differentiation & Readability

> **Goal**: Fix readability issues, add visual differentiation between sections/cards/states, and introduce subtle accent colors — all while preserving the warm editorial aesthetic.
>
> **Revert Strategy**: All changes are confined to the files listed below. Create a git branch (`design-refresh`) before starting. If anything feels wrong, `git checkout main` restores everything instantly.

---

## Table of Contents
1. [Pre-Work: Snapshot & Branch](#1-pre-work)
2. [Phase 1: Strengthen the Foundation (theme.ts + global.css)](#2-phase-1)
3. [Phase 2: Add Accent Colors](#3-phase-2)
4. [Phase 3: Improve Card Differentiation](#4-phase-3)
5. [Phase 4: Fix Text Contrast & Readability](#5-phase-4)
6. [Phase 5: Strengthen Interactive States](#6-phase-5)
7. [Phase 6: Section Differentiation](#7-phase-6)
8. [Phase 7: Prose & Content Styling](#8-phase-7)
9. [Files Changed (Complete List)](#9-files-changed)
10. [What We're NOT Changing](#10-not-changing)

---

## 1. Pre-Work: Snapshot & Branch <a id="1-pre-work"></a>

```bash
git checkout -b design-refresh
# All work happens on this branch
# Revert at any time: git checkout main
# Cherry-pick individual commits if you only want some changes
```

Each phase will be a separate commit so you can revert individual phases independently.

---

## 2. Phase 1: Strengthen the Foundation <a id="2-phase-1"></a>

### File: `src/lib/theme.ts`

Add new semantic color tokens to the theme object. These sit alongside existing colors — nothing existing changes.

**Add to `light` object:**
```
// Accent colors (warm-compatible)
accent: '#8B6F4E',           // warm copper/bronze — primary accent
accentMuted: '#A68B6B',      // lighter copper — secondary accent
accentSubtle: 'rgba(139, 111, 78, 0.08)',  // tinted background

// Semantic colors (warm-toned to match palette)
success: '#5E8C61',          // sage green (warmer than #4ade80)
successSubtle: 'rgba(94, 140, 97, 0.08)',
info: '#6B839E',             // warm steel blue
infoSubtle: 'rgba(107, 131, 158, 0.08)',
warning: '#C4935A',          // warm amber
warningSubtle: 'rgba(196, 147, 90, 0.08)',
error: '#B5726A',            // warm terracotta/rose
errorSubtle: 'rgba(181, 114, 106, 0.08)',

// Improved interactive
borderStrong: 'rgba(44, 40, 36, 0.15)',
borderDefault: 'rgba(44, 40, 36, 0.08)',
borderSubtle: 'rgba(44, 40, 36, 0.04)',
hoverBg: 'rgba(44, 40, 36, 0.05)',
activeBg: 'rgba(44, 40, 36, 0.08)',
focusRing: 'rgba(139, 111, 78, 0.4)',  // accent-tinted focus
```

**Add to `dark` object:**
```
// Accent colors (warm-compatible)
accent: '#C4A47A',           // warm gold
accentMuted: '#A68B6B',      // mid gold
accentSubtle: 'rgba(196, 164, 122, 0.1)',

// Semantic colors
success: '#7DB880',          // sage green, brighter for dark
successSubtle: 'rgba(125, 184, 128, 0.1)',
info: '#8EACC4',             // warm blue, brighter for dark
infoSubtle: 'rgba(142, 172, 196, 0.1)',
warning: '#D4A86A',          // warm amber
warningSubtle: 'rgba(212, 168, 106, 0.1)',
error: '#D4908A',            // warm rose
errorSubtle: 'rgba(212, 144, 138, 0.1)',

// Improved interactive
borderStrong: 'rgba(227, 224, 219, 0.18)',
borderDefault: 'rgba(227, 224, 219, 0.1)',
borderSubtle: 'rgba(227, 224, 219, 0.05)',
hoverBg: 'rgba(227, 224, 219, 0.06)',
activeBg: 'rgba(227, 224, 219, 0.1)',
focusRing: 'rgba(196, 164, 122, 0.4)',
```

**Update shadows** (increase visibility):
```
shadows: {
  soft: '0 8px 24px rgba(44, 40, 36, 0.10)',   // was 0.06
  float: '0 12px 40px rgba(44, 40, 36, 0.14)', // was 0.08
  card: '0 4px 12px rgba(44, 40, 36, 0.07)',    // was 0.04
}
```

**Why**: Centralizes all new colors in one place. No component changes needed to make these available. Shadows become actually visible.

---

## 3. Phase 2: Add Accent Colors to Key Touchpoints <a id="3-phase-2"></a>

### File: `src/styles/prose.css`

- Links get accent color instead of matching body text:
  ```css
  .prose-content a {
    color: var(--prose-accent, #8B6F4E);  /* was: same as body text */
    text-decoration-color: var(--prose-accent-muted, rgba(139, 111, 78, 0.4));
  }
  ```

- Add dark mode accent CSS variables:
  ```css
  [data-theme="light"] .prose-content {
    --prose-accent: #8B6F4E;
    --prose-accent-muted: rgba(139, 111, 78, 0.4);
  }
  [data-theme="dark"] .prose-content {
    --prose-accent: #C4A47A;
    --prose-accent-muted: rgba(196, 164, 122, 0.4);
  }
  ```

### File: `src/styles/global.css`

- Add accent CSS variables to `:root` and `[data-theme="dark"]`
- Add focus-visible ring style using accent color:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
  ```

**Why**: Links are the most common interactive element. Giving them a distinct color immediately improves scannability and signals clickability.

---

## 4. Phase 3: Improve Card Differentiation <a id="4-phase-3"></a>

### Files: `src/components/home/HomePage.jsx`, `src/components/services/ServicesPage.jsx`

**Strategy**: Instead of making all glass cards identical, use subtle left-border color bars to categorize card types.

- **Service/offering cards**: 3px left border in `accent` color
- **AI-related cards**: 3px left border in `info` color (already partially done with green borders)
- **CTA/action cards**: 3px left border in `warning` (amber) color
- **Status/results cards**: 3px left border in `success` color

Implementation pattern (add to existing card styles):
```javascript
borderLeft: `3px solid ${currentTheme.accent}`
```

**Also increase glass card contrast**:
- Light mode card bg: `rgba(255, 255, 255, 0.35)` (was `0.25`)
- Dark mode card bg: `rgba(45, 42, 38, 0.3)` (was `0.2`)
- Light mode card border: `rgba(255, 255, 255, 0.45)` (was `0.3`)
- Dark mode card border: `rgba(255, 255, 255, 0.08)` (was `0.05`)

**Why**: Left border bars are a minimal, tasteful way to add color variety without disrupting the glass aesthetic. Increasing card opacity makes them more distinct from the background.

---

## 5. Phase 4: Fix Text Contrast & Readability <a id="5-phase-4"></a>

### File: `src/lib/theme.ts`

**Light mode — improve muted text contrast**:
```
textMuted: '#5C5752',   // was #6B6560 — now passes WCAG AA (4.5:1+)
inactiveText: '#8A857E', // was #A09A94 — bumped for better contrast
```

**Dark mode — improve muted text contrast**:
```
textMuted: '#B8B4AE',   // was #A8A49E — now passes WCAG AA
inactiveText: '#807A74', // was #6E6A64 — bumped slightly
```

### File: `src/styles/prose.css`

Update `--prose-muted` to match new `textMuted` values:
```css
[data-theme="light"] .prose-content { --prose-muted: #5C5752; }
[data-theme="dark"] .prose-content { --prose-muted: #B8B4AE; }
```

### Components with hardcoded muted text

Scan all components and replace any hardcoded `#6B6560` / `#A8A49E` references with `currentTheme.textMuted` (most already do this, so the theme change cascades automatically).

**Why**: Current muted text colors fail WCAG AA. This is the single most impactful readability fix.

---

## 6. Phase 5: Strengthen Interactive States <a id="6-phase-5"></a>

### File: `src/components/contact/ContactSection.jsx`

**Input focus states** — make focus obvious:
```javascript
// Focus state (was: border opacity 0.08 → 0.35, same color)
// New: accent-colored border + subtle glow
border: `1.5px solid ${currentTheme.accent}`,
boxShadow: `0 0 0 3px ${currentTheme.focusRing}`,
```

**Button hover** — add color shift, not just opacity:
```javascript
// Hover: slight accent tint instead of just opacity change
backgroundColor: currentTheme.accent,
color: isDarkMode ? '#1A1714' : '#faf9f7',
```

### File: `src/components/home/HomePage.jsx`

**Card hover states** — more visible lift:
```javascript
// Existing: y: -4 translate only
// Add: shadow increase + subtle border color change
boxShadow: shadows.float,  // uses strengthened shadow values
borderColor: currentTheme.borderStrong,
```

### File: `src/components/layout/SpineNavigation.jsx`

**Active nav item** — add accent indicator:
```javascript
// Add a small accent-colored dot or bar next to active nav item
// Instead of just weight change (400→500), add:
color: currentTheme.accent,  // for active state text
```

### Files: `src/components/resources/ResourceListing.jsx`, `src/components/content/ContentListing.jsx`

**Filter/tab active states** — use accent color:
```javascript
// Active filter: accent-colored underline or background
backgroundColor: currentTheme.accentSubtle,
borderBottom: `2px solid ${currentTheme.accent}`,
```

**Table row hover** — visible feedback:
```javascript
backgroundColor: currentTheme.hoverBg,
```

**Why**: Users need clear feedback on what's interactive and what state it's in. Accent-colored focus rings and hover states are standard UX patterns.

---

## 7. Phase 6: Section Differentiation <a id="7-phase-6"></a>

### File: `src/components/home/HomePage.jsx`

**Alternate section backgrounds** — every other major section gets a slightly different treatment:

```javascript
// Section A (default): transparent (shows page gradient)
// Section B (alternate): subtle tinted overlay
backgroundColor: currentTheme.accentSubtle,  // very faint accent wash
```

**Section dividers** — replace thin 1px lines with more visible separators:
```javascript
// Option: Wider divider with accent tint
borderTop: `1px solid ${currentTheme.borderDefault}`,
paddingTop: '48px',  // breathing room
```

### File: `src/components/services/ServicesPage.jsx`

Same alternating pattern. The "Three Pillars" section, "AI" section, and "Results" section should each feel like distinct chapters.

**Why**: Without section differentiation, the page reads as one long scroll. Alternating subtle backgrounds create natural visual "chapters" without disrupting the aesthetic.

---

## 8. Phase 7: Prose & Content Polish <a id="8-phase-7"></a>

### File: `src/styles/prose.css`

**Blockquote** — add accent-colored left border:
```css
.prose-content blockquote {
  border-left: 3px solid var(--prose-accent, #8B6F4E);  /* was: 2px solid border color */
}
```

**Table headers** — add subtle background:
```css
.prose-content th {
  background: var(--prose-code-bg);  /* subtle tint to differentiate from rows */
  border-bottom: 2px solid var(--prose-border);  /* was: 1px */
}
```

**Code blocks** — slightly more visible background:
```css
.prose-content code {
  background: var(--prose-code-bg, rgba(0, 0, 0, 0.06));  /* was 0.04 */
}
```

**Horizontal rules** — accent-tinted:
```css
.prose-content hr {
  border-top: 1px solid var(--prose-accent-muted, rgba(139, 111, 78, 0.3));
}
```

**Why**: Prose styling affects readability of all text content across the site.

---

## 9. Files Changed (Complete List) <a id="9-files-changed"></a>

| File | Phase | Change Type |
|------|-------|-------------|
| `src/lib/theme.ts` | 1, 4 | Add tokens + fix contrast |
| `src/styles/global.css` | 2 | Add CSS variables + focus styles |
| `src/styles/prose.css` | 2, 4, 7 | Links, contrast, blockquotes, tables |
| `src/components/home/HomePage.jsx` | 3, 5, 6 | Cards, hovers, sections |
| `src/components/services/ServicesPage.jsx` | 3, 5, 6 | Cards, hovers, sections |
| `src/components/contact/ContactSection.jsx` | 5 | Focus states, buttons |
| `src/components/layout/SpineNavigation.jsx` | 5 | Active state accent |
| `src/components/resources/ResourceListing.jsx` | 5 | Filters, table rows |
| `src/components/content/ContentListing.jsx` | 5 | Filters, table rows |
| `src/components/about/AboutSection.jsx` | 3, 6 | Cards, section bg |
| `src/components/work/WorkPage.jsx` | 3 | Card borders |

**Total: 11 files**

---

## 10. What We're NOT Changing <a id="10-not-changing"></a>

These elements stay exactly as they are:

- **Core warm palette** — `#2C2824`, `#F3EEE7`, etc. remain the foundation
- **Glass morphism effect** — blur, backdrop-filter, translucency stay
- **Silk canvas background** — animations, layers, colors untouched
- **Typography scale** — font sizes, weights, line heights stay
- **Spacing system** — 8px grid stays
- **Border radius system** — stays
- **Page layout** — sidebar, header, content areas stay
- **Animation easing & timing** — stays
- **Font families** — stays
- **Dark/light mode toggle** — stays

---

## Accent Color Rationale

The accent colors were chosen to feel like natural extensions of the warm palette:

| Color | Hex (Light) | Hex (Dark) | Purpose |
|-------|-------------|------------|---------|
| **Accent** | `#8B6F4E` copper | `#C4A47A` gold | Links, focus, active states |
| **Success** | `#5E8C61` sage | `#7DB880` sage | Status, confirmations |
| **Info** | `#6B839E` steel | `#8EACC4` steel | AI features, informational |
| **Warning** | `#C4935A` amber | `#D4A86A` amber | CTAs, attention |
| **Error** | `#B5726A` terracotta | `#D4908A` rose | Errors, destructive |

These are all warm-toned, muted, and editorial in feel. No neon, no primary colors, no jarring contrasts.

---

## Revert Strategy

```bash
# Revert everything:
git checkout main

# Revert a single phase (each phase = 1 commit):
git log --oneline design-refresh  # find the commit
git revert <commit-hash>

# Keep branch for reference even after reverting:
git branch design-refresh-backup design-refresh
```
