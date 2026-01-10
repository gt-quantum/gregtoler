import { useState } from 'react';
import { motion } from 'framer-motion';

// App/Product Detail Page
// Warm editorial style - matches site theme

// Icons
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
  </svg>
);

const SignupIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6m3-3h-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RequestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Type icon (matches resource page)
const TypeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

// Action button config based on status - all use dark button, different labels/icons
const actionConfig = {
  download: {
    label: 'Download',
    icon: DownloadIcon,
  },
  signup: {
    label: 'Sign up',
    icon: SignupIcon,
  },
  request: {
    label: 'Request access',
    icon: RequestIcon,
  },
};

// Sample app data
const sampleApp = {
  name: 'Territory Planner',
  type: 'App',
  tagline: 'Visual territory modeling and account assignment.',
  description: 'A powerful tool for sales leaders to build balanced territories, model coverage scenarios, and assign accounts with confidence.',
  status: 'download', // download, signup, request
  version: '2.1.0',
  lastUpdated: '2026-01-05',
  tags: ['Sales', 'Operations', 'Planning'],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  downloadUrl: '/downloads/territory-planner.zip',
  features: [
    'Drag-and-drop account assignment',
    'Real-time territory balance metrics',
    'Capacity modeling and forecasting',
    'Geographic and segment views',
    'Export to CSV and Salesforce',
  ],
  requirements: [
    'Google Sheets or Excel',
    'Account data export from CRM',
  ],
};

// Sample rich content
const sampleContent = `
  <h2>How It Works</h2>
  
  <p>Territory Planner takes the guesswork out of territory design. Import your accounts, define your scoring criteria, and let the tool help you build balanced territories that maximize coverage and minimize conflict.</p>
  
  <h3>Step 1: Import Accounts</h3>
  
  <p>Export your accounts from Salesforce, HubSpot, or any CRM. The tool accepts standard CSV formats and automatically maps common fields.</p>
  
  <h3>Step 2: Define Scoring</h3>
  
  <p>Configure your account scoring model based on firmographic data, engagement signals, and custom criteria. The tool includes pre-built templates for common B2B segments.</p>
  
  <h3>Step 3: Build Territories</h3>
  
  <p>Use the visual builder to create and adjust territories. See real-time metrics on balance, capacity, and coverage as you make changes.</p>
  
  <h3>Step 4: Deploy</h3>
  
  <p>Export your territories back to your CRM or share with your team. The tool maintains version history so you can compare and roll back changes.</p>
  
  <hr />
  
  <p>Questions? <a href="/contact">Get in touch</a> for a walkthrough.</p>
`;

