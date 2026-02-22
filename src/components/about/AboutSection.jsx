import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// ============================================
// ABOUT PAGE DATA
// ============================================
const aboutData = {
  name: "Greg Toler",
  role: "Operations Strategy & AI Architecture",
  location: "South Carolina",
  status: "Available for projects",
  statusActive: true,
  headline: "I build the systems that make businesses run.",
  bio: [
    "For the past decade, I've helped B2B companies build the systems, processes, and tooling that turn strategy into execution. I sit at the intersection of marketing, sales, and operations, designing the connective tissue that makes revenue teams work.",
    "My approach is hands-on. I don't just advise. I build. Whether it's architecting a territory model, designing an ABM program, shipping internal tools, or building AI systems that replace manual workflows, the best strategy is one you can actually implement.",
    "I started in go-to-market operations, spending years deep in the systems and politics of getting marketing and sales teams working together. Territory planning, pipeline optimization, tech stack architecture, revenue operations. The work taught me that most operational problems aren't technology problems. They're design problems.",
    "That perspective led me to broader operational work: serving as an embedded COO for an agency, productizing service delivery for consulting firms, building AI-powered automation systems, and designing custom tools that replace expensive enterprise software at a fraction of the cost.",
    "Today, I work with businesses that need someone who can think strategically and get their hands dirty. Not one or the other. Fix what's broken, build what's missing, scale what works.",
  ],
  focus: [
    { area: "Operations & Process Design", description: "Workflow design, system architecture, cross-functional alignment, operational efficiency" },
    { area: "AI & Automation", description: "AI system architecture, MCP development, RAG systems, AI agents, intelligent automation" },
    { area: "GTM Strategy", description: "Go-to-market architecture, territory planning, pipeline optimization, revenue operations" },
    { area: "Custom Tools & Systems", description: "Internal tools, dashboards, integrations, purpose-built applications" },
  ],
  interests: [
    { area: "Photography", description: "Landscape and street photography. A creative outlet that exercises a completely different part of my brain." },
    { area: "Building Things", description: "Side projects, prototypes, tools I wish existed. Most of my best ideas for client work started as experiments." },
  ],
  stats: [
    { value: "10+", label: "Years experience" },
    { value: "40+", label: "Projects shipped" },
    { value: "12", label: "Tools built" },
  ],
  links: [
    { label: "Email", href: "mailto:greg@gregtoler.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/gregtoler" },
    { label: "YouTube", href: "https://youtube.com/@gregtolerops" },
  ],
};

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StatusDot = ({ active }) => (
  <span style={{
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: active ? '#4ade80' : 'currentColor',
    opacity: active ? 1 : 0.4,
    display: 'inline-block',
    flexShrink: 0,
  }} />
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function AboutSection() {
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

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
  };

  const transition = {
    duration: 1.1,
    ease: [0.33, 1, 0.68, 1],
  };

  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '80px',
      width: '100%',
      alignItems: 'start',
    },

    main: {
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
    },

    section: {},

    sectionLabel: {
      display: 'block',
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      marginBottom: '16px',
    },

    headline: {
      fontSize: '2.25rem',
      fontWeight: '400',
      color: currentTheme.text,
      lineHeight: '1.2',
      margin: 0,
      letterSpacing: '-0.02em',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    bioParagraph: {
      fontSize: '1.0625rem',
      color: currentTheme.text,
      lineHeight: '1.75',
      marginBottom: '20px',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    focusList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },

    focusItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },

    focusTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: 0,
    },

    focusDescription: {
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      lineHeight: '1.5',
      margin: 0,
    },

    // Interests section
    interestsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },

    // CTA section
    ctaSection: {
      padding: '32px',
      borderRadius: '12px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      border: `1px solid ${borderColor}`,
      borderLeft: `3px solid ${currentTheme.warning}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    ctaTitle: {
      fontSize: '1.25rem',
      fontWeight: '400',
      color: currentTheme.text,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    ctaText: {
      fontSize: '0.9375rem',
      color: currentTheme.textMuted,
      margin: 0,
      lineHeight: '1.6',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    ctaLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: currentTheme.accent,
      textDecoration: 'none',
      transition: 'opacity 0.2s',
    },

    // Sidebar
    sidebar: {
      position: 'sticky',
      top: '125px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },

    photoWrapper: {
      width: '100%',
      aspectRatio: '1/1',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    photoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
      filter: isDarkMode ? 'brightness(0.95)' : 'none',
    },

    identity: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    name: {
      fontSize: '1.25rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    role: {
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      margin: 0,
    },

    statusWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 0',
      borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    },
    statusText: {
      fontSize: '0.8125rem',
      color: currentTheme.text,
    },

    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
    },
    stat: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    statValue: {
      fontSize: '1.25rem',
      fontWeight: '500',
      color: currentTheme.text,
    },
    statLabel: {
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },

    links: {
      display: 'flex',
      flexDirection: 'column',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      color: currentTheme.text,
      textDecoration: 'none',
      padding: '10px 0',
      borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
      transition: 'opacity 0.2s ease',
    },

    location: {
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
      margin: 0,
    },
  };

  return (
    <div style={styles.container} className="about-container">
      <style>{`
        @media (max-width: 900px) {
          .about-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
          .about-main {
            display: contents !important;
          }
          .about-sidebar {
            display: contents !important;
            position: relative !important;
          }
          .about-identity { order: 1; }
          .about-photo { order: 2; max-width: 280px; }
          .about-headline { order: 3; }
          .about-bio { order: 4; }
          .about-focus { order: 5; }
          .about-interests { order: 6; }
          .about-cta { order: 7; }
          .about-status { order: 8; max-width: 320px; }
          .about-stats { order: 9; max-width: 320px; }
          .about-links { order: 10; max-width: 320px; }
          .about-location { order: 11; }
        }
      `}</style>

      {/* Left: Main Content */}
      <main style={styles.main} className="about-main">
        {/* Headline */}
        <motion.section
          style={styles.section}
          className="about-headline"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: 0.1 }}
        >
          <h2 style={styles.headline}>{aboutData.headline}</h2>
        </motion.section>

        {/* Bio */}
        <motion.section
          style={styles.section}
          className="about-bio"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: 0.2 }}
        >
          <span style={styles.sectionLabel}>About</span>
          <div>
            {aboutData.bio.map((p, i) => (
              <p key={i} style={styles.bioParagraph}>{p}</p>
            ))}
          </div>
        </motion.section>

        {/* Focus */}
        <motion.section
          style={styles.section}
          className="about-focus"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: 0.3 }}
        >
          <span style={styles.sectionLabel}>Focus</span>
          <div style={styles.focusList}>
            {aboutData.focus.map((item, i) => (
              <div key={i} style={styles.focusItem}>
                <h3 style={styles.focusTitle}>{item.area}</h3>
                <p style={styles.focusDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interests */}
        <motion.section
          style={styles.section}
          className="about-interests"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...transition }}
        >
          <span style={styles.sectionLabel}>Beyond Work</span>
          <div style={styles.interestsList}>
            {aboutData.interests.map((item, i) => (
              <div key={i} style={styles.focusItem}>
                <h3 style={styles.focusTitle}>{item.area}</h3>
                <p style={styles.focusDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          style={styles.section}
          className="about-cta"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...transition }}
        >
          <div style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>Want to work together?</h3>
            <p style={styles.ctaText}>
              I help businesses fix, build, and scale their operations. Tell me what's going on and we'll figure out the right approach.
            </p>
            <a
              href="/contact"
              style={styles.ctaLink}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Start a project <ArrowRight color={currentTheme.accent} />
            </a>
          </div>
        </motion.section>
      </main>

      {/* Right: Profile Sidebar */}
      <motion.aside
        style={styles.sidebar}
        className="about-sidebar"
        variants={fadeInRight}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.15 }}
      >
        {/* Name & Role */}
        <div style={styles.identity} className="about-identity">
          <h1 style={styles.name}>{aboutData.name}</h1>
          <p style={styles.role}>{aboutData.role}</p>
        </div>

        {/* Photo */}
        <div style={styles.photoWrapper} className="about-photo">
          <img
            src="/images/profile.jpg"
            alt={aboutData.name}
            style={styles.photoImage}
          />
        </div>

        {/* Status */}
        <div style={styles.statusWrapper} className="about-status">
          <StatusDot active={aboutData.statusActive} />
          <span style={styles.statusText}>{aboutData.status}</span>
        </div>

        {/* Quick Stats */}
        <div style={styles.stats} className="about-stats">
          {aboutData.stats.map((stat, i) => (
            <div key={i} style={styles.stat}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={styles.links} className="about-links">
          {aboutData.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              style={styles.link}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <span>{link.label}</span>
              <ArrowRight color={currentTheme.textMuted} />
            </a>
          ))}
        </div>

        {/* Location */}
        <p style={styles.location} className="about-location">{aboutData.location}</p>
      </motion.aside>
    </div>
  );
}
