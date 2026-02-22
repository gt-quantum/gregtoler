import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, animation } from '../../lib/theme';

// ============================================
// EXPERIENCE DATA - Edit this array to update experience
// ============================================
const experienceData = [
  {
    id: 1,
    company: 'Independent',
    role: 'GTM & RevOps Consultant',
    startDate: '2022',
    endDate: 'Present',
    type: ['GTM', 'Operations'],
    description: 'Helping B2B companies build scalable go-to-market systems.',
  },
  {
    id: 2,
    company: 'Growth Stage Startup',
    role: 'VP Revenue Operations',
    startDate: '2020',
    endDate: '2022',
    type: ['Operations'],
    description: 'Built RevOps function from ground up, 3x pipeline efficiency.',
  },
  {
    id: 3,
    company: 'Enterprise SaaS',
    role: 'Director, GTM Strategy',
    startDate: '2018',
    endDate: '2021',
    type: ['GTM'],
    description: 'Led market expansion and segment strategy across NA and EMEA.',
  },
  {
    id: 4,
    company: 'Series B Startup',
    role: 'Head of Marketing Ops',
    startDate: '2016',
    endDate: '2018',
    type: ['Operations'],
    description: 'Scaled marketing operations and demand gen infrastructure.',
  },
];

// ============================================
// COMPANY LOGOS - Edit this array to update the logo grid
// Add your company logos here. Use image paths from /public folder
// ============================================
const companyLogos = [
  { name: 'Salesforce', logo: '' },
  { name: 'HubSpot', logo: '' },
  { name: 'Marketo', logo: '' },
  { name: 'Outreach', logo: '' },
  { name: 'Gong', logo: '' },
  { name: 'Clari', logo: '' },
  { name: 'ZoomInfo', logo: '' },
  { name: '6sense', logo: '' },
  { name: 'Drift', logo: '' },
  { name: 'Chorus', logo: '' },
  { name: 'LeanData', logo: '' },
  { name: 'Demandbase', logo: '' },
  { name: 'Salesloft', logo: '' },
  { name: 'Segment', logo: '' },
  { name: 'Clearbit', logo: '' },
  { name: 'Apollo', logo: '' },
];

// Filter options
const TABS = ['Experience', 'Projects', 'Apps'];
const EXPERIENCE_FILTERS = ['All', 'GTM', 'Operations'];
const PROJECT_FILTERS = ['All', 'GTM', 'Operations', 'Sales', 'Marketing', 'Products', 'Processes'];
const APP_FILTERS = ['All', 'Sales', 'Marketing', 'GTM', 'Operations', 'Productivity', 'Analytics', 'Automation', 'Planning'];

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

const StatusBadge = ({ status, currentTheme }) => {
  const isActive = status === 'active';
  const color = isActive ? '#4ade80' : currentTheme.textMuted;
  const label = isActive ? 'Active' : 'Completed';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: color,
        display: 'inline-block',
        flexShrink: 0,
      }} />
      {label}
    </span>
  );
};

