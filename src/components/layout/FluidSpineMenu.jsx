import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme as themeConfig, animation } from '../../lib/theme';

const menuItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'content', label: 'Content', path: '/content' },
  { id: 'resources', label: 'Resources', path: '/resources' },
];

const FluidSpineMenu = ({ children, currentPath = '/' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Get active index based on current path
  const activeIndex = menuItems.findIndex((item) => {
    if (item.path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(item.path);
  });

  // Handle hydration and load dark mode preference
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setIsDarkMode(stored === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Persist dark mode preference
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('darkMode', String(isDarkMode));
    }
  }, [isDarkMode, isClient]);

  const currentTheme = isDarkMode ? themeConfig.dark : themeConfig.light;

  // Determine if line segment should be visible
  // Lines appear IMMEDIATELY ADJACENT to active item (both above AND below)
  const shouldShowLine = (afterIndex) => {
    if (afterIndex === activeIndex - 1) return true;
    if (afterIndex === activeIndex && activeIndex < menuItems.length - 1) return true;
    return false;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none' }}>
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

        {/* Header Actions */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {/* Dark Mode Toggle */}
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
              opacity: 0.6,
              fontFamily: 'inherit',
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
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

          {/* Services Button */}
          <motion.button
            style={{
              background: 'none',
              border: 'none',
              color: currentTheme.headerButton,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              opacity: 0.6,
              fontFamily: 'inherit',
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            Services
          </motion.button>

          {/* Contact Button */}
          <motion.button
            style={{
              background: 'none',
              border: 'none',
              color: currentTheme.headerButton,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              opacity: 0.6,
              fontFamily: 'inherit',
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.button>
        </div>
      </header>

      {/* Main Container */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
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
          <div
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
                  whileHover={{ scale: 1.02 }}
                  transition={animation.spring}
                >
                  <motion.span
                    animate={{
                      color: index === activeIndex ? currentTheme.activeText : currentTheme.inactiveText,
                      fontWeight: index === activeIndex ? 500 : 400,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.2px',
                      whiteSpace: 'nowrap',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                    }}
                  >
                    {item.label}
                  </motion.span>
                </motion.a>

                {/* Line Segment */}
                {index < menuItems.length - 1 && (
                  <motion.div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                    animate={{
                      flexGrow: shouldShowLine(index) ? 1 : 0,
                      opacity: shouldShowLine(index) ? 1 : 0,
                      marginTop: shouldShowLine(index) ? 10 : 0,
                      marginBottom: shouldShowLine(index) ? 10 : 0,
                    }}
                    transition={{
                      flexGrow: animation.spring,
                      opacity: animation.fade,
                      marginTop: animation.spring,
                      marginBottom: animation.spring,
                    }}
                  >
                    {/* Top dot */}
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: currentTheme.dot,
                        borderRadius: '50%',
                      }}
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
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: currentTheme.dot,
                        borderRadius: '50%',
                      }}
                    />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

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
            {/* LinkedIn */}
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
              }}
              whileHover={{ color: currentTheme.text }}
              transition={{ duration: 0.2 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>

            {/* YouTube */}
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
              }}
              whileHover={{ color: currentTheme.text }}
              transition={{ duration: 0.2 }}
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
          }}
        >
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={animation.spring}
            style={{
              flex: 1,
              color: currentTheme.text,
            }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default FluidSpineMenu;
