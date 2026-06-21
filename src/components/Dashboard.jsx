import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Menu, Award, Flame, Check, Send, Mic, Image, BookOpen, 
  ChevronRight, ChevronLeft, Lightbulb, CheckCircle2, RotateCcw,
  Navigation, Target, MessageSquare, Compass, Footprints,
  Trees, Fuel, ShieldCheck, Zap, Upload, FileText, Camera, Eye,
  Settings as SettingsIcon, Shield, Sparkles, RefreshCw, UserCheck
} from 'lucide-react';

const FLASHCARDS = [
  // Basic Level
  {
    id: 1,
    level: 'BASIC',
    category: 'Transportation',
    question: 'How does walking help the environment?',
    example: 'Ravi walks 1 km to a nearby grocery store instead of using his bike.',
    impact: 'No fuel burned. No carbon emissions released.',
    takeaway: 'Short trips can often be walked instead of driven.'
  },
  {
    id: 2,
    level: 'BASIC',
    category: 'Electricity',
    question: 'Why should we switch off unused lights?',
    example: 'A family leaves bedroom lights ON all day while nobody is inside.',
    impact: 'Wasted electricity. Higher carbon emissions from fossil-fuel power plants.',
    takeaway: 'Switch off lights when leaving a room.'
  },
  {
    id: 3,
    level: 'BASIC',
    category: 'Waste',
    question: 'Why avoid single-use plastic bottles?',
    example: 'An office worker carries a reusable steel bottle daily.',
    impact: 'Less plastic waste. Reduces ocean pollution and carbon from bottle manufacturing.',
    takeaway: 'Reuse instead of throwing away.'
  },
  {
    id: 4,
    level: 'BASIC',
    category: 'Transportation',
    question: 'Why use buses instead of personal cars?',
    example: '40 people travel in one bus instead of 40 cars.',
    impact: 'Much lower emissions and pollution per person.',
    takeaway: 'Sharing transport reduces cumulative city emissions.'
  },
  // Intermediate Level
  {
    id: 5,
    level: 'INTERMEDIATE',
    category: 'Electricity',
    question: 'Can small AC temperature changes help?',
    example: 'Setting the AC at 24°C instead of 18°C.',
    impact: 'Consumes significantly less electricity, reducing carbon footprint.',
    takeaway: 'Comfort and energy savings can coexist.'
  },
  {
    id: 6,
    level: 'INTERMEDIATE',
    category: 'Food Choices',
    question: 'Does food affect carbon footprint?',
    example: 'A family chooses local vegetables from nearby farmers markets.',
    impact: 'Less transportation pollution (fewer food miles). Supports local agriculture.',
    takeaway: 'Local food often travels shorter distances.'
  },
  {
    id: 7,
    level: 'INTERMEDIATE',
    category: 'Transportation',
    question: 'Why share rides?',
    example: 'Four colleagues travel together in one car (carpooling).',
    impact: 'Lower emissions per person. Reduces city traffic congestion.',
    takeaway: 'One shared vehicle is better than four individual cars.'
  },
  // Advanced Level
  {
    id: 8,
    level: 'ADVANCED',
    category: 'Concept',
    question: 'What is a carbon footprint?',
    example: 'Daily travel, electricity use, heating, and food choices all contribute.',
    impact: 'Small daily choices add up to a large environmental impact over time.',
    takeaway: 'Your footprint is the total greenhouse gas emissions caused by your activities.'
  },
  {
    id: 9,
    level: 'ADVANCED',
    category: 'Renewable Energy',
    question: 'Why are solar panels important?',
    example: 'A school installs rooftop solar panels.',
    impact: 'Generates clean energy. Reduces reliance on coal and gas grid power.',
    takeaway: 'Clean energy creates less pollution and provides sustainable long-term power.'
  },
  {
    id: 10,
    level: 'ADVANCED',
    category: 'Community',
    question: 'Can one person\'s actions matter?',
    example: '1,000 citizens each save 1 kg CO₂.',
    impact: '1,000 kg CO₂ reduction in total city emissions.',
    takeaway: 'Many small actions combine to create substantial positive change.'
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    level: 'BASIC',
    question: 'Which option creates zero fuel emissions?',
    options: ['Car', 'Bike', 'Walking', 'Scooter'],
    correctIndex: 2
  },
  {
    id: 2,
    level: 'BASIC',
    question: 'What should you do before leaving a room?',
    options: ['Open windows', 'Turn off lights', 'Increase AC', 'Charge phone'],
    correctIndex: 1
  },
  {
    id: 3,
    level: 'INTERMEDIATE',
    question: 'Which transport option usually produces less carbon per passenger?',
    options: ['Bus', 'Individual car', 'Motorcycle', 'Taxi'],
    correctIndex: 0
  },
  {
    id: 4,
    level: 'INTERMEDIATE',
    question: 'Which food generally travels shorter distances?',
    options: ['Imported fruit', 'Local vegetables', 'Imported snacks', 'Frozen imported food'],
    correctIndex: 1
  },
  {
    id: 5,
    level: 'ADVANCED',
    question: 'If 1000 people each save 1 kg CO₂, total savings are:',
    options: ['10 kg', '100 kg', '1000 kg', '10,000 kg'],
    correctIndex: 2
  }
];

const APP_BADGES = [
  { name: 'Bronze Explorer', icon: '🥉', desc: 'Log your first activity or complete the quiz.', requirement: 'Earn 50 green points.' },
  { name: 'Silver Protector', icon: '🥈', desc: 'Keep building sustainable habits.', requirement: 'Earn 150 green points.' },
  { name: 'Gold Guardian', icon: '🥇', desc: 'Become a highly active eco-champion.', requirement: 'Earn 300 green points.' },
  { name: 'Earth Champion', icon: '👑', desc: 'Achieve your monthly carbon reduction goal!', requirement: 'Reach 100% goal progress.' }
];

const COMPANIONS = [
  { id: 'male_explorer', name: 'Eco Explorer', icon: '👨', desc: 'Loves hiking, outdoors, and discovering green paths.' },
  { id: 'female_explorer', name: 'Eco Explorer', icon: '👩', desc: 'Passionate about biodiversity and nature photography.' },
  { id: 'student_hero', name: 'Student Hero', icon: '🧑', desc: 'Enthusiastic about mobilizing classmates for local cleanups.' },
  { id: 'office_commuter', name: 'Office Commuter', icon: '👩💼', desc: 'Focused on energy-efficient routing and daily green commutes.' },
  { id: 'daily_worker', name: 'Daily Worker', icon: '👨🔧', desc: 'Minimizes material waste and champions tool recycling.' },
  { id: 'college_student', name: 'College Student', icon: '🧑🎓', desc: 'Active in sustainable urban planning and solar student clubs.' }
];

const TUTORIAL_SLIDES = [
  { title: 'Learn 📚', text: 'Read interactive cards on carbon footprints, transportation, AC savings, and sustainable living.' },
  { title: 'Quiz 📝', text: 'Answer quizzes to test your understanding, and earn +50 points to unlock badges.' },
  { title: 'Track 🌱', text: 'Log activities via Text, Voice, or Photos to monitor daily CO₂ savings.' },
  { title: 'AI Guide 🤖', text: 'Get non-judgmental, positive advice and carbon coefficient estimates from Gemini AI.' },
  { title: 'Upload Proof 📄', text: 'Upload receipts, tickets, or cycle photos for Gemini Vision verification.' },
  { title: 'Earn Rewards 🏅', text: 'Climb the Badge Journey from Bronze Explorer to Earth Champion and keep your streak alive!' }
];

const ROADMAP_PHASES = [
  { phase: 'Phase 1', title: 'Vijayawada', status: 'active', desc: 'Launch local pilot' },
  { phase: 'Phase 2', title: 'Andhra Pradesh', status: 'upcoming', desc: 'Expand to all AP cities' },
  { phase: 'Phase 3', title: 'All India', status: 'upcoming', desc: 'National rollout' },
  { phase: 'Phase 4', title: 'Global', status: 'upcoming', desc: 'Worldwide expansion' }
];

