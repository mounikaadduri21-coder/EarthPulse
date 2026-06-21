import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ChevronRight, ChevronLeft, BookOpen, PenTool, Leaf, MessageSquare, FileText, Award } from 'lucide-react';

const COMPANIONS = [
  { id: 'male_explorer', name: 'Eco Explorer', icon: '👨', desc: 'Loves hiking, outdoors, and discovering green paths.' },
  { id: 'female_explorer', name: 'Eco Explorer', icon: '👩', desc: 'Passionate about biodiversity and nature photography.' },
  { id: 'student_hero', name: 'Student Hero', icon: '🧑', desc: 'Enthusiastic about mobilizing classmates for local cleanups.' },
  { id: 'office_commuter', name: 'Office Commuter', icon: '👩‍💼', desc: 'Focused on energy-efficient routing and daily green commutes.' },
  { id: 'daily_worker', name: 'Daily Worker', icon: '👨‍🔧', desc: 'Minimizes material waste and champions tool recycling.' },
  { id: 'college_student', name: 'College Student', icon: '🧑‍🎓', desc: 'Active in sustainable urban planning and solar student clubs.' }
];

const ONBOARDING_SLIDES = [
  {
    title: 'Learn',
    icon: <BookOpen size={48} className="text-primary" />,
    desc: 'Explore bite-sized cards on carbon footprint, energy savings, sustainable foods, and waste reduction.',
    badge: '📚 Basic to Advanced'
  },
  {
    title: 'Take Quiz',
    icon: <PenTool size={48} className="text-primary" />,
    desc: 'Test your understanding with fun 5-question quizzes and earn points to unlock special badges.',
    badge: '📝 +50 Green Points'
  },
  {
    title: 'Track Activities',
    icon: <Leaf size={48} className="text-primary" />,
    desc: 'Log your daily green choices like carpooling, using public transit, switching off AC, or buying local.',
    badge: '🌱 Daily Logs'
  },
  {
    title: 'Get AI Guidance',
    icon: <MessageSquare size={48} className="text-primary" />,
    desc: 'Get friendly, non-shaming analysis and optimization suggestions powered by Gemini AI.',
    badge: '🤖 Gemini Guide'
  },
  {
    title: 'Upload Proof',
    icon: <FileText size={48} className="text-primary" />,
    desc: 'Upload pictures of your transit tickets, solar setups, or electricity bills to earn verified badges.',
    badge: '📄 Photo Verification'
  },
  {
    title: 'Earn Rewards',
    icon: <Award size={48} className="text-primary" />,
    desc: 'Advance from Bronze Explorer to Earth Champion and track your streak as you build green habits.',
    badge: '🏅 Badges & Streaks'
  }
];

