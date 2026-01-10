import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Menu item icons for mobile
const MenuIcons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  about: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  work: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  content: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  resources: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
};

const menuItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'content', label: 'Content', path: '/content' },
  { id: 'resources', label: 'Resources', path: '/resources' },
];

const getActiveIndex = (path) => {
  return menuItems.findIndex((item) => {
    if (item.path === '/') {
      return path === '/' || path === '';
    }
    return path.startsWith(item.path);
  });
};

// Check if line should show for a given active index
const shouldShowLineForIndex = (lineIndex, activeIdx) => {
  if (lineIndex === activeIdx - 1) return true;
  if (lineIndex === activeIdx && activeIdx < menuItems.length - 1) return true;
  return false;
};

const SpineNavigation = ({ initialPath = '/' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex = getActiveIndex(currentPath);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle hydration and load preferences
  useEffect(() => {
    // Load dark mode preference
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setIsDarkMode(stored === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }

    // Sync path with actual URL
    setCurrentPath(window.location.pathname);
  }, []);

  // Listen for Astro navigation
  useEffect(() => {
    const handleBeforeSwap = (event) => {
      // Apply theme to the INCOMING document BEFORE it gets swapped in
      // This prevents the flash of wrong theme
      const newDoc = event.newDocument;
      newDoc.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    };

    const handleAfterSwap = () => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        setHasNavigated(true);
        setCurrentPath(newPath);
      }
    };

    // before-swap: apply theme to incoming document (prevents flash)
    document.addEventListener('astro:before-swap', handleBeforeSwap);
    // after-swap: update path state
    document.addEventListener('astro:after-swap', handleAfterSwap);
    window.addEventListener('popstate', handleAfterSwap);

    return () => {
      document.removeEventListener('astro:before-swap', handleBeforeSwap);
      document.removeEventListener('astro:after-swap', handleAfterSwap);
      window.removeEventListener('popstate', handleAfterSwap);
    };
  }, [currentPath, isDarkMode]);

  // Persist dark mode and sync to document
  useEffect(() => {
    localStorage.setItem('darkMode', String(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleNavClick = (path) => {
    if (path !== currentPath) {
      setHasNavigated(true);
      setCurrentPath(path);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Spring config for smooth animations
  const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 35,
  };


  return (
    <>
      {/* Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 40px 24px 16px',
          background: isDarkMode
            ? 'linear-gradient(to bottom, #1a1714 0%, #1a1714 60%, transparent 100%)'
            : 'linear-gradient(to bottom, #fcfaf7 0%, #fcfaf7 60%, transparent 100%)',
          zIndex: 100,
          transition: 'background 0.3s ease',
          pointerEvents: 'none',
        }}
      >
      <style>{`
        header > * {
          pointer-events: auto;
        }
        .mobile-menu-item:hover {
          background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
        }
        @media (max-width: 768px) {
          header {
            padding: 16px 16px 16px 8px !important;
          }
        }
      `}</style>
        <a
          href="/"
          onClick={() => handleNavClick('/')}
          style={{ textDecoration: 'none' }}
        >
          <img
            src="/logo.png"
            alt="GT Strategies"
            style={{
              height: '37px',
              width: 'auto',
              marginLeft: '26px',
              objectFit: 'contain',
              filter: isDarkMode
                ? 'brightness(0) saturate(100%) invert(89%)'
                : 'brightness(0) saturate(100%) invert(15%)',
              transition: 'filter 0.3s ease',
            }}
          />
        </a>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Dark mode toggle - always visible */}
          <button
            onClick={toggleDarkMode}
            className="header-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--nav-header-button)',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.6,
              fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isDarkMode ? (
                <>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </svg>
          </button>

          {/* Desktop: Services and Contact buttons */}
          {!isMobile && (
            <>
              <button
                className="header-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--nav-header-button)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  opacity: 0.6,
                  fontFamily: 'inherit',
                  transition: 'opacity 0.2s',
                }}
              >
                Services
              </button>

              <a
                href="/contact"
                className="header-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--nav-header-button)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  opacity: 0.6,
                  fontFamily: 'inherit',
                  transition: 'opacity 0.2s',
                  textDecoration: 'none',
                }}
              >
                Contact
              </a>
            </>
          )}

          {/* Mobile: Hamburger menu */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="header-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--nav-header-button)',
                cursor: 'pointer',
                padding: '8px',
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '77px',
              right: '16px',
              background: isDarkMode
                ? 'rgba(30, 27, 23, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '8px',
              boxShadow: isDarkMode
                ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
              zIndex: 150,
              minWidth: '160px',
            }}
          >
            <button
              className="mobile-menu-item"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                color: isDarkMode ? '#E8E3DC' : '#2C2824',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'background 0.2s',
                fontFamily: 'inherit',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </button>
            <a
              href="/contact"
              className="mobile-menu-item"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                color: isDarkMode ? '#E8E3DC' : '#2C2824',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        style={{
          width: isMobile ? '60px' : '100px',
          padding: isMobile ? '16px 8px 24px 8px' : '24px 20px 40px 37px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: isMobile ? '0' : '10px',
          position: 'fixed',
          left: 0,
          top: '77px',
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Menu Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            minHeight: 0,
          }}
        >
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;
            const lineVisible = shouldShowLineForIndex(index, activeIndex);

            return (
              <React.Fragment key={item.id}>
                {/* Menu Item */}
                <motion.a
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="nav-item"
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 auto',
                    padding: isMobile ? '8px' : '4px 20px',
                    textDecoration: 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {isMobile ? (
                    /* Mobile: Show icon */
                    <span
                      style={{
                        color: isActive ? 'var(--nav-active-text)' : 'var(--nav-inactive-text)',
                        opacity: isActive ? 1 : 0.6,
                        transition: 'color 0.2s, opacity 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {MenuIcons[item.id]}
                    </span>
                  ) : (
                    /* Desktop: Show text */
                    <span
                      className={isActive ? '' : 'nav-item-inactive'}
                      style={{
                        fontSize: '14px',
                        letterSpacing: '0.2px',
                        whiteSpace: 'nowrap',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        color: isActive ? 'var(--nav-active-text)' : 'var(--nav-inactive-text)',
                        fontWeight: isActive ? 500 : 400,
                        transition: 'color 0.2s, font-weight 0.3s',
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </motion.a>

                {/* Line Segment - shows on both desktop and mobile */}
                {index < menuItems.length - 1 && (
                  <motion.div
                    initial={false}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      overflow: 'hidden',
                      // Set initial styles to match animate target (prevents SSR flash)
                      flexGrow: lineVisible ? 1 : 0,
                      marginTop: lineVisible ? (isMobile ? 6 : 10) : 0,
                      marginBottom: lineVisible ? (isMobile ? 6 : 10) : 0,
                      opacity: lineVisible ? 1 : 0,
                    }}
                    animate={{
                      flexGrow: lineVisible ? 1 : 0,
                      marginTop: lineVisible ? (isMobile ? 6 : 10) : 0,
                      marginBottom: lineVisible ? (isMobile ? 6 : 10) : 0,
                      opacity: lineVisible ? 1 : 0,
                    }}
                    transition={hasNavigated ? springTransition : { duration: 0 }}
                  >
                    {/* Top dot */}
                    <div
                      style={{
                        width: isMobile ? '3px' : '4px',
                        height: isMobile ? '3px' : '4px',
                        backgroundColor: 'var(--nav-dot)',
                        borderRadius: '50%',
                      }}
                    />

                    {/* Line */}
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        minHeight: isMobile ? '4px' : '8px',
                        backgroundColor: 'var(--nav-line)',
                      }}
                    />

                    {/* Bottom dot */}
                    <div
                      style={{
                        width: isMobile ? '3px' : '4px',
                        height: isMobile ? '3px' : '4px',
                        backgroundColor: 'var(--nav-dot)',
                        borderRadius: '50%',
                      }}
                    />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: isMobile ? '30px' : '40px',
            height: '1px',
            backgroundColor: 'var(--nav-divider)',
            marginTop: isMobile ? '12px' : '20px',
            marginBottom: isMobile ? '16px' : '28px',
            marginLeft: 'auto',
            marginRight: 'auto',
            transition: 'background-color 0.3s ease',
          }}
        />

        {/* Social Icons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '16px' : '24px',
            alignItems: 'center',
          }}
        >
          <a
            href="https://linkedin.com/in/gregtoler"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            style={{
              color: 'var(--nav-social-icon)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <a
            href="https://youtube.com/@gregtolerops"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            style={{
              color: 'var(--nav-social-icon)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
};

export default SpineNavigation;
