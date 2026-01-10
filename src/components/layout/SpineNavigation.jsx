import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  const activeIndex = getActiveIndex(currentPath);

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
          padding: '24px 40px 16px 16px',
          backgroundColor: 'transparent',
          zIndex: 100,
        }}
      >
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
            Contact
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          width: '100px',
          padding: '24px 20px 40px 37px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '10px',
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
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    textDecoration: 'none',
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
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
                </motion.a>

                {/* Line Segment - flexGrow animates to push items apart */}
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
                      marginTop: lineVisible ? 10 : 0,
                      marginBottom: lineVisible ? 10 : 0,
                    }}
                    animate={{
                      flexGrow: lineVisible ? 1 : 0,
                      marginTop: lineVisible ? 10 : 0,
                      marginBottom: lineVisible ? 10 : 0,
                    }}
                    transition={hasNavigated ? springTransition : { duration: 0 }}
                  >
                    {/* Top dot */}
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'var(--nav-dot)',
                        borderRadius: '50%',
                      }}
                    />

                    {/* Line */}
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        minHeight: '8px',
                        backgroundColor: 'var(--nav-line)',
                      }}
                    />

                    {/* Bottom dot */}
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
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
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--nav-divider)',
            marginTop: '20px',
            marginBottom: '28px',
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
            gap: '24px',
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
            href="https://youtube.com/@gregtoler"
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
