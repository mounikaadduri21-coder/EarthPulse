import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Home, User, Compass, BookOpen, Settings, LogOut, Award, Flame
} from 'lucide-react';

export default function MenuOverlay() {
  const { user, activeTab, setActiveTab, resetApp } = useApp();

  const handleCloseMenu = () => {
    const sideMenu = document.getElementById('side-menu-overlay');
    if (sideMenu) sideMenu.style.transform = 'translateX(-100%)';
  };

  const handleNavigate = (tabName) => {
    setActiveTab(tabName);
    handleCloseMenu();
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out and reset your EarthPulse progress?")) {
      handleCloseMenu();
      resetApp();
    }
  };

  return (
    <div 
      id="side-menu-overlay"
      style={styles.overlay}
    >
      {/* Menu Header with User Preview */}
      <div style={styles.header}>
        <div style={styles.userRow}>
          <div style={styles.avatarCircle}>
            {user.companion?.icon || '🧑'}
          </div>
          <div>
            <h4 style={styles.userName}>{user.companion?.name || 'Eco Champ'}</h4>
            <div style={styles.statsRow}>
              <span 
                style={{ ...styles.statLabel, cursor: 'pointer', transition: 'color 0.2s' }} 
                onClick={() => handleNavigate('profile')}
                title="View Profile"
              >
                <Award size={12} /> {user.points} pts
              </span>
              <span 
                style={{ ...styles.statLabel, cursor: 'pointer', transition: 'color 0.2s' }} 
                onClick={() => handleNavigate('profile')}
                title="View Streak Details"
              >
                <Flame size={12} /> {user.streak} days
              </span>
            </div>
          </div>
        </div>
        <button onClick={handleCloseMenu} style={styles.closeBtn}>
          <X size={20} color="var(--text-main)" />
        </button>
      </div>

      {/* Navigation Links */}
      <div style={styles.linksContainer}>
        <button 
          onClick={() => handleNavigate('home')}
          className="menu-nav-link"
          style={{
            ...styles.navLink,
            color: activeTab === 'home' ? 'var(--primary)' : 'var(--text-main)',
            backgroundColor: activeTab === 'home' ? 'var(--emerald-light)' : 'transparent'
          }}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </button>

        <button 
          onClick={() => handleNavigate('profile')}
          className="menu-nav-link"
          style={{
            ...styles.navLink,
            color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-main)',
            backgroundColor: activeTab === 'profile' ? 'var(--emerald-light)' : 'transparent'
          }}
        >
          <User size={18} />
          <span>Profile & History</span>
        </button>

        <button 
          onClick={() => handleNavigate('roadmap')}
          className="menu-nav-link"
          style={{
            ...styles.navLink,
            color: activeTab === 'roadmap' ? 'var(--primary)' : 'var(--text-main)',
            backgroundColor: activeTab === 'roadmap' ? 'var(--emerald-light)' : 'transparent'
          }}
        >
          <Compass size={18} />
          <span>City Roadmap</span>
        </button>

        <button 
          onClick={() => handleNavigate('tutorial')}
          className="menu-nav-link"
          style={{
            ...styles.navLink,
            color: activeTab === 'tutorial' ? 'var(--primary)' : 'var(--text-main)',
            backgroundColor: activeTab === 'tutorial' ? 'var(--emerald-light)' : 'transparent'
          }}
        >
          <BookOpen size={18} />
          <span>How It Works</span>
        </button>

        <button 
          onClick={() => handleNavigate('settings')}
          className="menu-nav-link"
          style={{
            ...styles.navLink,
            color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-main)',
            backgroundColor: activeTab === 'settings' ? 'var(--emerald-light)' : 'transparent'
          }}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>

      {/* Logout at bottom */}
      <div style={styles.footer}>
        <button onClick={handleLogout} style={styles.logoutBtn} className="menu-nav-link">
          <LogOut size={16} />
          <span>Sign Out / Reset</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '280px',
    height: '100%',
    backgroundColor: 'var(--card-bg)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRight: '1px solid var(--border)',
  },
  header: {
    padding: '24px 16px 16px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--emerald-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    border: '2px solid var(--emerald)',
  },
  userName: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  statsRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '4px',
  },
  statLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  linksContainer: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontFamily: 'var(--font-sans)',
  },
  footer: {
    padding: '16px',
    borderTop: '1px solid var(--border)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-app)',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.2s',
  }
};