export default function Onboarding() {
  const { user, selectCompanion, setScreen } = useApp();
  
  // Internal step manager: 'welcome' -> 'companion_select' -> 'slides'
  const [onboardStep, setOnboardStep] = useState('welcome');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedComp, setSelectedComp] = useState(null);

  const handleStart = () => {
    setOnboardStep('companion_select');
  };

  const handleCompanionSelect = (comp) => {
    setSelectedComp(comp);
  };

  const handleCompanionConfirm = () => {
    if (selectedComp) {
      selectCompanion(selectedComp);
      setOnboardStep('slides');
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // Finished onboarding, go to main dashboard
      setScreen('dashboard');
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      setOnboardStep('companion_select');
    }
  };

  if (onboardStep === 'welcome') {
    return (
      <div className="screen-content animate-slide-in" style={styles.welcomeContainer}>
        <div style={styles.welcomeHero}>
          <div style={styles.globeIllustration}>🌍</div>
          <h1 style={styles.welcomeTitle}>Welcome to EarthPulse</h1>
          <p style={styles.welcomeDesc}>
            Understand your environmental impact through interactive learning, habit tracking, and AI-powered guidance.
          </p>
        </div>
        
        <div style={styles.actionContainer}>
          <button className="btn btn-primary" onClick={handleStart}>
            Get Started
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (onboardStep === 'companion_select') {
    return (
      <div className="screen-content animate-slide-in" style={styles.onboardWrapper}>
        <div>
          <h2 style={styles.title}>Choose Your Eco Companion</h2>
          <p style={styles.subtitle}>Select an avatar that will join you on your sustainability journey!</p>
        </div>

        <div style={styles.grid}>
          {COMPANIONS.map((comp) => {
            const isSelected = selectedComp?.id === comp.id;
            return (
              <div 
                key={comp.id}
                onClick={() => handleCompanionSelect(comp)}
                style={{
                  ...styles.avatarCard,
                  borderColor: isSelected ? 'var(--emerald)' : 'var(--border)',
                  backgroundColor: isSelected ? 'var(--emerald-light)' : 'var(--card-bg)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                }}
              >
                <div style={styles.avatarIcon}>{comp.icon}</div>
                <div style={styles.avatarName}>{comp.name}</div>
                <div style={styles.avatarDesc}>{comp.desc}</div>
                {isSelected && (
                  <div style={styles.checkBadge}>
                    <Check size={12} color="#fff" strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={styles.footerNav}>
          <button 
            className="btn btn-secondary" 
            style={{ width: '45%' }}
            onClick={() => setOnboardStep('welcome')}
          >
            Back
          </button>
          <button 
            className={`btn ${selectedComp ? 'btn-primary' : 'btn-disabled'}`}
            style={{ width: '50%' }}
            onClick={handleCompanionConfirm}
            disabled={!selectedComp}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <div className="screen-content animate-slide-in" style={styles.onboardWrapper}>
      {/* Top Header */}
      <div style={styles.slideHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={styles.avatarBubble}>{selectedComp?.icon}</span>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Your Companion is ready!</span>
        </div>
        <span style={styles.slideCounter}>
          {currentSlide + 1} of {ONBOARDING_SLIDES.length}
        </span>
      </div>

      {/* Main Slide Card */}
      <div className="card" style={styles.slideCard}>
        <div style={styles.slideBadge}>{slide.badge}</div>
        <div style={styles.slideIconContainer}>
          {slide.icon}
        </div>
        <h2 style={styles.slideTitle}>{slide.title}</h2>
        <p style={styles.slideText}>{slide.desc}</p>
      </div>

      {/* Slide Navigation & Indicator Dots */}
      <div style={styles.slideNavContainer}>
        <div style={styles.dotsRow}>
          {ONBOARDING_SLIDES.map((_, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.dot,
                backgroundColor: idx === currentSlide ? 'var(--emerald)' : 'var(--border)',
                width: idx === currentSlide ? '16px' : '8px'
              }}
            />
          ))}
        </div>

        <div style={styles.footerNav}>
          <button 
            className="btn btn-secondary" 
            style={{ width: '30%', padding: '10px' }}
            onClick={handlePrevSlide}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="btn btn-primary" 
            style={{ width: '65%', padding: '10px' }}
            onClick={handleNextSlide}
          >
            {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Enter EarthPulse' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  welcomeContainer: {
    justifyContent: 'space-between',
    height: '100%',
    padding: '32px 24px',
  },
  welcomeHero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '60px',
  },
  globeIllustration: {
    fontSize: '96px',
    marginBottom: '24px',
    animation: 'float 4s infinite ease-in-out',
  },
  welcomeTitle: {
    fontSize: '28px',
    color: 'var(--primary)',
    marginBottom: '16px',
  },
  welcomeDesc: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--text-muted)',
    maxWidth: '320px',
  },
  actionContainer: {
    width: '100%',
    marginBottom: '24px',
  },
  onboardWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 20px',
  },
  title: {
    fontSize: '22px',
    color: 'var(--primary)',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginBottom: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 220px)',
    padding: '4px',
  },
  avatarCard: {
    border: '2px solid',
    borderRadius: '16px',
    padding: '16px 12px',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  avatarIcon: {
    fontSize: '40px',
    marginBottom: '8px',
  },
  avatarName: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '4px',
  },
  avatarDesc: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
  },
  checkBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'var(--emerald)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    width: '100%',
  },
  slideHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  avatarBubble: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  slideCounter: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    backgroundColor: 'var(--border)',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  slideCard: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '24px 0',
    padding: '32px 24px',
    backgroundColor: 'var(--card-bg)',
  },
  slideBadge: {
    backgroundColor: 'var(--emerald-light)',
    color: 'var(--emerald-dark)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 12px',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  slideIconContainer: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-app)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  slideTitle: {
    fontSize: '24px',
    color: 'var(--primary)',
    marginBottom: '16px',
  },
  slideText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'var(--text-muted)',
    maxWidth: '280px',
  },
  slideNavContainer: {
    width: '100%',
  },
  dotsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  dot: {
    height: '8px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  }
};
