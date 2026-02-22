import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, animation } from '../../lib/theme';

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================
// DATA
// ============================================
const TABS = ['Fix It', 'Build It', 'Scale It', 'AI & Automation', 'Partnership'];

const pillarData = {
  'Fix It': {
    label: 'Pillar 01',
    title: 'Fix It',
    tagline: 'Making what exists work better.',
    body: [
      "Most people reach out because something isn't working. Leads are stalling. A process takes 10 steps when it should take 3. A founder is spending 20 hours a week on things that should be automated. Operations are slow, expensive, or inconsistent and it's not obvious where the problem actually is.",
      "I dig into the operations, processes, systems, tools, and team workflows. I find where things are breaking down and redesign them. Not a report. Not a recommendation deck. Actual fixes, implemented and working.",
    ],
    examples: [
      "Mapped a broken lead flow for a 5-person GTM team, analyzed how all their programs and campaigns were siloed, and rebuilt them into a single connected strategy",
      "Built a time-study system for a founder, identified bottlenecks consuming 20+ hours/week, then automated and restructured workflows to reclaim that time",
      "Audited a full marketing/sales tech stack, cut redundant tools, rebuilt data flow between the systems that stayed",
      "Identified where qualified opportunities were dying in handoff between marketing and sales, redesigned the process end-to-end",
    ],
    results: [
      { value: '15-25 hrs/week', label: 'Reclaimed for founders and execs' },
      { value: '20-40%', label: 'Reduction in operational costs' },
      { value: '30-50%', label: 'Capacity increase (1-2 hires worth)' },
      { value: 'Revenue', label: 'Recovered from pipeline leaks' },
    ],
  },
  'Build It': {
    label: 'Pillar 02',
    title: 'Build It',
    tagline: 'Making something new that needs to exist.',
    body: [
      "Sometimes the thing you need doesn't exist yet. Off-the-shelf tools don't solve the problem, or building custom is faster and cheaper than configuring enterprise software. You need a system, an app, an automation, a tool that does exactly what your business requires.",
      "I design and build it. Applications, AI systems, automations, integrations, dashboards, internal tools. Purpose-built for your specific problem.",
    ],
    examples: [
      "Built a fully automated AI-powered newsletter system: ingests data from multiple sources, researches externally, generates content, queues for review on Thursday, sends on Friday. Generating 10-15 monthly demos from it.",
      "Created a custom desktop app for enterprise sales territory mapping with visualization and planning features. Bought the IP back and developed it into a standalone product.",
      "Architected a RAG system with Slack integration so sales and marketing teams can chat with their entire Google Drive content library in real time. Fraction of the cost of a $35/seat SaaS license.",
      "Built a custom data intake pipeline connecting Clay, Airtable, and automation platforms for lead enrichment and routing",
    ],
    results: [
      { value: '60-80%', label: 'Cost savings vs. enterprise software' },
      { value: '15-40 hrs/week', label: 'Of manual work automated' },
      { value: 'Days', label: 'Not vendor roadmap quarters' },
      { value: 'Custom', label: "Capabilities competitors can't replicate" },
    ],
  },
  'Scale It': {
    label: 'Pillar 03',
    title: 'Scale It',
    tagline: 'Making what works repeatable without you.',
    body: [
      "You have something that works. A service, a program, a process. But it's delivered manually, inconsistently, or it lives entirely in one person's head. You can't grow it without that person being involved in every delivery. You can't hire for it because there's nothing documented. You can't step away from it because it falls apart.",
      "I shadow your experts, document everything, systematize the delivery, build training materials, and hand it off so your team runs it independently. Manual and custom work becomes repeatable and scalable with clear quality standards.",
    ],
    examples: [
      "Built complete service delivery frameworks for a marketing agency across multiple service lines: templates, SOPs, documentation, strategy guides, and team training",
      "Currently productizing a client's delivery services by shadowing their SME through live deliveries, documenting the process in real-time, building SOPs, then training their team to execute",
      "Created customer onboarding systems with defined entrance/exit criteria and quality gates at each stage",
      "Built training programs for both internal teams and customer-facing delivery teams",
    ],
    results: [
      { value: '2-3x', label: 'Revenue capacity without headcount' },
      { value: '30-50%', label: 'Reduction in delivery costs' },
      { value: 'Weeks', label: 'New hires productive (not months)' },
      { value: '20-40 hrs', label: 'Founder time reclaimed per week' },
    ],
  },
  'AI & Automation': {
    label: 'Cross-cutting',
    title: 'AI is built into the approach',
    tagline: null,
    body: [
      "AI is part of how I think about every engagement. When I'm fixing, building, or scaling something, I'm always evaluating where AI and automation create leverage. It's not a separate offering. It's structural.",
      "If you're specifically looking to implement AI in your operations, product, or workflows, this is a significant part of what I do. I don't plug in tools and call it AI. I architect systems where AI becomes a structural advantage in how your business operates.",
    ],
    capabilities: [
      'AI system architecture and design',
      'Custom MCP (Model Context Protocol) development',
      'AI agent design and implementation',
      'RAG system architecture (retrieval-augmented generation)',
      'AI-forward operations design: systems and processes designed by and for AI',
      'Adoption and implementation: getting teams actually using AI effectively',
      'Intelligent automation: adaptive systems that learn and improve',
    ],
    pillars: [
      { name: 'Fix It', desc: 'Automating manual processes, building intelligent monitoring, replacing repetitive decision-making' },
      { name: 'Build It', desc: 'Custom AI agents, RAG architectures, MCP servers, AI-native internal tools' },
      { name: 'Scale It', desc: 'AI-assisted quality assurance, automated training and onboarding, AI-augmented delivery' },
    ],
  },
  'Partnership': {
    label: 'What comes next',
    title: 'Ongoing Partnership',
    tagline: null,
    body: [
      "Most people start with a project. Fix something, build something, scale something. If there's a good fit and the work keeps going, we shift into an ongoing partnership. An embedded operational partner who handles optimization, building, problem-solving, and strategic execution as the business evolves.",
    ],
    examples: [
      "Served as embedded COO for an agency for nearly three years: operations, team management, process design, financial operations, tool implementation",
      "Currently embedded with a client on fractional GTM ops: operationalizing their enterprise strategy with custom tool development, process design, and team enablement",
      "Ongoing marketing operations partnerships: process review, tool implementation, team training as the business scales",
    ],
    benefits: [
      '25-40% the cost of a full-time operations hire',
      'Scale support up or down without HR overhead',
      'Embedded context means faster problem-solving',
      'Strategy, execution, and building in one partner',
    ],
  },
};

