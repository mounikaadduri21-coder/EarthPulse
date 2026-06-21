import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MenuOverlay from './components/MenuOverlay';
import Login from './components/Login';
import { onAuthStateChangedListener } from './services/authService';
import { loadUserData, saveUserData } from './services/dbService';
import './App.css'; // Can remain empty or be deleted later

function AppContent() {
  const { screen, celebrationActive, onLoginSuccess, onJudgesMode, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-phone)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Loading EarthPulse...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Screen Router */}
      {screen === 'login' && <Login onLoginSuccess={onLoginSuccess} onJudgesMode={onJudgesMode} />}
      {screen === 'splash' && <Splash />}
      {(screen === 'welcome' || screen === 'companion' || screen === 'onboarding') && <Onboarding />}
      {screen === 'dashboard' && <Dashboard />}

      {/* Side Menu Drawer overlay (if dashboard screen is active) */}
      {screen === 'dashboard' && <MenuOverlay />}

      {/* 10-Second Celebration Leaves Particle Effect */}
      {celebrationActive && (
        <div className="confetti-canvas">
          {Array.from({ length: 25 }).map((_, i) => {
            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            const randomDuration = 3 + Math.random() * 4;
            const leaves = ['🍃', '🌿', '🌱', '🌸', '✨'];
            const leaf = leaves[Math.floor(Math.random() * leaves.length)];
            return (
              <span
                key={i}
                className="leaf-particle"
                style={{
                  left: `${randomLeft}%`,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${randomDuration}s`,
                }}
              >
                {leaf}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('earthpulse_theme');
    return saved || 'system';
  });

  // Current screen management
  const [screen, setScreen] = useState('login');
  
  // Active page inside the dashboard
  const [activeTab, setActiveTab] = useState('home');

  // Lifted Points state
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('earthpulse_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && 'points' in parsed) {
          const parsedPts = parseInt(parsed.points);
          return isNaN(parsedPts) ? 0 : parsedPts;
        }
      } catch (e) {}
    }
    return 0;
  });

  // Lifted Streak state
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('earthpulse_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && 'streak' in parsed) {
          const parsedStr = parseInt(parsed.streak);
          return isNaN(parsedStr) ? 7 : parsedStr;
        }
      } catch (e) {}
    }
    return 7;
  });

  // Remaining user profile state
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('earthpulse_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          companion: parsed.companion || null,
          badges: Array.isArray(parsed.badges) ? parsed.badges : [],
          co2Saved: typeof parsed.co2Saved === 'number' ? parsed.co2Saved : 14.0,
          co2Goal: typeof parsed.co2Goal === 'number' ? parsed.co2Goal : 20.0,
          history: Array.isArray(parsed.history) ? parsed.history : [
            { id: 1, activity: "Used public bus to commute", co2Saved: 1.4, method: "text", date: "Yesterday", verified: true },
            { id: 2, activity: "Walked 3 km to grocery store", co2Saved: 0.8, method: "text", date: "2 days ago", verified: true },
            { id: 3, activity: "Switched off bedroom lights when leaving", co2Saved: 0.2, method: "text", date: "3 days ago", verified: true }
          ],
          funQuizCompleted: !!parsed.funQuizCompleted
        };
      } catch (e) {
        console.error("Error parsing user profile from localStorage", e);
      }
    }
    return {
      companion: null,
      badges: [],
      co2Saved: 14.0,
      co2Goal: 20.0,
      history: [
        { id: 1, activity: "Used public bus to commute", co2Saved: 1.4, method: "text", date: "Yesterday", verified: true },
        { id: 2, activity: "Walked 3 km to grocery store", co2Saved: 0.8, method: "text", date: "2 days ago", verified: true },
        { id: 3, activity: "Switched off bedroom lights when leaving", co2Saved: 0.2, method: "text", date: "3 days ago", verified: true }
      ],
      funQuizCompleted: false
    };
  });

  // Auth states
  const [currentUser, setCurrentUser] = useState(null);
  const [isJudgesMode, setIsJudgesMode] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Celebration state
  const [celebrationActive, setCelebrationActive] = useState(false);

  // Combine user profile with points and streak for downstream compatibility
  const user = {
    ...userProfile,
    points,
    streak
  };

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('earthpulse_user', JSON.stringify(user));
  }, [userProfile, points, streak]);

  // Auth session observer on load
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        try {
          const dbData = await loadUserData(firebaseUser.uid);
          if (dbData) {
            if (typeof dbData.points === 'number') setPoints(dbData.points);
            if (typeof dbData.streak === 'number') setStreak(dbData.streak);
            setUserProfile({
              companion: dbData.companion || null,
              badges: Array.isArray(dbData.badges) ? dbData.badges : [],
              co2Saved: typeof dbData.co2Saved === 'number' ? dbData.co2Saved : 14.0,
              co2Goal: typeof dbData.co2Goal === 'number' ? dbData.co2Goal : 20.0,
              history: Array.isArray(dbData.history) ? dbData.history : [],
              funQuizCompleted: !!dbData.funQuizCompleted
            });
            if (dbData.companion) {
              setScreen('dashboard');
            } else {
              setScreen('welcome');
            }
          } else {
            // Google user but no Firestore data yet
            if (userProfile.companion) {
              // Sync current local storage to database
              await saveUserData(firebaseUser.uid, {
                companion: userProfile.companion,
                points,
                streak,
                badges: userProfile.badges,
                co2Saved: userProfile.co2Saved,
                co2Goal: userProfile.co2Goal,
                funQuizCompleted: userProfile.funQuizCompleted,
                history: userProfile.history
              });
              setScreen('dashboard');
            } else {
              setScreen('welcome');
            }
          }
        } catch (error) {
          console.error("Firestore Load Error on mount:", error);
          if (userProfile.companion) {
            setScreen('dashboard');
          } else {
            setScreen('welcome');
          }
        }
      } else {
        setCurrentUser(null);
        setScreen('login');
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firestore autosave hook when data changes
  useEffect(() => {
    if (currentUser && !authLoading) {
      const saveData = async () => {
        try {
          await saveUserData(currentUser.uid, {
            companion: userProfile.companion,
            points: points,
            streak: streak,
            badges: userProfile.badges,
            co2Saved: userProfile.co2Saved,
            co2Goal: userProfile.co2Goal,
            funQuizCompleted: userProfile.funQuizCompleted,
            history: userProfile.history
          });
        } catch (error) {
          console.error("Firestore autosave error:", error);
        }
      };

      const timer = setTimeout(() => {
        saveData();
      }, 1000); // 1-second debounce to batch multiple updates
      return () => clearTimeout(timer);
    }
  }, [userProfile, points, streak, currentUser, authLoading]);

  // Login handler
  const handleLoginSuccess = async (loggedInUser) => {
    setAuthLoading(true);
    setCurrentUser(loggedInUser);
    setIsJudgesMode(false);
    try {
      const dbData = await loadUserData(loggedInUser.uid);
      if (dbData) {
        if (typeof dbData.points === 'number') setPoints(dbData.points);
        if (typeof dbData.streak === 'number') setStreak(dbData.streak);
        setUserProfile({
          companion: dbData.companion || null,
          badges: Array.isArray(dbData.badges) ? dbData.badges : [],
          co2Saved: typeof dbData.co2Saved === 'number' ? dbData.co2Saved : 14.0,
          co2Goal: typeof dbData.co2Goal === 'number' ? dbData.co2Goal : 20.0,
          history: Array.isArray(dbData.history) ? dbData.history : [],
          funQuizCompleted: !!dbData.funQuizCompleted
        });
        if (dbData.companion) {
          setScreen('dashboard');
        } else {
          setScreen('welcome');
        }
      } else {
        // Sync existing local details if present
        await saveUserData(loggedInUser.uid, {
          companion: userProfile.companion,
          points: points,
          streak: streak,
          badges: userProfile.badges,
          co2Saved: userProfile.co2Saved,
          co2Goal: userProfile.co2Goal,
          funQuizCompleted: userProfile.funQuizCompleted,
          history: userProfile.history
        });
        if (userProfile.companion) {
          setScreen('dashboard');
        } else {
          setScreen('welcome');
        }
      }
    } catch (error) {
      console.error("Login success callback load data error:", error);
      if (userProfile.companion) {
        setScreen('dashboard');
      } else {
        setScreen('welcome');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleJudgesMode = () => {
    setIsJudgesMode(true);
    setCurrentUser(null);
    if (userProfile.companion) {
      setScreen('dashboard');
    } else {
      setScreen('welcome');
    }
  };

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark-theme');
    
    if (theme === 'dark') {
      root.classList.add('dark-theme');
    } else if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark-theme');
      }
    }
    localStorage.setItem('earthpulse_theme', theme);
  }, [theme]);

  // Badge Journey automatic unlocking logic
  useEffect(() => {
    setUserProfile(prev => {
      const updatedBadges = [...prev.badges];
      let changed = false;

      if (points >= 50 && !updatedBadges.includes('Bronze Explorer')) {
        updatedBadges.push('Bronze Explorer');
        changed = true;
      }
      if (points >= 150 && !updatedBadges.includes('Silver Protector')) {
        updatedBadges.push('Silver Protector');
        changed = true;
      }
      if (points >= 300 && !updatedBadges.includes('Gold Guardian')) {
        updatedBadges.push('Gold Guardian');
        changed = true;
      }
      
      const goalProgressPercent = Math.min(100, Math.round((prev.co2Saved / prev.co2Goal) * 100));
      if (goalProgressPercent >= 100 && !updatedBadges.includes('Earth Champion')) {
        updatedBadges.push('Earth Champion');
        changed = true;
      }

      if (changed) {
        return {
          ...prev,
          badges: updatedBadges
        };
      }
      return prev;
    });
  }, [points, userProfile.co2Saved, userProfile.co2Goal]);

  return (
    <AppProvider
      theme={theme}
      setTheme={setTheme}
      screen={screen}
      setScreen={setScreen}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      points={points}
      setPoints={setPoints}
      streak={streak}
      setStreak={setStreak}
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      user={user}
      celebrationActive={celebrationActive}
      setCelebrationActive={setCelebrationActive}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      isJudgesMode={isJudgesMode}
      setIsJudgesMode={setIsJudgesMode}
      onLoginSuccess={handleLoginSuccess}
      onJudgesMode={handleJudgesMode}
    >
      <AppContent />
    </AppProvider>
  );
}


