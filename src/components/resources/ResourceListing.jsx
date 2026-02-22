import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, animation } from '../../lib/theme';

// Resource types from schema
const TYPES = ['Spreadsheet', 'PDF', 'Tool', 'Video', 'Template', 'Guide'];

// Common tags for resources
const TAGS = ['GTM', 'Marketing', 'Sales', 'Process', 'Operations', 'Strategy'];

// Type icons
const TypeIcon = ({ type, color }) => {
  const icons = {
    spreadsheet: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    pdf: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
    template: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    guide: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    tool: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    video: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    ),
  };

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {icons[type] || icons.template}
    </span>
  );
};

// Sort arrow indicator
const SortArrow = ({ active, direction, color }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
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

export default function ResourceListing({ items = [] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

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

  // Toggle filters
  const toggleTag = (tag) => setActiveTag((prev) => (prev === tag ? null : tag));
  const toggleType = (type) => setActiveType((prev) => (prev === type ? null : type));

  // Toggle sort
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'title' ? 'asc' : 'desc');
    }
  };

  // Filter and sort items
  const filtered = items
    .filter((item) => !activeTag || item.tags.includes(activeTag))
    .filter((item) => !activeType || item.resourceType.toLowerCase() === activeType.toLowerCase())
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

  // Type labels
  const typeLabels = {
    spreadsheet: 'Spreadsheet',
    pdf: 'PDF',
    tool: 'Tool',
    video: 'Video',
    template: 'Template',
    guide: 'Guide',
  };

  // Styles
  const styles = {
    container: {
      width: '100%',
    },

    header: {
      marginBottom: '48px',
    },
    title: {
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      margin: 0,
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
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
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
      fontSize: '15px',
      fontFamily: 'inherit',
      color: currentTheme.text,
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
    },
    filterDivider: {
      color: currentTheme.textMuted,
      opacity: 0.5,
      fontSize: '12px',
    },

    // Table Header
    tableHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 8px',
      borderBottom: `1px solid ${currentTheme.divider}`,
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    tableHeaderIcon: {
      width: '20px',
      flexShrink: 0,
    },
    tableHeaderButton: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      padding: 0,
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
    tableHeaderTitle: {
      flex: 1,
      textAlign: 'left',
    },
    tableHeaderDate: {
      minWidth: '64px',
    },
    tableHeaderType: {
      minWidth: '80px',
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
      padding: '16px 8px',
      borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.12)'}`,
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background 0.15s ease',
    },
    itemIcon: {
      width: '20px',
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    itemTitle: {
      flex: 1,
      fontSize: '16px',
      fontWeight: '400',
      color: currentTheme.text,
      lineHeight: '1.4',
      margin: 0,
    },
    itemDate: {
      fontSize: '13px',
      color: currentTheme.textMuted,
      minWidth: '64px',
    },
    itemType: {
      fontSize: '13px',
      color: currentTheme.textMuted,
      minWidth: '80px',
      textAlign: 'right',
      textTransform: 'capitalize',
    },

    // Empty state
    empty: {
      padding: '48px 0',
      textAlign: 'center',
      color: currentTheme.textMuted,
      fontSize: '15px',
    },
    resetLink: {
      marginTop: '12px',
      background: 'none',
      border: 'none',
      padding: 0,
      fontSize: '14px',
      color: currentTheme.text,
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },

    // Result count
    resultCount: {
      marginTop: '24px',
      fontSize: '13px',
      color: currentTheme.textMuted,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    clearAll: {
      background: 'none',
      border: 'none',
      padding: 0,
      fontSize: '13px',
      color: currentTheme.textMuted,
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 style={styles.title}>Resources</h1>
      </motion.header>

      {/* Filters */}
      <motion.div
        style={styles.filters}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        {/* Topic Filter */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>Topic</span>
          <nav style={styles.filterOptions}>
            {TAGS.map((tag, i) => (
              <span key={tag} style={styles.filterItem}>
                <motion.button
                  onClick={() => toggleTag(tag)}
                  style={{
                    ...styles.filterLink,
                    opacity: activeTag === tag ? 1 : activeTag ? 0.3 : 0.6,
                    color: activeTag === tag ? currentTheme.accent : currentTheme.text,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={animation.fade}
                >
                  {tag}
                </motion.button>
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
                <motion.button
                  onClick={() => toggleType(type)}
                  style={{
                    ...styles.filterLink,
                    opacity: activeType === type ? 1 : activeType ? 0.3 : 0.6,
                    color: activeType === type ? currentTheme.accent : currentTheme.text,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={animation.fade}
                >
                  {type}
                </motion.button>
                {i < TYPES.length - 1 && <span style={styles.filterDivider}>/</span>}
              </span>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Table Header */}
      <motion.div
        style={styles.tableHeader}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
      >
        <span style={styles.tableHeaderIcon}></span>
        <button
          onClick={() => toggleSort('title')}
          style={{ ...styles.tableHeaderButton, ...styles.tableHeaderTitle }}
        >
          Title
          <SortArrow active={sortKey === 'title'} direction={sortKey === 'title' ? sortDir : 'asc'} color={currentTheme.textMuted} />
        </button>
        <button
          onClick={() => toggleSort('date')}
          style={{ ...styles.tableHeaderButton, ...styles.tableHeaderDate }}
        >
          Date
          <SortArrow active={sortKey === 'date'} direction={sortKey === 'date' ? sortDir : 'desc'} color={currentTheme.textMuted} />
        </button>
        <span style={styles.tableHeaderType}>Type</span>
      </motion.div>

      {/* Resource List */}
      <motion.main
        style={styles.list}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.a
              href={`/resources/${item.slug}`}
              key={item.slug}
              style={styles.item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              whileHover={{ x: 4, backgroundColor: currentTheme.hoverBg }}
              layout
            >
              <div style={styles.itemIcon}>
                <TypeIcon type={item.resourceType} color={currentTheme.textMuted} />
              </div>
              <h2 style={styles.itemTitle}>{item.title}</h2>
              <span style={styles.itemDate}>
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span style={styles.itemType}>{typeLabels[item.resourceType]}</span>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.main>

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div
          style={styles.empty}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={animation.fade}
        >
          <p>No resources found.</p>
          <button
            onClick={() => {
              setActiveTag(null);
              setActiveType(null);
            }}
            style={styles.resetLink}
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Result count when filtered */}
      {filtered.length > 0 && (activeTag || activeType) && (
        <motion.div
          style={styles.resultCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={animation.fade}
        >
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          <button
            onClick={() => {
              setActiveTag(null);
              setActiveType(null);
            }}
            style={styles.clearAll}
          >
            Clear
          </button>
        </motion.div>
      )}
    </div>
  );
}