const situations = [
  { label: "Something's broken", value: 'broken' },
  { label: 'Need something built', value: 'build' },
  { label: 'Ready to scale', value: 'scale' },
  { label: 'Not sure yet', value: 'unsure' },
];

const audienceData = [
  {
    title: 'GTM Teams & Revenue Leaders',
    body: "Strategy, operations, and execution for go-to-market. Territory planning, pipeline optimization, marketing and sales alignment, tech stack architecture, GTM programs, revenue operations. I've spent over a decade in this space. I know the systems, the processes, and the politics of getting marketing and sales teams working together.",
  },
  {
    title: 'Creative Founders & Agencies',
    body: "You're great at the creative work. Operations either doesn't happen, happens inconsistently, or drains your energy. I build the operational backbone so your business runs without you being the bottleneck. You stay creative. I build the systems.",
    starting: "Agency founders who need service delivery productized. Designers or consultants moving from trading time for money to productized offerings. Content creators who need operational systems. Creative studios that need project management and client processes built from scratch.",
  },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function ServicesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Fix It');

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

  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const transition = {
    duration: 1.1,
    ease: [0.33, 1, 0.68, 1],
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: '80px',
    },

    // Header
    header: {
      marginBottom: '32px',
    },
    pageLabel: {
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      margin: '0 0 16px 0',
    },
    headline: {
      fontSize: '1.75rem',
      fontWeight: '400',
      color: currentTheme.text,
      lineHeight: '1.3',
      margin: '0 0 12px 0',
      letterSpacing: '-0.01em',
      fontFamily: "'Source Serif 4', Georgia, serif",
      maxWidth: '640px',
    },
    headerDescription: {
      fontSize: '1.0625rem',
      color: currentTheme.textMuted,
      lineHeight: '1.7',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
      maxWidth: '600px',
    },

    // Tabs
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '40px',
      borderBottom: `1px solid ${borderColor}`,
      overflowX: 'auto',
    },
    tab: (isActive) => ({
      padding: '12px 20px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: isActive ? currentTheme.text : currentTheme.textMuted,
      background: isActive ? currentTheme.accentSubtle : 'none',
      border: 'none',
      borderBottom: `2px solid ${isActive ? currentTheme.accent : 'transparent'}`,
      marginBottom: '-1px',
      cursor: 'pointer',
      transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
      fontFamily: 'inherit',
      whiteSpace: 'nowrap',
    }),

    // Two-column grid for content + sidebar
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '48px',
    },

    // Content area
    contentArea: {
      maxWidth: '720px',
      minWidth: 0,
    },

    // Sticky sidebar widget
    sidebarWidget: {
      position: 'sticky',
      top: 'calc(var(--header-height, 80px) + 24px)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
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
    sidebarAvailability: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.75rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: isDarkMode ? 'rgba(45, 42, 38, 0.7)' : 'rgba(250,249,247,0.7)',
    },
    sidebarTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: isDarkMode ? '#2C2824' : '#faf9f7',
      margin: '0 0 12px 0',
    },
    sidebarSituations: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    sidebarSituationBtn: {
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
      background: isDarkMode ? 'rgba(45, 42, 38, 0.15)' : 'rgba(255,255,255,0.15)',
      color: isDarkMode ? 'rgba(45, 42, 38, 0.9)' : 'rgba(250,249,247,0.9)',
    },

    // Section label
    sectionLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '8px',
      display: 'block',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      color: currentTheme.text,
      margin: '0 0 6px 0',
      letterSpacing: '-0.01em',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    sectionTagline: {
      fontSize: '1rem',
      color: currentTheme.textMuted,
      margin: '0 0 24px 0',
      fontStyle: 'italic',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    bodyText: {
      fontSize: '1.0625rem',
      color: currentTheme.text,
      lineHeight: '1.75',
      margin: '0 0 20px 0',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Subsection label
    subsectionLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginTop: '32px',
      marginBottom: '12px',
      display: 'block',
    },

    // Examples list
    examplesList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    },
    exampleItem: {
      fontSize: '0.9375rem',
      color: currentTheme.text,
      lineHeight: '1.6',
      padding: '14px 8px',
      borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Results grid
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
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

    // Capabilities list (AI tab)
    capabilityItem: {
      fontSize: '0.9375rem',
      color: currentTheme.text,
      lineHeight: '1.5',
      padding: '10px 14px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '6px',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // AI pillars grid
    aiPillarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
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

    // Benefits grid (Partnership tab)
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
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
      marginTop: '32px',
    },

    // Who I Work With section
    audienceSection: {
      marginTop: '80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    audienceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    audienceCard: {
      padding: '28px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '12px',
      border: `1px solid ${borderColor}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    },
    audienceTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
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
      marginTop: '80px',
      padding: '48px 40px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      background: isDarkMode
        ? 'rgba(227, 224, 219, 0.85)'
        : 'rgba(45, 42, 38, 0.85)',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
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
      borderRadius: '6px',
      textDecoration: 'none',
      cursor: 'pointer',
      marginTop: '8px',
      transition: 'opacity 0.2s',
    },
  };

  const data = pillarData[activeTab];

  const renderPillarContent = () => (
    <div style={styles.contentArea}>
      <span style={styles.sectionLabel}>{data.label}</span>
      <h2 style={styles.sectionTitle}>{data.title}</h2>
      {data.tagline && <p style={styles.sectionTagline}>{data.tagline}</p>}
      {!data.tagline && <div style={{ marginBottom: '24px' }} />}

      {data.body.map((p, i) => (
        <p key={i} style={styles.bodyText}>{p}</p>
      ))}

      {/* Examples */}
      {data.examples && (
        <>
          <span style={styles.subsectionLabel}>What this looks like</span>
          <div style={styles.examplesList}>
            {data.examples.map((item, i) => (
              <div key={i} style={styles.exampleItem}>{item}</div>
            ))}
          </div>
        </>
      )}

      {/* Results */}
      {data.results && (
        <>
          <span style={styles.subsectionLabel}>Typical results</span>
          <div style={styles.resultsGrid} className="services-results-grid">
            {data.results.map((r, i) => (
              <div key={i} style={styles.resultItem}>
                <span style={styles.resultValue}>{r.value}</span>
                <span style={styles.resultLabel}>{r.label}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* AI Capabilities */}
      {data.capabilities && (
        <>
          <span style={styles.subsectionLabel}>Capabilities</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.capabilities.map((cap, i) => (
              <div key={i} style={styles.capabilityItem}>{cap}</div>
            ))}
          </div>
        </>
      )}

      {/* AI Pillars */}
      {data.pillars && (
        <>
          <span style={styles.subsectionLabel}>How it shows up across the pillars</span>
          <div style={styles.aiPillarGrid} className="services-ai-pillar-grid">
            {data.pillars.map((p, i) => (
              <div key={i} style={styles.aiPillarItem}>
                <span style={styles.aiPillarName}>{p.name}</span>
                <span style={styles.aiPillarDesc}>{p.desc}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Partnership Benefits */}
      {data.benefits && (
        <>
          <span style={styles.subsectionLabel}>Why clients stay</span>
          <div style={styles.benefitsGrid} className="services-benefits-grid">
            {data.benefits.map((b, i) => (
              <div key={i} style={styles.benefitItem}>{b}</div>
            ))}
          </div>
        </>
      )}

      <a
        href="/contact"
        style={styles.ctaLink}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        Start a project <ArrowRight color={currentTheme.accent} />
      </a>
    </div>
  );

  return (
    <div style={styles.container} className="services-container">
      <style>{`
        @media (max-width: 900px) {
          .services-main-grid {
            grid-template-columns: 1fr !important;
          }
          .services-sidebar {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
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
          .services-tabs {
            gap: 0 !important;
          }
          .services-tabs button {
            padding: 10px 14px !important;
            font-size: 0.8125rem !important;
          }
        }
      `}</style>

      {/* Header */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.1 }}
      >
        <h1 style={styles.pageLabel}>Services</h1>
        <p style={styles.headline}>
          I help businesses fix, build, and scale their operations.
        </p>
        <p style={styles.headerDescription}>
          Process design, AI architecture, custom tools, automation, strategy. Whatever the problem is, I work hands-on to solve it.
        </p>
      </motion.header>

      {/* Tab Navigation */}
      <motion.nav
        style={styles.tabs}
        className="services-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.15 }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={styles.tab(activeTab === tab)}
          >
            {tab}
          </button>
        ))}
      </motion.nav>

      {/* Tab Content + Sidebar */}
      <main style={styles.mainGrid} className="services-main-grid">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderPillarContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky Intake Sidebar */}
        <aside className="services-sidebar" style={{ alignSelf: 'stretch' }}>
          <div style={styles.sidebarWidget}>
            <div style={styles.sidebarAvailability}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
              }} />
              <span>Available for projects</span>
            </div>
            <div>
              <h3 style={styles.sidebarTitle}>What can I help with?</h3>
              <div style={styles.sidebarSituations}>
                {situations.map((s) => (
                  <motion.button
                    key={s.value}
                    style={styles.sidebarSituationBtn}
                    onClick={() => { window.location.href = `/contact?situation=${s.value}`; }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {s.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Who I Work With */}
      <motion.section
        style={styles.audienceSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.25 }}
      >
        <div>
          <span style={styles.sectionLabel}>Who I work with</span>
          <h2 style={{ ...styles.sectionTitle, marginBottom: '8px' }}>
            Businesses where operations need to work better.
          </h2>
        </div>

        <div style={styles.audienceGrid} className="services-audience-grid">
          {audienceData.map((audience, i) => (
            <div key={i} style={styles.audienceCard}>
              <h3 style={styles.audienceTitle}>{audience.title}</h3>
              <p style={styles.audienceBody}>{audience.body}</p>
              {audience.starting && (
                <div>
                  <span style={{ ...styles.sectionLabel, marginBottom: '6px' }}>Common starting points</span>
                  <p style={styles.audienceStarting}>{audience.starting}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.3 }}
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
