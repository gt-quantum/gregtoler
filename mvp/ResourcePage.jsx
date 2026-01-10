import { useState } from 'react';
import { motion } from 'framer-motion';

// Resource Detail Page Template
// Minimal editorial style with preview, download, and optional content

// Type icons
const TypeIcon = ({ type }) => {
  const icons = {
    spreadsheet: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    pdf: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    template: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    tool: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    guide: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="14" y2="10" />
      </svg>
    ),
    video: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    ),
  };
  
  return (
    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted, #8a857e)' }}>
      {icons[type] || icons.pdf}
    </span>
  );
};

// Download icon
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
  </svg>
);

// Arrow icon for back link
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// External link icon
const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" />
    <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
  </svg>
);

// Play button for video
const PlayButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    style={styles.playButton}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  </motion.button>
);

// Sample resource data
const sampleResource = {
  title: 'Territory Planning Template',
  description: 'A comprehensive spreadsheet for building and managing sales territories. Includes account scoring, capacity modeling, and coverage analysis.',
  type: 'spreadsheet', // spreadsheet, pdf, template, tool, guide, video
  date: '2025-12-20',
  tags: ['Process', 'Operations', 'Sales'],
  fileUrl: '/downloads/territory-planning-template.xlsx',
  fileSize: '2.4 MB',
  fileFormat: 'XLSX',
  previewImage: '/images/territory-template-preview.jpg',
  videoUrl: null, // optional walkthrough video
  author: 'Greg Toler',
};

// Sample content (optional written component)
const sampleContent = `
  <h2>What's Included</h2>
  
  <p>This territory planning template has been refined across dozens of implementations and includes everything you need to build a data-driven territory model.</p>
  
  <h3>Account Scoring Tab</h3>
  
  <p>A customizable scoring framework that lets you rank accounts based on firmographic data, engagement signals, and fit criteria. Includes weighted scoring and automatic tiering.</p>
  
  <h3>Capacity Model</h3>
  
  <p>Calculate rep capacity based on deal velocity, average deal size, and time allocation. Automatically identifies coverage gaps and over-assignment.</p>
  
  <h3>Territory Builder</h3>
  
  <p>Assign accounts to territories with drag-and-drop simplicity. Real-time metrics show you territory balance across key dimensions.</p>
  
  <h3>Coverage Analysis</h3>
  
  <p>Visual dashboards that show you whitespace, overlap, and optimization opportunities. Includes geographic and segment views.</p>
  
  <h2>How to Use</h2>
  
  <p><strong>Step 1:</strong> Import your account list into the Accounts tab. The template accepts standard CRM exports.</p>
  
  <p><strong>Step 2:</strong> Customize the scoring criteria in the Settings tab to match your ICP definition.</p>
  
  <p><strong>Step 3:</strong> Use the Capacity Model to determine how many accounts each rep can effectively cover.</p>
  
  <p><strong>Step 4:</strong> Build territories in the Territory Builder, using the real-time metrics to ensure balance.</p>
  
  <p><strong>Step 5:</strong> Review the Coverage Analysis to identify gaps and optimization opportunities.</p>
  
  <hr />
  
  <p>Questions about implementation? <a href="/contact">Get in touch</a> for a walkthrough.</p>
`;

