# Claude Code Quick Reference

## Project Summary
Personal website for Greg Toler (gregtoler.com) - GTM Strategy & Operations specialist. Dashboard-style portfolio with warm, editorial aesthetic featuring glassmorphic cards over animated silk wave background.

## Tech Stack
- **Astro** + **React** islands (`client:load`)
- **Framer Motion** for animations
- **Cloudflare Pages** hosting
- **MDX** content collections
- **View Transitions** for page navigation

## Key Files

### Layout & Navigation
- `src/components/layout/SpineNavigation.jsx` - Sidebar + header navigation
- `src/layouts/BaseLayout.astro` - Base layout with animated canvas background

### Pages
- `src/components/home/HomePage.jsx` - Bento grid home page
- `src/components/about/AboutSection.jsx` - About page
- `src/components/work/WorkPage.jsx` - Work page (Experience/Projects/Apps tabs)
- `src/components/work/AppDetail.jsx` - App detail component

### Styles
- `src/styles/global.css` - CSS variables, breakpoints, base styles
- `src/lib/theme.ts` - Color palette definitions

### Documentation
- `documentation/PROJECT_STATUS.md` - **Current project state and session notes**
- `documentation/DESIGN_SYSTEM.md` - Full design specs
- `documentation/PROJECT_INIT.md` - Initial project setup

## Color Palette (Quick Reference)

### Light Mode
| Use | Color |
|-----|-------|
| Background | `#fcfaf7` |
| Cards | `rgba(255,255,255,0.25)` (glassmorphic) |
| Text | `#2C2824` |
| Muted | `#6B6560` |

### Dark Mode
| Use | Color |
|-----|-------|
| Background | `#1a1714` |
| Cards | `rgba(45,42,38,0.2)` (glassmorphic) |
| Text | `#E3E0DB` |
| Muted | `#A8A49E` |

## CSS Breakpoints
```css
/* Desktop: >900px - two-column layouts */
/* Tablet: 600-900px - single column, constrained images */
/* Mobile: <600px - full width, compact spacing */

/* Mobile sidebar width */
@media (max-width: 768px) {
  --sidebar-width: 60px;
}
```

## Animation Defaults
```javascript
// Spring transition
{ type: "spring", stiffness: 400, damping: 35 }

// Fade transition
{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }

// Hover scale
whileHover={{ scale: 1.02 }}
```

## Menu Structure
| Label | Route | Mobile Icon |
|-------|-------|-------------|
| Home | `/` | House |
| About | `/about` | Person |
| Work | `/work` | Briefcase |
| Content | `/content` | Document |
| Resources | `/resources` | Book |

## Content Collections
```
src/content/
  projects/   # Case studies with metrics
  apps/       # Tools/templates with features
  content/    # Articles
  resources/  # Downloadable files
```

## Common Patterns

### Glassmorphic Card
```javascript
const glassCard = {
  background: isDarkMode
    ? 'rgba(45, 42, 38, 0.2)'
    : 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.3)'}`,
  borderRadius: '16px',
};
```

### Theme Detection in React
```javascript
const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  const checkTheme = () => {
    setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
  };
  checkTheme();
  const observer = new MutationObserver(checkTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}, []);
```

## Rules
1. **No pure black/white** - always use theme colors
2. **Warm grays only** - brown undertones, no blue/cool
3. **8px spacing grid** - 4, 8, 16, 24, 32, 48, 64
4. **Animations are subtle** - scale 1.02, not 1.1
5. **Test both modes** - always verify light AND dark
6. **Mobile-first responsive** - breakpoints at 600px, 768px, 900px

## Development Commands
```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## When Starting a New Session
1. Read `documentation/PROJECT_STATUS.md` for current state
2. Run `npm run dev` to start dev server
3. Check recent git commits: `git log -5 --oneline`
4. Site runs at `http://localhost:4321`
