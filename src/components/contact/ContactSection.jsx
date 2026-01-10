import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme, animation } from '../../lib/theme';

// ============================================
// CONTACT PAGE DATA - Edit this object to update content
// ============================================
const contactData = {
  headline: "Let's work together.",
  subhead: "Have a project in mind? I'd love to hear about it.",
  email: "greg@gregtoler.com",
  response: "Typically respond within 24 hours",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/gregtoler" },
    { label: "YouTube", href: "https://youtube.com/@gregtolerops" },
  ],
  topics: [
    "GTM Strategy",
    "RevOps",
    "BizOps",
    "Automation",
    "Processes",
  ],
  successTitle: "Message sent",
  successText: "Thanks for reaching out. I'll get back to you soon.",
};

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ContactSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topics: [], // Changed to array for multi-select
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Toggle topic selection (multi-select)
  const toggleTopic = (topic) => {
    setFormState(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
  };

  const transition = {
    duration: 1.1,
    ease: [0.33, 1, 0.68, 1],
  };

  // Dynamic styles
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)';
  const borderColorFocus = isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
  const borderColorLight = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '80px',
      width: '100%',
      alignItems: 'start',
    },

    // Main (left)
    main: {
      flex: 1,
      minWidth: 0,
    },

    header: {
      marginBottom: '48px',
    },

    headline: {
      fontSize: '2.25rem',
      fontWeight: '400',
      color: currentTheme.text,
      lineHeight: '1.2',
      margin: 0,
      marginBottom: '12px',
      letterSpacing: '-0.02em',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    subhead: {
      fontSize: '1.125rem',
      color: currentTheme.textMuted,
      margin: 0,
      lineHeight: '1.5',
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Form
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },

    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },

    label: {
      fontSize: '11px',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },

    input: {
      padding: '16px 0',
      fontSize: '1.0625rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: currentTheme.text,
      background: 'transparent',
      border: 'none',
      borderBottom: `2px solid ${borderColor}`,
      outline: 'none',
      transition: 'border-color 0.2s ease',
      width: '100%',
    },

    textarea: {
      padding: '16px 0',
      fontSize: '1.0625rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: currentTheme.text,
      background: 'transparent',
      border: 'none',
      borderBottom: `2px solid ${borderColor}`,
      outline: 'none',
      resize: 'vertical',
      minHeight: '120px',
      transition: 'border-color 0.2s ease',
      width: '100%',
    },

    // Topic filter style (like content/resources)
    topicFilter: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px',
      marginTop: '4px',
    },

    topicItem: {
      display: 'inline-flex',
      alignItems: 'center',
    },

    topicButton: {
      background: 'none',
      border: 'none',
      padding: '4px 8px',
      fontSize: '15px',
      fontFamily: 'inherit',
      color: currentTheme.text,
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
    },

    topicDivider: {
      color: currentTheme.textMuted,
      opacity: 0.5,
      fontSize: '12px',
    },

    submitButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '16px 32px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: isDarkMode ? currentTheme.background : '#faf9f7',
      background: currentTheme.text,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '8px',
      alignSelf: 'flex-start',
      transition: 'opacity 0.2s ease',
      fontFamily: 'inherit',
    },

    // Success state
    success: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '16px',
      padding: '48px 0',
    },

    successIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: '#4ade80',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
    },

    successTitle: {
      fontSize: '1.5rem',
      fontWeight: '500',
      color: currentTheme.text,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    successText: {
      fontSize: '1rem',
      color: currentTheme.textMuted,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Sidebar (right)
    sidebar: {
      position: 'sticky',
      top: '125px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },

    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    sidebarLabel: {
      fontSize: '0.6875rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },

    emailLink: {
      fontSize: '1rem',
      color: currentTheme.text,
      textDecoration: 'none',
      borderBottom: `1px solid ${borderColor}`,
      paddingBottom: '2px',
      width: 'fit-content',
      fontFamily: "'Source Serif 4', Georgia, serif",
      transition: 'opacity 0.2s ease',
    },

    responseTime: {
      fontSize: '0.8125rem',
      color: currentTheme.textMuted,
      margin: 0,
    },

    links: {
      display: 'flex',
      flexDirection: 'column',
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.9375rem',
      color: currentTheme.text,
      textDecoration: 'none',
      padding: '12px 0',
      borderBottom: `1px solid ${borderColorLight}`,
      transition: 'opacity 0.2s ease',
    },
  };

  return (
    <div style={styles.container} className="contact-container">
      <style>{`
        @media (max-width: 900px) {
          .contact-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 48px !important;
          }
          .contact-sidebar {
            position: relative !important;
            top: 0 !important;
            order: 1 !important;
            max-width: 320px !important;
          }
          .contact-main {
            order: 0 !important;
            max-width: 100% !important;
          }
        }
        .contact-input:focus {
          border-color: ${borderColorFocus} !important;
        }
        .contact-input::placeholder {
          color: ${currentTheme.textMuted};
          opacity: 0.5;
        }
      `}</style>

      {/* Left: Form */}
      <main style={styles.main} className="contact-main">
        <motion.header
          style={styles.header}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transition, delay: 0.1 }}
        >
          <h1 style={styles.headline}>{contactData.headline}</h1>
          <p style={styles.subhead}>{contactData.subhead}</p>
        </motion.header>

        {!submitted ? (
          <motion.form
            style={styles.form}
            onSubmit={handleSubmit}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...transition, delay: 0.2 }}
          >
            {/* Name */}
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                style={styles.input}
                className="contact-input"
                required
              />
            </div>

            {/* Email */}
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com"
                style={styles.input}
                className="contact-input"
                required
              />
            </div>

            {/* Topic - Filter style with multi-select */}
            <div style={styles.field}>
              <label style={styles.label}>Topic (select all that apply)</label>
              <nav style={styles.topicFilter}>
                {contactData.topics.map((topic, i) => {
                  const isSelected = formState.topics.includes(topic);
                  const hasSelection = formState.topics.length > 0;
                  return (
                    <span key={topic} style={styles.topicItem}>
                      <motion.button
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        style={{
                          ...styles.topicButton,
                          opacity: isSelected ? 1 : hasSelection ? 0.4 : 0.6,
                          fontWeight: isSelected ? 500 : 400,
                        }}
                        whileHover={{ opacity: 1 }}
                        transition={animation.fade}
                      >
                        {topic}
                      </motion.button>
                      {i < contactData.topics.length - 1 && (
                        <span style={styles.topicDivider}>/</span>
                      )}
                    </span>
                  );
                })}
              </nav>
            </div>

            {/* Message */}
            <div style={styles.field}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                style={styles.textarea}
                className="contact-input"
                rows={5}
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              style={styles.submitButton}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Send message</span>
              <SendIcon color={isDarkMode ? currentTheme.background : '#faf9f7'} />
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            style={styles.success}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div style={styles.successIcon}>
              <CheckIcon />
            </div>
            <h2 style={styles.successTitle}>{contactData.successTitle}</h2>
            <p style={styles.successText}>{contactData.successText}</p>
          </motion.div>
        )}
      </main>

      {/* Right: Contact Info Sidebar */}
      <motion.aside
        style={styles.sidebar}
        className="contact-sidebar"
        variants={fadeInRight}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.15 }}
      >
        {/* Email */}
        <div style={styles.sidebarSection}>
          <span style={styles.sidebarLabel}>Email</span>
          <a
            href={`mailto:${contactData.email}`}
            style={styles.emailLink}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {contactData.email}
          </a>
          <p style={styles.responseTime}>{contactData.response}</p>
        </div>

        {/* Connect */}
        <div style={styles.sidebarSection}>
          <span style={styles.sidebarLabel}>Connect</span>
          <div style={styles.links}>
            {contactData.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <span>{link.label}</span>
                <ArrowRight color={currentTheme.textMuted} />
              </a>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
