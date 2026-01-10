import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Work Page
// Three sections: Experience (timeline), Projects (list), Apps (grid)
// Tab navigation with filters

// Icons
const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

// Status dot component
const StatusDot = ({ status }) => {
  const colors = {
    active: '#4ade80',
    completed: 'var(--color-text-muted, #8a857e)',
  };
  return (
    <span style={{
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: colors[status] || colors.completed,
      display: 'inline-block',
    }} />
  );
};

// App status badge
const AppBadge = ({ status }) => {
  const config = {
    download: { color: '#3b82f6', label: 'Download' },
    signup: { color: '#8b5cf6', label: 'Sign up' },
    request: { color: '#f59e0b', label: 'Request' },
  };
  const { color, label } = config[status] || config.download;

  return (
    <span style={{
      fontSize: '0.6875rem',
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontWeight: '500',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}>
      {label}
    </span>
  );
};

// Sample data
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

const projectsData = [
  {
    id: 1,
    title: 'GTM Architecture Redesign',
    subtitle: 'Enterprise SaaS · B2B',
    status: 'completed',
    tags: ['GTM', 'Sales', 'Marketing'],
    description: 'Full go-to-market restructure including segmentation, territories, and enablement.',
  },
  {
    id: 2,
    title: 'Revenue Operations Build',
    subtitle: 'FinTech · Series B',
    status: 'active',
    tags: ['Operations', 'Processes'],
    description: 'Ground-up RevOps function design with tooling and process implementation.',
  },
  {
    id: 3,
    title: 'Territory Planning System',
    subtitle: 'Healthcare Tech · Enterprise',
    status: 'completed',
    tags: ['Operations', 'Sales'],
    description: 'Custom territory model with capacity planning and coverage optimization.',
  },
  {
    id: 4,
    title: 'ABM Program Launch',
    subtitle: 'DevTools · Growth Stage',
    status: 'active',
    tags: ['GTM', 'Marketing'],
    description: 'Account-based marketing program targeting enterprise segment.',
  },
  {
    id: 5,
    title: 'Product-Led Growth Motion',
    subtitle: 'Collaboration SaaS · Series A',
    status: 'completed',
    tags: ['GTM', 'Products'],
    description: 'PLG strategy and implementation alongside existing sales motion.',
  },
];

const appsData = [
  {
    id: 1,
    name: 'Territory Planner',
    description: 'Visual territory modeling and account assignment tool.',
    status: 'download',
    tags: ['Sales', 'Operations', 'Planning'],
    hasVideo: true,
  },
  {
    id: 2,
    name: 'GTM Diagnostic',
    description: 'Self-assessment framework for go-to-market maturity.',
    status: 'signup',
    tags: ['GTM', 'Strategy'],
    hasVideo: true,
  },
  {
    id: 3,
    name: 'Pipeline Calculator',
    description: 'Capacity planning and pipeline coverage modeling.',
    status: 'download',
    tags: ['Sales', 'Operations', 'Analytics'],
    hasVideo: false,
  },
  {
    id: 4,
    name: 'RevOps Toolkit',
    description: 'Comprehensive ops toolkit for revenue teams.',
    status: 'request',
    tags: ['Operations', 'Productivity'],
    hasVideo: true,
  },
  {
    id: 5,
    name: 'Forecast Model',
    description: 'Weighted pipeline forecasting with scenario planning.',
    status: 'download',
    tags: ['Sales', 'Analytics'],
    hasVideo: true,
  },
  {
    id: 6,
    name: 'Lead Scoring Builder',
    description: 'Configurable lead scoring with CRM integration.',
    status: 'signup',
    tags: ['Marketing', 'Automation'],
    hasVideo: false,
  },
];

const TABS = ['Experience', 'Projects', 'Apps'];
const EXPERIENCE_FILTERS = ['All', 'GTM', 'Operations'];
const PROJECT_FILTERS = ['All', 'GTM', 'Operations', 'Sales', 'Marketing', 'Products', 'Processes'];
const APP_FILTERS = ['All', 'Sales', 'Marketing', 'GTM', 'Operations', 'Productivity', 'Analytics', 'Automation', 'Planning'];

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState('Experience');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [appFilter, setAppFilter] = useState('All');

  const filteredExperience = experienceData.filter(item =>
    experienceFilter === 'All' || item.type.includes(experienceFilter)
  );

  const filteredProjects = projectsData.filter(item =>
    projectFilter === 'All' || item.tags.includes(projectFilter)
  );

  const filteredApps = appsData.filter(item =>
    appFilter === 'All' || item.tags.includes(appFilter)
  );

  // Filter row component
  const FilterRow = ({ filters, active, onSelect }) => (
    <div style={styles.filterRow}>
      {filters.map((filter, i) => (
        <span key={filter} style={styles.filterItem}>
          <button
            onClick={() => onSelect(filter === active ? 'All' : filter)}
            style={{
              ...styles.filterLink,
              opacity: active === filter ? 1 : 0.4,
            }}
          >
            {filter}
          </button>
          {i < filters.length - 1 && (
            <span style={styles.filterDivider}>/</span>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <motion.h1 
          style={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Work
        </motion.h1>
      </header>

      {/* Tab Navigation */}
      <motion.nav 
        style={styles.tabs}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {}),
            }}
          >
            {tab}
          </button>
        ))}
      </motion.nav>

      {/* Content */}
      <main style={styles.main}>
        <AnimatePresence mode="wait">
          {/* Experience Tab */}
          {activeTab === 'Experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FilterRow 
                filters={EXPERIENCE_FILTERS} 
                active={experienceFilter} 
                onSelect={setExperienceFilter} 
              />

              {/* Timeline */}
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
                    <div style={styles.timelineContent}>
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
            </motion.div>
          )}

          {/* Projects Tab - LIST LAYOUT */}
          {activeTab === 'Projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FilterRow 
                filters={PROJECT_FILTERS} 
                active={projectFilter} 
                onSelect={setProjectFilter} 
              />

              <div style={styles.projectList}>
                {filteredProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={`/work/projects/${project.id}`}
                    style={styles.projectRow}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div style={styles.projectStatus}>
                      <StatusDot status={project.status} />
                    </div>
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
                    <div style={styles.projectArrow}>
                      <ArrowRight />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Apps Tab - GRID LAYOUT */}
          {activeTab === 'Apps' && (
            <motion.div
              key="apps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FilterRow 
                filters={APP_FILTERS} 
                active={appFilter} 
                onSelect={setAppFilter} 
              />

              <div style={styles.appsGrid}>
                {filteredApps.map((app, index) => (
                  <motion.a
                    key={app.id}
                    href={`/work/apps/${app.id}`}
                    style={styles.appCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Preview */}
                    <div style={styles.appPreview}>
                      {app.hasVideo && (
                        <div style={styles.appPlayButton}>
                          <PlayIcon />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={styles.appContent}>
                      <AppBadge status={app.status} />
                      <h3 style={styles.appName}>{app.name}</h3>
                      <p style={styles.appDescription}>{app.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 24px 120px',
    fontFamily: "'Source Serif 4', Georgia, serif",
  },

  // Header
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '400',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },

  // Tabs
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '48px',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.08))',
    paddingBottom: '0',
  },
  tab: {
    padding: '12px 20px',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    marginBottom: '-1px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    color: 'var(--color-text, #2d2a26)',
    borderBottomColor: 'var(--color-text, #2d2a26)',
  },

  // Main
  main: {},

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
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  filterDivider: {
    color: 'var(--color-text-muted, #8a857e)',
    opacity: 0.3,
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
    borderLeft: '1px solid var(--color-border, rgba(0,0,0,0.08))',
  },
  timelineDot: {
    position: 'absolute',
    left: '-5px',
    top: '4px',
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    background: 'var(--color-text, #2d2a26)',
  },
  timelineContent: {},
  timelineMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  timelineDate: {
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
  },
  timelineTags: {
    display: 'flex',
    gap: '6px',
  },
  timelineTag: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '2px 6px',
    background: 'var(--color-border, rgba(0,0,0,0.04))',
    borderRadius: '2px',
  },
  timelineRole: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    margin: '0 0 4px 0',
  },
  timelineCompany: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-muted, #8a857e)',
    margin: '0 0 8px 0',
  },
  timelineDescription: {
    fontSize: '0.9375rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.6',
    margin: 0,
  },

  // Projects List
  projectList: {
    display: 'flex',
    flexDirection: 'column',
  },
  projectRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 0',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.06))',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  projectStatus: {
    flexShrink: 0,
  },
  projectInfo: {
    flex: 1,
    minWidth: 0,
  },
  projectTitle: {
    fontSize: '1.0625rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    margin: '0 0 4px 0',
  },
  projectSubtitle: {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted, #8a857e)',
    margin: 0,
  },
  projectTags: {
    fontSize: '0.75rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    flexShrink: 0,
    textAlign: 'right',
    minWidth: '120px',
  },
  projectArrow: {
    color: 'var(--color-text-muted, #8a857e)',
    flexShrink: 0,
  },

  // Apps Grid
  appsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
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
    aspectRatio: '16/10',
    background: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
    borderRadius: '4px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  appPlayButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--color-bg, rgba(255,255,255,0.9))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text, #2d2a26)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  appContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  appName: {
    fontSize: '1.0625rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    margin: 0,
  },
  appDescription: {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted, #8a857e)',
    margin: 0,
    lineHeight: '1.5',
  },
};
