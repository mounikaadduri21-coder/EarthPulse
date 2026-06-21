import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Splash() {
  const { setScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Transition to welcome screen after 2.5 seconds
      setScreen('welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="splash-screen" style={styles.container}>
      <div className="animate-pulse" style={styles.logoContainer}>
        <div style={styles.logoIcon}>🌍</div>
        <h1 style={styles.logoText}>EarthPulse</h1>
      </div>
      <p style={styles.tagline}>
        Track your day. <br />
        Reduce your footprint. <br />
        <span style={styles.taglineHighlight}>Save your city.</span>
      </p>
      
      <div style={styles.footer}>
        <div style={styles.pulseBar}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '24px',
    background: 'linear-gradient(135deg, #0e1e13 0%, #060e09 100%)',
    color: '#ffffff',
    textAlign: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
  },
  logoIcon: {
    fontSize: '72px',
    marginBottom: '16px',
    filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))',
  },
  logoText: {
    fontSize: '36px',
    fontFamily: "var(--font-heading)",
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  tagline: {
    fontSize: '18px',
    lineHeight: '1.6',
    fontWeight: '500',
    color: '#a7f3d0',
    opacity: 0.9,
    fontFamily: "var(--font-sans)",
    marginBottom: '48px',
  },
  taglineHighlight: {
    color: '#10b981',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: '48px',
    width: '120px',
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  pulseBar: {
    width: '40px',
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '2px',
    animation: 'pulseLoading 1.5s infinite ease-in-out',
  }
};

// Add standard loading keyframes via standard CSS in index.css if needed,
// but we can also just inject a style tag here or keep it clean.
// Let's inject keyframes directly for completeness.
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulseLoading {
      0% { transform: translateX(-40px); }
      100% { transform: translateX(120px); }
    }
  `;
  document.head.appendChild(style);
}
