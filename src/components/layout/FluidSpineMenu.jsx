import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { theme as themeConfig } from '../../lib/theme';

const menuItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'content', label: 'Content', path: '/content' },
  { id: 'resources', label: 'Resources', path: '/resources' },
];

const ITEM_HEIGHT = 28; // Fixed height for each menu item
const LINE_HEIGHT = 80; // Height of connecting line when visible
const DOT_SIZE = 4;

const getActiveIndex = (path) => {
  return menuItems.findIndex((item) => {
    if (item.path === '/') {
      return path === '/' || path === '';
    }
    return path.startsWith(item.path);
  });
};

// GPU-accelerated spring config
const smoothSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const FluidSpineMenu = ({ children, initialPath = '/' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [hasInitialized, setHasInitialized] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const prevActiveIndex = useRef(getActiveIndex(initialPath));

  const activeIndex = getActiveIndex(currentPath);

  // Precompute which lines should be visible
  const lineVisibility = useMemo(() => {
    return menuItems.slice(0, -1).map((_, index) => {
      if (index === activeIndex - 1) return true;
      if (index === activeIndex && activeIndex < menuItems.length - 1) return true;
      return false;
    });
  }, [activeIndex]);

  // Handle hydration and load preferences
  useEffect(() => {
    setIsClient(true);

    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setIsDarkMode(stored === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }

    const wasInitialized = sessionStorage.getItem('menuInitialized');
    if (wasInitialized) {
      setHasInitialized(true);
    } else {
      sessionStorage.setItem('menuInitialized', 'true');
      // Use double RAF for smoother initial state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHasInitialized(true);
        });
      });
    }

    setCurrentPath(window.location.pathname);
  }, []);

  // Listen for navigation events
  useEffect(() => {
    const handlePageLoad = () => {
      prevActiveIndex.current = activeIndex;
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    window.addEventListener('popstate', handlePageLoad);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      window.removeEventListener('popstate', handlePageLoad);
    };
  }, [activeIndex]);

  // Persist dark mode
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('darkMode', String(isDarkMode));
      document.documentElement.style.backgroundColor = isDarkMode ? '#1A1714' : '#F3EEE7';
    }
  }, [isDarkMode, isClient]);

  // Update previous index after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      prevActiveIndex.current = activeIndex;
    }, 400);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const currentTheme = isDarkMode ? themeConfig.dark : themeConfig.light;

  const handleNavClick = (e, path) => {
    prevActiveIndex.current = activeIndex;
    setCurrentPath(path);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Determine animation behavior
  const shouldAnimate = hasInitialized && !prefersReducedMotion;
  const instantTransition = { duration: 0 };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: currentTheme.background,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 40px 16px 16px',
          backgroundColor: 'transparent',
        }}
      >
        <a
          href="/"
          style={{ textDecoration: 'none' }}
          onClick={(e) => handleNavClick(e, '/')}
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
          <motion.button
            onClick={toggleDarkMode}
            style={{
              background: 'none',
              border: 'none',
              color: currentTheme.headerButton,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit',
            }}
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
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
          </motion.button>

          <motion.button
            style={{
              background: 'none',
              border: 'none',
              color: currentTheme.headerButton,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              fontFamily: 'inherit',
            }}
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            Services
          </motion.button>

          <motion.button
            style={{
              background: 'none',
              border: 'none',
              color: currentTheme.headerButton,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              fontFamily: 'inherit',
            }}
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            Contact
          </motion.button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '100px',
            padding: '24px 20px 40px 37px',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '10px',
          }}
        >
          {/* Menu Container */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              alignItems: 'center',
              minHeight: 0,
            }}
          >
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Menu Item */}
                <motion.a
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: ITEM_HEIGHT,
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    textDecoration: 'none',
                    willChange: 'transform',
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <motion.span
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.2px',
                      whiteSpace: 'nowrap',
                      willChange: 'opacity',
                    }}
                    initial={!shouldAnimate ? {
                      color: index === activeIndex ? currentTheme.activeText : currentTheme.inactiveText,
                      fontWeight: index === activeIndex ? 500 : 400,
                    } : false}
                    animate={{
                      color: index === activeIndex ? currentTheme.activeText : currentTheme.inactiveText,
                      fontWeight: index === activeIndex ? 500 : 400,
                    }}
                    transition={shouldAnimate ? { duration: 0.2 } : instantTransition}
                  >
                    {item.label}
                  </motion.span>
                </motion.a>

                {/* Line Segment - GPU accelerated */}
                {index < menuItems.length - 1 && (
                  <div
                    style={{
                      position: 'relative',
                      width: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transformOrigin: 'center top',
                        willChange: 'transform, opacity',
                      }}
                      initial={!shouldAnimate ? {
                        opacity: lineVisibility[index] ? 1 : 0,
                        scaleY: lineVisibility[index] ? 1 : 0,
                        height: lineVisibility[index] ? LINE_HEIGHT : 0,
                      } : false}
                      animate={{
                        opacity: lineVisibility[index] ? 1 : 0,
                        scaleY: lineVisibility[index] ? 1 : 0,
                        height: lineVisibility[index] ? LINE_HEIGHT : 0,
                      }}
                      transition={shouldAnimate ? smoothSpring : instantTransition}
                    >
                      {/* Top dot */}
                      <motion.div
                        style={{
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          backgroundColor: currentTheme.dot,
                          borderRadius: '50%',
                          flexShrink: 0,
                          willChange: 'transform',
                        }}
                        initial={!shouldAnimate ? { scale: lineVisibility[index] ? 1 : 0 } : false}
                        animate={{ scale: lineVisibility[index] ? 1 : 0 }}
                        transition={shouldAnimate ? { ...smoothSpring, delay: lineVisibility[index] ? 0.05 : 0 } : instantTransition}
                      />

                      {/* Line */}
                      <div
                        style={{
                          width: '1px',
                          flex: 1,
                          minHeight: '8px',
                          backgroundColor: currentTheme.line,
                        }}
                      />

                      {/* Bottom dot */}
                      <motion.div
                        style={{
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          backgroundColor: currentTheme.dot,
                          borderRadius: '50%',
                          flexShrink: 0,
                          willChange: 'transform',
                        }}
                        initial={!shouldAnimate ? { scale: lineVisibility[index] ? 1 : 0 } : false}
                        animate={{ scale: lineVisibility[index] ? 1 : 0 }}
                        transition={shouldAnimate ? { ...smoothSpring, delay: lineVisibility[index] ? 0.1 : 0 } : instantTransition}
                      />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Divider */}
          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: currentTheme.divider,
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
            <motion.a
              href="https://linkedin.com/in/gregtoler"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: currentTheme.socialIcon,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                willChange: 'opacity',
              }}
              whileHover={{ color: currentTheme.text }}
              transition={{ duration: 0.15 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://youtube.com/@gregtoler"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: currentTheme.socialIcon,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                willChange: 'opacity',
              }}
              whileHover={{ color: currentTheme.text }}
              transition={{ duration: 0.15 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </motion.a>
          </div>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 64px 64px 24px',
            overflow: 'auto',
            color: currentTheme.text,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default FluidSpineMenu;
