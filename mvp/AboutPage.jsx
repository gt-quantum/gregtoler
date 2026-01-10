import { motion } from 'framer-motion';

// About Page - App-like Layout
// Content left, profile sidebar right

// Icons
const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StatusDot = ({ active }) => (
  <span style={{
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: active ? '#4ade80' : 'var(--color-text-muted, #8a857e)',
    display: 'inline-block',
  }} />
);

const aboutData = {
  name: "Greg Toler",
  role: "Designer / Developer / Operator",
  location: "South Carolina",
  status: "Available for projects",
  statusActive: true,
  headline: "Building revenue systems that scale.",
  bio: [
    "For the past decade, I've helped B2B companies build the systems, processes, and tooling that turn strategy into execution. I sit at the intersection of marketing, sales, and customer success — designing the connective tissue that makes revenue teams work.",
    "My approach is hands-on. I don't just advise — I build. Whether it's architecting a territory model, designing an ABM program, or shipping internal tools, I believe the best strategy is one you can actually implement.",
  ],
  focus: [
    { area: "GTM Strategy", description: "Market segmentation, positioning, go-to-market architecture" },
    { area: "Revenue Operations", description: "Process design, tooling, cross-functional alignment" },
    { area: "Systems & Tooling", description: "Internal tools and workflows that scale" },
  ],
  stats: [
    { value: "10+", label: "Years experience" },
    { value: "40+", label: "Projects shipped" },
    { value: "12", label: "Tools built" },
  ],
  links: [
    { label: "Email", href: "mailto:greg@gregtoler.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/gregtoler" },
    { label: "Twitter", href: "https://twitter.com/gregtoler" },
  ],
};

export default function AboutPage() {
  return (
    <div style={styles.container}>
      {/* Left: Main Content */}
      <main style={styles.main}>
        {/* Headline */}
        <motion.section 
          style={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 style={styles.headline}>{aboutData.headline}</h2>
        </motion.section>

        {/* Bio */}
        <motion.section 
          style={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span style={styles.sectionLabel}>About</span>
          <div style={styles.bioContent}>
            {aboutData.bio.map((p, i) => (
              <p key={i} style={styles.bioParagraph}>{p}</p>
            ))}
          </div>
        </motion.section>

        {/* Focus */}
        <motion.section 
          style={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
      </main>

      {/* Right: Profile Sidebar */}
      <motion.aside 
        style={styles.sidebar}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Photo */}
        <div style={styles.photoWrapper}>
          <div style={styles.photo} />
        </div>

        {/* Name & Role */}
        <div style={styles.identity}>
          <h1 style={styles.name}>{aboutData.name}</h1>
          <p style={styles.role}>{aboutData.role}</p>
        </div>

        {/* Status */}
        <div style={styles.statusWrapper}>
          <StatusDot active={aboutData.statusActive} />
          <span style={styles.statusText}>{aboutData.status}</span>
        </div>

        {/* Quick Stats */}
        <div style={styles.stats}>
          {aboutData.stats.map((stat, i) => (
            <div key={i} style={styles.stat}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={styles.links}>
          {aboutData.links.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={styles.link}>
              <span>{link.label}</span>
              <ArrowRight />
            </a>
          ))}
        </div>

        {/* Location */}
        <p style={styles.location}>{aboutData.location}</p>
      </motion.aside>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gap: '64px',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '80px 24px 120px',
    fontFamily: "'Source Serif 4', Georgia, serif",
    minHeight: '100vh',
    alignItems: 'start',
  },

  // Main content (left)
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    paddingTop: '8px',
  },
  section: {},
  sectionLabel: {
    display: 'block',
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '16px',
  },
  headline: {
    fontSize: '2.25rem',
    fontWeight: '400',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.2',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  bioContent: {},
  bioParagraph: {
    fontSize: '1.0625rem',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.75',
    marginBottom: '20px',
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
    color: 'var(--color-text, #2d2a26)',
    margin: 0,
  },
  focusDescription: {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted, #8a857e)',
    lineHeight: '1.5',
    margin: 0,
  },

  // Sidebar (right)
  sidebar: {
    position: 'sticky',
    top: '80px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  photoWrapper: {},
  photo: {
    width: '100%',
    aspectRatio: '1/1',
    background: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
    borderRadius: '4px',
  },
  identity: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: 'var(--color-text, #2d2a26)',
    margin: 0,
  },
  role: {
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    margin: 0,
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 0',
    borderTop: '1px solid var(--color-border, rgba(0,0,0,0.06))',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.06))',
  },
  statusText: {
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
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
    color: 'var(--color-text, #2d2a26)',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  statLabel: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
    textDecoration: 'none',
    padding: '8px 0',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.04))',
    transition: 'opacity 0.2s ease',
  },
  location: {
    fontSize: '0.75rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    margin: 0,
  },
};
