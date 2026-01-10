# Claude Code Quick Reference

## Project Summary
Personal website for Greg Toler (gregtoler.com) - designer/developer/operator specializing in revenue operations and GTM systems. Dashboard-style portfolio with warm, editorial, animated aesthetic.

## Tech Stack
- **Astro** + **React** islands
- **Framer Motion** for animations
- **Cloudflare Pages** hosting
- **MDX** content collections

## Key Files
- `MVP/mvp.jsx` - Original FluidSpineMenu prototype (reference/backup)
- `src/components/layout/FluidSpineMenu.jsx` - Active layout component
- `src/lib/theme.ts` - Color palette and design tokens
- `documentation/DESIGN_SYSTEM.md` - Full design specs
- `documentation/ROADMAP.md` - Task list and content plan

## Color Palette (Quick Reference)

### Light Mode
| Use | Color |
|-----|-------|
| Background | `#F3EEE7` |
| Cards | `#E3DED5` |
| Text | `#2C2824` |
| Muted | `#A09A94` |
| Divider | `#D5D0C9` |

### Dark Mode
| Use | Color |
|-----|-------|
| Background | `#1A1714` |
| Cards | `#2A2622` |
| Text | `#E3E0DB` |
| Muted | `#6E6A64` |
| Divider | `#3D3935` |

## Animation Defaults
```javascript
// Standard spring
{ type: "spring", stiffness: 400, damping: 35 }

// Hover scale
whileHover={{ scale: 1.02 }}

// Fade transition
{ duration: 0.2 }
```

## Image Placeholders
```jsx
<div style={{
  backgroundColor: '#E3DED5', // or dark: '#2A2622'
  aspectRatio: '16/9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  color: '#A09A94',
  fontSize: '14px'
}}>
  [PLACEHOLDER: Description here]
</div>
```

## Available Assets
- Logo: `images/logo/`
- Profile photo: `images/profile/`

## Menu Structure
| Label | Route |
|-------|-------|
| Home | `/` |
| About | `/about` |
| Work | `/work` |
| Content | `/content` |
| Resources | `/resources` |

(Note: "Projects" in design → may be sub-section of Work or separate)

## Rules
1. **No pure black/white** - always use theme colors
2. **Warm grays only** - brown undertones, no blue
3. **8px spacing grid** - 4, 8, 16, 24, 32, 48, 64
4. **Animations are subtle** - scale 1.02, not 1.1
5. **Test both modes** - always verify light AND dark

## Content Collections Location
```
src/content/
  work/       # Case studies (MDX)
  projects/   # Apps/tools (MDX)  
  articles/   # Written content (MDX)
  resources/  # Downloadables (MDX)
```

## When Stuck
1. Check `documentation/DESIGN_SYSTEM.md` for specs
2. Check `documentation/ROADMAP.md` for current tasks
3. Reference `MVP/mvp.jsx` for original component patterns
4. Ask Greg for clarification on content/direction
