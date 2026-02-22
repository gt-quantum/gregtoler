import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// ============================================
// EDITABLE CONTENT
// ============================================
const homeConfig = {
  headline: 'I help B2B businesses fix, build, and scale their operations.',
  subheadline: "Stop working around broken processes, manual workflows, disconnected systems, or services that don't scale. Whether you need someone to build the solution or help you find it, let's work together.",
  role: 'Operations & GTM Strategy',
  available: true,
  heroImage: '/images/profile.jpg',

  pillars: [
    {
      id: 'fix-it',
      label: 'Fix It',
      tagline: 'Making what exists work better.',
      examples: 'Broken lead flows, bloated tech stacks, 20-hour manual workflows, pipeline leaks between marketing and sales.',
      href: '/services#fix-it',
    },
    {
      id: 'build-it',
      label: 'Build It',
      tagline: 'Making something new that needs to exist.',
      examples: 'AI-powered newsletter systems, custom territory mapping apps, RAG architectures, automated data pipelines.',
      href: '/services#build-it',
    },
    {
      id: 'scale-it',
      label: 'Scale It',
      tagline: 'Making what works repeatable.',
      examples: 'Service delivery frameworks, SOPs and training programs, customer onboarding systems, productized offerings.',
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
      minHeight: '420px',
    },

    // Row 1: Hero (8) + Intake Teaser (4)
    heroCard: {
      ...glassCard,
      gridColumn: 'span 8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '28px',
      padding: '32px 32px 20px 32px',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
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
    heroLogos: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: 0.35,
      width: '100%',
    },
    heroLogoImg: {
      height: '18px',
      objectFit: 'contain',
      filter: isDarkMode ? 'invert(1) brightness(2)' : 'brightness(0)',
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
      gridColumn: 'span 4',
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
          <div style={styles.heroLogos}>
            {[
              { name: 'HubSpot', src: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg' },
              { name: 'Salesforce', src: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
              { name: 'OpenAI', src: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },
              { name: 'Notion', src: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg' },
              { name: 'Zapier', src: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
              { name: 'Google Cloud', src: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
            ].map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                style={styles.heroLogoImg}
                title={logo.name}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          style={styles.intakeCard}
          className="intake-card"
          variants={itemVariants}
        >
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

        {/* AI & Automation Callout */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span style={styles.sectionLabel}>AI & Automation</span>
          <div style={styles.aiCard}>
            <h3 style={styles.aiTitle}>AI is built into how I work</h3>
            <p style={styles.aiBody}>
              Every engagement gets evaluated through an AI lens. Where can automation create leverage? Where does a custom AI system replace a $35/seat SaaS license? Where does an AI agent handle the repetitive work so your team focuses on judgment calls?
            </p>
            <div style={styles.aiTags}>
              {['MCP Development', 'RAG Architecture', 'AI Agents', 'Custom Automation', 'AI-Forward Ops'].map((tag) => (
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
                For the past decade, I've helped B2B companies build the systems, processes, and tooling that turn strategy into execution. I sit at the intersection of marketing, sales, and operations, designing the connective tissue that makes revenue teams work.
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
            <p style={styles.finalCtaText}>Tell me what's going on. We'll figure out the right approach together.</p>
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
