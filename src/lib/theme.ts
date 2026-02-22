// GT Strategies Design System
// Warm, editorial palette - no pure black/white, no cool grays

export const theme = {
  light: {
    // Core backgrounds - warm cream/beige tones
    background: '#F3EEE7',
    backgroundSecondary: '#EBE6DE',
    backgroundTertiary: '#E3DED5',

    // Typography - warm browns
    text: '#2C2824',
    textMuted: '#5C5752',
    activeText: '#2C2824',
    inactiveText: '#8A857E',

    // Lines & dividers
    line: '#2C2824',
    dot: '#2C2824',
    divider: '#B5AFA6',

    // Interactive elements
    socialIcon: '#7A756E',
    headerButton: '#6B6560',

    // Accent colors (warm sage green)
    accent: '#5E8C61',
    accentMuted: '#7BA37E',
    accentSubtle: 'rgba(94, 140, 97, 0.08)',

    // Semantic colors (warm-toned)
    success: '#5E8C61',
    successSubtle: 'rgba(94, 140, 97, 0.08)',
    info: '#6B839E',
    infoSubtle: 'rgba(107, 131, 158, 0.08)',
    warning: '#C4935A',
    warningSubtle: 'rgba(196, 147, 90, 0.08)',
    error: '#B5726A',
    errorSubtle: 'rgba(181, 114, 106, 0.08)',

    // Interactive borders & states
    borderStrong: 'rgba(44, 40, 36, 0.15)',
    borderDefault: 'rgba(44, 40, 36, 0.08)',
    borderSubtle: 'rgba(44, 40, 36, 0.04)',
    hoverBg: 'rgba(44, 40, 36, 0.05)',
    activeBg: 'rgba(44, 40, 36, 0.08)',
    focusRing: 'rgba(94, 140, 97, 0.4)',
  },
  dark: {
    // Core backgrounds - warm dark browns, cinematic
    background: '#1A1714',
    backgroundSecondary: '#211E1A',
    backgroundTertiary: '#2A2622',

    // Typography - warm off-whites
    text: '#E3E0DB',
    textMuted: '#B8B4AE',
    activeText: '#E3E0DB',
    inactiveText: '#807A74',

    // Lines & dividers
    line: '#E3E0DB',
    dot: '#E3E0DB',
    divider: '#605B55',

    // Interactive elements
    socialIcon: '#908C86',
    headerButton: '#A8A49E',

    // Accent colors (warm sage green)
    accent: '#7DB880',
    accentMuted: '#9CCAA0',
    accentSubtle: 'rgba(125, 184, 128, 0.1)',

    // Semantic colors
    success: '#7DB880',
    successSubtle: 'rgba(125, 184, 128, 0.1)',
    info: '#8EACC4',
    infoSubtle: 'rgba(142, 172, 196, 0.1)',
    warning: '#D4A86A',
    warningSubtle: 'rgba(212, 168, 106, 0.1)',
    error: '#D4908A',
    errorSubtle: 'rgba(212, 144, 138, 0.1)',

    // Interactive borders & states
    borderStrong: 'rgba(227, 224, 219, 0.18)',
    borderDefault: 'rgba(227, 224, 219, 0.1)',
    borderSubtle: 'rgba(227, 224, 219, 0.05)',
    hoverBg: 'rgba(227, 224, 219, 0.06)',
    activeBg: 'rgba(227, 224, 219, 0.1)',
    focusRing: 'rgba(125, 184, 128, 0.4)',
  },
};

// Shadows (light mode only)
export const shadows = {
  soft: '0 8px 24px rgba(44, 40, 36, 0.10)',
  float: '0 12px 40px rgba(44, 40, 36, 0.14)',
  card: '0 4px 12px rgba(44, 40, 36, 0.07)',
};

// Spacing (8px grid)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

// Border radius
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

// Typography
export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  pageTitle: {
    fontSize: '48px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  sectionHeader: {
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: '0',
    lineHeight: 1.2,
  },
  body: {
    fontSize: '16px',
    fontWeight: 400,
    letterSpacing: '0',
    lineHeight: 1.6,
  },
  navActive: {
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.2px',
    lineHeight: 1.4,
  },
  navInactive: {
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '0.2px',
    lineHeight: 1.4,
  },
  caption: {
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.1px',
    lineHeight: 1.4,
  },
};

// Animation presets (for Framer Motion)
export const animation = {
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 35,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },
  fade: {
    duration: 0.2,
  },
  standard: {
    duration: 0.3,
    ease: 'easeOut' as const,
  },
};

// Type exports
export type Theme = typeof theme.light;
export type ThemeMode = 'light' | 'dark';