export default function ResourcePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const resource = sampleResource;
  const hasVideo = resource.videoUrl;

  return (
    <article style={styles.container}>
      {/* Back Link */}
      <motion.a 
        href="/resources" 
        style={styles.backLink}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft />
        <span>Back to Resources</span>
      </motion.a>

      {/* Two-column layout for header area */}
      <div style={styles.headerGrid}>
        {/* Left: Info */}
        <div style={styles.headerInfo}>
          {/* Meta */}
          <motion.div 
            style={styles.meta}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span style={styles.metaIcon}>
              <TypeIcon type={resource.type} />
            </span>
            <span style={styles.metaType}>{resource.type}</span>
            <span style={styles.metaDot}>·</span>
            <span>{resource.fileFormat}</span>
            <span style={styles.metaDot}>·</span>
            <span>{resource.fileSize}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {resource.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {resource.description}
          </motion.p>

          {/* Tags */}
          <motion.div 
            style={styles.tags}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {resource.tags.map((tag, i) => (
              <span key={tag}>
                <a href={`/resources?tag=${tag}`} style={styles.tag}>{tag}</a>
                {i < resource.tags.length - 1 && <span style={styles.tagDivider}>/</span>}
              </span>
            ))}
          </motion.div>

          {/* Download Button */}
          <motion.div
            style={styles.downloadWrapper}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.a 
              href={resource.fileUrl}
              download
              style={styles.downloadButton}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <DownloadIcon />
              <span>Download {resource.fileFormat}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Preview */}
        <motion.div 
          style={styles.previewWrapper}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div style={styles.previewCard}>
            <div style={styles.previewImage} />
            <div style={styles.previewOverlay}>
              <span style={styles.previewLabel}>Preview</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Optional Video Walkthrough */}
      {hasVideo && (
        <motion.div 
          style={styles.videoSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h2 style={styles.sectionTitle}>Video Walkthrough</h2>
          {!isVideoPlaying ? (
            <div style={styles.videoThumbnail}>
              <div style={styles.videoPlaceholder} />
              <PlayButton onClick={() => setIsVideoPlaying(true)} />
            </div>
          ) : (
            <div style={styles.videoEmbed}>
              <iframe
                src={resource.videoUrl}
                style={styles.iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </motion.div>
      )}

      {/* Content */}
      <motion.div 
        style={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        dangerouslySetInnerHTML={{ __html: sampleContent }}
      />

      {/* Footer */}
      <motion.footer 
        style={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div style={styles.footerInfo}>
          <span style={styles.footerLabel}>Created by</span>
          <span style={styles.footerValue}>{resource.author}</span>
          <span style={styles.footerDot}>·</span>
          <span style={styles.footerLabel}>Updated</span>
          <span style={styles.footerValue}>
            {new Date(resource.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </motion.footer>
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
    gridTemplateColumns: '1fr 320px',
    gap: '48px',
    marginBottom: '56px',
    alignItems: 'start',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Meta
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    marginBottom: '16px',
    textTransform: 'capitalize',
  },
  metaIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  metaType: {
    textTransform: 'capitalize',
  },
  metaDot: {
    opacity: 0.4,
  },

  // Title & description
  title: {
    fontSize: '2rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.2',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '1.125rem',
    color: 'var(--color-text-muted, #6b6560)',
    lineHeight: '1.5',
    marginBottom: '20px',
  },

  // Tags
  tags: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    marginBottom: '32px',
  },
  tag: {
    color: 'var(--color-text-muted, #8a857e)',
    textDecoration: 'none',
    padding: '2px 6px',
    transition: 'color 0.2s ease',
  },
  tagDivider: {
    color: 'var(--color-text-muted, #8a857e)',
    opacity: 0.3,
  },

  // Download button
  downloadWrapper: {
    marginTop: 'auto',
  },
  downloadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 24px',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-bg, #faf9f7)',
    background: 'var(--color-text, #2d2a26)',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },

  // Preview card
  previewWrapper: {
    position: 'sticky',
    top: '24px',
  },
  previewCard: {
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid var(--color-border, rgba(0,0,0,0.08))',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  previewImage: {
    width: '100%',
    aspectRatio: '4/3',
    background: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
  },
  previewLabel: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-text-muted, #8a857e)',
    background: 'var(--color-bg, rgba(250,249,247,0.9))',
    padding: '4px 8px',
    borderRadius: '2px',
  },

  // Video section
  videoSection: {
    marginBottom: '56px',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-text-muted, #8a857e)',
    marginBottom: '16px',
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

  // Content
  content: {
    maxWidth: '720px',
    fontSize: '1.0625rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.75',
  },

  // Footer
  footer: {
    maxWidth: '720px',
    marginTop: '64px',
    paddingTop: '24px',
    borderTop: '1px solid var(--color-border, rgba(0,0,0,0.08))',
  },
  footerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    flexWrap: 'wrap',
  },
  footerLabel: {
    color: 'var(--color-text-muted, #8a857e)',
  },
  footerValue: {
    color: 'var(--color-text, #2d2a26)',
  },
  footerDot: {
    color: 'var(--color-text-muted, #8a857e)',
    opacity: 0.4,
  },
};
