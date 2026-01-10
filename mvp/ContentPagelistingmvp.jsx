import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Minimal Editorial Content Listing
// Stacked filters with aligned labels, deselect to reset, multi-column sort

const TAGS = ['GTM', 'Marketing', 'Sales', 'Process', 'Frameworks', 'Operations', 'AI', 'Technology'];
const TYPES = ['Blog', 'Video', 'Audio', 'Download', 'Link'];

// Content type icons
const TypeIcon = ({ type }) => {
  const icons = {
    video: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    ),
    audio: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="4" y1="12" x2="4" y2="12" strokeLinecap="round" />
        <line x1="8" y1="8" x2="8" y2="16" strokeLinecap="round" />
        <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
        <line x1="16" y1="8" x2="16" y2="16" strokeLinecap="round" />
        <line x1="20" y1="12" x2="20" y2="12" strokeLinecap="round" />
      </svg>
    ),
    download: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
      </svg>
    ),
    blog: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
        <line x1="4" y1="12" x2="16" y2="12" strokeLinecap="round" />
        <line x1="4" y1="18" x2="12" y2="18" strokeLinecap="round" />
      </svg>
    ),
    link: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" />
        <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
      </svg>
    ),
  };
  
  return (
    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted, #8a857e)' }}>
      {icons[type] || icons.blog}
    </span>
  );
};

// Sort arrow
const SortArrow = ({ active, direction }) => (
  <svg 
    width="10" 
    height="10" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ 
      transform: direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      marginLeft: '4px',
      opacity: active ? 1 : 0.3,
    }}
  >
    <path d="M12 5v14m0 0l-5-5m5 5l5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const sampleContent = [
  { id: 1, title: 'The ABM Trinity: Aligning Sales, Marketing & Success', type: 'blog', tags: ['GTM', 'Marketing'], date: '2026-01-05', duration: '8 min' },
  { id: 2, title: 'GTM Operating Models Explained', type: 'video', tags: ['GTM', 'Frameworks'], date: '2026-01-02', duration: '12:34' },
  { id: 3, title: 'Revenue Operations: Beyond the Buzzword', type: 'audio', tags: ['Operations', 'Process'], date: '2025-12-28', duration: '24 min' },
  { id: 4, title: 'Territory Planning Template', type: 'download', tags: ['Process', 'Operations'], date: '2025-12-20', duration: 'XLSX' },
  { id: 5, title: 'Building a Territory Model That Scales', type: 'blog', tags: ['Process', 'Operations'], date: '2025-12-15', duration: '10 min' },
  { id: 6, title: 'RevOps Community Slack', type: 'link', tags: ['Operations'], date: '2025-12-10', duration: 'External' },
];

