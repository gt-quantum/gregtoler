# Design System

## Brand Identity
**GT Strategies** - Greg Toler's personal brand
- Designer / Developer / Operator
- Focus: Revenue operations, GTM systems, building tools

## Color Palette

### Light Mode
```css
/* Core Backgrounds - Warm cream/beige */
--bg-primary: #F3EEE7;      /* Main canvas */
--bg-secondary: #EBE6DE;    /* Sidebar, panels */
--bg-tertiary: #E3DED5;     /* Cards, subtle elevation */

/* Typography - Warm browns */
--text-primary: #2C2824;    /* Main headings */
--text-secondary: #6B6560;  /* Body copy */
--text-muted: #A09A94;      /* Inactive nav, captions */

/* Lines & Dividers */
--line-primary: #2C2824;    /* Active nav line */
--line-muted: #D5D0C9;      /* Inactive dividers */

/* Interactive */
--icon-default: #7A756E;    /* Social icons, UI icons */
--button-text: #6B6560;     /* Header buttons */
```

### Dark Mode
```css
/* Core Backgrounds - Warm dark browns, cinematic */
--bg-primary: #1A1714;      /* Main background */
--bg-secondary: #211E1A;    /* Sidebar */
--bg-tertiary: #2A2622;     /* Cards, panels */

/* Typography - Warm off-whites */
--text-primary: #E3E0DB;    /* Headings */
--text-secondary: #A8A49E;  /* Body */
--text-muted: #6E6A64;      /* Inactive nav */

/* Lines & Dividers */
--line-primary: #E3E0DB;    /* Active nav line */
--line-muted: #3D3935;      /* Inactive dividers */

/* Interactive */
--icon-default: #908C86;    /* Social icons */
--button-text: #A8A49E;     /* Header buttons */
```

### Theme Object (JavaScript)
```javascript
export const theme = {
  light: {
    background: '#F3EEE7',
    backgroundSecondary: '#EBE6DE',
    backgroundTertiary: '#E3DED5',
    text: '#2C2824',
    textMuted: '#6B6560',
    activeText: '#2C2824',
    inactiveText: '#A09A94',
    line: '#2C2824',
    dot: '#2C2824',
    divider: '#D5D0C9',
    socialIcon: '#7A756E',
    headerButton: '#6B6560'
  },
  dark: {
    background: '#1A1714',
    backgroundSecondary: '#211E1A',
    backgroundTertiary: '#2A2622',
    text: '#E3E0DB',
    textMuted: '#A8A49E',
    activeText: '#E3E0DB',
    inactiveText: '#6E6A64',
    line: '#E3E0DB',
    dot: '#E3E0DB',
    divider: '#3D3935',
    socialIcon: '#908C86',
    headerButton: '#A8A49E'
  }
};
```

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Scale
| Use Case | Size | Weight | Letter Spacing |
|----------|------|--------|----------------|
| Page Title | 48px | 600 | -0.02em |
| Section Header | 24px | 600 | -0.01em |
| Card Title | 18px | 500 | 0 |
| Body | 16px | 400 | 0 |
| Nav Item (active) | 14px | 500 | 0.2px |
| Nav Item (inactive) | 14px | 400 | 0.2px |
| Caption/Meta | 13px | 400 | 0.1px |

### Line Heights
- Headings: 1.2
- Body: 1.6
- UI Elements: 1.4

## Spacing

### Base Unit
8px grid system

### Common Values
| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Tight gaps |
| sm | 8px | Between related items |
| md | 16px | Default spacing |
| lg | 24px | Section padding |
| xl | 32px | Major sections |
| 2xl | 48px | Page margins |
| 3xl | 64px | Hero spacing |

### Current Component Spacing (FluidSpineMenu)
- Menu item padding: 4px top/bottom
- Divider margins: 20px top, 28px bottom
- Social icons gap: 24px
- Sidebar width: 100px
- Sidebar padding: 24px 20px 40px 37px

## Shadows (Light Mode Only)

```css
--shadow-soft: 0 8px 24px rgba(44, 40, 36, 0.06);
--shadow-float: 0 12px 40px rgba(44, 40, 36, 0.08);
--shadow-card: 0 4px 12px rgba(44, 40, 36, 0.04);
```

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| sm | 4px | Buttons, small elements |
| md | 8px | Cards, inputs |
| lg | 12px | Panels, modals |
| xl | 16px | Large cards |
| full | 9999px | Pills, avatars |

## Animation

### Framer Motion Defaults
```javascript
// Standard spring
{ type: "spring", stiffness: 400, damping: 35 }

// Gentle spring (for larger movements)
{ type: "spring", stiffness: 200, damping: 25 }

// Quick fade
{ duration: 0.2 }

// Standard transition
{ duration: 0.3, ease: "easeOut" }
```

### Hover States
- Scale: 1.02 (subtle)
- Opacity: 0.6 → 1.0
- Color transitions: 0.2s

### Page Transitions
- Fade + slight Y movement (20px)
- Duration: spring with stiffness 400, damping 35

## Component Patterns

### Cards
- Background: `backgroundTertiary`
- Border radius: `md` (8px)
- Shadow: `shadow-card` (light mode only)
- Padding: `lg` (24px)

### Buttons
- Primary: `text` color background, `background` text
- Ghost: Transparent, `textMuted` text, hover to `text`
- Border radius: `sm` (4px)

### Form Inputs
- Background: `backgroundSecondary`
- Border: 1px `divider`
- Focus: 1px `line`
- Border radius: `md` (8px)

### Image Placeholders
When actual images aren't available:
```jsx
<div style={{
  backgroundColor: theme.backgroundTertiary,
  aspectRatio: '16/9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  color: theme.textMuted,
  fontSize: '14px',
  padding: '24px',
  textAlign: 'center'
}}>
  [PLACEHOLDER: Description of needed image]
</div>
```

## Icons
- Style: Outline/stroke, not filled
- Stroke width: 1.5-2px
- Size: 20px default, 18px small, 24px large
- Color: Inherits from parent (currentColor)
- Source: Lucide React or custom SVG

## Do's and Don'ts

### Do
- Use warm grays (brown undertones)
- Keep animations subtle and purposeful
- Maintain generous whitespace
- Use consistent spacing from the grid
- Let content breathe

### Don't
- Use pure black (#000) or pure white (#FFF)
- Use cool grays or blue-tinted colors
- Add decorative animations without purpose
- Use bright accent colors (no neon, no saturated blues)
- Overcrowd layouts