export default function AppDetailPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const app = sampleApp;
  const action = actionConfig[app.status];
  const ActionIcon = action.icon;

  return (
    <article style={styles.container}>
      {/* Back Link */}
      <motion.a 
        href="/work" 
        style={styles.backLink}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft />
        <span>Back to Work</span>
      </motion.a>

      {/* Two-column header */}
      <div style={styles.headerGrid}>
        {/* Left: Info */}
        <div style={styles.headerInfo}>
          {/* Type meta */}
          <motion.div 
            style={styles.typeMeta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <TypeIcon />
            <span>{app.type}</span>
            <span style={styles.metaDot}>·</span>
            <span>{app.type}</span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            style={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {app.name}
          </motion.h1>

          {/* Description */}
          <motion.p 
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {app.tagline} {app.description}
          </motion.p>

          {/* Tags */}
          <motion.div 
            style={styles.tags}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {app.tags.map((tag, i) => (
              <span key={tag}>
                <span style={styles.tag}>{tag}</span>
                {i < app.tags.length - 1 && <span style={styles.tagDivider}>/</span>}
              </span>
            ))}
          </motion.div>

          {/* Action Button - Always dark */}
          <motion.div
            style={styles.actionWrapper}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.a 
              href={app.status === 'download' ? app.downloadUrl : `/work/apps/${app.name.toLowerCase().replace(/ /g, '-')}/signup`}
              style={styles.actionButton}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <ActionIcon />
              <span>{action.label}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Preview Card */}
        <motion.div 
          style={styles.previewWrapper}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div style={styles.previewCard}>
            <div style={styles.previewImage} />
            <div style={styles.previewLabel}>Preview</div>
          </div>
        </motion.div>
      </div>

      {/* Video Walkthrough Section */}
      <motion.section 
        style={styles.videoSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h2 style={styles.sectionLabel}>Video Walkthrough</h2>
        {!isVideoPlaying ? (
          <div style={styles.videoThumbnail}>
            <div style={styles.videoPlaceholder} />
            <motion.button
              onClick={() => setIsVideoPlaying(true)}
              style={styles.playButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayIcon />
            </motion.button>
          </div>
        ) : (
          <div style={styles.videoEmbed}>
            <iframe
              src={app.videoUrl}
              style={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </motion.section>

      {/* Features & Requirements */}
      <motion.section 
        style={styles.detailsSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div style={styles.detailsGrid}>
          {/* Features */}
          <div style={styles.detailsColumn}>
            <h2 style={styles.detailsLabel}>Features</h2>
            <ul style={styles.featureList}>
              {app.features.map((feature, i) => (
                <li key={i} style={styles.featureItem}>
                  <span style={styles.checkIcon}><CheckIcon /></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div style={styles.detailsColumn}>
            <h2 style={styles.detailsLabel}>Requirements</h2>
            <ul style={styles.requirementList}>
              {app.requirements.map((req, i) => (
                <li key={i} style={styles.requirementItem}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Content */}
      <motion.div 
        style={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        dangerouslySetInnerHTML={{ __html: sampleContent }}
      />
    </article>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '60px 24px 120px',
    fontFamily: "'Source Serif 4', Georgia, serif",
  },

  // Back link
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    textDecoration: 'none',
    marginBottom: '48px',
    transition: 'color 0.2s ease',
  },

  // Header grid
  headerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '48px',
    marginBottom: '56px',
    alignItems: 'start',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Type meta (like "PDF · PDF" in screenshot)
  typeMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    marginBottom: '16px',
  },
  metaDot: {
    opacity: 0.4,
  },

  // Name & description
  name: {
    fontSize: '2.5rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.1',
    marginBottom: '20px',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '1.125rem',
    color: 'var(--color-text-muted, #6b6560)',
    lineHeight: '1.6',
    marginBottom: '24px',
  },

  // Tags
  tags: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    marginBottom: '32px',
  },
  tag: {
    color: 'var(--color-text-muted, #6b6560)',
    padding: '0 4px',
  },
  tagDivider: {
    color: 'var(--color-text-muted, #8a857e)',
    opacity: 0.4,
    padding: '0 4px',
  },

  // Action button - dark, like screenshot
  actionWrapper: {},
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 28px',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-bg, #faf9f7)',
    background: 'var(--color-text, #2d2a26)',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },

  // Preview card - matches screenshot
  previewWrapper: {
    position: 'sticky',
    top: '24px',
  },
  previewCard: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    background: 'var(--color-bg, #faf9f7)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    border: '1px solid var(--color-border, rgba(0,0,0,0.06))',
  },
  previewImage: {
    width: '100%',
    aspectRatio: '4/3',
    background: 'linear-gradient(135deg, #f5f2ed 0%, #ebe6df 100%)',
  },
  previewLabel: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-text-muted, #8a857e)',
    background: 'var(--color-bg, rgba(250,249,247,0.95))',
    padding: '6px 12px',
    borderRadius: '4px',
  },

  // Video section
  videoSection: {
    marginBottom: '56px',
  },
  sectionLabel: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-text-muted, #8a857e)',
    marginBottom: '20px',
  },
  videoThumbnail: {
    position: 'relative',
    width: '100%',
    maxWidth: '720px',
    aspectRatio: '16/9',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'var(--color-bg, #faf9f7)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text, #2d2a26)',
    cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  },
  videoEmbed: {
    width: '100%',
    maxWidth: '720px',
    aspectRatio: '16/9',
    borderRadius: '4px',
    overflow: 'hidden',
    background: '#000',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },

  // Details section
  detailsSection: {
    marginBottom: '56px',
    paddingTop: '32px',
    borderTop: '1px solid var(--color-border, rgba(0,0,0,0.08))',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
  },
  detailsColumn: {},
  detailsLabel: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '16px',
  },
  featureList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '0.9375rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.5',
  },
  checkIcon: {
    color: 'var(--color-text, #2d2a26)',
    flexShrink: 0,
    marginTop: '2px',
    opacity: 0.6,
  },
  requirementList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  requirementItem: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-muted, #6b6560)',
    lineHeight: '1.5',
    paddingLeft: '16px',
    position: 'relative',
  },

  // Content
  content: {
    maxWidth: '720px',
    fontSize: '1.0625rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.75',
  },
};
