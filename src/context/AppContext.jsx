import React, { createContext, useContext, useState, useEffect } from 'react';
import { signOutUser } from '../services/authService';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Dynamic eco tips to display on the dashboard
const ECO_TIPS = [
  "Using public transport once a week can significantly reduce your carbon emissions.",
  "Unplugging electronics when not in use prevents 'vampire power' drain, saving up to 10% of electricity.",
  "Choosing local, seasonal vegetables reduces carbon emissions from food air-freight transport.",
  "Lowering your AC temperature setting to 24°C instead of 18°C can reduce energy consumption by up to 25%.",
  "Carrying a reusable stainless steel water bottle prevents plastic pollution and manufacturing waste.",
  "Walking or cycling for journeys under 2 km burns zero fuel and boosts your cardiovascular health!"
];

export const AppProvider = ({ 
  children,
  theme,
  setTheme,
  screen,
  setScreen,
  activeTab,
  setActiveTab,
  points,
  setPoints,
  streak,
  setStreak,
  userProfile,
  setUserProfile,
  user,
  celebrationActive,
  setCelebrationActive,
  currentUser,
  setCurrentUser,
  isJudgesMode,
  setIsJudgesMode,
  onLoginSuccess,
  onJudgesMode
}) => {
  // Tip of the day index
  const [tipIndex, setTipIndex] = useState(0);

  // Update tip daily or randomly on load
  useEffect(() => {
    const randomTip = Math.floor(Math.random() * ECO_TIPS.length);
    setTipIndex(randomTip);
  }, []);

  const selectCompanion = (avatar) => {
    setUserProfile(prev => ({
      ...prev,
      companion: avatar
    }));
  };

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  // Add a logged carbon-saving activity
  const logActivity = (activityText, co2SavedAmount, inputMethod = 'text', isVerified = false) => {
    const parsedCO2 = parseFloat(co2SavedAmount) || 0.5;
    const newLog = {
      id: Date.now(),
      activity: activityText,
      co2Saved: parsedCO2,
      method: inputMethod,
      date: "Today",
      verified: isVerified
    };

    setUserProfile(prev => {
      const updatedHistory = [newLog, ...prev.history];
      const updatedCO2Saved = parseFloat((prev.co2Saved + parsedCO2).toFixed(1));
      return {
        ...prev,
        co2Saved: updatedCO2Saved,
        history: updatedHistory
      };
    });

    const pointsEarned = 20 + (isVerified ? 30 : 0);
    setPoints(prev => prev + pointsEarned);

    setStreak(prev => {
      const currentStreak = parseInt(prev);
      return isNaN(currentStreak) ? 1 : currentStreak + 1;
    });

    triggerCelebration();
  };

  // Complete Quiz handler
  const completeQuiz = () => {
    if (!userProfile.funQuizCompleted) {
      setUserProfile(prev => ({
        ...prev,
        funQuizCompleted: true
      }));
      setPoints(prev => prev + 50);
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    setCelebrationActive(true);
    setTimeout(() => {
      setCelebrationActive(false);
    }, 8000); // Celebration ends automatically after 8 seconds
  };

  const resetApp = () => {
    localStorage.removeItem('earthpulse_user');
    setPoints(0);
    setStreak(7);
    setUserProfile({
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
    });
    setScreen('login');
    setActiveTab('home');
    if (setCurrentUser) setCurrentUser(null);
    if (setIsJudgesMode) setIsJudgesMode(false);
    signOutUser().catch(err => console.error("Sign-out error during reset:", err));
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      screen,
      setScreen,
      activeTab,
      setActiveTab,
      user,
      selectCompanion,
      logActivity,
      completeQuiz,
      celebrationActive,
      triggerCelebration,
      resetApp,
      todayTip: ECO_TIPS[tipIndex],
      addPoints,
      currentUser,
      isJudgesMode,
      onLoginSuccess,
      onJudgesMode
    }}>
      {children}
    </AppContext.Provider>
  );
};
