# Project Initialization Instructions

## Overview
This is the personal website for Greg Toler (gregtoler.com) - a designer/developer/operator focused on revenue operations and GTM systems. The site should feel like a sophisticated personal dashboard - warm, editorial, animated, and high-quality.

## Tech Stack
- **Framework**: Astro with React islands
- **Styling**: CSS-in-JS (inline styles) or CSS Modules - maintain consistency with existing component
- **Animation**: Framer Motion
- **Hosting**: Cloudflare Pages (connected to GitHub)
- **Forms**: Cloudflare Workers + D1 or external service
- **Content**: Astro Content Collections (MDX files)

## Project Location
`/Volumes/Extreme SSD/gregtolerdotcom`

## Existing Assets
- `MVP/mvp.jsx` - FluidSpineMenu component (the layout shell) - THIS IS THE FOUNDATION
- `images/logo/` - GT Strategies logo files
- `images/profile/` - Greg's headshot
- `documentation/` - Project documentation (this folder)

## Initialization Steps

### 1. Initialize Astro Project
```bash
cd "/Volumes/Extreme SSD/gregtolerdotcom"
npm create astro@latest . -- --template minimal --install --git --typescript relaxed
```

### 2. Add Integrations
```bash
npx astro add react
npm install framer-motion
npm install @astrojs/cloudflare
```

### 3. Project Structure to Create
```
gregtolerdotcom/
├── astro.config.mjs
├── package.json
├── public/
│   ├── downloads/          # Downloadable resources
│   └── fonts/              # Custom fonts if needed
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── FluidSpineMenu.jsx    # From MVP/mvp.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── VideoEmbed.jsx
│   │   │   └── ResourceCard.jsx
│   │   └── forms/
│   │       └── ContactForm.jsx
│   ├── content/
│   │   ├── config.ts               # Content collection schemas
│   │   ├── work/                   # Work/case studies
│   │   ├── projects/               # Apps, tools, templates
│   │   ├── articles/               # Written content
│   │   └── resources/              # Downloadable resources
│   ├── layouts/
│   │   └── BaseLayout.astro        # Uses FluidSpineMenu as shell
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── about.astro
│   │   ├── work/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── content/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── resources.astro
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       └── theme.ts                # Color palette & design tokens
├── MVP/                            # Original prototype (keep for reference)
├── images/                         # Source images
│   ├── logo/
│   └── profile/
└── documentation/                  # Project docs
```

### 4. Move/Adapt FluidSpineMenu
- Copy `MVP/mvp.jsx` to `src/components/layout/FluidSpineMenu.jsx`
- Modify to accept `children` prop for page content
- Modify menu items to use actual navigation (Astro links or client-side routing)
- Extract theme to `src/lib/theme.ts` for reuse across components

### 5. Configure Cloudflare
In `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [react()],
});
```

## Menu Structure → Pages
| Menu Item  | Route          | Content Type |
|------------|----------------|--------------|
| Home       | `/`            | Dashboard/landing |
| About      | `/about`       | Static page |
| Work       | `/work`        | Collection (case studies) |
| Content    | `/content`     | Collection (articles) |
| Resources  | `/resources`   | Collection (downloads) |

Note: The current menu has "Projects" - this maps to `/projects` for apps/tools Greg has built.

## Image Placeholders
When images are needed, create a placeholder div with:
- Gray background using theme colors
- Description text of what image is needed
- Aspect ratio maintained
- Example: `[PLACEHOLDER: Hero image - workspace photography, warm tones, 16:9]`

## Key Principles
1. **Warm, not cold** - All grays have brown/warm undertones
2. **Motion is meaningful** - Animations serve UX, not decoration
3. **Editorial quality** - Feels like a well-designed publication
4. **Dashboard aesthetic** - Personal command center, not generic portfolio
5. **Minimalist** - Every element earns its place
