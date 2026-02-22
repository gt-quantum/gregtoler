import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// ============================================
// ICONS
// ============================================
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

const TypeIcon = ({ type }) => {
  const icons = {
    App: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    Tool: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    Template: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  };
  return icons[type] || icons.App;
};

// Action config based on status
const actionConfig = {
  download: { label: 'Download', icon: DownloadIcon },
  signup: { label: 'Sign up', icon: SignupIcon },
  request: { label: 'Request access', icon: RequestIcon },
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function AppDetail({ app, children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
  const action = actionConfig[app.status] || actionConfig.download;
  const ActionIcon = action.icon;

  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const transition = {
    duration: 1.1,
    ease: [0.33, 1, 0.68, 1],
  };

  const styles = {
    container: {
      width: '100%',
    },

    // Header grid
    headerGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '64px',
      marginBottom: '56px',
      alignItems: 'start',
    },
    headerInfo: {
      display: 'flex',
      flexDirection: 'column',
    },

    // Type meta
    typeMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      marginBottom: '16px',
    },
    metaDot: {
      opacity: 0.4,
    },

    // Name & description
    name: {
      fontSize: '2.5rem',
      fontWeight: '400',
      color: currentTheme.text,
      lineHeight: '1.1',
      marginBottom: '20px',
      letterSpacing: '-0.02em',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },
    description: {
      fontSize: '1.125rem',
      color: currentTheme.textMuted,
      lineHeight: '1.6',
      marginBottom: '24px',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Tags
    tags: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.9375rem',
      marginBottom: '32px',
    },
    tag: {
      color: currentTheme.textMuted,
      padding: '0 4px',
    },
    tagDivider: {
      color: currentTheme.textMuted,
      opacity: 0.4,
      padding: '0 4px',
    },

    // Action button
    actionButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 28px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: isDarkMode ? currentTheme.background : '#faf9f7',
      background: currentTheme.text,
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, opacity 0.2s ease',
      alignSelf: 'flex-start',
    },

    // Preview card
    previewWrapper: {
      position: 'sticky',
      top: '100px',
    },
    previewCard: {
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      background: currentTheme.background,
      boxShadow: isDarkMode
        ? '0 4px 24px rgba(0,0,0,0.3)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      border: `1px solid ${borderColor}`,
    },
    previewImage: {
      width: '100%',
      aspectRatio: '3/2',
      background: isDarkMode
        ? 'linear-gradient(135deg, #2a2622 0%, #1e1b17 100%)'
        : 'linear-gradient(135deg, #f5f2ed 0%, #ebe6df 100%)',
      objectFit: 'cover',
    },
    previewLabel: {
      position: 'absolute',
      bottom: '16px',
      left: '16px',
      fontSize: '0.75rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: currentTheme.textMuted,
      background: isDarkMode ? 'rgba(26,23,20,0.95)' : 'rgba(250,249,247,0.95)',
      padding: '6px 12px',
      borderRadius: '4px',
    },

    // Video section
    videoSection: {
      marginBottom: '56px',
    },
    sectionLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: currentTheme.textMuted,
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
      background: isDarkMode
        ? 'linear-gradient(135deg, #2a2622 0%, #1e1b17 100%)'
        : 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      background: isDarkMode ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: isDarkMode ? '#1a1714' : '#2d2a26',
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
      borderTop: `1px solid ${borderColor}`,
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
    },
    detailsLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
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
      color: currentTheme.text,
      lineHeight: '1.5',
    },
    checkIcon: {
      color: currentTheme.text,
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
      color: currentTheme.textMuted,
      lineHeight: '1.5',
      paddingLeft: '16px',
      position: 'relative',
    },

    // Content
    content: {
      maxWidth: '720px',
    },
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    // Handle youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    // Handle youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    // Handle already embedded URLs
    if (url.includes('/embed/')) return url;
    return url;
  };

  const embedUrl = getEmbedUrl(app.videoUrl);

  return (
    <article style={styles.container} className="app-detail">
      <style>{`
        /* Tablet: Switch to single column at 900px */
        @media (max-width: 900px) {
          .app-detail .header-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
          .app-detail .header-info {
            order: 1; /* Title, description, tags, button first */
            width: 100%;
          }
          .app-detail .preview-wrapper {
            order: 2; /* Image/video second */
            position: relative !important;
            top: 0 !important;
            width: 100%;
            max-width: 500px; /* Constrain image width on tablet */
          }
          .app-detail .preview-card {
            width: 100%;
          }
          .app-detail .details-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .app-detail .video-thumbnail,
          .app-detail .video-embed,
          .app-detail .content {
            max-width: 100% !important;
          }
        }
        /* Mobile: Tighter spacing */
        @media (max-width: 600px) {
          .app-detail .header-grid {
            gap: 24px !important;
          }
          .app-detail .preview-wrapper {
            max-width: 100%; /* Full width on mobile */
          }
          .app-detail .name {
            font-size: 1.75rem !important;
          }
          .app-detail .action-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Two-column header */}
      <div style={styles.headerGrid} className="header-grid">
        {/* Left: Info */}
        <div style={styles.headerInfo} className="header-info">
          {/* Type meta */}
          <motion.div
            style={styles.typeMeta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.1 }}
          >
            <TypeIcon type={app.type} />
            <span>{app.type}</span>
            {app.version && (
              <>
                <span style={styles.metaDot}>·</span>
                <span>v{app.version}</span>
              </>
            )}
          </motion.div>

          {/* Name */}
          <motion.h1
            style={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.15 }}
          >
            {app.name}
          </motion.h1>

          {/* Description */}
          <motion.p
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
          >
            {app.tagline} {app.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            style={styles.tags}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.25 }}
          >
            {app.tags.map((tag, i) => (
              <span key={tag}>
                <span style={styles.tag}>{tag}</span>
                {i < app.tags.length - 1 && <span style={styles.tagDivider}>/</span>}
              </span>
            ))}
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
          >
            <motion.a
              href={app.status === 'download' ? app.downloadUrl : app.signupUrl || '#'}
              style={styles.actionButton}
              className="action-button"
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              <ActionIcon />
              <span>{action.label}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Preview Card */}
        <motion.div
          style={styles.previewWrapper}
          className="preview-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, delay: 0.2 }}
        >
          <div style={styles.previewCard} className="preview-card">
            {app.previewImage ? (
              <img
                src={app.previewImage}
                alt={`${app.name} preview`}
                style={styles.previewImage}
              />
            ) : (
              <div style={styles.previewImage} />
            )}
            <div style={styles.previewLabel}>Preview</div>
          </div>
        </motion.div>
      </div>

      {/* Video Walkthrough Section */}
      {app.videoUrl && (
        <motion.section
          style={styles.videoSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.35 }}
        >
          <h2 style={styles.sectionLabel}>Video Walkthrough</h2>
          {!isVideoPlaying ? (
            <div style={styles.videoThumbnail} className="video-thumbnail">
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
            <div style={styles.videoEmbed} className="video-embed">
              <iframe
                src={embedUrl}
                style={styles.iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </motion.section>
      )}

      {/* Features & Requirements */}
      {(app.features?.length > 0 || app.requirements?.length > 0) && (
        <motion.section
          style={styles.detailsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.4 }}
        >
          <div style={styles.detailsGrid} className="details-grid">
            {/* Features */}
            {app.features?.length > 0 && (
              <div>
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
            )}

            {/* Requirements */}
            {app.requirements?.length > 0 && (
              <div>
                <h2 style={styles.detailsLabel}>Requirements</h2>
                <ul style={styles.requirementList}>
                  {app.requirements.map((req, i) => (
                    <li key={i} style={styles.requirementItem}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* MDX Content */}
      {children && (
        <motion.div
          style={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.45 }}
          className="prose-content content"
        >
          {children}
        </motion.div>
      )}
    </article>
  );
}
