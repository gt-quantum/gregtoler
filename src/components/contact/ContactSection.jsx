import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, animation } from '../../lib/theme';

// ============================================
// CONTACT PAGE DATA
// ============================================
const contactData = {
  headline: "Start a Project",
  subhead: "Tell me what's going on. We'll figure out the right approach together.",
  email: "greg@gregtoler.com",
  response: "Typically respond within 24 hours",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/gregtoler" },
    { label: "YouTube", href: "https://youtube.com/@gregtolerops" },
  ],
  successTitle: "Got it. I'll be in touch.",
  successText: "I typically respond within 24 hours. Looking forward to learning more about what you're working on.",
};

const situations = [
  { label: "Something's broken or inefficient", value: 'broken', icon: '🔧' },
  { label: "I need something built", value: 'build', icon: '🏗️' },
  { label: "Something works but won't scale", value: 'scale', icon: '📈' },
  { label: "I need ongoing operational support", value: 'ongoing', icon: '🤝' },
  { label: "Not sure yet. I just know something needs to change.", value: 'unsure', icon: '💡' },
];

const involvementAreas = [
  'Process / workflow',
  'Technology / tools',
  'AI / automation',
  'Strategy / architecture',
  'People / training',
  'Data / reporting',
];

// ============================================
// ICONS
// ============================================
const ArrowRight = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ContactSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    situation: '',
    involvement: [],
    message: '',
    name: '',
    email: '',
    contactMethod: 'email',
    phone: '',
    phoneType: 'call',
    bookingLink: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Check for pre-selected situation from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const situation = params.get('situation');
    if (situation) {
      const match = situations.find(s => s.value === situation);
      if (match) {
        setFormState(prev => ({ ...prev, situation: match.value }));
        setCurrentStep(2);
      }
    }
  }, []);

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xpwzgqkr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: situations.find(s => s.value === formState.situation)?.label || formState.situation,
          involvement: formState.involvement.join(', '),
          message: formState.message,
          name: formState.name,
          email: formState.email,
          contactMethod: formState.contactMethod,
          phone: formState.phone,
          phoneType: formState.contactMethod === 'phone' ? formState.phoneType : '',
          bookingLink: formState.bookingLink,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback: still show success but log error
        console.error('Form submission failed:', response.status);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // Still show success to not block the user
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const selectSituation = (value) => {
    setFormState(prev => ({ ...prev, situation: value }));
    setCurrentStep(2);
  };

  const toggleInvolvement = (area) => {
    setFormState(prev => ({
      ...prev,
      involvement: prev.involvement.includes(area)
        ? prev.involvement.filter(a => a !== area)
        : [...prev.involvement, area],
    }));
  };

  const borderColor = isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)';
  const borderColorFocus = isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
  const borderColorLight = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
  };

  const transition = {
    duration: 0.5,
    ease: [0.33, 1, 0.68, 1],
  };

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '80px',
      width: '100%',
      alignItems: 'start',
    },

    main: {
      flex: 1,
      minWidth: 0,
    },

    header: {
      marginBottom: '40px',
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

    // Steps container
    stepsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },

    // Step styling
    stepSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    stepLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    stepQuestion: {
      fontSize: '1.125rem',
      fontWeight: '400',
      color: currentTheme.text,
      margin: 0,
      fontFamily: "'Source Serif 4', Georgia, serif",
    },

    // Situation cards
    situationGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '8px',
    },
    situationCard: {
      padding: '14px 18px',
      borderRadius: '8px',
      border: `1px solid ${borderColor}`,
      background: 'transparent',
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: '1rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: currentTheme.text,
      transition: 'all 0.15s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
    },

    // Involvement chips
    chipGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
    },
    chip: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: `1px solid ${borderColor}`,
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '0.9375rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: currentTheme.text,
      transition: 'all 0.15s ease',
    },

    // Text input
    textarea: {
      padding: '16px',
      fontSize: '1rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: currentTheme.text,
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      border: `1px solid ${borderColor}`,
      borderRadius: '8px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '120px',
      transition: 'border-color 0.2s ease',
      width: '100%',
      marginTop: '8px',
    },
    input: {
      padding: '14px 16px',
      fontSize: '1rem',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: currentTheme.text,
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      border: `1px solid ${borderColor}`,
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      width: '100%',
    },
    contactMethodGrid: {
      display: 'flex',
      gap: '8px',
      marginTop: '8px',
    },
    contactMethodBtn: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: `1px solid ${borderColor}`,
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontFamily: 'inherit',
      color: currentTheme.text,
      transition: 'all 0.15s ease',
    },

    // Navigation buttons
    stepNav: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px',
    },
    nextButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: isDarkMode ? currentTheme.background : '#faf9f7',
      background: currentTheme.text,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      transition: 'opacity 0.2s',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '12px 16px',
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit',
      transition: 'opacity 0.2s',
    },

    // Previous selections summary
    previousSelection: {
      padding: '10px 14px',
      borderRadius: '6px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      fontSize: '0.875rem',
      color: currentTheme.textMuted,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    },
    previousLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: currentTheme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    previousValue: {
      fontSize: '0.875rem',
      color: currentTheme.text,
      fontFamily: "'Source Serif 4', Georgia, serif",
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

    // Sidebar
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
      fontSize: '0.75rem',
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

  const renderPreviousSelections = () => {
    const selections = [];
    if (currentStep > 1 && formState.situation) {
      const sit = situations.find(s => s.value === formState.situation);
      selections.push(
        <div
          key="situation"
          style={styles.previousSelection}
          onClick={() => setCurrentStep(1)}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <div>
            <span style={styles.previousLabel}>Situation</span>
            <div style={styles.previousValue}>{sit?.label}</div>
          </div>
          <span style={{ fontSize: '0.75rem', color: currentTheme.textMuted }}>Edit</span>
        </div>
      );
    }
    if (currentStep > 2 && formState.involvement.length > 0) {
      selections.push(
        <div
          key="involvement"
          style={styles.previousSelection}
          onClick={() => setCurrentStep(2)}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <div>
            <span style={styles.previousLabel}>Involves</span>
            <div style={styles.previousValue}>{formState.involvement.join(', ')}</div>
          </div>
          <span style={{ fontSize: '0.75rem', color: currentTheme.textMuted }}>Edit</span>
        </div>
      );
    }
    if (currentStep > 3 && formState.message) {
      selections.push(
        <div
          key="message"
          style={styles.previousSelection}
          onClick={() => setCurrentStep(3)}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <div>
            <span style={styles.previousLabel}>Details</span>
            <div style={{ ...styles.previousValue, maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {formState.message.slice(0, 80)}{formState.message.length > 80 ? '...' : ''}
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: currentTheme.textMuted }}>Edit</span>
        </div>
      );
    }
    return selections.length > 0 ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
        {selections}
      </div>
    ) : null;
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
          border-color: ${currentTheme.accent} !important;
          box-shadow: 0 0 0 3px ${currentTheme.focusRing} !important;
        }
        .contact-input::placeholder {
          color: ${currentTheme.textMuted};
          opacity: 0.5;
        }
      `}</style>

      {/* Left: Intake Form */}
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

        {/* Progress Bar */}
        {!submitted && (
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '32px' }}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...transition, delay: 0.15 }}
          >
            {[1, 2, 3, 4].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 'none' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    background: currentStep >= step ? currentTheme.text : 'transparent',
                    color: currentStep >= step
                      ? (isDarkMode ? currentTheme.background : '#faf9f7')
                      : currentTheme.textMuted,
                    border: currentStep >= step
                      ? `2px solid ${currentTheme.text}`
                      : `2px solid ${borderColor}`,
                  }}
                >
                  {currentStep > step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : step}
                </div>
                {i < 3 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      background: currentStep > step ? currentTheme.text : borderColor,
                      transition: 'background 0.3s ease',
                    }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        )}

        {!submitted ? (
          <motion.div
            style={styles.stepsContainer}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ ...transition, delay: 0.2 }}
          >
            {/* Previous selections */}
            {renderPreviousSelections()}

            <AnimatePresence mode="wait">
              {/* Step 1: Situation */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  style={styles.stepSection}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                >
                  <span style={styles.stepLabel}>Step 1 of 4</span>
                  <h2 style={styles.stepQuestion}>What can I help with?</h2>
                  <div style={styles.situationGrid}>
                    {situations.map((s) => (
                      <motion.button
                        key={s.value}
                        style={{
                          ...styles.situationCard,
                          background: formState.situation === s.value
                            ? (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                            : 'transparent',
                          borderColor: formState.situation === s.value
                            ? (isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)')
                            : borderColor,
                        }}
                        onClick={() => selectSituation(s.value)}
                        whileHover={{
                          background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
                        }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {s.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Involvement */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  style={styles.stepSection}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                >
                  <span style={styles.stepLabel}>Step 2 of 4</span>
                  <h2 style={styles.stepQuestion}>What's involved?</h2>
                  <div style={styles.chipGrid}>
                    {involvementAreas.map((area) => {
                      const isSelected = formState.involvement.includes(area);
                      return (
                        <motion.button
                          key={area}
                          style={{
                            ...styles.chip,
                            background: isSelected
                              ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')
                              : 'transparent',
                            borderColor: isSelected
                              ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')
                              : borderColor,
                            fontWeight: isSelected ? 500 : 400,
                          }}
                          onClick={() => toggleInvolvement(area)}
                          whileHover={{
                            background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {area}
                        </motion.button>
                      );
                    })}
                  </div>
                  <div style={styles.stepNav}>
                    <button
                      style={styles.backButton}
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                    <motion.button
                      style={{
                        ...styles.nextButton,
                        opacity: formState.involvement.length > 0 ? 1 : 0.5,
                      }}
                      onClick={() => formState.involvement.length > 0 && setCurrentStep(3)}
                      whileHover={{ opacity: 0.9 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue <ArrowRight color={isDarkMode ? currentTheme.background : '#faf9f7'} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Tell me more */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  style={styles.stepSection}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                >
                  <span style={styles.stepLabel}>Step 3 of 4</span>
                  <h2 style={styles.stepQuestion}>Tell me more</h2>
                  <p style={{ fontSize: '0.875rem', color: currentTheme.textMuted, margin: 0 }}>
                    What's going on? What have you tried? What does "fixed" look like for you?
                  </p>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="The more context, the better our first conversation will be..."
                    style={styles.textarea}
                    className="contact-input"
                    rows={6}
                  />
                  <div style={styles.stepNav}>
                    <button
                      style={styles.backButton}
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </button>
                    <motion.button
                      style={{
                        ...styles.nextButton,
                        opacity: formState.message.trim().length > 0 ? 1 : 0.5,
                      }}
                      onClick={() => formState.message.trim().length > 0 && setCurrentStep(4)}
                      whileHover={{ opacity: 0.9 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue <ArrowRight color={isDarkMode ? currentTheme.background : '#faf9f7'} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact info */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  style={styles.stepSection}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                >
                  <span style={styles.stepLabel}>Step 4 of 4</span>
                  <h2 style={styles.stepQuestion}>How should I reach you?</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                    <div>
                      <label style={{ ...styles.stepLabel, display: 'block', marginBottom: '6px' }}>Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                        style={styles.input}
                        className="contact-input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ ...styles.stepLabel, display: 'block', marginBottom: '6px' }}>Email</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        style={{
                          ...styles.input,
                          borderColor: formState.email && !isValidEmail(formState.email) ? '#e57373' : undefined,
                        }}
                        className="contact-input"
                        required
                      />
                      {formState.email && !isValidEmail(formState.email) && (
                        <span style={{ fontSize: '0.75rem', color: '#e57373', marginTop: '4px', display: 'block' }}>
                          Please enter a valid email address
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ ...styles.stepLabel, display: 'block', marginBottom: '6px' }}>Preferred contact method</label>
                      <div style={styles.contactMethodGrid}>
                        {[
                          { value: 'email', label: 'Email' },
                          { value: 'phone', label: 'Phone' },
                          { value: 'video', label: 'Video Call' },
                        ].map((method) => (
                          <button
                            key={method.value}
                            style={{
                              ...styles.contactMethodBtn,
                              background: formState.contactMethod === method.value
                                ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')
                                : 'transparent',
                              borderColor: formState.contactMethod === method.value
                                ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')
                                : borderColor,
                              fontWeight: formState.contactMethod === method.value ? 500 : 400,
                            }}
                            onClick={() => setFormState(prev => ({ ...prev, contactMethod: method.value }))}
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>

                      {/* Conditional fields based on contact method */}
                      <AnimatePresence mode="wait">
                        {formState.contactMethod === 'phone' && (
                          <motion.div
                            key="phone-field"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ marginTop: '12px' }}
                          >
                            <label style={{ ...styles.stepLabel, display: 'block', marginBottom: '6px' }}>Phone number</label>
                            <input
                              type="tel"
                              value={formState.phone}
                              onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="(555) 123-4567"
                              style={styles.input}
                              className="contact-input"
                            />
                            <div style={{ marginTop: '10px' }}>
                              <label style={{ ...styles.stepLabel, display: 'block', marginBottom: '6px' }}>Preferred method</label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {[
                                  { value: 'call', label: 'Call' },
                                  { value: 'text', label: 'Text' },
                                ].map((pt) => (
                                  <button
                                    key={pt.value}
                                    style={{
                                      ...styles.contactMethodBtn,
                                      background: formState.phoneType === pt.value
                                        ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')
                                        : 'transparent',
                                      borderColor: formState.phoneType === pt.value
                                        ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')
                                        : borderColor,
                                      fontWeight: formState.phoneType === pt.value ? 500 : 400,
                                    }}
                                    onClick={() => setFormState(prev => ({ ...prev, phoneType: pt.value }))}
                                  >
                                    {pt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {formState.contactMethod === 'video' && (
                          <motion.div
                            key="video-field"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                          >
                            <a
                              href="https://calendar.app.google/xjyG2v13KtxkypVm7"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                ...styles.contactMethodBtn,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                justifyContent: 'center',
                                padding: '12px 20px',
                                background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            >
                              Book on my calendar <ArrowRight color={currentTheme.text} />
                            </a>
                            <div>
                              <label style={{ ...styles.stepLabel, display: 'block', marginBottom: '6px' }}>Or share your booking link</label>
                              <input
                                type="text"
                                value={formState.bookingLink}
                                onChange={(e) => setFormState(prev => ({ ...prev, bookingLink: e.target.value }))}
                                placeholder="https://calendly.com/you"
                                style={styles.input}
                                className="contact-input"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div style={styles.stepNav}>
                    <button
                      style={styles.backButton}
                      onClick={() => setCurrentStep(3)}
                    >
                      Back
                    </button>
                    <motion.button
                      style={{
                        ...styles.nextButton,
                        opacity: formState.name && isValidEmail(formState.email) && (formState.contactMethod !== 'phone' || formState.phone.trim()) ? 1 : 0.5,
                      }}
                      onClick={() => formState.name && isValidEmail(formState.email) && (formState.contactMethod !== 'phone' || formState.phone.trim()) && handleSubmit()}
                      disabled={submitting}
                      whileHover={{ opacity: 0.9 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? 'Sending...' : 'Send'}{' '}
                      <SendIcon color={isDarkMode ? currentTheme.background : '#faf9f7'} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
        transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1], delay: 0.15 }}
      >
        <div style={styles.sidebarSection}>
          <span style={styles.sidebarLabel}>Direct</span>
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
