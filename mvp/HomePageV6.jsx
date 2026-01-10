import { motion } from 'framer-motion';

// Home Page v6
// Focus areas card, availability status on contact

// Icons
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

const StatusDot = ({ active }) => (
  <span style={{
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: active ? '#4ade80' : 'var(--color-text-muted, #8a857e)',
    display: 'inline-block',
  }} />
);

// Sample data - would pull from CMS
const homeData = {
  headline: 'Building revenue systems that scale.',
  role: 'GTM Strategy & Operations',
  available: true,
  focus: ['GTM Strategy', 'RevOps', 'Process Design', 'Automation'],
  now: 'Currently working on GTM systems for a Series B fintech.',
  
  // Latest from each section
  latestProject: {
    title: 'Revenue Operations Build',
    subtitle: 'FinTech · Series B',
    status: 'active',
    slug: 'revops-build',
  },
  latestApp: {
    name: 'Territory Planner',
    description: 'Visual territory modeling tool',
    status: 'download',
    hasVideo: true,
    slug: 'territory-planner',
  },
  latestContent: {
    title: 'The ABM Trinity',
    type: 'article',
    date: '2 days ago',
    slug: 'abm-trinity',
  },
};

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HomePage() {
  const data = homeData;

  return (
    <div style={styles.container}>
      <motion.div 
        style={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row 1: Hero (8) + Contact (4) */}
        <motion.a href="/about" style={styles.heroCard} variants={itemVariants} whileHover={{ y: -4 }}>
          <div style={styles.heroImage} />
          <div style={styles.heroContent}>
            <span style={styles.heroRole}>{data.role}</span>
            <h1 style={styles.heroHeadline}>{data.headline}</h1>
          </div>
          <div style={styles.heroArrow}><ArrowRight /></div>
        </motion.a>

        <motion.a 
          href="/contact" 
          style={styles.contactCard} 
          variants={itemVariants} 
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <div style={styles.availabilityBadge}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: data.available ? '#4ade80' : '#8a857e',
              }} />
              <span>{data.available ? 'Available for projects' : 'Currently booked'}</span>
            </div>
            <h3 style={styles.contactTitle}>Let's work together</h3>
            <p style={styles.contactSubtitle}>Have a project in mind?</p>
          </div>
          <ArrowRight />
        </motion.a>

        {/* Row 2: Latest Project (5) + Latest App (4) + Focus (3) */}
        <motion.div style={styles.previewCard} variants={itemVariants}>
          <div style={styles.previewHeader}>
            <span style={styles.previewLabel}>Latest Project</span>
            <a href="/work?tab=Projects" style={styles.viewAll}>All <ArrowRight /></a>
          </div>
          <a href={`/work/projects/${data.latestProject.slug}`} style={styles.previewContent}>
            <div style={styles.projectPreview}>
              <StatusDot active={data.latestProject.status === 'active'} />
              <div>
                <span style={styles.previewTitle}>{data.latestProject.title}</span>
                <span style={styles.previewMeta}>{data.latestProject.subtitle}</span>
              </div>
            </div>
          </a>
        </motion.div>

        <motion.div style={styles.previewCard} variants={itemVariants}>
          <div style={styles.previewHeader}>
            <span style={styles.previewLabel}>Latest App</span>
            <a href="/work?tab=Apps" style={styles.viewAll}>All <ArrowRight /></a>
          </div>
          <a href={`/work/apps/${data.latestApp.slug}`} style={styles.previewContent}>
            <div style={styles.appPreview}>
              <div style={styles.appThumb}>
                {data.latestApp.hasVideo && (
                  <span style={styles.appPlayIcon}><PlayIcon /></span>
                )}
              </div>
              <div>
                <span style={styles.previewTitle}>{data.latestApp.name}</span>
                <span style={styles.previewMeta}>{data.latestApp.description}</span>
              </div>
            </div>
          </a>
        </motion.div>

        <motion.div style={styles.focusCard} variants={itemVariants}>
          <span style={styles.focusLabel}>Focus</span>
          <div style={styles.focusTags}>
            {data.focus.map((item, i) => (
              <span key={i} style={styles.focusTag}>{item}</span>
            ))}
          </div>
        </motion.div>

        {/* Row 3: Latest Content (7) + Now (5) */}
        <motion.div style={styles.previewCardWide} variants={itemVariants}>
          <div style={styles.previewHeader}>
            <span style={styles.previewLabel}>Latest Content</span>
            <a href="/content" style={styles.viewAll}>All <ArrowRight /></a>
          </div>
          <a href={`/content/${data.latestContent.slug}`} style={styles.previewContent}>
            <div style={styles.contentPreview}>
              <div style={styles.contentThumb} />
              <div style={styles.contentInfo}>
                <span style={styles.previewTitleLarge}>{data.latestContent.title}</span>
                <span style={styles.previewMeta}>{data.latestContent.type} · {data.latestContent.date}</span>
              </div>
            </div>
          </a>
        </motion.div>

        <motion.div style={styles.nowCard} variants={itemVariants}>
          <span style={styles.nowLabel}>Now</span>
          <p style={styles.nowText}>{data.now}</p>
          <a href="/about" style={styles.nowLink}>About me <ArrowRight /></a>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Glassmorphic base
