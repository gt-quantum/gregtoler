import { useState } from 'react';
import { motion } from 'framer-motion';

// Blog Post Detail Page Template
// Minimal editorial style with image/video hero, rich content

// Type icon for meta
const TypeIcon = ({ type }) => {
  if (type === 'video') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
      <line x1="4" y1="12" x2="16" y2="12" strokeLinecap="round" />
      <line x1="4" y1="18" x2="12" y2="18" strokeLinecap="round" />
    </svg>
  );
};

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

// Arrow icon for back link
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Sample blog post data
const samplePost = {
  title: 'The ABM Trinity: Aligning Sales, Marketing & Success',
  description: 'A framework for building truly integrated account-based programs that drive pipeline and create lasting customer relationships.',
  type: 'blog', // or 'video'
  date: '2026-01-05',
  readingTime: '8 min read',
  tags: ['GTM', 'Marketing', 'Sales'],
  coverImage: '/images/abm-trinity.jpg',
  videoUrl: null, // or YouTube/Vimeo embed URL
  author: 'Greg Toler',
};

// Sample rich content (would come from CMS as HTML/Markdown)
const sampleContent = `
  <p>Account-based marketing has evolved far beyond its original conception as a targeting strategy. Today's most successful ABM programs recognize that true account-based success requires alignment across three critical functions: Sales, Marketing, and Customer Success.</p>
  
  <h2>The Problem with Siloed ABM</h2>
  
  <p>Most organizations approach ABM as a marketing initiative. They select target accounts, create personalized content, and run targeted campaigns. But without deep integration with sales motions and customer success strategies, these programs fail to deliver on their promise.</p>
  
  <p>The result? Marketing celebrates "engagement" metrics while sales complains about lead quality, and customer success inherits accounts that were sold a vision disconnected from reality.</p>
  
  <blockquote>
    <p>"ABM isn't a marketing strategy. It's a business strategy that requires organizational alignment."</p>
  </blockquote>
  
  <h2>Introducing the ABM Trinity</h2>
  
  <p>The ABM Trinity framework addresses this by treating account-based efforts as a unified go-to-market strategy rather than a marketing tactic. It consists of three interconnected pillars:</p>
  
  <h3>1. Shared Account Intelligence</h3>
  
  <p>All three teams operate from a single source of truth about target accounts. This includes firmographic data, engagement signals, relationship maps, and historical context. No more "marketing says one thing, sales says another."</p>
  
  <h3>2. Coordinated Engagement Sequences</h3>
  
  <p>Rather than separate outreach from marketing, sales, and CS, the Trinity model orchestrates a unified engagement sequence. Marketing air cover supports sales conversations, which in turn set up CS for successful onboarding.</p>
  
  <h3>3. Unified Success Metrics</h3>
  
  <p>Instead of each team optimizing for their own KPIs, Trinity teams measure shared outcomes: pipeline generated, revenue closed, and customer lifetime value. This eliminates the finger-pointing that plagues most ABM programs.</p>
  
  <h2>Implementation Roadmap</h2>
  
  <p>Transitioning to the Trinity model doesn't happen overnight. Here's a phased approach that we've seen work across dozens of implementations:</p>
  
  <p><strong>Phase 1: Foundation (Weeks 1-4)</strong><br/>
  Establish shared account definitions, scoring criteria, and a unified data model. Get all three teams aligned on what "good" looks like.</p>
  
  <p><strong>Phase 2: Process Integration (Weeks 5-8)</strong><br/>
  Design coordinated playbooks that define how each team engages at different stages. Build the handoff protocols and feedback loops.</p>
  
  <p><strong>Phase 3: Operational Excellence (Weeks 9-12)</strong><br/>
  Implement the technology and reporting infrastructure. Run pilot programs with a subset of accounts to test and refine.</p>
  
  <h2>The Results</h2>
  
  <p>Organizations that successfully implement the Trinity framework typically see:</p>
  
  <ul>
    <li>40-60% improvement in pipeline conversion rates</li>
    <li>25-35% reduction in sales cycle length</li>
    <li>50%+ increase in customer expansion revenue</li>
  </ul>
  
  <p>More importantly, they create a sustainable competitive advantage through superior customer experience and organizational alignment.</p>
  
  <hr />
  
  <p>Want to discuss how the ABM Trinity could work for your organization? <a href="/contact">Get in touch</a> to schedule a diagnostic session.</p>
`;

