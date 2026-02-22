import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ServicesPage() {
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

  const transition = {
    duration: 1.1,
    ease: [0.33, 1, 0.68, 1],
  };

  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      width: '100%',
      maxWidth: '860px',
      paddingBottom: '80px',
    },

    // Header
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
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
    headerDescription: {
      fontSize: '1.125rem',
      color: currentTheme.textMuted,
      lineHeight: '1.7',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
      maxWidth: '640px',
    },

    // Pillar sections
    pillarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    pillarCard: {
      ...glassCard,
      padding: '40px',
      borderLeft: `3px solid ${currentTheme.accent}`,
    },
    pillarLabel: {
      display: 'inline-block',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '8px',
    },
    pillarTitle: {
      fontSize: '1.75rem',
      fontWeight: '400',
      color: currentTheme.text,
      margin: '0 0 8px 0',
      letterSpacing: '-0.01em',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    pillarTagline: {
      fontSize: '1rem',
      color: currentTheme.textMuted,
      margin: '0 0 24px 0',
      fontStyle: 'italic',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    pillarBody: {
      fontSize: '1.0625rem',
      color: currentTheme.text,
      lineHeight: '1.75',
      margin: '0 0 24px 0',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Examples
    examplesLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '12px',
      display: 'block',
    },
    examplesList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 24px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    exampleItem: {
      fontSize: '0.9375rem',
      color: currentTheme.text,
      lineHeight: '1.6',
      paddingLeft: '16px',
      position: 'relative',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    exampleBullet: {
      position: 'absolute',
      left: 0,
      top: '10px',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: currentTheme.textMuted,
    },

    // Results
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '24px',
    },
    resultItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: '12px 16px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '8px',
    },
    resultValue: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: currentTheme.text,
    },
    resultLabel: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
    },

    // CTA link
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

    // Section divider
    divider: {
      width: '40px',
      height: '1px',
      background: borderColor,
    },

    // AI section
    aiCard: {
      ...glassCard,
      padding: '40px',
      borderColor: isDarkMode ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.2)',
      borderLeft: `3px solid ${currentTheme.info}`,
    },
    aiCapabilities: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      margin: '0 0 24px 0',
    },
    aiCapability: {
      fontSize: '0.9375rem',
      color: currentTheme.text,
      lineHeight: '1.5',
      padding: '8px 14px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '6px',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    aiPillarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '24px',
    },
    aiPillarItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      padding: '16px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '8px',
    },
    aiPillarName: {
      fontSize: '0.8125rem',
      fontWeight: '500',
      color: currentTheme.text,
    },
    aiPillarDesc: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
      lineHeight: '1.5',
    },

    // Partnership section
    partnershipCard: {
      ...glassCard,
      padding: '40px',
      borderLeft: `3px solid ${currentTheme.success}`,
    },
    partnershipBenefits: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '24px',
    },
    benefitItem: {
      fontSize: '0.9375rem',
      color: currentTheme.text,
      lineHeight: '1.5',
      padding: '12px 16px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '8px',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Who I Work With
    audienceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    audienceCard: {
      ...glassCard,
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    audienceTitle: {
      fontSize: '1.25rem',
      fontWeight: '400',
      color: currentTheme.text,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    audienceBody: {
      fontSize: '0.9375rem',
      color: currentTheme.textMuted,
      lineHeight: '1.6',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    audienceStarting: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
      lineHeight: '1.6',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Final CTA
    finalCta: {
      ...glassCard,
      padding: '48px 40px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      background: isDarkMode
        ? 'rgba(227, 224, 219, 0.85)'
        : 'rgba(45, 42, 38, 0.85)',
    },
    finalCtaTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      color: isDarkMode ? '#2C2824' : '#faf9f7',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    finalCtaText: {
      fontSize: '1rem',
      color: isDarkMode ? 'rgba(45, 42, 38, 0.7)' : 'rgba(250,249,247,0.7)',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
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

  const examples = {
    fixIt: [
      "Mapped a broken lead flow for a 5-person GTM team, analyzed how all their programs and campaigns were siloed, and rebuilt them into a single connected strategy",
      "Built a time-study system for a founder, identified bottlenecks consuming 20+ hours/week, then automated and restructured workflows to reclaim that time",
      "Audited a full marketing/sales tech stack, cut redundant tools, rebuilt data flow between the systems that stayed",
      "Identified where qualified opportunities were dying in handoff between marketing and sales, redesigned the process end-to-end",
    ],
    buildIt: [
      "Built a fully automated AI-powered newsletter system: ingests data from multiple sources, researches externally, generates content, queues for review on Thursday, sends on Friday. Generating 10-15 monthly demos from it.",
      "Created a custom desktop app for enterprise sales territory mapping with visualization and planning features. Bought the IP back and developed it into a standalone product.",
      "Architected a RAG system with Slack integration so sales and marketing teams can chat with their entire Google Drive content library in real time. Fraction of the cost of a $35/seat SaaS license.",
      "Built a custom data intake pipeline connecting Clay, Airtable, and automation platforms for lead enrichment and routing",
    ],
    scaleIt: [
      "Built complete service delivery frameworks for a marketing agency across multiple service lines: templates, SOPs, documentation, strategy guides, and team training",
      "Currently productizing a client's delivery services by shadowing their SME through live deliveries, documenting the process in real-time, building SOPs, then training their team to execute",
      "Created customer onboarding systems with defined entrance/exit criteria and quality gates at each stage",
      "Built training programs for both internal teams and customer-facing delivery teams",
    ],
  };

  const renderExamples = (items) => (
    <ul style={styles.examplesList}>
      {items.map((item, i) => (
        <li key={i} style={styles.exampleItem}>
          <span style={styles.exampleBullet} />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={styles.container} className="services-container">
      <style>{`
        @media (max-width: 768px) {
          .services-container {
            gap: 48px !important;
          }
          .services-pillar-card {
            padding: 24px !important;
          }
          .services-results-grid {
            grid-template-columns: 1fr !important;
          }
          .services-ai-pillar-grid {
            grid-template-columns: 1fr !important;
          }
          .services-audience-grid {
            grid-template-columns: 1fr !important;
          }
          .services-benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <motion.header
        style={styles.header}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.1 }}
      >
        <h1 style={styles.headline}>I help businesses fix, build, and scale their operations.</h1>
        <p style={styles.headerDescription}>
          Process design, AI architecture, custom tools, automation, strategy. Whatever the problem is, I work hands-on to solve it. Most engagements start with one of three situations.
        </p>
      </motion.header>

      {/* Fix It */}
      <motion.section
        id="fix-it"
        style={styles.pillarSection}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.2 }}
      >
        <div style={styles.pillarCard} className="services-pillar-card">
          <span style={styles.pillarLabel}>Pillar 01</span>
          <h2 style={styles.pillarTitle}>Fix It</h2>
          <p style={styles.pillarTagline}>Making what exists work better.</p>
          <p style={styles.pillarBody}>
            Most people reach out because something isn't working. Leads are stalling. A process takes 10 steps when it should take 3. A founder is spending 20 hours a week on things that should be automated. Operations are slow, expensive, or inconsistent and it's not obvious where the problem actually is.
          </p>
          <p style={styles.pillarBody}>
            I dig into the operations, processes, systems, tools, and team workflows. I find where things are breaking down and redesign them. Not a report. Not a recommendation deck. Actual fixes, implemented and working.
          </p>

          <span style={styles.examplesLabel}>What this looks like</span>
          {renderExamples(examples.fixIt)}

          <span style={styles.examplesLabel}>Typical results</span>
          <div style={styles.resultsGrid} className="services-results-grid">
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>15-25 hrs/week</span>
              <span style={styles.resultLabel}>Reclaimed for founders and execs</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>20-40%</span>
              <span style={styles.resultLabel}>Reduction in operational costs</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>30-50%</span>
              <span style={styles.resultLabel}>Capacity increase (1-2 hires worth)</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>Revenue</span>
              <span style={styles.resultLabel}>Recovered from pipeline leaks</span>
            </div>
          </div>

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

      {/* Build It */}
      <motion.section
        id="build-it"
        style={styles.pillarSection}
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transition }}
      >
        <div style={styles.pillarCard} className="services-pillar-card">
          <span style={styles.pillarLabel}>Pillar 02</span>
          <h2 style={styles.pillarTitle}>Build It</h2>
          <p style={styles.pillarTagline}>Making something new that needs to exist.</p>
          <p style={styles.pillarBody}>
            Sometimes the thing you need doesn't exist yet. Off-the-shelf tools don't solve the problem, or building custom is faster and cheaper than configuring enterprise software. You need a system, an app, an automation, a tool that does exactly what your business requires.
          </p>
          <p style={styles.pillarBody}>
            I design and build it. Applications, AI systems, automations, integrations, dashboards, internal tools. Purpose-built for your specific problem.
          </p>

          <span style={styles.examplesLabel}>What this looks like</span>
          {renderExamples(examples.buildIt)}

          <span style={styles.examplesLabel}>Typical results</span>
          <div style={styles.resultsGrid} className="services-results-grid">
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>60-80%</span>
              <span style={styles.resultLabel}>Cost savings vs. enterprise software</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>15-40 hrs/week</span>
              <span style={styles.resultLabel}>Of manual work automated</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>Days</span>
              <span style={styles.resultLabel}>Not vendor roadmap quarters</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>Custom</span>
              <span style={styles.resultLabel}>Capabilities competitors can't replicate</span>
            </div>
          </div>

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

      {/* Scale It */}
      <motion.section
        id="scale-it"
        style={styles.pillarSection}
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transition }}
      >
        <div style={styles.pillarCard} className="services-pillar-card">
          <span style={styles.pillarLabel}>Pillar 03</span>
          <h2 style={styles.pillarTitle}>Scale It</h2>
          <p style={styles.pillarTagline}>Making what works repeatable without you.</p>
          <p style={styles.pillarBody}>
            You have something that works. A service, a program, a process. But it's delivered manually, inconsistently, or it lives entirely in one person's head. You can't grow it without that person being involved in every delivery. You can't hire for it because there's nothing documented. You can't step away from it because it falls apart.
          </p>
          <p style={styles.pillarBody}>
            I shadow your experts, document everything, systematize the delivery, build training materials, and hand it off so your team runs it independently. Manual and custom work becomes repeatable and scalable with clear quality standards.
          </p>

          <span style={styles.examplesLabel}>What this looks like</span>
          {renderExamples(examples.scaleIt)}

          <span style={styles.examplesLabel}>Typical results</span>
          <div style={styles.resultsGrid} className="services-results-grid">
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>2-3x</span>
              <span style={styles.resultLabel}>Revenue capacity without headcount</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>30-50%</span>
              <span style={styles.resultLabel}>Reduction in delivery costs</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>Weeks</span>
              <span style={styles.resultLabel}>New hires productive (not months)</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultValue}>20-40 hrs</span>
              <span style={styles.resultLabel}>Founder time reclaimed per week</span>
            </div>
          </div>

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

      {/* AI & Automation */}
      <motion.section
        id="ai"
        style={{
          ...styles.pillarSection,
          padding: '40px 32px',
          margin: '0 -32px',
          borderRadius: '16px',
          background: currentTheme.infoSubtle,
        }}
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transition }}
      >
        <div style={styles.aiCard} className="services-pillar-card">
          <span style={styles.pillarLabel}>AI & Automation</span>
          <h2 style={styles.pillarTitle}>AI is built into the approach</h2>
          <p style={styles.pillarBody}>
            AI is part of how I think about every engagement. When I'm fixing, building, or scaling something, I'm always evaluating where AI and automation create leverage. It's not a separate offering. It's structural.
          </p>
          <p style={styles.pillarBody}>
            If you're specifically looking to implement AI in your operations, product, or workflows, this is a significant part of what I do. I don't plug in tools and call it AI. I architect systems where AI becomes a structural advantage in how your business operates.
          </p>

          <span style={styles.examplesLabel}>Capabilities</span>
          <div style={styles.aiCapabilities}>
            {[
              'AI system architecture and design',
              'Custom MCP (Model Context Protocol) development',
              'AI agent design and implementation',
              'RAG system architecture (retrieval-augmented generation)',
              'AI-forward operations design: systems and processes designed by and for AI',
              'Adoption and implementation: getting teams actually using AI effectively',
              'Intelligent automation: adaptive systems that learn and improve',
            ].map((cap, i) => (
              <div key={i} style={styles.aiCapability}>{cap}</div>
            ))}
          </div>

          <span style={styles.examplesLabel}>How it shows up across the pillars</span>
          <div style={styles.aiPillarGrid} className="services-ai-pillar-grid">
            <div style={styles.aiPillarItem}>
              <span style={styles.aiPillarName}>Fix It</span>
              <span style={styles.aiPillarDesc}>Automating manual processes, building intelligent monitoring, replacing repetitive decision-making</span>
            </div>
            <div style={styles.aiPillarItem}>
              <span style={styles.aiPillarName}>Build It</span>
              <span style={styles.aiPillarDesc}>Custom AI agents, RAG architectures, MCP servers, AI-native internal tools</span>
            </div>
            <div style={styles.aiPillarItem}>
              <span style={styles.aiPillarName}>Scale It</span>
              <span style={styles.aiPillarDesc}>AI-assisted quality assurance, automated training and onboarding, AI-augmented delivery</span>
            </div>
          </div>

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

      {/* Ongoing Partnership */}
      <motion.section
        style={styles.pillarSection}
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transition }}
      >
        <div style={styles.partnershipCard} className="services-pillar-card">
          <span style={styles.pillarLabel}>What comes next</span>
          <h2 style={styles.pillarTitle}>Ongoing Partnership</h2>
          <p style={styles.pillarBody}>
            Most people start with a project. Fix something, build something, scale something. If there's a good fit and the work keeps going, we shift into an ongoing partnership. An embedded operational partner who handles optimization, building, problem-solving, and strategic execution as the business evolves.
          </p>

          <span style={styles.examplesLabel}>What this looks like</span>
          {renderExamples([
            "Served as embedded COO for an agency for nearly three years: operations, team management, process design, financial operations, tool implementation",
            "Currently embedded with a client on fractional GTM ops: operationalizing their enterprise strategy with custom tool development, process design, and team enablement",
            "Ongoing marketing operations partnerships: process review, tool implementation, team training as the business scales",
          ])}

          <span style={styles.examplesLabel}>Why clients stay</span>
          <div style={styles.partnershipBenefits} className="services-benefits-grid">
            <div style={styles.benefitItem}>25-40% the cost of a full-time operations hire</div>
            <div style={styles.benefitItem}>Scale support up or down without HR overhead</div>
            <div style={styles.benefitItem}>Embedded context means faster problem-solving</div>
            <div style={styles.benefitItem}>Strategy, execution, and building in one partner</div>
          </div>

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

      {/* Who I Work With */}
      <motion.section
        style={{
          ...styles.pillarSection,
          padding: '40px 32px',
          margin: '0 -32px',
          borderRadius: '16px',
          background: currentTheme.accentSubtle,
        }}
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transition }}
      >
        <div>
          <span style={styles.pillarLabel}>Who I work with</span>
          <h2 style={{ ...styles.pillarTitle, marginBottom: '24px' }}>
            Businesses where operations need to work better.
          </h2>
        </div>

        <div style={styles.audienceGrid} className="services-audience-grid">
          <div style={styles.audienceCard}>
            <h3 style={styles.audienceTitle}>GTM Teams & Revenue Leaders</h3>
            <p style={styles.audienceBody}>
              Strategy, operations, and execution for go-to-market. Territory planning, pipeline optimization, marketing and sales alignment, tech stack architecture, GTM programs, revenue operations. I've spent over a decade in this space. I know the systems, the processes, and the politics of getting marketing and sales teams working together.
            </p>
          </div>

          <div style={styles.audienceCard}>
            <h3 style={styles.audienceTitle}>Creative Founders & Agencies</h3>
            <p style={styles.audienceBody}>
              You're great at the creative work. Operations either doesn't happen, happens inconsistently, or drains your energy. I build the operational backbone so your business runs without you being the bottleneck. You stay creative. I build the systems.
            </p>
            <div>
              <span style={{ ...styles.examplesLabel, marginBottom: '6px' }}>Common starting points</span>
              <p style={styles.audienceStarting}>
                Agency founders who need service delivery productized. Designers or consultants moving from trading time for money to productized offerings. Content creators who need operational systems. Creative studios that need project management and client processes built from scratch.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transition }}
      >
        <div style={styles.finalCta}>
          <h2 style={styles.finalCtaTitle}>Ready to get started?</h2>
          <p style={styles.finalCtaText}>
            Tell me what's going on. We'll figure out the right approach together.
          </p>
          <a
            href="/contact"
            style={styles.finalCtaButton}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Start a Project <ArrowRight color={isDarkMode ? '#E3E0DB' : '#2C2824'} />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