const glassCard = {
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.04)',
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px 24px 120px',
    fontFamily: "'Source Serif 4', Georgia, serif",
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '16px',
  },

  // Row 1: Hero (8) + Contact (4)
  heroCard: {
    ...glassCard,
    gridColumn: 'span 8',
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    padding: '28px',
    minHeight: '140px',
    textDecoration: 'none',
    position: 'relative',
  },
  heroImage: {
    width: '90px',
    height: '90px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(180,170,160,0.5) 0%, rgba(160,150,140,0.4) 100%)',
    flexShrink: 0,
  },
  heroContent: {},
  heroRole: {
    display: 'block',
    fontSize: '0.75rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
  },
  heroHeadline: {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    margin: 0,
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  heroArrow: {
    position: 'absolute',
    right: '28px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted, #8a857e)',
    opacity: 0.5,
  },

  contactCard: {
    gridColumn: 'span 4',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textDecoration: 'none',
    background: 'var(--color-text, #2d2a26)',
    borderRadius: '16px',
    color: 'rgba(250,249,247,0.5)',
  },
  availabilityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'rgba(250,249,247,0.7)',
    marginBottom: '10px',
  },
  contactTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    color: 'var(--color-bg, #faf9f7)',
    margin: '0 0 4px 0',
  },
  contactSubtitle: {
    fontSize: '0.8125rem',
    color: 'rgba(250,249,247,0.6)',
    margin: 0,
  },

  // Row 2: Preview cards (5 + 4) + Focus (3)
  previewCard: {
    ...glassCard,
    gridColumn: 'span 5',
    padding: '20px 24px',
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  previewLabel: {
    fontSize: '0.625rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  viewAll: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    textDecoration: 'none',
  },
  previewContent: {
    textDecoration: 'none',
    display: 'block',
  },
  previewTitle: {
    display: 'block',
    fontSize: '0.9375rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    marginBottom: '2px',
  },
  previewTitleLarge: {
    display: 'block',
    fontSize: '1.0625rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    marginBottom: '4px',
  },
  previewMeta: {
    display: 'block',
    fontSize: '0.75rem',
    color: 'var(--color-text-muted, #8a857e)',
  },

  // Project preview
  projectPreview: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },

  // App preview
  appPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  appThumb: {
    width: '56px',
    height: '40px',
    borderRadius: '6px',
    background: 'linear-gradient(135deg, rgba(180,170,160,0.4) 0%, rgba(160,150,140,0.3) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  appPlayIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text, #2d2a26)',
  },

  // Focus card
  focusCard: {
    ...glassCard,
    gridColumn: 'span 2',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
  focusLabel: {
    display: 'block',
    fontSize: '0.625rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '12px',
  },
  focusTags: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  focusTag: {
    fontSize: '0.75rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
    padding: '6px 10px',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '6px',
  },

  // Row 3: Content preview (7) + Now (5)
  previewCardWide: {
    ...glassCard,
    gridColumn: 'span 7',
    padding: '20px 24px',
  },
  contentPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  contentThumb: {
    width: '80px',
    height: '52px',
    borderRadius: '6px',
    background: 'linear-gradient(135deg, rgba(180,170,160,0.4) 0%, rgba(160,150,140,0.3) 100%)',
    flexShrink: 0,
  },
  contentInfo: {},

  nowCard: {
    ...glassCard,
    gridColumn: 'span 5',
    padding: '20px 24px',
  },
  nowLabel: {
    display: 'block',
    fontSize: '0.625rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
  },
  nowText: {
    fontSize: '0.875rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.5',
    margin: '0 0 12px 0',
  },
  nowLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.75rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    textDecoration: 'none',
  },
};