export default function BlogPostPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const post = samplePost;
  const hasVideo = post.type === 'video' || post.videoUrl;

  return (
    <article style={styles.container}>
      {/* Back Link */}
      <motion.a 
        href="/content" 
        style={styles.backLink}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft />
        <span>Back to Content</span>
      </motion.a>

      {/* Header */}
      <header style={styles.header}>
        {/* Meta */}
        <motion.div 
          style={styles.meta}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span style={styles.metaIcon}>
            <TypeIcon type={post.type} />
          </span>
          <span>{post.type === 'video' ? 'Video' : 'Article'}</span>
          <span style={styles.metaDot}>·</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span style={styles.metaDot}>·</span>
          <span>{post.readingTime}</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {post.title}
        </motion.h1>

        {/* Description */}
        <motion.p 
          style={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {post.description}
        </motion.p>

        {/* Tags */}
        <motion.div 
          style={styles.tags}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {post.tags.map((tag, i) => (
            <span key={tag}>
              <a href={`/content?tag=${tag}`} style={styles.tag}>{tag}</a>
              {i < post.tags.length - 1 && <span style={styles.tagDivider}>/</span>}
            </span>
          ))}
        </motion.div>
      </header>

      {/* Hero Media */}
      <motion.div 
        style={styles.heroWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {hasVideo && !isVideoPlaying ? (
          <div style={styles.videoThumbnail}>
            <div style={styles.heroPlaceholder} />
            <PlayButton onClick={() => setIsVideoPlaying(true)} />
          </div>
        ) : hasVideo && isVideoPlaying ? (
          <div style={styles.videoEmbed}>
            {/* Replace with actual video embed */}
            <iframe
              src={post.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              style={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={styles.heroPlaceholder} />
        )}
      </motion.div>

      {/* Content */}
      <motion.div 
        style={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        dangerouslySetInnerHTML={{ __html: sampleContent }}
      />

      {/* Author / Footer */}
      <motion.footer 
        style={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div style={styles.authorLine}>
          <span style={styles.authorLabel}>Written by</span>
          <span style={styles.authorName}>{post.author}</span>
        </div>
      </motion.footer>
    </article>
  );
}

const styles = {
  container: {
    maxWidth: '720px',
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

  // Header
  header: {
    marginBottom: '40px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    marginBottom: '20px',
  },
  metaIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  metaDot: {
    opacity: 0.4,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.2',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '1.25rem',
    color: 'var(--color-text-muted, #6b6560)',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  tags: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
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

  // Hero
  heroWrapper: {
    marginBottom: '48px',
  },
  heroPlaceholder: {
    width: '100%',
    aspectRatio: '16/9',
    background: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
    borderRadius: '4px',
  },
  videoThumbnail: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '4px',
    overflow: 'hidden',
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

  // Content (rich text)
  content: {
    fontSize: '1.0625rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.75',
    // Rich text element styles via CSS-in-JS
    '& h2': {
      fontSize: '1.5rem',
      fontWeight: '500',
      marginTop: '48px',
      marginBottom: '16px',
    },
    '& h3': {
      fontSize: '1.25rem',
      fontWeight: '500',
      marginTop: '32px',
      marginBottom: '12px',
    },
    '& p': {
      marginBottom: '24px',
    },
    '& blockquote': {
      borderLeft: '2px solid var(--color-border, #d4cfc7)',
      paddingLeft: '24px',
      marginLeft: '0',
      marginRight: '0',
      fontStyle: 'italic',
      color: 'var(--color-text-muted, #6b6560)',
    },
    '& a': {
      color: 'var(--color-text, #2d2a26)',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    '& ul, & ol': {
      paddingLeft: '24px',
      marginBottom: '24px',
    },
    '& li': {
      marginBottom: '8px',
    },
    '& hr': {
      border: 'none',
      borderTop: '1px solid var(--color-border, #e8e4df)',
      margin: '48px 0',
    },
    '& strong': {
      fontWeight: '600',
    },
  },

  // Footer
  footer: {
    marginTop: '64px',
    paddingTop: '32px',
    borderTop: '1px solid var(--color-border, rgba(0,0,0,0.08))',
  },
  authorLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  authorLabel: {
    color: 'var(--color-text-muted, #8a857e)',
  },
  authorName: {
    color: 'var(--color-text, #2d2a26)',
    fontWeight: '500',
  },
};
