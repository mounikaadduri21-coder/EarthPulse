import React, { useState } from 'react';
import { signInWithGoogle } from '../services/authService';
import { Sparkles, Compass, Award } from 'lucide-react';

export default function Login({ onLoginSuccess, onJudgesMode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer} className="animate-slide-in">
      {/* App Header Branding */}
      <div style={styles.brandingHeader}>
        <span style={styles.appEmoji}>🌍</span>
        <h1 style={styles.appTitle}>EarthPulse</h1>
        <p style={styles.appSubtitle}>Track your day. Reduce your footprint. Save your city.</p>
      </div>

      {/* Decorative Feature Highlights */}
      <div style={styles.featuresCard}>
        <div style={styles.featureItem}>
          <Sparkles size={18} color="var(--emerald)" style={styles.featureIcon} />
          <div>
            <strong style={styles.featureTitle}>Gemini AI Eco Coach</strong>
            <p style={styles.featureText}>Receive non-judgmental guidance and verification of your daily carbon-saving efforts.</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <Compass size={18} color="var(--emerald)" style={styles.featureIcon} />
          <div>
            <strong style={styles.featureTitle}>City Pilot Journey</strong>
            <p style={styles.featureText}>Follow pilot programs starting from Vijayawada and scaling global step-by-step.</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <Award size={18} color="var(--emerald)" style={styles.featureIcon} />
          <div>
            <strong style={styles.featureTitle}>Milestone Badges & Rewards</strong>
            <p style={styles.featureText}>Climb from Bronze Explorer to Earth Champion and keep your daily streak alive.</p>
          </div>
        </div>
      </div>

      {/* Error Message Display */}
      {error && (
        <div style={styles.errorBox}>
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Login Buttons Area */}
      <div style={styles.buttonSection}>
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={styles.googleBtn}
          className="btn"
        >
          {loading ? (
            <span style={styles.loader}></span>
          ) : (
            <>
              <svg style={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <button 
          onClick={onJudgesMode}
          disabled={loading}
          style={styles.judgesBtn}
          className="btn btn-secondary"
        >
          <span>⚖️ Enter Judges Mode (No Sign-In)</span>
        </button>
      </div>

      <div style={styles.footerNote}>
        <p>By entering, you join our local city footprint reduction movement. All statistics are secured.</p>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    maxHeight: '100vh',
    overflowY: 'auto',
    backgroundColor: 'var(--bg-phone)',
  },
  brandingHeader: {
    textAlign: 'center',
    marginBottom: '28px',
    marginTop: '12px',
  },
  appEmoji: {
    fontSize: '52px',
    display: 'block',
    marginBottom: '8px',
    animation: 'float 3s infinite ease-in-out',
  },
  appTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--primary)',
    marginBottom: '4px',
  },
  appSubtitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    padding: '0 8px',
  },
  featuresCard: {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: 'var(--shadow-sm)',
    marginBottom: '28px',
  },
  featureItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  featureIcon: {
    flexShrink: 0,
    marginTop: '2px',
  },
  featureTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--text-main)',
    display: 'block',
  },
  featureText: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    marginTop: '2px',
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  googleBtn: {
    backgroundColor: '#ffffff',
    color: '#374151',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  googleIcon: {
    flexShrink: 0,
  },
  judgesBtn: {
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    padding: '12px',
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fee2e2',
    borderRadius: '10px',
    padding: '10px 14px',
    width: '100%',
    marginBottom: '16px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#b91c1c',
  },
  footerNote: {
    textAlign: 'center',
    marginTop: '28px',
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    padding: '0 16px',
  },
  loader: {
    width: '16px',
    height: '16px',
    border: '2px solid #ccc',
    borderTop: '2px solid #333',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 1s linear infinite',
  }
};
