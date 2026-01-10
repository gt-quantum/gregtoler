import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// ============================================
// EDITABLE CONTENT - Update these values
// ============================================
const homeConfig = {
  headline: 'Building revenue systems that scale.',
  role: 'GTM Strategy & Operations',
  available: true, // Set to false when booked
  heroImage: '', // Path to hero photo, e.g., '/images/greg.jpg'

  // Focus areas - match About page
  focus: [
    { area: 'GTM Strategy', description: 'Market segmentation, positioning, go-to-market architecture' },
    { area: 'Revenue Operations', description: 'Process design, tooling, cross-functional alignment' },
    { area: 'Systems & Tooling', description: 'Internal tools and workflows that scale' },
  ],

  // Photography card
  photographyImage: '', // Path to featured photo, e.g., '/images/photography/featured.jpg'
};

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

const StatusDot = ({ active }) => (
  <span style={{
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: active ? '#4ade80' : 'currentColor',
    opacity: active ? 1 : 0.4,
    display: 'inline-block',
    flexShrink: 0,
  }} />
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } }
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function HomePage({ latestProject, latestApp, latestContent }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync with document theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  // Glassmorphic card base styles - very transparent
  const glassCard = {
    background: isDarkMode
      ? 'rgba(45, 42, 38, 0.2)'
      : 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)'}`,
    borderRadius: '16px',
    boxShadow: isDarkMode
      ? '0 4px 30px rgba(0, 0, 0, 0.1)'
      : '0 4px 30px rgba(0, 0, 0, 0.02)',
  };

  // Card with background image support
  const imageCard = (imageUrl) => ({
    ...glassCard,
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  // Overlay for image cards
  const imageOverlay = {
    position: 'absolute',
    inset: 0,
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30, 27, 23, 0.85) 0%, rgba(45, 42, 38, 0.7) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 249, 247, 0.7) 100%)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  // Placeholder gradient for cards without images
  const placeholderGradient = isDarkMode
    ? 'linear-gradient(135deg, rgba(100,95,90,0.3) 0%, rgba(80,75,70,0.2) 100%)'
    : 'linear-gradient(135deg, rgba(180,170,160,0.3) 0%, rgba(160,150,140,0.2) 100%)';

  const styles = {
    container: {
      width: '100%',
      // Account for: margin-top 77px + padding-top 48px + padding-bottom 64px = 189px
      height: 'calc(100vh - 189px)',
      maxHeight: 'calc(100vh - 189px)',
      minHeight: '350px',
      fontFamily: "'Source Serif 4', Georgia, serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },

    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: '1fr 1.5fr 1fr', // 3 rows with proportional heights
      gap: '12px',
      flex: 1,
      minHeight: 0,
      maxHeight: '100%',
      overflow: 'hidden',
    },

    // Row 1: Hero (8) + Contact (4)
    heroCard: {
      ...glassCard,
      gridColumn: 'span 8',
      gridRow: '1',
      display: 'flex',
      alignItems: 'center',
      padding: '24px',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: homeConfig.heroImage ? `url(${homeConfig.heroImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: homeConfig.heroImage
        ? (isDarkMode
          ? 'linear-gradient(90deg, rgba(30, 27, 23, 0.7) 0%, rgba(30, 27, 23, 0.4) 100%)'
          : 'linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)')
        : 'transparent',
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
    },
    heroRole: {
      display: 'block',
      fontSize: '0.75rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '8px',
    },
    heroHeadline: {
      fontSize: '1.5rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: 0,
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    heroArrow: {
      position: 'absolute',
      right: '28px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: currentTheme.textMuted,
      opacity: 0.5,
      zIndex: 1,
    },

    contactCard: {
      gridColumn: 'span 4',
      gridRow: '1',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textDecoration: 'none',
      background: isDarkMode
        ? 'rgba(227, 224, 219, 0.85)'  // Light text color with transparency in dark mode
        : 'rgba(45, 42, 38, 0.85)',     // Dark text color with transparency in light mode
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '16px',
      border: isDarkMode
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: isDarkMode
        ? '0 8px 32px rgba(0, 0, 0, 0.2)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)',
      color: isDarkMode ? 'rgba(45, 42, 38, 0.5)' : 'rgba(250,249,247,0.5)',
    },
    availabilityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.6875rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDarkMode ? 'rgba(45, 42, 38, 0.7)' : 'rgba(250,249,247,0.7)',
      marginBottom: '10px',
    },
    contactTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: currentTheme.bg,
      margin: '0 0 4px 0',
    },
    contactSubtitle: {
      fontSize: '0.8125rem',
      color: isDarkMode ? 'rgba(45, 42, 38, 0.6)' : 'rgba(250,249,247,0.6)',
      margin: 0,
    },

    // Row 2: CMS Cards (4 + 4 + 4)
    cmsCard: {
      gridColumn: 'span 4',
      gridRow: '2',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      minHeight: 0,
    },
    cmsCardOverlay: {
      position: 'absolute',
      inset: 0,
      background: isDarkMode
        ? 'linear-gradient(180deg, rgba(30, 27, 23, 0.1) 0%, rgba(30, 27, 23, 0.6) 100%)'
        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.6) 100%)',
    },
    cmsCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    },
    cmsCardLabel: {
      fontSize: '0.625rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    cmsCardContent: {
      position: 'relative',
      zIndex: 1,
    },
    cmsCardTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 4px 0',
      lineHeight: '1.3',
    },
    cmsCardMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
    },
    cmsCardArrow: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      color: currentTheme.textMuted,
      opacity: 0.5,
      zIndex: 1,
    },
    playBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.625rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: currentTheme.textMuted,
      background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      padding: '4px 8px',
      borderRadius: '4px',
    },

    // Row 3: Focus (7) + Photography (5)
    focusCard: {
      ...glassCard,
      gridColumn: 'span 7',
      gridRow: '3',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    focusLabel: {
      display: 'block',
      fontSize: '0.625rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '10px',
      flexShrink: 0,
    },
    focusItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      overflow: 'hidden',
    },
    focusItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1px',
    },
    focusArea: {
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: currentTheme.text,
    },
    focusDescription: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
    },

    photoCard: {
      ...glassCard,
      gridColumn: 'span 5',
      gridRow: '3',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '16px 20px',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: homeConfig.photographyImage ? `url(${homeConfig.photographyImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    photoCardOverlay: {
      position: 'absolute',
      inset: 0,
      background: isDarkMode
        ? 'linear-gradient(180deg, rgba(30, 27, 23, 0.1) 0%, rgba(30, 27, 23, 0.6) 100%)'
        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.6) 100%)',
    },
    photoCardContent: {
      position: 'relative',
      zIndex: 1,
      marginTop: 'auto',
    },
    photoCardLabel: {
      display: 'block',
      fontSize: '0.625rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '8px',
    },
    photoCardTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 4px 0',
    },
    photoCardSubtitle: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
      margin: 0,
    },
    photoCardArrow: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: currentTheme.textMuted,
      opacity: 0.5,
      zIndex: 1,
    },
  };

  // Format relative date
  const formatRelativeDate = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get background for CMS cards
  const getCmsCardBackground = (previewImage) => {
    if (previewImage) {
      return {
        backgroundImage: `url(${previewImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {
      background: placeholderGradient,
    };
  };

  return (
    <div style={styles.container} className="home-container">
      <motion.div
        style={styles.grid}
        className="home-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row 1: Hero (8) + Contact (4) */}
        <motion.a
          href="/about"
          style={styles.heroCard}
          className="hero-card"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <span style={styles.heroRole}>{homeConfig.role}</span>
            <h1 style={styles.heroHeadline}>{homeConfig.headline}</h1>
          </div>
          <div style={styles.heroArrow}><ArrowRight color={currentTheme.textMuted} /></div>
        </motion.a>

        <motion.a
          href="/contact"
          style={styles.contactCard}
          className="contact-card"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <div style={styles.availabilityBadge}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: homeConfig.available ? '#4ade80' : currentTheme.textMuted,
              }} />
              <span>{homeConfig.available ? 'Available for projects' : 'Currently booked'}</span>
            </div>
            <h3 style={styles.contactTitle}>Let's work together</h3>
            <p style={styles.contactSubtitle}>Have a project in mind?</p>
          </div>
          <ArrowRight color={isDarkMode ? 'rgba(45, 42, 38, 0.5)' : 'rgba(250,249,247,0.5)'} />
        </motion.a>

        {/* Row 2: Latest Project (4) + Latest App (4) + Latest Content (4) */}
        {latestProject && (
          <motion.a
            href={`/work/projects/${latestProject.slug}`}
            style={{
              ...styles.cmsCard,
              ...getCmsCardBackground(latestProject.coverImage),
              ...glassCard,
            }}
            className="cms-card"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div style={styles.cmsCardOverlay} />
            <div style={styles.cmsCardHeader}>
              <span style={styles.cmsCardLabel}>Latest Project</span>
            </div>
            <div style={styles.cmsCardContent}>
              <h3 style={styles.cmsCardTitle}>{latestProject.title}</h3>
              <div style={styles.cmsCardMeta}>
                <StatusDot active={latestProject.status === 'active'} />
                <span>{latestProject.subtitle}</span>
              </div>
            </div>
            <div style={styles.cmsCardArrow}><ArrowRight color={currentTheme.textMuted} /></div>
          </motion.a>
        )}

        {latestApp && (
          <motion.a
            href={`/work/apps/${latestApp.slug}`}
            style={{
              ...styles.cmsCard,
              ...getCmsCardBackground(latestApp.previewImage),
              ...glassCard,
            }}
            className="cms-card"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div style={styles.cmsCardOverlay} />
            <div style={styles.cmsCardHeader}>
              <span style={styles.cmsCardLabel}>Latest App</span>
              {latestApp.videoUrl && (
                <span style={styles.playBadge}>
                  <PlayIcon /> Video
                </span>
              )}
            </div>
            <div style={styles.cmsCardContent}>
              <h3 style={styles.cmsCardTitle}>{latestApp.name}</h3>
              <div style={styles.cmsCardMeta}>
                <span>{latestApp.tagline}</span>
              </div>
            </div>
            <div style={styles.cmsCardArrow}><ArrowRight color={currentTheme.textMuted} /></div>
          </motion.a>
        )}

        {latestContent && (
          <motion.a
            href={`/content/${latestContent.slug}`}
            style={{
              ...styles.cmsCard,
              ...getCmsCardBackground(latestContent.coverImage),
              ...glassCard,
            }}
            className="cms-card"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div style={styles.cmsCardOverlay} />
            <div style={styles.cmsCardHeader}>
              <span style={styles.cmsCardLabel}>Latest Content</span>
            </div>
            <div style={styles.cmsCardContent}>
              <h3 style={styles.cmsCardTitle}>{latestContent.title}</h3>
              <div style={styles.cmsCardMeta}>
                <span>{latestContent.contentType} · {formatRelativeDate(latestContent.date)}</span>
              </div>
            </div>
            <div style={styles.cmsCardArrow}><ArrowRight color={currentTheme.textMuted} /></div>
          </motion.a>
        )}

        {/* Row 3: Focus (7) + Photography (5) */}
        <motion.div style={styles.focusCard} className="focus-card" variants={itemVariants}>
          <span style={styles.focusLabel}>Focus</span>
          <div style={styles.focusItems}>
            {homeConfig.focus.map((item, i) => (
              <div key={i} style={styles.focusItem}>
                <span style={styles.focusArea}>{item.area}</span>
                <span style={styles.focusDescription}>{item.description}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.a
          href="/photography"
          style={styles.photoCard}
          className="photo-card"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          <div style={styles.photoCardOverlay} />
          <div style={styles.photoCardArrow}><ArrowRight color={currentTheme.textMuted} /></div>
          <div style={styles.photoCardContent}>
            <span style={styles.photoCardLabel}>Just for Fun</span>
            <h3 style={styles.photoCardTitle}>Photography</h3>
            <p style={styles.photoCardSubtitle}>Check out some shots I've taken</p>
          </div>
        </motion.a>
      </motion.div>

      {/* Responsive styles */}
      <style>{`
        /* Desktop: ensure no scroll */
        @media (min-width: 1001px) {
          .home-container {
            height: calc(100vh - 189px) !important;
            max-height: calc(100vh - 189px) !important;
            overflow: hidden !important;
          }
          .home-grid {
            height: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
          }
        }
        @media (max-width: 1200px) and (min-width: 769px) {
          .home-container {
            /* padding: 40px top + 48px bottom + 77px margin = 165px */
            height: calc(100vh - 165px) !important;
            max-height: calc(100vh - 165px) !important;
          }
        }
        @media (max-width: 1000px) and (min-width: 769px) {
          .home-container {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .home-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
            overflow: visible !important;
          }
          .hero-card,
          .contact-card,
          .cms-card,
          .focus-card,
          .photo-card {
            min-height: 100px !important;
          }
        }
        @media (max-width: 768px) {
          .home-container {
            height: auto !important;
            max-height: none !important;
            min-height: auto !important;
            padding-bottom: 40px !important;
            overflow: visible !important;
          }
          .home-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            overflow: visible !important;
          }
          .hero-card,
          .contact-card,
          .focus-card,
          .photo-card {
            min-height: 100px !important;
          }
          .cms-card {
            min-height: 120px !important;
          }
        }
      `}</style>
    </div>
  );
}