export default function ContentPage() {
  const [activeTag, setActiveTag] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  // Toggle filter - click again to deselect
  const toggleTag = (tag) => setActiveTag(prev => prev === tag ? null : tag);
  const toggleType = (type) => setActiveType(prev => prev === type ? null : type);

  // Toggle sort
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDir(key === 'title' ? 'asc' : 'desc');
    }
  };

  const filtered = sampleContent
    .filter(item => !activeTag || item.tags.includes(activeTag))
    .filter(item => !activeType || item.type.toLowerCase() === activeType.toLowerCase())
    .sort((a, b) => {
      if (sortKey === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDir === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (sortDir === 'asc') return titleA.localeCompare(titleB);
        return titleB.localeCompare(titleA);
      }
    });

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Content</h1>
      </header>

      {/* Filters */}
      <div style={styles.filters}>
        {/* Topic Filter */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Topic</span>
          <nav style={styles.filterOptions}>
            {TAGS.map((tag, i) => (
              <span key={tag} style={styles.filterItem}>
                <button
                  onClick={() => toggleTag(tag)}
                  style={{
                    ...styles.filterLink,
                    opacity: activeTag === tag ? 1 : activeTag ? 0.3 : 0.6,
                  }}
                >
                  {tag}
                </button>
                {i < TAGS.length - 1 && <span style={styles.filterDivider}>/</span>}
              </span>
            ))}
          </nav>
        </div>

        {/* Type Filter */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Type</span>
          <nav style={styles.filterOptions}>
            {TYPES.map((type, i) => (
              <span key={type} style={styles.filterItem}>
                <button
                  onClick={() => toggleType(type)}
                  style={{
                    ...styles.filterLink,
                    opacity: activeType === type ? 1 : activeType ? 0.3 : 0.6,
                  }}
                >
                  {type}
                </button>
                {i < TYPES.length - 1 && <span style={styles.filterDivider}>/</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Table Header */}
      <div style={styles.tableHeader}>
        <span style={styles.tableHeaderIcon}></span>
        <button onClick={() => toggleSort('title')} style={styles.tableHeaderTitle}>
          Title
          <SortArrow active={sortKey === 'title'} direction={sortKey === 'title' ? sortDir : 'asc'} />
        </button>
        <button onClick={() => toggleSort('date')} style={styles.tableHeaderDate}>
          Date
          <SortArrow active={sortKey === 'date'} direction={sortKey === 'date' ? sortDir : 'desc'} />
        </button>
        <span style={styles.tableHeaderDuration}>Length</span>
      </div>

      {/* Content List */}
      <main style={styles.list}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.a
              href={`/content/${item.id}`}
              key={item.id}
              style={styles.item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ x: 4 }}
              layout
            >
              <div style={styles.itemIcon}>
                <TypeIcon type={item.type} />
              </div>
              <h2 style={styles.itemTitle}>{item.title}</h2>
              <span style={styles.itemDate}>
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span style={styles.itemDuration}>{item.duration}</span>
            </motion.a>
          ))}
        </AnimatePresence>
      </main>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div style={styles.empty}>
          <p>No content found.</p>
          <button 
            onClick={() => { setActiveTag(null); setActiveType(null); }}
            style={styles.resetLink}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Result count */}
      {filtered.length > 0 && (activeTag || activeType) && (
        <div style={styles.resultCount}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          <button 
            onClick={() => { setActiveTag(null); setActiveType(null); }}
            style={styles.clearAll}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 24px',
    fontFamily: "'Source Serif 4', Georgia, serif",
  },

  header: {
    marginBottom: '48px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '400',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },

  // Filters
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '40px',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  filterLabel: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    paddingLeft: '8px',
  },
  filterOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
  },
  filterItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  filterLink: {
    background: 'none',
    border: 'none',
    padding: '4px 8px',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  filterDivider: {
    color: 'var(--color-text-muted, #8a857e)',
    opacity: 0.2,
    fontSize: '0.75rem',
  },

  // Table Header
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.1))',
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  tableHeaderIcon: {
    width: '20px',
    flexShrink: 0,
  },
  tableHeaderTitle: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    textAlign: 'left',
  },
  tableHeaderDate: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    minWidth: '64px',
  },
  tableHeaderDuration: {
    minWidth: '56px',
    textAlign: 'right',
  },

  // List
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.04))',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  itemIcon: {
    width: '20px',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  itemTitle: {
    flex: 1,
    fontSize: '1rem',
    fontWeight: '400',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.4',
    margin: 0,
  },
  itemDate: {
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    minWidth: '64px',
  },
  itemDuration: {
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    minWidth: '56px',
    textAlign: 'right',
  },

  // Empty
  empty: {
    padding: '48px 0',
    textAlign: 'center',
    color: 'var(--color-text-muted, #8a857e)',
    fontSize: '0.9375rem',
  },
  resetLink: {
    marginTop: '12px',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    cursor: 'pointer',
  },

  // Result count
  resultCount: {
    marginTop: '24px',
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  clearAll: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    cursor: 'pointer',
  },
};
