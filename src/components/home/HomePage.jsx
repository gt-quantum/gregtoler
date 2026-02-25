import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// ============================================
// EDITABLE CONTENT
// ============================================
const homeConfig = {
  headline: 'I help B2B companies fix what\'s broken, build what\'s missing, and scale what works.',
  subheadline: "Most consultants diagnose problems and hand you a deck. I do the work. I'll fix the process that's costing you time, build the system or tool that doesn't exist yet, and put the structure in place so it holds up without me. If it should be automated, I'll automate it. If it needs AI, I'll build it. If it just needs someone to roll up their sleeves and make it work, that's what I do.",
  role: 'Strategy & Systems',
  available: true,
  heroImage: '/images/profile.jpg',

  pillars: [
    {
      id: 'fix-it',
      label: 'Fix It',
      tagline: "Something isn't working and it's costing you time, money, or both.",
      examples: 'Leaking pipelines, bloated tech stacks, manual workflows eating 20+ hours a week, and processes that worked at 10 people but are breaking at 50.',
      href: '/services#fix-it',
    },
    {
      id: 'build-it',
      label: 'Build It',
      tagline: 'You have a gap and nothing off the shelf fills it.',
      examples: 'Custom internal tools, automation systems, AI-powered workflows, data pipelines, and the integrations that connect your stack into something that actually works together.',
      href: '/services#build-it',
    },
    {
      id: 'scale-it',
      label: 'Scale It',
      tagline: "It works today but it won't survive growth.",
      examples: "Service delivery frameworks, SOPs and training programs, customer onboarding systems, and repeatable processes that don't depend on one person's brain.",
      href: '/services#scale-it',
    },
  ],

  stats: [
    { value: '10+', label: 'Years' },
    { value: '40+', label: 'Projects' },
    { value: '12', label: 'Tools built' },
  ],
};

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function HomePage({ latestProject }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState(null);

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

  const glassCard = {
    background: isDarkMode
      ? 'rgba(45, 42, 38, 0.3)'
      : 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.45)'}`,
    borderRadius: '16px',
    boxShadow: isDarkMode
      ? '0 4px 30px rgba(0, 0, 0, 0.15)'
      : '0 4px 30px rgba(0, 0, 0, 0.04)',
  };

  const situations = [
    { label: "Something's broken", value: 'broken' },
    { label: 'Need something built', value: 'build' },
    { label: 'Ready to scale', value: 'scale' },
    { label: 'Not sure yet', value: 'unsure' },
  ];

  const styles = {
    container: {
      width: '100%',
      fontFamily: "'Source Serif 4', Georgia, serif",
      display: 'flex',
      flexDirection: 'column',
    },

    // Bento grid (above the fold)
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'auto auto',
      gap: '12px',
      rowGap: '20px',
    },

    // Row 1: Hero (8) + Intake column (4)
    heroCard: {
      ...glassCard,
      gridColumn: 'span 8',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '32px',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
    },
    intakeWrapper: {
      gridColumn: 'span 4',
      display: 'flex',
    },
    heroTop: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '32px',
    },
    heroInlineLink: {
      display: 'inline',
      gap: '4px',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: currentTheme.text,
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'opacity 0.2s',
      whiteSpace: 'nowrap',
    },
    logoBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px 0',
    },
    brandLogo: {
      height: '20px',
      objectFit: 'contain',
      filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)',
      opacity: 0.4,
    },
    heroPhotoWrapper: {
      width: '120px',
      height: '120px',
      borderRadius: '12px',
      overflow: 'hidden',
      flexShrink: 0,
    },
    heroPhoto: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 30%',
      filter: isDarkMode ? 'brightness(0.95)' : 'none',
    },
    heroPhotoWide: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
      objectPosition: 'center 25%',
      borderRadius: '8px',
      filter: isDarkMode ? 'brightness(0.95)' : 'none',
    },
    heroContent: {
      flex: 1,
      minWidth: 0,
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
      fontSize: '2rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 8px 0',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    heroSub: {
      fontSize: '1rem',
      color: currentTheme.textMuted,
      margin: 0,
      lineHeight: '1.5',
    },

    // Intake teaser card
    intakeCard: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '16px',
      background: isDarkMode
        ? 'rgba(227, 224, 219, 0.85)'
        : 'rgba(45, 42, 38, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '16px',
      border: isDarkMode
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: isDarkMode
        ? '0 8px 32px rgba(0, 0, 0, 0.2)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)',
    },
    // "or book a call" link inside intake card
    intakeBookCall: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.8125rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDarkMode ? 'rgba(45, 42, 38, 0.5)' : 'rgba(250,249,247,0.5)',
      textDecoration: 'none',
      marginTop: '16px',
      transition: 'opacity 0.2s',
    },
    intakeAvailability: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.75rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDarkMode ? 'rgba(45, 42, 38, 0.7)' : 'rgba(250,249,247,0.7)',
    },
    intakeTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: isDarkMode ? '#2C2824' : '#faf9f7',
      margin: '0 0 12px 0',
    },
    intakeSituations: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    situationBtn: {
      display: 'block',
      width: '100%',
      padding: '8px 12px',
      fontSize: '1rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: '6px',
      border: 'none',
      transition: 'all 0.15s ease',
    },
    intakeCta: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: isDarkMode ? '#2C2824' : '#faf9f7',
      textDecoration: 'none',
      marginTop: '4px',
      transition: 'opacity 0.2s',
    },

    // Row 2: Pillar cards (4 + 4 + 4)
    pillarCard: {
      ...glassCard,
      gridColumn: 'span 4',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      borderLeft: `3px solid ${currentTheme.accent}`,
    },
    pillarLabel: {
      fontSize: '0.75rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '8px',
      display: 'block',
    },
    pillarTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 6px 0',
      lineHeight: '1.3',
    },
    pillarTagline: {
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      margin: '0 0 10px 0',
      fontStyle: 'italic',
    },
    pillarExamples: {
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      margin: 0,
      lineHeight: '1.5',
    },
    pillarArrow: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      color: currentTheme.textMuted,
      opacity: 0.5,
    },

    // Below the fold sections
    belowFold: {
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
      marginTop: '80px',
      paddingBottom: '80px',
    },

    // Featured work section
    sectionLabel: {
      display: 'block',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '16px',
    },
    featuredCard: {
      ...glassCard,
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textDecoration: 'none',
      gap: '24px',
      borderLeft: `3px solid ${currentTheme.success}`,
    },
    featuredContent: {
      flex: 1,
    },
    featuredTitle: {
      fontSize: '1.5rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 6px 0',
    },
    featuredMeta: {
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      margin: 0,
    },
    featuredStatus: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
      marginTop: '8px',
    },

    // AI callout section
    aiCard: {
      ...glassCard,
      padding: '40px',
      borderColor: isDarkMode ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.2)',
      borderLeft: `3px solid ${currentTheme.info}`,
    },
    aiTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      color: currentTheme.text,
      margin: '0 0 12px 0',
      letterSpacing: '-0.01em',
    },
    aiBody: {
      fontSize: '1rem',
      color: currentTheme.textMuted,
      lineHeight: '1.7',
      margin: '0 0 20px 0',
    },
    aiTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '20px',
    },
    aiTag: {
      fontSize: '0.875rem',
      padding: '6px 12px',
      borderRadius: '6px',
      background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
      color: currentTheme.text,
    },

    // About teaser
    aboutTeaser: {
      ...glassCard,
      padding: '32px',
      display: 'flex',
      gap: '32px',
      alignItems: 'center',
    },
    aboutPhoto: {
      width: '100px',
      height: '100px',
      borderRadius: '8px',
      overflow: 'hidden',
      flexShrink: 0,
    },
    aboutPhotoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
      filter: isDarkMode ? 'brightness(0.95)' : 'none',
    },
    aboutContent: {
      flex: 1,
    },
    aboutBio: {
      fontSize: '1rem',
      color: currentTheme.text,
      lineHeight: '1.7',
      margin: '0 0 16px 0',
    },
    statsBar: {
      display: 'flex',
      gap: '24px',
      marginBottom: '16px',
    },
    stat: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1px',
    },
    statValue: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: currentTheme.text,
    },
    statLabel: {
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    aboutLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: currentTheme.accent,
      textDecoration: 'none',
      transition: 'opacity 0.2s',
    },

    // Final CTA
    finalCta: {
      padding: '48px 40px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      borderRadius: '16px',
      background: isDarkMode
        ? 'rgba(227, 224, 219, 0.85)'
        : 'rgba(45, 42, 38, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
    finalCtaTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      color: isDarkMode ? '#2C2824' : '#faf9f7',
      margin: 0,
    },
    finalCtaText: {
      fontSize: '1rem',
      color: isDarkMode ? 'rgba(45, 42, 38, 0.7)' : 'rgba(250,249,247,0.7)',
      margin: 0,
    },
    finalCtaAvailability: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.75rem',
      color: isDarkMode ? 'rgba(45, 42, 38, 0.6)' : 'rgba(250,249,247,0.6)',
      marginTop: '4px',
    },
    finalCtaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 28px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: isDarkMode ? '#E3E0DB' : '#2C2824',
      background: isDarkMode ? 'rgba(45, 42, 38, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      cursor: 'pointer',
      marginTop: '8px',
      transition: 'opacity 0.2s',
    },
  };

  return (
    <div style={styles.container} className="home-container">
      {/* Above the fold: Bento grid */}
      <motion.div
        style={styles.grid}
        className="home-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row 1: Hero (8) + Intake Teaser (4) */}
        <motion.div
          style={styles.heroCard}
          className="hero-card"
          variants={itemVariants}
        >
          <div style={styles.heroTop} className="hero-top">
            {homeConfig.heroImage && (<>
              <div style={styles.heroPhotoWrapper} className="hero-photo hero-photo-default">
                <img
                  src={homeConfig.heroImage}
                  alt="Greg Toler"
                  style={styles.heroPhoto}
                />
              </div>
              <img
                src="/images/headshot_extended.png"
                alt="Greg Toler"
                style={styles.heroPhotoWide}
                className="hero-photo-wide"
              />
            </>)}
            <div style={styles.heroContent}>
              <span style={styles.heroRole}>{homeConfig.role}</span>
              <h1 style={styles.heroHeadline}>{homeConfig.headline}</h1>
              <p style={styles.heroSub}>
                {homeConfig.subheadline}
                <span style={{display:'block',height:'10px'}} />
                <a
                  href="/contact"
                  style={styles.heroInlineLink}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Start a project{' '}<span style={{ display: 'inline-flex', verticalAlign: 'middle' }}><ArrowRight color={currentTheme.text} /></span>
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={styles.intakeWrapper}
          className="intake-card"
          variants={itemVariants}
        >
          <div style={styles.intakeCard}>
            <div>
              <div style={styles.intakeAvailability}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: homeConfig.available ? '#4ade80' : currentTheme.textMuted,
                }} />
                <span>{homeConfig.available ? 'Available for projects' : 'Currently booked'}</span>
              </div>
            </div>
            <div>
              <h3 style={styles.intakeTitle}>What can I help with?</h3>
              <div style={styles.intakeSituations}>
                {situations.map((s) => {
                  const isSelected = selectedSituation === s.value;
                  return (
                    <motion.button
                      key={s.value}
                      style={{
                        ...styles.situationBtn,
                        background: isSelected
                          ? (isDarkMode ? 'rgba(45, 42, 38, 0.3)' : 'rgba(255,255,255,0.3)')
                          : (isDarkMode ? 'rgba(45, 42, 38, 0.15)' : 'rgba(255,255,255,0.15)'),
                        color: isDarkMode ? 'rgba(45, 42, 38, 0.9)' : 'rgba(250,249,247,0.9)',
                      }}
                      onClick={() => { window.location.href = `/contact?situation=${s.value}`; }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {s.label}
                    </motion.button>
                  );
                })}
              </div>
              <a
                href="https://calendar.app.google/xjyG2v13KtxkypVm7"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.intakeBookCall}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                or book a call directly{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Row 2: Pillar cards */}
        {homeConfig.pillars.map((pillar) => (
          <motion.a
            key={pillar.id}
            href={pillar.href}
            style={styles.pillarCard}
            className="pillar-card"
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: isDarkMode ? '0 12px 40px rgba(0, 0, 0, 0.2)' : '0 12px 40px rgba(44, 40, 36, 0.14)' }}
          >
            <div>
              <span style={styles.pillarLabel}>{pillar.label}</span>
              <h3 style={styles.pillarTitle}>{pillar.tagline}</h3>
              <p style={styles.pillarExamples}>{pillar.examples}</p>
            </div>
            <div style={styles.pillarArrow}>
              <ArrowRight color={currentTheme.textMuted} />
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Below the fold: Scrollable sections */}
      <div style={styles.belowFold}>
        {/* Brands I've Worked With */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginTop: '-24px', marginBottom: '-24px' }}
        >
          <span style={{ ...styles.sectionLabel, marginBottom: '12px' }}>Brands I've worked with</span>
          <div style={styles.logoBar} className="logo-bar">
            {[
              { name: 'State Farm', src: '/images/brands/state-farm.svg', h: 28 },
              { name: 'Siemens', src: '/images/brands/siemens.svg', h: 16 },
              { name: 'BambooHR', src: '/images/brands/BambooHR_logo.svg.png' },
              { name: 'Parsable', src: '/images/brands/parsable.png' },
              { name: 'CertifID', src: '/images/brands/certifid.svg' },
              { name: 'nrev.ai', src: '/images/brands/nrev.svg' },
              { name: 'Medix', src: '/images/brands/medix.svg' },
              { name: 'Sayers', src: '/images/brands/sayers.svg' },
              { name: 'CRC Group', src: '/images/brands/CRC_logo.svg.png' },
            ].map((brand) => (
              <img
                key={brand.name}
                src={brand.src}
                alt={brand.name}
                title={brand.name}
                style={{ ...styles.brandLogo, ...(brand.h ? { height: brand.h } : {}) }}
              />
            ))}
          </div>
        </motion.section>

        {/* AI & Automation Callout */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span style={styles.sectionLabel}>AI & Automation</span>
          <div style={styles.aiCard}>
            <h3 style={styles.aiTitle}>AI and automation that actually helps</h3>
            <p style={styles.aiBody}>
              Everyone is trying to use AI right now. Most are spending more time on the AI itself than the job it's supposed to do. I help you figure out where AI and automation actually make things better and where they don't. That means architecting AI into processes where it creates real leverage, building agents and automations that make delivery easier over time, and knowing when to leave it alone. No slop. No AI for the sake of AI. I also coach teams on how to use it well so it works for them instead of becoming another thing to manage.
            </p>
            <div style={styles.aiTags}>
              {['AI Architecture', 'Agents & Automation', 'Process Automation', 'Tool Integration', 'AI Coaching'].map((tag) => (
                <span key={tag} style={styles.aiTag}>{tag}</span>
              ))}
            </div>
            <a
              href="/services#ai"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9375rem',
                fontWeight: '500',
                color: currentTheme.text,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              See how it works <ArrowRight color={currentTheme.text} />
            </a>
          </div>
        </motion.section>

        {/* Who I Work With */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span style={styles.sectionLabel}>Who I work with</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px' }} className="audience-grid">
            {[
              {
                label: 'SaaS',
                title: 'GTM teams',
                body: "Your go-to-market engine isn't converting strategy into pipeline. Marketing and sales are busy but disconnected, the tech stack is sprawling, and nobody owns the operational layer that ties it all together.",
              },
              {
                label: 'Services',
                title: 'B2B agencies',
                body: "Your delivery still depends on one person's expertise. The work is good but it's manual, inconsistent, and impossible to scale without burning out the team.",
              },
              {
                label: 'Startup',
                title: 'Founders & operators',
                body: "You need someone to come in and actually build, not just advise. You don't need another strategy deck. You need the process, the tooling, and the systems to make things run.",
              },
            ].map((audience) => (
              <div
                key={audience.title}
                style={{
                  ...glassCard,
                  gridColumn: 'span 4',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderLeft: `3px solid ${currentTheme.accent}`,
                }}
                className="audience-card"
              >
                <span style={styles.pillarLabel}>{audience.label}</span>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  color: currentTheme.text,
                  margin: 0,
                  lineHeight: '1.3',
                }}>{audience.title}</h4>
                <p style={{
                  fontSize: '0.875rem',
                  color: currentTheme.textMuted,
                  margin: 0,
                  lineHeight: '1.6',
                }}>{audience.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mid-page CTA */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div style={{
            ...styles.finalCta,
            textAlign: 'left',
            alignItems: 'stretch',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }} className="mid-cta">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
              <h3 style={{ ...styles.finalCtaTitle, textAlign: 'left' }}>Sound like your situation?</h3>
              <p style={{ ...styles.finalCtaText, textAlign: 'left' }}>Every week you wait is another week of lost revenue, wasted hours, or a team working around something that should just work.</p>
              <a
                href="https://calendar.app.google/xjyG2v13KtxkypVm7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  color: isDarkMode ? 'rgba(45, 42, 38, 0.6)' : 'rgba(250,249,247,0.6)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                or book a call directly{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </a>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              {situations.map((s) => (
                <motion.button
                  key={s.value}
                  style={{
                    ...styles.situationBtn,
                    background: isDarkMode ? 'rgba(45, 42, 38, 0.3)' : 'rgba(255,255,255,0.15)',
                    color: isDarkMode ? '#2C2824' : '#faf9f7',
                  }}
                  onClick={() => { window.location.href = `/contact?situation=${s.value}`; }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {s.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Featured Work */}
        {latestProject && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <span style={styles.sectionLabel}>Featured Work</span>
            <motion.a
              href={`/work/projects/${latestProject.slug}`}
              style={styles.featuredCard}
              whileHover={{ y: -4, boxShadow: isDarkMode ? '0 12px 40px rgba(0, 0, 0, 0.2)' : '0 12px 40px rgba(44, 40, 36, 0.14)' }}
            >
              <div style={styles.featuredContent}>
                <h3 style={styles.featuredTitle}>{latestProject.title}</h3>
                <p style={styles.featuredMeta}>{latestProject.subtitle}</p>
                <div style={styles.featuredStatus}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: latestProject.status === 'active' ? '#4ade80' : currentTheme.textMuted,
                    opacity: latestProject.status === 'active' ? 1 : 0.4,
                    display: 'inline-block',
                  }} />
                  <span>{latestProject.status === 'active' ? 'Active' : 'Completed'}</span>
                </div>
              </div>
              <ArrowRight color={currentTheme.textMuted} />
            </motion.a>
          </motion.section>
        )}

        {/* About Teaser */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span style={styles.sectionLabel}>About</span>
          <div style={styles.aboutTeaser} className="about-teaser">
            <div style={styles.aboutPhoto} className="about-teaser-photo">
              <img
                src="/images/profile.jpg"
                alt="Greg Toler"
                style={styles.aboutPhotoImg}
              />
            </div>
            <div style={styles.aboutContent}>
              <p style={styles.aboutBio}>
                I've spent the last decade helping B2B companies build the systems, processes, and tools that turn strategy into execution. I came up on the GTM side of the house, which means I understand how marketing, sales, and revenue teams actually work. But what I'm best at is the operational layer underneath: figuring out how things should work, building the systems to make them work, and putting the structure in place so they keep working as the business grows.
              </p>
              <div style={styles.statsBar} className="stats-bar">
                {homeConfig.stats.map((stat, i) => (
                  <div key={i} style={styles.stat}>
                    <span style={styles.statValue}>{stat.value}</span>
                    <span style={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
              <a
                href="/about"
                style={styles.aboutLink}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                More about me <ArrowRight color={currentTheme.text} />
              </a>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div style={styles.finalCta}>
            <h3 style={styles.finalCtaTitle}>Start a Project</h3>
            <p style={styles.finalCtaText}>Tell me what's going on. I'll get to work and we'll figure out the right approach together.</p>
            <div style={styles.finalCtaAvailability}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: homeConfig.available ? '#4ade80' : currentTheme.textMuted,
              }} />
              <span>{homeConfig.available ? 'Available for projects' : 'Currently booked'}</span>
            </div>
            <a
              href="/contact"
              style={styles.finalCtaButton}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Get started <ArrowRight color={isDarkMode ? '#E3E0DB' : '#2C2824'} />
            </a>
          </div>
        </motion.section>
      </div>

      {/* Responsive styles */}
      <style>{`
        .hero-photo-wide {
          display: none;
        }
        @media (max-width: 1000px) {
          .hero-photo-default {
            display: none !important;
          }
          .hero-photo-wide {
            display: block !important;
          }
        }
        @media (max-width: 1000px) and (min-width: 769px) {
          .home-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
          .hero-card,
          .intake-card,
          .pillar-card {
            min-height: 100px !important;
          }
          .hero-top {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 1000px) {
          .audience-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 768px) {
          .home-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .hero-card {
            gap: 20px !important;
            padding: 24px !important;
          }
          .hero-top {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .mid-cta {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .mid-cta h3 {
            text-align: center !important;
          }
          .mid-cta a {
            justify-content: center !important;
          }
          .logo-bar {
            flex-wrap: wrap !important;
            gap: 16px !important;
            justify-content: center !important;
          }
          .hero-photo-wide {
            height: 200px !important;
          }
          .pillar-card {
            min-height: 80px !important;
          }
          .about-teaser {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .about-teaser-photo {
            width: 80px !important;
            height: 80px !important;
          }
          .stats-bar {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </div>
  );
}
