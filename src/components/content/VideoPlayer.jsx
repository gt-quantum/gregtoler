import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

// Convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1` : url;
};

export default function VideoPlayer({ videoUrl, coverImage, title }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  const styles = {
    wrapper: {
      width: '100%',
      aspectRatio: '16/9',
      borderRadius: '4px',
      overflow: 'hidden',
      position: 'relative',
    },
    thumbnail: {
      position: 'relative',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    placeholder: {
      width: '100%',
      height: '100%',
      background: isDarkMode
        ? 'linear-gradient(135deg, #2A2622 0%, #1A1714 100%)'
        : 'linear-gradient(135deg, #e8e4df 0%, #d4cfc7 100%)',
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      background: currentTheme.background,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: currentTheme.text,
      cursor: 'pointer',
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  };

  if (isPlaying) {
    return (
      <div style={{ ...styles.wrapper, background: '#000' }}>
        <iframe
          src={embedUrl}
          style={styles.iframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.thumbnail} onClick={() => setIsPlaying(true)}>
        {coverImage ? (
          <img src={coverImage} alt={title} style={styles.image} />
        ) : (
          <div style={styles.placeholder} />
        )}
        <motion.button
          style={styles.playButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsPlaying(true)}
          aria-label="Play video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="8,5 20,12 8,19" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