const AppBadge = ({ status }) => {
  const config = {
    download: { label: 'Download' },
    signup: { label: 'Sign up' },
    request: { label: 'Request' },
  };
  const { label } = config[status] || config.download;

  return (
    <span style={{
      fontSize: '0.75rem',
      fontWeight: '500',
      color: 'inherit',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      opacity: 0.6,
    }}>
      {label}
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function WorkPage({ projects = [], apps = [] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    // Check URL for tab parameter on initial load
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && TABS.includes(tab)) {
        return tab;
      }
    }
    return 'Experience';
  });
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [appFilter, setAppFilter] = useState('All');

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

  // Filter data
  const filteredExperience = experienceData.filter(item =>
    experienceFilter === 'All' || item.type.includes(experienceFilter)
  );

  const filteredProjects = projects.filter(item =>
    projectFilter === 'All' || item.tags.includes(projectFilter)
  );

  const filteredApps = apps.filter(item =>
    appFilter === 'All' || item.tags.includes(appFilter)
  );

  // Styles
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const borderColorStrong = isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';

  const styles = {
    container: {
      width: '100%',
    },

    // Header
    header: {
      marginBottom: '32px',
    },
    title: {
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      margin: 0,
    },

    // Tabs
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '40px',
      borderBottom: `1px solid ${borderColor}`,
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
    }),

    // Filter row
    filterRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      marginBottom: '32px',
    },
    filterItem: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    filterLink: {
      background: 'none',
      border: 'none',
      padding: '4px 8px',
      fontSize: '0.875rem',
      color: currentTheme.text,
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
      fontFamily: 'inherit',
    },
    filterDivider: {
      color: currentTheme.textMuted,
      opacity: 0.3,
      fontSize: '12px',
    },

    // Timeline (Experience)
    timeline: {
      position: 'relative',
      paddingLeft: '24px',
    },
    timelineItem: {
      position: 'relative',
      paddingBottom: '40px',
      paddingLeft: '24px',
      borderLeft: `1px solid ${borderColor}`,
    },
    timelineDot: {
      position: 'absolute',
      left: '-5px',
      top: '4px',
      width: '9px',
      height: '9px',
      borderRadius: '50%',
      background: currentTheme.text,
    },
    timelineMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '8px',
      flexWrap: 'wrap',
    },
    timelineDate: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
    },
    timelineTags: {
      display: 'flex',
      gap: '6px',
    },
    timelineTag: {
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      padding: '2px 6px',
      background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      borderRadius: '2px',
    },
    timelineRole: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 4px 0',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    timelineCompany: {
      fontSize: '0.9375rem',
      color: currentTheme.textMuted,
      margin: '0 0 8px 0',
    },
    timelineDescription: {
      fontSize: '0.9375rem',
      color: currentTheme.text,
      lineHeight: '1.6',
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Experience two-column layout
    experienceLayout: {
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 480px) minmax(380px, 500px)',
      gap: '48px',
      alignItems: 'start',
      justifyContent: 'start',
    },
    experienceTimeline: {
      minWidth: 0,
    },
    experienceMain: {
      minWidth: 0,
    },
    logoSection: {
      position: 'sticky',
      top: '120px',
    },
    logoSectionTitle: {
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginBottom: '24px',
    },
    logoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
    },
    logoItem: {
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      borderRadius: '6px',
      transition: 'background 0.2s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    logoImage: {
      position: 'absolute',
      inset: '8px',
      width: 'calc(100% - 16px)',
      height: 'calc(100% - 16px)',
      objectFit: 'contain',
      filter: isDarkMode ? 'brightness(0.9) contrast(0.9)' : 'none',
      opacity: isDarkMode ? 0.85 : 0.75,
    },
    logoPlaceholder: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textAlign: 'center',
      opacity: 0.5,
      lineHeight: '1.2',
      padding: '4px',
    },

    // Projects List
    projectList: {
      display: 'flex',
      flexDirection: 'column',
    },
    projectRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      padding: '20px 8px',
      borderBottom: `1px solid ${borderColor}`,
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background 0.15s ease',
    },
    projectInfo: {
      flex: 1,
      minWidth: 0,
    },
    projectTitle: {
      fontSize: '1.0625rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: '0 0 4px 0',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    projectSubtitle: {
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      margin: 0,
    },
    projectTags: {
      fontSize: '0.75rem',
      color: currentTheme.textMuted,
      flexShrink: 0,
      textAlign: 'right',
      minWidth: '120px',
    },
    projectStatusEnd: {
      flexShrink: 0,
      minWidth: '100px',
      textAlign: 'right',
    },
    projectArrow: {
      color: currentTheme.textMuted,
      flexShrink: 0,
    },

    // Apps Grid
    appsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    },
    appCard: {
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
    },
    appPreview: {
      width: '100%',
      aspectRatio: '16/9',
      background: isDarkMode
        ? 'linear-gradient(135deg, #2a2622 0%, #1e1b17 100%)'
        : 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
      borderRadius: '4px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    appPlayButton: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: isDarkMode ? '#1a1714' : '#2d2a26',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    },
    appContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    appName: {
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    appDescription: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
      margin: 0,
      lineHeight: '1.4',
    },

    // Empty state
    empty: {
      padding: '48px 0',
      textAlign: 'center',
      color: currentTheme.textMuted,
      fontSize: '15px',
    },
  };

  // Filter row component
  const FilterRow = ({ filters, active, onSelect }) => (
    <div style={styles.filterRow}>
      {filters.map((filter, i) => (
        <span key={filter} style={styles.filterItem}>
          <motion.button
            onClick={() => onSelect(filter === active ? 'All' : filter)}
            style={{
              ...styles.filterLink,
              opacity: active === filter ? 1 : 0.4,
              color: active === filter ? currentTheme.accent : currentTheme.text,
            }}
            whileHover={{ opacity: 1 }}
            transition={animation.fade}
          >
            {filter}
          </motion.button>
          {i < filters.length - 1 && (
            <span style={styles.filterDivider}>/</span>
          )}
        </span>
      ))}
    </div>
  );

  const transition = {
    duration: 1.1,
    ease: [0.33, 1, 0.68, 1],
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.1 }}
      >
        <h1 style={styles.title}>Work</h1>
      </motion.header>

      {/* Tab Navigation */}
      <motion.nav
        style={styles.tabs}
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

      {/* Content */}
      <main>
        <AnimatePresence mode="wait">
          {/* Experience Tab */}
          {activeTab === 'Experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FilterRow
                filters={EXPERIENCE_FILTERS}
                active={experienceFilter}
                onSelect={setExperienceFilter}
              />

              <div style={styles.experienceLayout} className="experience-layout">
                {/* Left column - Timeline */}
                <div style={styles.experienceTimeline}>
                  <div style={styles.timeline}>
                    {filteredExperience.map((item, index) => (
                      <motion.div
                        key={item.id}
                        style={styles.timelineItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div style={styles.timelineDot} />
                        <div>
                          <div style={styles.timelineMeta}>
                            <span style={styles.timelineDate}>{item.startDate} — {item.endDate}</span>
                            <div style={styles.timelineTags}>
                              {item.type.map(t => (
                                <span key={t} style={styles.timelineTag}>{t}</span>
                              ))}
                            </div>
                          </div>
                          <h3 style={styles.timelineRole}>{item.role}</h3>
                          <p style={styles.timelineCompany}>{item.company}</p>
                          <p style={styles.timelineDescription}>{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right column - Company Logos */}
                <motion.aside
                  style={styles.logoSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 style={styles.logoSectionTitle}>Companies & Clients</h3>
                  <div style={styles.logoGrid}>
                    {companyLogos.map((company, index) => (
                      <motion.div
                        key={company.name}
                        style={styles.logoItem}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                        title={company.name}
                      >
                        {/* Text placeholder - always visible unless logo loads */}
                        <span style={styles.logoPlaceholder}>
                          {company.name}
                        </span>
                        {/* Logo image - overlays text when present */}
                        {company.logo && (
                          <img
                            src={company.logo}
                            alt={company.name}
                            style={styles.logoImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.aside>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'Projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FilterRow
                filters={PROJECT_FILTERS}
                active={projectFilter}
                onSelect={setProjectFilter}
              />

              {filteredProjects.length > 0 ? (
                <div style={styles.projectList}>
                  {filteredProjects.map((project, index) => (
                    <motion.a
                      key={project.slug}
                      href={`/work/projects/${project.slug}`}
                      style={styles.projectRow}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4, backgroundColor: currentTheme.hoverBg }}
                    >
                      <div style={styles.projectInfo}>
                        <h3 style={styles.projectTitle}>{project.title}</h3>
                        <p style={styles.projectSubtitle}>{project.subtitle}</p>
                      </div>
                      <div style={styles.projectTags}>
                        {project.tags.slice(0, 2).map((tag, i) => (
                          <span key={tag}>
                            {tag}{i < Math.min(project.tags.length, 2) - 1 && ' · '}
                          </span>
                        ))}
                      </div>
                      <div style={styles.projectStatusEnd}>
                        <StatusBadge status={project.status} currentTheme={currentTheme} />
                      </div>
                      <div style={styles.projectArrow}>
                        <ArrowRight color={currentTheme.textMuted} />
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div style={styles.empty}>No projects found.</div>
              )}
            </motion.div>
          )}

          {/* Apps Tab */}
          {activeTab === 'Apps' && (
            <motion.div
              key="apps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FilterRow
                filters={APP_FILTERS}
                active={appFilter}
                onSelect={setAppFilter}
              />

              {filteredApps.length > 0 ? (
                <div style={styles.appsGrid} className="apps-grid">
                  {filteredApps.map((app, index) => (
                    <motion.a
                      key={app.slug}
                      href={`/work/apps/${app.slug}`}
                      style={styles.appCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <div style={styles.appPreview}>
                        {app.previewImage ? (
                          <img
                            src={app.previewImage}
                            alt={app.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : null}
                        {app.videoUrl && (
                          <div style={styles.appPlayButton}>
                            <PlayIcon />
                          </div>
                        )}
                      </div>
                      <div style={styles.appContent}>
                        <AppBadge status={app.status} />
                        <h3 style={styles.appName}>{app.name}</h3>
                        <p style={styles.appDescription}>{app.tagline}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div style={styles.empty}>No apps found.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .experience-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 1000px) {
          .apps-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .apps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .apps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
