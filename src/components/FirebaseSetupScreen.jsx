import { useState } from 'react';
import { AlertTriangle, Key, ShieldAlert, RefreshCw } from 'lucide-react';

export default function FirebaseSetupScreen({ onJudgesMode, initError }) {
  const [retrying, setRetrying] = useState(false);

  const missingConfigs = [];
  if (!import.meta.env.VITE_FIREBASE_API_KEY) missingConfigs.push("VITE_FIREBASE_API_KEY");
  if (!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) missingConfigs.push("VITE_FIREBASE_AUTH_DOMAIN");
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) missingConfigs.push("VITE_FIREBASE_PROJECT_ID");
  if (!import.meta.env.VITE_FIREBASE_APP_ID) missingConfigs.push("VITE_FIREBASE_APP_ID");

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div style={styles.container} className="animate-slide-in">
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <ShieldAlert size={48} color="var(--accent)" style={styles.pulseIcon} />
        </div>
        
        <h1 style={styles.title}>Connection Required</h1>
        <p style={styles.subtitle}>
          EarthPulse requires Firebase authentication and Firestore database services to synchronize carbon-tracking metrics.
        </p>

        {/* Missing Config Details */}
        <div style={styles.errorBox}>
          <div style={styles.errorHeader}>
            <AlertTriangle size={16} color="#b91c1c" />
            <strong style={styles.errorTitle}>Connection Error</strong>
          </div>
          {missingConfigs.length > 0 ? (
            <>
              <p style={styles.errorMsg}>
                The frontend couldn't establish a secure connection to the database because the following environment variables are missing in your deployment context:
              </p>
              <ul style={styles.configList}>
                {missingConfigs.map((config) => (
                  <li key={config} style={styles.configItem}>
                    <Key size={12} style={styles.configIcon} />
                    <code>{config}</code>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={styles.errorMsg}>
              An error occurred during Firebase connection setup: <br />
              <code style={{ color: '#b91c1c', display: 'block', marginTop: '6px', fontSize: '11px', wordBreak: 'break-all' }}>
                {initError || 'Unknown initialization error'}
              </code>
            </p>
          )}
        </div>

        {/* Informative Instructions */}
        <div style={styles.instructionCard}>
          <h3 style={styles.instructionTitle}>How to configure:</h3>
          <ol style={styles.instructionList}>
            <li>
              Create a <code>.env</code> file in the root of your project.
            </li>
            <li>
              Add the missing variables with valid Firebase credentials (e.g. <code>VITE_FIREBASE_API_KEY=AIzaSy...</code>).
            </li>
            <li>
              Deploy the container making sure <code>.env</code> is included.
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div style={styles.actionSection}>
          <button 
            onClick={onJudgesMode}
            className="btn btn-primary"
            style={styles.primaryBtn}
          >
            <span>⚖️ Enter Offline / Judges Mode</span>
          </button>
          
          <button 
            onClick={handleRetry}
            disabled={retrying}
            className="btn btn-secondary"
            style={styles.secondaryBtn}
          >
            <RefreshCw size={16} className={retrying ? "animate-pulse" : ""} />
            <span>{retrying ? "Rechecking..." : "Retry Connection"}</span>
          </button>
        </div>

        <div style={styles.footer}>
          <p>EarthPulse works locally in Offline Mode. All daily streak, companion choices, and logged carbon savings will be saved to your device cache.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--bg-phone)',
    padding: '24px',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px 24px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  pulseIcon: {
    animation: 'pulse 2s infinite ease-in-out',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    textAlign: 'center',
    color: 'var(--text-main)',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    lineHeight: '1.5',
    padding: '0 8px',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  errorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#b91c1c',
  },
  errorMsg: {
    fontSize: '12px',
    color: 'var(--text-main)',
    lineHeight: '1.4',
  },
  configList: {
    listStyle: 'none',
    padding: 0,
    margin: '4px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  configItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: 'var(--text-muted)',
    backgroundColor: 'var(--bg-phone)',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid var(--border)',
  },
  configIcon: {
    color: 'var(--accent)',
  },
  instructionCard: {
    backgroundColor: 'var(--bg-app)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  instructionTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  instructionList: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
  },
  primaryBtn: {
    backgroundColor: 'var(--primary)',
    color: 'var(--text-white)',
    boxShadow: '0 4px 0 var(--primary-hover)',
  },
  secondaryBtn: {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-main)',
    border: '2px solid var(--border)',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  footer: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    lineHeight: '1.4',
    padding: '0 4px',
  }
};
