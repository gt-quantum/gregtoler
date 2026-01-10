import { useState } from 'react';
import { motion } from 'framer-motion';

// Contact Page
// Minimal editorial style - two column with form left, info right

// Icons
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const contactData = {
  headline: "Let's work together.",
  subhead: "Have a project in mind? I'd love to hear about it.",
  email: "greg@gregtoler.com",
  response: "Typically respond within 24 hours",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/gregtoler" },
    { label: "Twitter", href: "https://twitter.com/gregtoler" },
  ],
  topics: [
    "GTM Strategy",
    "RevOps", 
    "BizOps",
    "Automation",
    "Processes",
  ],
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={styles.container}>
      {/* Left: Form */}
      <main style={styles.main}>
        <motion.header 
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={styles.headline}>{contactData.headline}</h1>
          <p style={styles.subhead}>{contactData.subhead}</p>
        </motion.header>

        {!submitted ? (
          <motion.form 
            style={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Name */}
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                style={styles.input}
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
                style={styles.input}
                required
              />
            </div>

            {/* Topic */}
            <div style={styles.field}>
              <label style={styles.label}>Topic</label>
              <div style={styles.topics}>
                {contactData.topics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setFormState(prev => ({ ...prev, topic }))}
                    style={{
                      ...styles.topicButton,
                      ...(formState.topic === topic ? styles.topicButtonActive : {}),
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div style={styles.field}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                style={styles.textarea}
                rows={5}
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              style={styles.submitButton}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span>Send message</span>
              <SendIcon />
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
            <h2 style={styles.successTitle}>Message sent</h2>
            <p style={styles.successText}>Thanks for reaching out. I'll get back to you soon.</p>
          </motion.div>
        )}
      </main>

      {/* Right: Contact Info */}
      <motion.aside 
        style={styles.sidebar}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {/* Email */}
        <div style={styles.sidebarSection}>
          <span style={styles.sidebarLabel}>Email</span>
          <a href={`mailto:${contactData.email}`} style={styles.emailLink}>
            {contactData.email}
          </a>
          <p style={styles.responseTime}>{contactData.response}</p>
        </div>

        {/* Other ways */}
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
              >
                <span>{link.label}</span>
                <ArrowRight />
              </a>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '64px',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px 24px 120px',
    fontFamily: "'Source Serif 4', Georgia, serif",
    minHeight: '100vh',
    alignItems: 'start',
  },

  // Main (left)
  main: {
    maxWidth: '520px',
  },
  header: {
    marginBottom: '48px',
  },
  headline: {
    fontSize: '2.25rem',
    fontWeight: '400',
    color: 'var(--color-text, #2d2a26)',
    lineHeight: '1.2',
    margin: 0,
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  subhead: {
    fontSize: '1.125rem',
    color: 'var(--color-text-muted, #6b6560)',
    margin: 0,
    lineHeight: '1.5',
  },

  // Form
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.6875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  input: {
    padding: '14px 0',
    fontSize: '1rem',
    fontFamily: "'Source Serif 4', Georgia, serif",
    color: 'var(--color-text, #2d2a26)',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.12))',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  textarea: {
    padding: '14px 0',
    fontSize: '1rem',
    fontFamily: "'Source Serif 4', Georgia, serif",
    color: 'var(--color-text, #2d2a26)',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.12))',
    outline: 'none',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'border-color 0.2s ease',
  },
  topics: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '4px',
  },
  topicButton: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #6b6560)',
    background: 'transparent',
    border: '1px solid var(--color-border, rgba(0,0,0,0.12))',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  topicButtonActive: {
    color: 'var(--color-bg, #faf9f7)',
    background: 'var(--color-text, #2d2a26)',
    borderColor: 'var(--color-text, #2d2a26)',
  },
  submitButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 32px',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-bg, #faf9f7)',
    background: 'var(--color-text, #2d2a26)',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px',
    alignSelf: 'flex-start',
    transition: 'background 0.2s ease',
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
    color: 'var(--color-text, #2d2a26)',
    margin: 0,
  },
  successText: {
    fontSize: '1rem',
    color: 'var(--color-text-muted, #6b6560)',
    margin: 0,
  },

  // Sidebar (right)
  sidebar: {
    position: 'sticky',
    top: '80px',
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
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: '500',
    color: 'var(--color-text-muted, #8a857e)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  emailLink: {
    fontSize: '1rem',
    color: 'var(--color-text, #2d2a26)',
    textDecoration: 'none',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.12))',
    paddingBottom: '2px',
    width: 'fit-content',
  },
  responseTime: {
    fontSize: '0.8125rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text-muted, #8a857e)',
    margin: 0,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.9375rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: 'var(--color-text, #2d2a26)',
    textDecoration: 'none',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border, rgba(0,0,0,0.06))',
    transition: 'opacity 0.2s ease',
  },
};