export default function Dashboard() {
  const { 
    user, logActivity, todayTip, completeQuiz, triggerCelebration, 
    addPoints, activeTab, setActiveTab, theme, setTheme, selectCompanion, resetApp 
  } = useApp();

  // States for Learning Guide
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = FLASHCARDS.filter(card => selectedLevel === 'ALL' || card.level === selectedLevel);

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedLevel]);

  // States for Quiz System
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // States for Daily Impact Tracker
  const [trackerText, setTrackerText] = useState('');
  const [inputType, setInputType] = useState('text'); // text, voice, upload
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [trackerFeedback, setTrackerFeedback] = useState(null);

  // States for Route Calculator
  const [startLoc, setStartLoc] = useState('Home');
  const [destLoc, setDestLoc] = useState('College');
  const [routeDistance, setRouteDistance] = useState(5.4);
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  const [routeResults, setRouteResults] = useState(null);

  // States for AI Chat Guide Chat UI
  const [chatInput, setChatInput] = useState('');
  const [chatList, setChatList] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: "Hi there! I am your EarthPulse Guide. Nice work checking in! What can I help you learn about today?" 
    }
  ]);
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  // States for Proof Uploader & Gemini Vision Verification
  const [proofDocType, setProofDocType] = useState('bus_ticket');
  const [proofFile, setProofFile] = useState(null);
  const [proofFileName, setProofFileName] = useState(null);
  const [proofVerifying, setProofVerifying] = useState(false);
  const [proofResult, setProofResult] = useState(null);
  const proofFileInputRef = useRef(null);

  // States for Settings (Phase 6)
  const [apiMode, setApiMode] = useState('mock'); // mock, live
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('earthpulse_apikey') || '');

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('earthpulse_apikey', key);
  };

  // Chat custom extra features
  const [simulatedVoiceRecording, setSimulatedVoiceRecording] = useState(false);
  const [simulatedImageUploading, setSimulatedImageUploading] = useState(false);

  const handleChatVoiceClick = () => {
    if (simulatedVoiceRecording) return;
    setSimulatedVoiceRecording(true);
    
    // Simulate voice recording for 2 seconds, then append a simulated question
    setTimeout(() => {
      setSimulatedVoiceRecording(false);
      const voiceQuery = "I commuted by public bus today instead of taking my scooter. How much CO2 did I save?";
      setChatList(prev => [...prev, { id: Date.now(), sender: 'user', text: `🎙️ "${voiceQuery}"` }]);
      setAiTyping(true);
      
      setTimeout(() => {
        const response = "That's a fantastic green commute! By taking a public bus instead of a personal vehicle or scooter, you save about 1.4 kg of CO₂ per trip. Doing this regularly keeps city emissions low and helps combat local air pollution. I've logged 1.4 kg saved for you! 🌱";
        setChatList(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response }]);
        setAiTyping(false);
        logActivity("Bus commute (Voice-AI Chat)", 1.4, 'voice', false);
        triggerCelebration();
      }, 1500);
    }, 2000);
  };

  const handleChatImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSimulatedImageUploading(true);
    
    // Simulate image uploading and Gemini Vision scan
    setTimeout(() => {
      setSimulatedImageUploading(false);
      
      const imageUrl = URL.createObjectURL(file);
      setChatList(prev => [...prev, { 
        id: Date.now(), 
        sender: 'user', 
        text: `Uploaded photo: ${file.name}`,
        image: imageUrl
      }]);
      setAiTyping(true);
      
      setTimeout(() => {
        const response = `Gemini Vision has verified your uploaded proof (${file.name})! It looks like an authentic sustainable commute/solar net-metering receipt. I have awarded you +50 points and logged this activity as verified! Keep up the amazing work! 🌟`;
        setChatList(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response }]);
        setAiTyping(false);
        addPoints(50);
        logActivity(`Verified Proof: ${file.name} (Vision Chat)`, 1.6, 'upload', true);
        triggerCelebration();
      }, 2000);
    }, 2000);
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList, aiTyping, simulatedVoiceRecording, simulatedImageUploading]);

  // Companion state calculations
  const todayLogs = user.history.filter(log => log.date === "Today");
  const todayCO2Saved = todayLogs.reduce((acc, curr) => acc + curr.co2Saved, 0);

  let companionState = 'neutral';
  let companionExpression = '😐';
  let companionSpeech = 'Welcome back! Let\'s make today an awesome eco-friendly day!';

  if (todayCO2Saved >= 1.5) {
    companionState = 'great';
    companionExpression = '😊✨';
    companionSpeech = 'Fantastic job! Look at those floating leaves. You are a true Earth Guardian!';
  } else if (todayLogs.length > 0) {
    companionState = 'average';
    companionExpression = '🙂';
    companionSpeech = 'Great start! Keep logging green activities to earn badges!';
  } else {
    companionState = 'improve';
    companionExpression = '🤔';
    companionSpeech = 'Hmm... what green action can we take today? Maybe walk, or switch off AC?';
  }

  // Handle flashcard navigation
  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  // Quiz
  const handleAnswerSelect = (optionIdx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    const currentQ = QUIZ_QUESTIONS[quizStep];
    if (optionIdx === currentQ.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizFinished(true);
      completeQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizActive(true);
  };

  // Tracker
  const handleTrackSubmit = (e) => {
    if (e) e.preventDefault();
    
    let textToAnalyze = trackerText.trim();
    if (inputType === 'voice') {
      textToAnalyze = "Used Bus Today";
    } else if (inputType === 'upload') {
      textToAnalyze = "Uploaded electricity bill for solar credits";
    }

    if (!textToAnalyze) return;

    const lowercaseText = textToAnalyze.toLowerCase();
    
    // Check forbidden keywords
    const hasForbidden = ['car', 'drive', 'scooter', 'ac'].some(word => lowercaseText.includes(word));
    
    if (hasForbidden) {
      setTrackerFeedback({
        text: "Cars emit CO2. Try taking a bus or walking next time!",
        savings: 0
      });
      setTrackerText('');
      setUploadedFileName(null);
      setTimeout(() => {
        setTrackerFeedback(null);
      }, 7000);
      return;
    }

    // Check success keywords
    const hasSuccess = ['walk', 'bus', 'bike', 'train', 'transit', 'metro', 'cycling', 'bicycle', 'lights', 'recycle', 'vegetable', 'local'].some(word => lowercaseText.includes(word));
    
    if (hasSuccess) {
      let savings = 0.5;
      let feedback = "Nice choice! Your activity has been logged.";

      if (lowercaseText.includes('bus') || lowercaseText.includes('transit') || lowercaseText.includes('metro') || lowercaseText.includes('train')) {
        savings = 1.4;
        feedback = "Nice work! You saved approximately 1.4 kg CO₂ today by choosing public transit.";
      } else if (lowercaseText.includes('walk') || lowercaseText.includes('run')) {
        savings = 0.8;
        feedback = "Excellent! Walking burns 0 fuel. You saved approximately 0.8 kg CO₂ on your trip.";
      } else if (lowercaseText.includes('bike') || lowercaseText.includes('cycling') || lowercaseText.includes('bicycle')) {
        savings = 1.0;
        feedback = "Awesome! Cycling is 100% clean transit. You saved approximately 1.0 kg CO₂.";
      } else if (lowercaseText.includes('lights') || lowercaseText.includes('switch off')) {
        savings = 0.3;
        feedback = "Great job! Saving electricity reduces grid load. You saved approximately 0.3 kg CO₂.";
      } else if (lowercaseText.includes('vegetable') || lowercaseText.includes('local')) {
        savings = 0.5;
        feedback = "Healthy choice! Sourcing local vegetables reduces food transport miles, saving around 0.5 kg CO₂.";
      } else if (lowercaseText.includes('bottle') || lowercaseText.includes('recycle')) {
        savings = 0.2;
        feedback = "Great habit! Reusing items instead of single-use plastics saves 0.2 kg CO₂.";
      }

      logActivity(textToAnalyze, savings, inputType, inputType === 'upload' ? true : false);
      
      setTrackerFeedback({
        text: feedback,
        savings: savings
      });
    } else {
      setTrackerFeedback({
        text: "Could not verify sustainable transit or energy choice. Try walking, biking, or taking the bus!",
        savings: 0
      });
    }

    setTrackerText('');
    setUploadedFileName(null);
    
    setTimeout(() => {
      setTrackerFeedback(null);
    }, 7000);
  };

  const toggleVoiceRecording = () => {
    if (!voiceRecording) {
      setVoiceRecording(true);
      setTimeout(() => {
        setVoiceRecording(false);
        setTrackerText("Used Bus Today");
        setInputType('text');
      }, 2500);
    }
  };

  const fileInputRef = useRef(null);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  // Route Calc
  const handleCalculateRoute = (e) => {
    e.preventDefault();
    if (!startLoc || !destLoc) return;

    setCalculatingRoute(true);
    setRouteResults(null);

    setTimeout(() => {
      const distance = parseFloat((3 + Math.random() * 9).toFixed(1));
      setRouteDistance(distance);

      const carEmissions = parseFloat((distance * 0.18).toFixed(2));
      const busEmissions = parseFloat((distance * 0.05).toFixed(2));

      const walkSaved = carEmissions;
      const bikeSaved = carEmissions;
      const busSaved = parseFloat((carEmissions - busEmissions).toFixed(2));

      setRouteResults({
        distance: distance,
        modes: [
          { name: 'Walking', icon: '🚶', emissions: 0, saved: walkSaved, recommended: distance <= 3 },
          { name: 'Bicycle', icon: '🚲', emissions: 0, saved: bikeSaved, recommended: distance > 3 && distance <= 7 },
          { name: 'Bus', icon: '🚌', emissions: busEmissions, saved: busSaved, recommended: distance > 7 },
          { name: 'Car', icon: '🚗', emissions: carEmissions, saved: 0, recommended: false }
        ]
      });
      setCalculatingRoute(false);
    }, 1200);
  };

  // AI chat guide
  const handleSendChatMessage = (textToSend) => {
    const messageText = textToSend || chatInput.trim();
    if (!messageText) return;

    const userMsg = { id: Date.now(), sender: 'user', text: messageText };
    setChatList(prev => [...prev, userMsg]);
    setChatInput('');
    setAiTyping(true);

    setTimeout(() => {
      let aiResponseText = "Nice work thinking about sustainability! Small habits lead to large environmental changes. What other green activities are you tracking today?";
      const lower = messageText.toLowerCase();

      if (lower.includes('solar') || lower.includes('panel')) {
        aiResponseText = "Solar panels are a game changer! By switching to solar energy, you reduce carbon emissions from fossil fuel grids, creating clean power and lowering utility bills. Some households offset over 3,000 kg CO₂ annually!";
      } else if (lower.includes('ac') || lower.includes('electricity') || lower.includes('temp')) {
        aiResponseText = "Great question. Adjusting your AC to 24°C instead of 18°C is super effective! Every degree higher saves around 6% of the AC's power consumption. You stay comfortable while saving money and energy.";
      } else if (lower.includes('food') || lower.includes('meat') || lower.includes('vegetables')) {
        aiResponseText = "Buying locally grown food is an excellent way to shrink your footprint. Imported food travels thousands of air miles, producing heavy emissions. Local green markets support your community and the earth!";
      } else if (lower.includes('compost') || lower.includes('waste') || lower.includes('recycle')) {
        aiResponseText = "Composting organic waste keeps it out of landfills, where it creates methane (a potent greenhouse gas). Instead, it breaks down into rich nutrients for soil. A simple compost bucket in the balcony works wonders!";
      } else if (lower.includes('carbon footprint') || lower.includes('co2') || lower.includes('pulse')) {
        aiResponseText = "Your carbon footprint is the total carbon dioxide emissions from your transport, food, and electricity. EarthPulse makes it easy: log your good deeds, watch your points grow, and save your city step-by-step!";
      }

      setChatList(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponseText }]);
      setAiTyping(false);
    }, 1500);
  };

  const selectChatPrompt = (prompt) => {
    handleSendChatMessage(prompt);
  };

  // Proof verification
  const handleProofFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      setProofFileName(file.name);
      setProofResult(null);
    }
  };

  const handleVerifyProof = () => {
    if (!proofFileName) return;

    setProofVerifying(true);
    setProofResult(null);

    setTimeout(() => {
      let bonusPts = 30;
      let activityLoggedName = "transit trip";
      let co2Amt = 1.0;
      let visionSummary = "Verified!";

      if (proofDocType === 'bus_ticket') {
        visionSummary = "Gemini Vision verified: Authentic public bus transit ticket dated for today. Authenticity: 98%.";
        activityLoggedName = "Verified Bus Ride Ticket";
        co2Amt = 1.4;
        bonusPts = 40;
      } else if (proofDocType === 'train_ticket') {
        visionSummary = "Gemini Vision verified: Regional metro/train ticket. Authenticity: 97%.";
        activityLoggedName = "Verified Train Transit Ticket";
        co2Amt = 1.6;
        bonusPts = 40;
      } else if (proofDocType === 'electricity_bill') {
        visionSummary = "Gemini Vision verified: Electricity bill matching user residential address, showing a 15% reduction in grid power consumption compared to last month.";
        activityLoggedName = "Verified Monthly Electricity Bill Reduction";
        co2Amt = 4.2;
        bonusPts = 60;
      } else if (proofDocType === 'solar_bill') {
        visionSummary = "Gemini Vision verified: Solar installation net-metering statement, showing solar credits generated to grid.";
        activityLoggedName = "Verified Rooftop Solar Offsets";
        co2Amt = 5.0;
        bonusPts = 80;
      } else if (proofDocType === 'cycle_photo') {
        visionSummary = "Gemini Vision verified: Real-world GPS-metadata matching photograph of user riding bicycle on bicycle lane.";
        activityLoggedName = "Verified Bicycle Commute Trip";
        co2Amt = 0.8;
        bonusPts = 30;
      }

      setProofResult({
        success: true,
        summary: visionSummary,
        bonus: bonusPts
      });

      setProofVerifying(false);
      addPoints(bonusPts);
      logActivity(activityLoggedName, co2Amt, 'upload', true);
      triggerCelebration();

      setProofFile(null);
      setProofFileName(null);
    }, 2500);
  };

  // Calculations
  const goalProgressPercent = Math.min(100, Math.round((user.co2Saved / user.co2Goal) * 100));
  const commCO2Saved = Math.round(user.co2Saved * 1000);
  const commTreesEquivalent = Math.round(commCO2Saved / 22);
  const commFuelSaved = Math.round(commCO2Saved / 2.3);

  return (
    <div className="screen-content" style={styles.dashboardContainer}>
      
      {/* 1. Main Home Screen (Card Menu) */}
      {activeTab === 'home' && (
        <div style={styles.menuContainer} className="animate-slide-in">
          {/* Header Section */}
          <div style={styles.header}>
            <button 
              onClick={() => {
                const sideMenu = document.getElementById('side-menu-overlay');
                if (sideMenu) sideMenu.style.transform = 'translateX(0)';
              }} 
              style={styles.iconButton}
            >
              <Menu size={24} color="var(--primary)" />
            </button>
            <span style={styles.appTitle}>🌍 EarthPulse</span>
            <div style={styles.headerRight}>
              <div 
                style={styles.headerAvatar} 
                onClick={() => setActiveTab('profile')}
                title="View Profile"
              >
                {user.companion?.icon || '🧑'}
              </div>
              <div style={styles.headerStreak} onClick={() => setActiveTab('profile')}>
                <span>🔥 {user.streak}d</span>
              </div>
              <div style={styles.pointsBadge} onClick={() => setActiveTab('profile')}>
                <Award size={14} color="var(--accent)" />
                <span>{user.points} pts</span>
              </div>
            </div>
          </div>

          {/* Welcome Intro Section */}
          <div style={styles.welcomeHeroSection}>
            <h2 style={styles.welcomeSub}>Let's make today green! 🌱</h2>
            <p style={styles.welcomeDescText}>Select a module to start taking action or learn about your carbon footprint.</p>
          </div>

          {/* Eco Companion Card */}
          <div className="card card-interactive" style={{ ...styles.companionCard, marginBottom: '20px' }}>
            <div style={styles.companionContent}>
              <div className="avatar-energy" style={styles.avatarCircle}>
                <span style={{ fontSize: '48px' }}>{user.companion?.icon || '🧑'}</span>
                <span style={styles.expressionBadge}>{companionExpression}</span>
              </div>
              <div style={styles.speechBubble}>
                <div style={styles.speechArrow}></div>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: 'var(--primary)' }}>
                  {user.companion?.name || 'Eco Companion'}
                </strong>
                <p style={{ fontSize: '13px', lineHeight: '1.4', color: 'var(--text-main)' }}>
                  "{companionSpeech}"
                </p>
              </div>
            </div>
          </div>

          {/* Grid of Navigation Cards */}
          <div style={styles.menuGrid}>
            {/* Card 1: Learn */}
            <div 
              style={{ ...styles.menuCard, borderLeft: '6px solid var(--emerald)' }} 
              className="card card-interactive"
              onClick={() => setActiveTab('learn')}
            >
              <div style={styles.cardHeaderRow}>
                <span style={styles.menuCardIcon}>📚</span>
                <span style={{ ...styles.cardBadge, backgroundColor: 'var(--emerald-light)', color: 'var(--emerald-dark)' }}>Learn</span>
              </div>
              <h3 style={styles.menuCardTitle}>Learn Guide</h3>
              <p style={styles.menuCardDesc}>Read interactive cards and take a fun quiz to earn +50 points.</p>
            </div>

            {/* Card 2: Track */}
            <div 
              style={{ ...styles.menuCard, borderLeft: '6px solid #0d9488' }} 
              className="card card-interactive"
              onClick={() => setActiveTab('track')}
            >
              <div style={styles.cardHeaderRow}>
                <span style={styles.menuCardIcon}>🌱</span>
                <span style={{ ...styles.cardBadge, backgroundColor: '#ccfbf1', color: '#0f766e' }}>Track</span>
              </div>
              <h3 style={styles.menuCardTitle}>Habit Tracker</h3>
              <p style={styles.menuCardDesc}>Log daily carbon savings, verify receipts, and plan routes.</p>
            </div>

            {/* Card 3: AI Guide */}
            <div 
              style={{ ...styles.menuCard, borderLeft: '6px solid #3b82f6' }} 
              className="card card-interactive"
              onClick={() => setActiveTab('ai-guide')}
            >
              <div style={styles.cardHeaderRow}>
                <span style={styles.menuCardIcon}>🤖</span>
                <span style={{ ...styles.cardBadge, backgroundColor: '#dbeafe', color: '#1d4ed8' }}>AI Guide</span>
              </div>
              <h3 style={styles.menuCardTitle}>Gemini AI</h3>
              <p style={styles.menuCardDesc}>Chat with positive, non-judgmental AI and verify images.</p>
            </div>

            {/* Card 4: Roadmap */}
            <div 
              style={{ ...styles.menuCard, borderLeft: '6px solid var(--accent)' }} 
              className="card card-interactive"
              onClick={() => setActiveTab('roadmap')}
            >
              <div style={styles.cardHeaderRow}>
                <span style={styles.menuCardIcon}>🗺️</span>
                <span style={{ ...styles.cardBadge, backgroundColor: 'var(--accent-light)', color: '#b45309' }}>Roadmap</span>
              </div>
              <h3 style={styles.menuCardTitle}>City Roadmap</h3>
              <p style={styles.menuCardDesc}>Follow rollout journey and municipal pilot developments.</p>
            </div>
          </div>

          {/* Tips of the Day banner */}
          <div className="card" style={{ ...styles.tipCard, marginTop: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={styles.tipIconContainer}>
                <Lightbulb size={20} color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px', color: 'var(--primary)' }}>Today's Eco Tip</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {todayTip}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 2. Secondary Screen Wrapper (renders when activeTab !== 'home') */}
      {activeTab !== 'home' && (
        <div style={styles.secondaryScreenContainer} className="animate-slide-in">
          
          {/* Fixed/Sticky Header with Back Button */}
          <div style={styles.stickyHeader}>
            <button 
              onClick={() => setActiveTab('home')} 
              style={styles.backButton}
            >
              ← Back
            </button>
            <span style={styles.screenTitleText}>
              {activeTab === 'learn' && '📚 Learn & Quiz'}
              {activeTab === 'track' && '🌱 Habit Tracker'}
              {activeTab === 'ai-guide' && '🤖 Gemini AI Guide'}
              {activeTab === 'roadmap' && '🗺️ City Roadmap'}
              {activeTab === 'profile' && '👤 Profile & History'}
              {activeTab === 'settings' && '⚙️ Settings'}
              {activeTab === 'tutorial' && '📖 How It Works'}
            </span>
            <div style={styles.headerRightMinimal}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>
                {user.points} pts
              </span>
            </div>
          </div>

          <div style={styles.secondaryScreenScrollContent}>
            
            {/* ==================== LEARN SCREEN ==================== */}
            {activeTab === 'learn' && (
              <div style={styles.flexColumnGap}>
                {/* Learning Guide */}
                <div className="card" style={styles.learningCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={styles.sectionHeading}>📚 Learning Guide</h3>
                    <span style={styles.levelLabel}>{selectedLevel}</span>
                  </div>
                  
                  <div style={styles.filterRow}>
                    {['ALL', 'BASIC', 'INTERMEDIATE', 'ADVANCED'].map((level) => (
                      <button 
                        key={level} 
                        onClick={() => setSelectedLevel(level)}
                        style={{
                          ...styles.filterBtn,
                          backgroundColor: selectedLevel === level ? 'var(--primary)' : 'var(--border)',
                          color: selectedLevel === level ? '#ffffff' : 'var(--text-main)'
                        }}
                      >
                        {level.charAt(0) + level.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>

                  {filteredCards.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                      {filteredCards.map((card) => (
                        <div 
                          key={card.id}
                          className="card"
                          style={{
                            backgroundColor: theme === 'dark' ? 'var(--card-bg)' : '#ffffff',
                            borderColor: theme === 'dark' ? 'rgba(52, 211, 153, 0.4)' : 'rgba(16, 185, 129, 0.2)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        >
                          {/* Title */}
                          <div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.05em', display: 'block' }}>
                              {card.category.toUpperCase()}
                            </span>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent)', marginTop: '4px', lineHeight: '1.4' }}>
                              {card.question}
                            </h4>
                          </div>

                          {/* MEANING/EXPLANATION */}
                          <div>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                              MEANING / EXPLANATION
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '4px' }}>
                              <p style={{ fontSize: '13px', lineHeight: '1.4', color: 'var(--text-main)', margin: 0 }}>
                                <strong>Impact:</strong> {card.impact}
                              </p>
                              <p style={{ fontSize: '13px', lineHeight: '1.4', color: 'var(--text-main)', margin: 0 }}>
                                <strong>Takeaway:</strong> {card.takeaway}
                              </p>
                            </div>
                          </div>

                          {/* EXAMPLE */}
                          <div style={{ 
                            backgroundColor: theme === 'dark' ? '#0f1712' : '#f4fbf7', 
                            padding: '12px 16px', 
                            borderRadius: '12px', 
                            borderLeft: '4px solid var(--emerald)',
                            marginTop: '4px'
                          }}>
                            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
                              REAL EXAMPLE
                            </span>
                            <p style={{ fontSize: '13px', fontStyle: 'italic', lineHeight: '1.4', color: 'var(--text-main)', margin: 0 }}>
                              {card.example}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ textAlign: 'center', fontSize: '14px', margin: '20px 0' }}>No cards in this category.</p>
                  )}
                </div>

                {/* Quiz Card */}
                <div className="card" style={styles.quizCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={styles.sectionHeading}>📝 Fun Quiz</h3>
                    <span style={styles.badgeLabel}>+50 Points</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Test your green knowledge! Answer 5 questions correctly to earn eco points.
                  </p>

                  {user.funQuizCompleted && !quizActive && (
                    <div style={styles.successBox}>
                      <Check size={16} color="var(--emerald-dark)" style={{ marginRight: '6px' }} />
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--emerald-dark)' }}>
                        Fun Quiz Completed! (+50 pts awarded)
                      </span>
                    </div>
                  )}

                  {!quizActive && !quizFinished ? (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setQuizActive(true)}
                      style={{ padding: '10px 18px', fontSize: '14px' }}
                    >
                      {user.funQuizCompleted ? 'Retake Quiz (No points)' : 'Take 5 Question Fun Quiz'}
                    </button>
                  ) : quizActive && !quizFinished ? (
                    <div style={styles.activeQuizContainer}>
                      <div style={styles.quizProgressHeader}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>
                          QUESTION {quizStep + 1} OF 5 ({QUIZ_QUESTIONS[quizStep].level})
                        </span>
                        <div style={styles.miniProgressContainer}>
                          <div style={{ ...styles.miniProgressBar, width: `${(quizStep + 1) * 20}%` }}></div>
                        </div>
                      </div>

                      <h4 style={styles.quizQuestionText}>{QUIZ_QUESTIONS[quizStep].question}</h4>

                      <div style={styles.optionsList}>
                        {QUIZ_QUESTIONS[quizStep].options.map((opt, idx) => {
                          const isSelected = selectedAnswer === idx;
                          const isCorrect = idx === QUIZ_QUESTIONS[quizStep].correctIndex;
                          let optStyle = styles.quizOption;

                          if (selectedAnswer !== null) {
                            if (isSelected && isCorrect) {
                              optStyle = { ...styles.quizOption, ...styles.quizOptionCorrect };
                            } else if (isSelected && !isCorrect) {
                              optStyle = { ...styles.quizOption, ...styles.quizOptionWrong };
                            } else if (isCorrect) {
                              optStyle = { ...styles.quizOption, ...styles.quizOptionCorrect };
                            } else {
                              optStyle = { ...styles.quizOption, opacity: 0.6 };
                            }
                          }

                          return (
                            <button 
                              key={idx}
                              onClick={() => handleAnswerSelect(idx)}
                              style={optStyle}
                              disabled={selectedAnswer !== null}
                            >
                              <span>{opt}</span>
                              {selectedAnswer !== null && isCorrect && <span>✅</span>}
                              {selectedAnswer !== null && isSelected && !isCorrect && <span>❌</span>}
                            </button>
                          );
                        })}
                      </div>

                      {selectedAnswer !== null && (
                        <button 
                          className="btn btn-primary"
                          onClick={handleNextQuestion}
                          style={{ marginTop: '16px', padding: '10px 14px', fontSize: '13px' }}
                        >
                          {quizStep === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={styles.finishedQuizBox}>
                      <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>Quiz Completed!</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 12px' }}>
                        You scored {quizScore} out of 5!
                      </p>
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <button 
                          className="btn btn-secondary"
                          onClick={resetQuiz}
                          style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                        >
                          <RotateCcw size={16} /> Retake
                        </button>
                        <button 
                          className="btn btn-primary"
                          onClick={() => setQuizFinished(false)}
                          style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== TRACK SCREEN ==================== */}
            {activeTab === 'track' && (
              <div style={styles.flexColumnGap}>
                {/* Eco Companion */}
                <div className="card" style={styles.companionCard}>
                  <div style={styles.companionContent}>
                    <div className="avatar-energy" style={styles.avatarCircle}>
                      <span style={{ fontSize: '48px' }}>{user.companion?.icon || '🧑'}</span>
                      <span style={styles.expressionBadge}>{companionExpression}</span>
                    </div>
                    <div style={styles.speechBubble}>
                      <div style={styles.speechArrow}></div>
                      <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: 'var(--primary)' }}>
                        {user.companion?.name || 'Eco Companion'}
                      </strong>
                      <p style={{ fontSize: '13px', lineHeight: '1.4', color: 'var(--text-main)' }}>
                        "{companionSpeech}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily Tracker */}
                <div className="card" style={styles.trackerCard}>
                  <h3 style={styles.sectionHeading}>🌱 Daily Impact Tracker</h3>
                  <p style={styles.trackerSubtitle}>How did you save carbon today?</p>
                  
                  {trackerFeedback && (
                    <div style={styles.feedbackCard} className="animate-slide-in">
                      <CheckCircle2 size={20} color="var(--emerald)" style={{ flexShrink: 0 }} />
                      <div>
                        <strong style={{ fontSize: '13px', color: 'var(--emerald-dark)', display: 'block' }}>Activity Processed (+{trackerFeedback.savings} kg CO₂ saved!)</strong>
                        <p style={{ fontSize: '12px', color: 'var(--text-main)', marginTop: '2px' }}>{trackerFeedback.text}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleTrackSubmit} style={{ marginTop: '12px' }}>
                    {inputType === 'text' && (
                      <div style={styles.inputGroup}>
                        <input 
                          type="text" 
                          placeholder="e.g. Walked 3 km, Used bus, AC set at 24..." 
                          value={trackerText} 
                          onChange={(e) => setTrackerText(e.target.value)}
                          style={styles.textInput}
                        />
                        <button type="submit" style={styles.sendButton}>
                          <Send size={16} color="#fff" />
                        </button>
                      </div>
                    )}

                    {inputType === 'voice' && (
                      <div style={styles.voiceWrapper}>
                        <button 
                          type="button" 
                          onClick={toggleVoiceRecording}
                          style={{
                            ...styles.micButton,
                            backgroundColor: voiceRecording ? '#ef4444' : 'var(--primary-hover)',
                            animation: voiceRecording ? 'pulse 1s infinite' : 'none'
                          }}
                        >
                          <Mic size={28} color="#fff" />
                        </button>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                          {voiceRecording ? 'Listening... Speak now!' : 'Tap mic to say your activity (e.g. "Used Bus Today")'}
                        </p>
                      </div>
                    )}

                    {inputType === 'upload' && (
                      <div style={styles.uploadWrapper}>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileSelect} 
                          style={{ display: 'none' }}
                          accept="image/*"
                        />
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current?.click()}
                          style={styles.uploadBtn}
                        >
                          <Image size={24} color="var(--primary)" />
                          <span style={{ fontSize: '13px', fontWeight: '600' }}>
                            {uploadedFileName ? `Attached: ${uploadedFileName.substring(0, 15)}...` : 'Select Eco/Transit photo'}
                          </span>
                        </button>
                        {uploadedFileName && (
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            style={{ marginTop: '12px', padding: '10px', fontSize: '13px' }}
                          >
                            Process Uploaded Proof
                          </button>
                        )}
                      </div>
                    )}

                    <div style={styles.inputToggleRow}>
                      <button 
                        type="button" 
                        onClick={() => { setInputType('text'); setTrackerFeedback(null); }}
                        style={{ ...styles.toggleTab, borderBottomColor: inputType === 'text' ? 'var(--emerald)' : 'transparent' }}
                      >
                        ⌨️ Text
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setInputType('voice'); setTrackerFeedback(null); }}
                        style={{ ...styles.toggleTab, borderBottomColor: inputType === 'voice' ? 'var(--emerald)' : 'transparent' }}
                      >
                        🎙️ Voice
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setInputType('upload'); setTrackerFeedback(null); }}
                        style={{ ...styles.toggleTab, borderBottomColor: inputType === 'upload' ? 'var(--emerald)' : 'transparent' }}
                      >
                        📸 Upload
                      </button>
                    </div>
                  </form>
                </div>

                {/* Goal Tracker */}
                <div className="card" style={styles.goalsCard}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <Target size={20} color="var(--primary)" />
                    <h3 style={styles.sectionHeading}>🎯 Monthly Goal Tracker</h3>
                  </div>
                  <div style={styles.goalGrid}>
                    <div style={styles.goalItem}>
                      <span style={styles.goalLabel}>Monthly Goal</span>
                      <span style={styles.goalVal}>{user.co2Goal} kg CO₂</span>
                    </div>
                    <div style={styles.goalItem}>
                      <span style={styles.goalLabel}>Reduced So Far</span>
                      <span style={{ ...styles.goalVal, color: 'var(--emerald-dark)' }}>{user.co2Saved} kg CO₂</span>
                    </div>
                  </div>

                  <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${goalProgressPercent}%` }}></div>
                    <div style={{ ...styles.milestoneMarker, left: '25%' }}><span style={styles.milestoneEmoji}>🌱</span></div>
                    <div style={{ ...styles.milestoneMarker, left: '50%' }}><span style={styles.milestoneEmoji}>🌿</span></div>
                    <div style={{ ...styles.milestoneMarker, left: '75%' }}><span style={styles.milestoneEmoji}>🌳</span></div>
                    <div style={{ ...styles.milestoneMarker, left: '96%' }}><span style={styles.milestoneEmoji}>🌲</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                  <div style={styles.badgeJourneyRow}>
                    <span style={{ fontSize: '11px', fontWeight: '600' }}>Active Milestone:</span>
                    <span style={styles.activeMilestoneBadge}>
                      {goalProgressPercent < 25 && 'Getting Started 🚀'}
                      {goalProgressPercent >= 25 && goalProgressPercent < 50 && 'Seedling Planter 🌱'}
                      {goalProgressPercent >= 50 && goalProgressPercent < 75 && 'Sprout Protector 🌿'}
                      {goalProgressPercent >= 75 && goalProgressPercent < 100 && 'Sapling Guardian 🌳'}
                      {goalProgressPercent >= 100 && 'Forest Champion 🌲🏆'}
                    </span>
                  </div>
                </div>

                {/* Proof Uploader */}
                <div className="card" style={styles.proofCard}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <Upload size={20} color="var(--primary)" />
                    <h3 style={styles.sectionHeading}>📄 Proof Uploader & AI Verification</h3>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    Verify your transit tickets or solar bills with Gemini Vision.
                  </p>
                  <div style={{ marginBottom: '12px' }}>
                    <select 
                      value={proofDocType} 
                      onChange={(e) => setProofDocType(e.target.value)}
                      style={styles.proofSelect}
                    >
                      <option value="bus_ticket">🚌 Bus Ticket</option>
                      <option value="train_ticket">🚆 Train Ticket</option>
                      <option value="electricity_bill">⚡ Electricity Bill</option>
                      <option value="solar_bill">☀️ Solar Net Metering Bill</option>
                      <option value="cycle_photo">🚲 Cycle Commute Photo</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => proofFileInputRef.current?.click()}
                    style={styles.proofFileBtn}
                  >
                    <Camera size={20} color="var(--primary)" />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>
                      {proofFileName ? `Attached: ${proofFileName.substring(0, 18)}...` : 'Select/Capture image file'}
                    </span>
                  </button>
                  <input 
                    type="file" 
                    ref={proofFileInputRef} 
                    onChange={handleProofFileSelect} 
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  {proofFileName && !proofVerifying && (
                    <button 
                      className="btn btn-primary"
                      onClick={handleVerifyProof}
                      style={{ marginTop: '12px', padding: '10px', fontSize: '13px', display: 'flex', gap: '6px', justifyContent: 'center' }}
                    >
                      <Eye size={16} /> Verify with Gemini Vision
                    </button>
                  )}
                  {proofVerifying && (
                    <div style={styles.verifyingLoader}>
                      <div style={styles.spinner}></div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)' }}>
                        Gemini Vision verifying proof authenticity... 👁️
                      </span>
                    </div>
                  )}
                  {proofResult && (
                    <div style={styles.visionResultBox} className="animate-slide-in">
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ fontSize: '20px' }}>🌟</span>
                        <strong style={{ fontSize: '13px', color: 'var(--emerald-dark)' }}>
                          Gemini Vision Verified! (+{proofResult.bonus} bonus points)
                        </strong>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-main)', marginTop: '4px', lineHeight: '1.4' }}>
                        {proofResult.summary}
                      </p>
                    </div>
                  )}
                </div>

                {/* Community Board */}
                <div className="card" style={styles.communityCard}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <Trees size={20} color="var(--primary)" />
                    <h3 style={styles.sectionHeading}>🌍 Community Impact Board</h3>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    "If 1,000 citizens followed your actions..."
                  </p>
                  <div style={styles.commGrid}>
                    <div style={{ ...styles.commItem, transform: `scale(${1 + Math.min(0.12, user.co2Saved / 250)})`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                      <Trees size={24} color="var(--emerald-dark)" style={{ marginBottom: '6px' }} />
                      <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>{commTreesEquivalent}</strong>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Trees Absorbing CO₂</span>
                    </div>
                    <div style={{ ...styles.commItem, transform: `scale(${1 + Math.min(0.12, user.co2Saved / 250)})`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                      <Fuel size={24} color="#b45309" style={{ marginBottom: '6px' }} />
                      <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>{commFuelSaved} L</strong>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Fuel Saved</span>
                    </div>
                    <div style={{ ...styles.commItem, transform: `scale(${1 + Math.min(0.12, user.co2Saved / 250)})`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                      <Zap size={24} color="var(--accent)" style={{ marginBottom: '6px' }} />
                      <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>{commCO2Saved} kg</strong>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>CO₂ Avoided</span>
                    </div>
                  </div>
                </div>

                {/* Route Calc */}
                <div className="card" style={styles.routeCard}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <Compass size={20} color="var(--primary)" />
                    <h3 style={styles.sectionHeading}>🛣️ Route Carbon Calculator</h3>
                  </div>
                  <form onSubmit={handleCalculateRoute} style={styles.routeForm}>
                    <div style={styles.routeInputGroup}>
                      <div style={{ flex: 1 }}>
                        <label style={styles.routeLabelField}>Start</label>
                        <input 
                          type="text" 
                          value={startLoc} 
                          onChange={(e) => setStartLoc(e.target.value)} 
                          placeholder="e.g. Home"
                          style={styles.routeInput} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.routeLabelField}>Destination</label>
                        <input 
                          type="text" 
                          value={destLoc} 
                          onChange={(e) => setDestLoc(e.target.value)} 
                          placeholder="e.g. College"
                          style={styles.routeInput} 
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ padding: '10px', fontSize: '13px', marginTop: '12px' }}
                      disabled={calculatingRoute}
                    >
                      {calculatingRoute ? 'Searching routes...' : 'Calculate Carbon Savings'}
                    </button>
                  </form>

                  {routeResults && (
                    <div style={styles.routeResultsBox} className="animate-slide-in">
                      <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px', color: 'var(--primary)' }}>
                        Distance: {routeResults.distance} km
                      </h4>
                      <div style={styles.routeModesList}>
                        {routeResults.modes.map((mode, i) => (
                          <div 
                            key={i} 
                            style={{
                              ...styles.routeModeItem,
                              backgroundColor: mode.recommended ? 'var(--emerald-light)' : 'var(--card-bg)',
                              borderColor: mode.recommended ? 'var(--emerald)' : 'var(--border)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '20px' }}>{mode.icon}</span>
                              <div>
                                <strong style={{ fontSize: '12px', display: 'block' }}>{mode.name}</strong>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                  {mode.emissions === 0 ? 'Zero Emissions' : `${mode.emissions} kg CO₂`}
                                </span>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              {mode.saved > 0 && <span style={styles.savedCO2Badge}>Saved {mode.saved} kg</span>}
                              {mode.recommended && <span style={styles.recBadge}>Recommended</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== AI GUIDE SCREEN ==================== */}
            {activeTab === 'ai-guide' && (
              <div style={styles.fullHeightChatContainer}>
                <div style={styles.chatViewportUpgraded}>
                  {chatList.map((msg) => (
                    <div 
                      key={msg.id} 
                      style={{
                        ...styles.chatBubble,
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--border)',
                        color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                        borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                        borderBottomLeftRadius: msg.sender === 'user' ? '16px' : '4px',
                      }}
                    >
                      {msg.image && (
                        <div style={{ marginBottom: '6px', borderRadius: '8px', overflow: 'hidden' }}>
                          <img src={msg.image} alt="Uploaded Proof" style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }} />
                        </div>
                      )}
                      {msg.text}
                    </div>
                  ))}
                  {aiTyping && (
                    <div style={{ ...styles.chatBubble, alignSelf: 'flex-start', backgroundColor: 'var(--border)', color: 'var(--text-muted)' }}>
                      typing... ✍️
                    </div>
                  )}
                  {simulatedVoiceRecording && (
                    <div style={{ ...styles.chatBubble, alignSelf: 'flex-end', backgroundColor: 'var(--accent-light)', color: '#b45309', borderBottomRightRadius: '4px' }} className="animate-pulse">
                      🎙️ Listening to voice... Speak now!
                    </div>
                  )}
                  {simulatedImageUploading && (
                    <div style={{ ...styles.chatBubble, alignSelf: 'flex-end', backgroundColor: 'var(--emerald-light)', color: 'var(--emerald-dark)', borderBottomRightRadius: '4px' }} className="animate-pulse">
                      📸 Scanning uploaded image proof...
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div style={styles.promptChipsRow}>
                  <button onClick={() => selectChatPrompt('Explain Carbon Footprint 🌎')} style={styles.promptChip}>Explain Carbon Footprint 🌎</button>
                  <button onClick={() => selectChatPrompt('AC vs Fan energy ⚡')} style={styles.promptChip}>AC vs Fan energy ⚡</button>
                  <button onClick={() => selectChatPrompt('How to start composting? 🍂')} style={styles.promptChip}>Composting tips 🍂</button>
                </div>

                <div style={styles.unifiedChatInputRow}>
                  <input 
                    type="file" 
                    id="chat-file-upload" 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={handleChatImageUpload}
                  />
                  <div style={styles.unifiedChatInputBar}>
                    <div style={styles.keyboardIconWrapper}>
                      <span style={{ fontSize: '16px' }}>⌨️</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder={simulatedVoiceRecording ? "Listening..." : "Ask AI a green question..."}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                      style={styles.chatTextInputUpgraded}
                      disabled={simulatedVoiceRecording}
                    />
                    <button 
                      onClick={handleChatVoiceClick} 
                      style={{ 
                        ...styles.chatExtraIconBtn, 
                        backgroundColor: simulatedVoiceRecording ? 'var(--accent)' : 'transparent',
                        color: simulatedVoiceRecording ? '#ffffff' : 'var(--text-main)'
                      }}
                      title="Voice Input"
                    >
                      🎙️
                    </button>
                    <button 
                      onClick={() => document.getElementById('chat-file-upload')?.click()} 
                      style={{ 
                        ...styles.chatExtraIconBtn,
                        backgroundColor: simulatedImageUploading ? 'var(--emerald)' : 'transparent',
                        color: simulatedImageUploading ? '#ffffff' : 'var(--text-main)'
                      }}
                      title="Upload Photo Proof"
                    >
                      📸
                    </button>
                  </div>
                  <button 
                    onClick={() => handleSendChatMessage()} 
                    style={styles.chatSendBtnUpgraded}
                    title="Send Message"
                  >
                    <Send size={18} color="#ffffff" />
                  </button>
                </div>
              </div>
            )}

            {/* ==================== ROADMAP SCREEN ==================== */}
            {activeTab === 'roadmap' && (
              <div style={styles.flexColumnGap}>
                <div className="card" style={{ backgroundColor: 'var(--emerald-light)', padding: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)', display: 'flex', gap: '8px', alignItems: 'center', margin: 0 }}>
                    <Compass size={20} /> EarthPulse City Journey — Follow our progress step-by-step!
                  </h3>
                </div>

                <div className="card" style={styles.roadmapTimeline}>
                  {ROADMAP_PHASES.map((phase, idx) => {
                    const isActive = phase.status === 'active';
                    return (
                      <div key={idx} style={styles.timelineRow}>
                        <div style={styles.timelineNodeCol}>
                          <div style={{
                            ...styles.timelineNode,
                            backgroundColor: isActive ? 'var(--primary)' : 'var(--border)',
                            borderColor: isActive ? 'var(--emerald-light)' : 'transparent',
                            boxShadow: isActive ? '0 0 8px var(--emerald)' : 'none'
                          }}>
                            {isActive ? <Check size={12} color="#fff" /> : <div style={styles.timelineNodeDot}></div>}
                          </div>
                          {idx < ROADMAP_PHASES.length - 1 && <div style={styles.timelineLine}></div>}
                        </div>

                        <div style={{
                          ...styles.timelineCard,
                          backgroundColor: isActive ? 'var(--emerald-light)' : 'var(--card-bg)',
                          borderColor: isActive ? 'var(--emerald)' : 'var(--border)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{phase.phase}: {phase.title}</strong>
                          </div>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                            ({phase.desc})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================== PROFILE SCREEN ==================== */}
            {activeTab === 'profile' && (
              <div style={styles.flexColumnGap}>
                {/* Main User Stat Summary */}
                <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--emerald-light)' }}>
                  <div style={{ fontSize: '64px', marginBottom: '8px' }}>{user.companion?.icon || '🧑'}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{user.companion?.name || 'Eco Champion'}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sustainable Companion</p>
                  
                  <div style={{ ...styles.goalGrid, marginTop: '16px', marginBottom: 0 }}>
                    <div style={styles.goalItem}>
                      <Award size={20} color="var(--accent)" />
                      <span style={styles.goalVal}>{user.points}</span>
                      <span style={styles.goalLabel}>Total Points</span>
                    </div>
                    <div style={styles.goalItem}>
                      <Flame size={20} color="var(--accent)" />
                      <span style={styles.goalVal}>{user.streak} days</span>
                      <span style={styles.goalLabel}>Streak</span>
                    </div>
                  </div>
                </div>

                {/* Change Avatar Companion Selector */}
                <div className="card">
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <UserCheck size={18} /> Change Eco Companion
                  </h4>
                  <div style={styles.avatarChangeGrid}>
                    {COMPANIONS.map((comp) => {
                      const isActive = user.companion?.id === comp.id;
                      return (
                        <button
                          key={comp.id}
                          onClick={() => selectCompanion(comp)}
                          style={{
                            ...styles.avatarChangeBtn,
                            backgroundColor: isActive ? 'var(--emerald-light)' : 'var(--bg-app)',
                            borderColor: isActive ? 'var(--emerald)' : 'var(--border)'
                          }}
                        >
                          <span style={{ fontSize: '24px' }}>{comp.icon}</span>
                          <span style={{ fontSize: '10px', display: 'block', fontWeight: '700', marginTop: '2px', color: 'var(--text-main)' }}>{comp.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Badge Journey System */}
                <div className="card" style={styles.badgeJourneyCard}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <ShieldCheck size={20} color="var(--primary)" />
                    <h3 style={styles.sectionHeading}>🏅 Badge Journey</h3>
                  </div>
                  <div style={styles.badgeTimeline}>
                    {APP_BADGES.map((badge, idx) => {
                      const isUnlocked = user.badges.includes(badge.name);
                      return (
                        <div 
                          key={idx} 
                          style={{
                            ...styles.badgeRowItem,
                            opacity: isUnlocked ? 1 : 0.5,
                            backgroundColor: isUnlocked ? 'var(--emerald-light)' : 'var(--bg-app)',
                            borderColor: isUnlocked ? 'var(--emerald)' : 'var(--border)'
                          }}
                        >
                          <span style={{ fontSize: '28px', marginRight: '12px' }}>{badge.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{badge.name}</strong>
                              {isUnlocked && <span style={styles.unlockedTag}>Unlocked ✅</span>}
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{badge.desc}</p>
                            <p style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '600', marginTop: '2px' }}>
                              Req: {badge.requirement}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ==================== SETTINGS SCREEN ==================== */}
            {activeTab === 'settings' && (
              <div style={styles.flexColumnGap}>
                {/* Theme Settings card */}
                <div className="card">
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>
                    Appearance
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Select your color preference.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setTheme('light')}
                      style={{
                        ...styles.settingBtn,
                        backgroundColor: theme === 'light' ? 'var(--primary)' : 'var(--border)',
                        color: theme === 'light' ? '#fff' : 'var(--text-main)'
                      }}
                    >
                      ☀️ Light
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      style={{
                        ...styles.settingBtn,
                        backgroundColor: theme === 'dark' ? 'var(--primary)' : 'var(--border)',
                        color: theme === 'dark' ? '#fff' : 'var(--text-main)'
                      }}
                    >
                      🌙 Dark
                    </button>
                    <button 
                      onClick={() => setTheme('system')}
                      style={{
                        ...styles.settingBtn,
                        backgroundColor: theme === 'system' ? 'var(--primary)' : 'var(--border)',
                        color: theme === 'system' ? '#fff' : 'var(--text-main)'
                      }}
                    >
                      ⚙️ System
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== TUTORIAL SCREEN ==================== */}
            {activeTab === 'tutorial' && (
              <div style={styles.flexColumnGap}>
                <div className="card" style={{ backgroundColor: 'var(--emerald-light)', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>How EarthPulse Works 📖</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-main)', marginTop: '4px' }}>
                    Follow these simple steps to save your city!
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {TUTORIAL_SLIDES.map((slide, idx) => (
                    <div key={idx} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={styles.tutorialStepNum}>{idx + 1}</div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>{slide.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>{slide.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('home')}
                  style={{ marginTop: '8px' }}
                >
                  Enter Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  dashboardContainer: {
    padding: '16px',
    backgroundColor: 'var(--bg-phone)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '12px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  appTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '20px',
    fontWeight: '800',
    color: 'var(--primary)',
  },
  pointsBadge: {
    backgroundColor: 'var(--accent-light)',
    color: 'var(--accent)',
    fontSize: '13px',
    fontWeight: '700',
    padding: '6px 12px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  headerStreak: {
    backgroundColor: 'var(--accent-light)',
    color: 'var(--accent)',
    fontSize: '13px',
    fontWeight: '700',
    padding: '6px 12px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  headerAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.2s ease',
  },
  secondaryScreenContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  secondaryScreenScrollContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    position: 'relative',
    paddingBottom: '40px',
  },
  stickyHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border)',
    marginBottom: '12px',
    backgroundColor: 'var(--bg-phone)',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 8px',
    transition: 'all 0.2s',
  },
  screenTitleText: {
    fontSize: '16px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-main)',
  },
  headerRightMinimal: {
    fontSize: '13px',
    fontWeight: '700',
  },
  flexColumnGap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginTop: '16px',
  },
  menuCard: {
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: 'var(--card-bg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    border: '1px solid var(--border)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  menuCardIcon: {
    fontSize: '24px',
  },
  menuCardTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginTop: '4px',
  },
  menuCardDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardBadge: {
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: '700',
  },
  fullHeightChatContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: 'calc(100vh - 165px)',
    justifyContent: 'space-between',
  },
  chatViewportUpgraded: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: 'var(--bg-app)',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    marginBottom: '8px',
  },
  unifiedChatInputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    marginTop: '4px',
  },
  unifiedChatInputBar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--card-bg)',
    border: '2px solid var(--border)',
    borderRadius: '24px',
    padding: '2px 8px 2px 12px',
    gap: '8px',
  },
  keyboardIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-muted)',
  },
  chatTextInputUpgraded: {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    fontSize: '13px',
    color: 'var(--text-main)',
    padding: '8px 4px',
    minWidth: '0',
  },
  chatExtraIconBtn: {
    border: 'none',
    background: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    transition: 'all 0.15s ease',
  },
  chatSendBtnUpgraded: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.15s ease',
  },
  streakAlertRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--accent-light)',
    padding: '8px 12px',
    borderRadius: '12px',
    marginBottom: '12px',
    border: '1px solid #fde047',
  },
  companionCard: {
    backgroundColor: 'var(--emerald-light)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  companionContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatarCircle: {
    width: '76px',
    height: '76px',
    borderRadius: '50%',
    backgroundColor: 'var(--card-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    border: '3px solid var(--emerald)',
    flexShrink: 0,
  },
  expressionBadge: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '50%',
    padding: '2px',
    fontSize: '12px',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
  },
  speechBubble: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '16px',
    padding: '12px',
    position: 'relative',
    flex: 1,
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
  },
  speechArrow: {
    content: '""',
    position: 'absolute',
    left: '-8px',
    top: '24px',
    width: '0',
    height: '0',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderRight: '8px solid var(--border)',
  },
  celebrationIndicator: {
    backgroundColor: 'var(--emerald)',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'center',
    padding: '6px',
    borderRadius: '8px',
    marginTop: '-8px',
  },
  tipCard: {
    borderLeft: '4px solid var(--accent)',
  },
  tipIconContainer: {
    backgroundColor: 'var(--accent-light)',
    padding: '8px',
    borderRadius: '50%',
  },
  sectionHeading: {
    fontSize: '15px',
    color: 'var(--primary)',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  trackerCard: {
    borderColor: 'var(--border)',
  },
  trackerSubtitle: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '2px',
    marginBottom: '8px',
  },
  inputGroup: {
    display: 'flex',
    gap: '8px',
  },
  textInput: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    outline: 'none',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
  },
  sendButton: {
    backgroundColor: 'var(--primary)',
    border: 'none',
    borderRadius: '10px',
    padding: '0 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  micButton: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  uploadWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '8px',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: 'var(--bg-app)',
    border: '2px dashed var(--border)',
    borderRadius: '12px',
    padding: '24px 12px',
    cursor: 'pointer',
    width: '100%',
  },
  inputToggleRow: {
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid var(--border)',
    marginTop: '12px',
    paddingTop: '6px',
  },
  toggleTab: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  feedbackCard: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'var(--emerald-light)',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '12px',
  },
  learningCard: {
    borderColor: 'var(--border)',
  },
  levelLabel: {
    fontSize: '10px',
    fontWeight: '700',
    backgroundColor: 'var(--border)',
    padding: '2px 8px',
    borderRadius: '8px',
    color: 'var(--text-muted)',
  },
  filterRow: {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    marginTop: '10px',
    paddingBottom: '4px',
  },
  filterBtn: {
    border: 'none',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  flashcardContainer: {
    backgroundColor: 'var(--bg-app)',
    borderRadius: '16px',
    padding: '16px',
    marginTop: '12px',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    border: '1px solid var(--border)',
  },
  cardHeaderInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '6px',
    marginBottom: '6px',
  },
  cardFace: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardFaceFlipped: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left',
  },
  flashcardQuestion: {
    fontSize: '15px',
    color: 'var(--text-main)',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  tapToFlip: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: '8px',
  },
  flipDetail: {
    fontSize: '12px',
    lineHeight: '1.3',
  },
  cardNavRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
  },
  cardNavBtn: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  quizCard: {
    borderColor: 'var(--border)',
  },
  badgeLabel: {
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: 'var(--accent-light)',
    color: '#b45309',
    padding: '4px 8px',
    borderRadius: '12px',
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--emerald-light)',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  activeQuizContainer: {
    backgroundColor: 'var(--bg-app)',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
  },
  quizProgressHeader: {
    marginBottom: '12px',
  },
  miniProgressContainer: {
    height: '6px',
    backgroundColor: 'var(--border)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '4px',
  },
  miniProgressBar: {
    height: '100%',
    backgroundColor: 'var(--emerald)',
    transition: 'width 0.3s ease',
  },
  quizQuestionText: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '12px',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  quizOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '2px solid var(--border)',
    backgroundColor: 'var(--card-bg)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  quizOptionCorrect: {
    borderColor: 'var(--emerald)',
    backgroundColor: 'var(--emerald-light)',
    color: 'var(--emerald-dark)',
    fontWeight: '600',
  },
  quizOptionWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    fontWeight: '600',
  },
  finishedQuizBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    textAlign: 'center',
  },
  placeholderCard: {
    borderStyle: 'dashed',
    textAlign: 'center',
    padding: '12px',
  },
  
  /* Goals, Community & Badges */
  goalsCard: {
    borderColor: 'var(--border)'
  },
  goalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '14px'
  },
  goalItem: {
    backgroundColor: 'var(--bg-app)',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid var(--border)',
    flex: 1
  },
  goalLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  goalVal: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginTop: '2px'
  },
  progressContainer: {
    height: '14px',
    backgroundColor: 'var(--border)',
    borderRadius: '7px',
    position: 'relative',
    marginTop: '16px',
    overflow: 'visible'
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'var(--emerald)',
    borderRadius: '7px',
    transition: 'width 0.5s ease-out'
  },
  milestoneMarker: {
    position: 'absolute',
    top: '-8px',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  milestoneEmoji: {
    fontSize: '14px',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '50%',
    padding: '2px',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)'
  },
  badgeJourneyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    borderTop: '1px solid var(--border)',
    paddingTop: '10px'
  },
  activeMilestoneBadge: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--primary)',
    backgroundColor: 'var(--emerald-light)',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  
  communityCard: {
    borderColor: 'var(--border)',
    backgroundColor: 'var(--card-bg)'
  },
  commGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '8px',
    marginTop: '12px'
  },
  commItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '12px 6px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-app)'
  },
  badgeJourneyCard: {
    borderColor: 'var(--border)'
  },
  badgeTimeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px'
  },
  badgeRowItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '14px',
    border: '2px solid',
    transition: 'all 0.3s ease'
  },
  unlockedTag: {
    fontSize: '9px',
    fontWeight: '800',
    color: 'var(--emerald-dark)',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px'
  },

  routeCard: {
    borderColor: 'var(--border)'
  },
  routeForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  routeInputGroup: {
    display: 'flex',
    gap: '8px'
  },
  routeLabelField: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    display: 'block',
    marginBottom: '4px'
  },
  routeInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    outline: 'none',
    fontSize: '12px',
    fontFamily: 'var(--font-sans)'
  },
  routeResultsBox: {
    marginTop: '16px',
    backgroundColor: 'var(--bg-app)',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid var(--border)'
  },
  routeModesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  routeModeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    transition: 'all 0.2s'
  },
  savedCO2Badge: {
    fontSize: '10px',
    fontWeight: '700',
    backgroundColor: 'var(--emerald-light)',
    color: 'var(--emerald-dark)',
    padding: '2px 8px',
    borderRadius: '8px',
    display: 'inline-block'
  },
  recBadge: {
    fontSize: '9px',
    fontWeight: '800',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    padding: '2px 6px',
    borderRadius: '4px',
    display: 'block',
    marginTop: '4px',
    textAlign: 'center'
  },
  aiChatCard: {
    borderColor: 'var(--border)'
  },
  chatViewport: {
    height: '180px',
    overflowY: 'auto',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: 'var(--bg-app)'
  },
  chatBubble: {
    maxWidth: '85%',
    padding: '8px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    lineHeight: '1.4',
    wordBreak: 'break-word',
    boxShadow: 'var(--shadow-sm)'
  },
  promptChipsRow: {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    marginTop: '8px',
    paddingBottom: '4px'
  },
  promptChip: {
    border: '1px solid var(--border)',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-main)',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s'
  },
  chatInputRow: {
    display: 'flex',
    gap: '6px',
    marginTop: '8px'
  },
  chatTextInput: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    outline: 'none',
    fontSize: '12px',
    fontFamily: 'var(--font-sans)'
  },
  chatSendBtn: {
    backgroundColor: 'var(--primary)',
    border: 'none',
    borderRadius: '8px',
    padding: '0 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  proofCard: {
    borderColor: 'var(--border)'
  },
  proofSelect: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '13px',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-main)',
    outline: 'none',
    fontFamily: 'var(--font-sans)'
  },
  proofFileBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '18px 12px',
    backgroundColor: 'var(--bg-app)',
    border: '2px dashed var(--border)',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  verifyingLoader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'var(--bg-app)',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    marginTop: '12px'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid var(--border)',
    borderTopColor: 'var(--primary)',
    borderRadius: '50%',
    animation: 'pulseLoading 1s linear infinite'
  },
  visionResultBox: {
    backgroundColor: 'var(--emerald-light)',
    border: '1px solid var(--emerald)',
    borderRadius: '10px',
    padding: '12px',
    marginTop: '12px'
  },

  /* Phase 6 Styles */
  avatarChangeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    marginTop: '8px'
  },
  avatarChangeBtn: {
    border: '2px solid',
    borderRadius: '12px',
    padding: '8px 4px',
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.2s'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
    maxHeight: '220px',
    overflowY: 'auto'
  },
  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'var(--bg-app)',
    border: '1px solid var(--border)',
    borderRadius: '10px'
  },
  roadmapTimeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    padding: '16px 12px'
  },
  timelineRow: {
    display: 'flex',
    gap: '14px',
    alignItems: 'stretch'
  },
  timelineNodeCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24px'
  },
  timelineNode: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '3px solid var(--emerald)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  timelineNodeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--text-muted)'
  },
  timelineLine: {
    width: '3px',
    flex: 1,
    backgroundColor: 'var(--border)'
  },
  timelineCard: {
    flex: 1,
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '12px',
    marginBottom: '20px',
    boxShadow: 'var(--shadow-sm)'
  },
  timelineStatusTag: {
    fontSize: '9px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  tutorialStepNum: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
    flexShrink: 0
  },
  settingBtn: {
    flex: 1,
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.15s'
  },
  apiModeToggleRow: {
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--border)'
  },
  apiModeBtn: {
    flex: 1,
    border: 'none',
    padding: '8px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.15s'
  }
};
