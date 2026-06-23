import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArOjRQeJ848IkPHhGsCoxXNhrC4wCAIAA",
    authDomain: "earthpulse-26c06.firebaseapp.com",
    projectId: "earthpulse-26c06",
    storageBucket: "earthpulse-26c06.firebasestorage.app",
    messagingSenderId: "999864234699",
    appId: "1:999864234699:web:767e11ccbf3407c5e4e14e",
    measurementId: "G-JF7GT4VEC4"
};
let app = null;
let analytics = null;
let auth = null;
let googleProvider = null;
let db = null;
let isFirebaseConfigured = false;
let firebaseInitError = null;

// Helper function to check if configuration value is missing or placeholder
const isValidConfigValue = (val) => {
    return val && typeof val === 'string' && val.trim() !== '' && val !== 'undefined';
};

// Verify apiKey, authDomain, projectId, appId are present and valid
if (!isValidConfigValue(firebaseConfig.apiKey) ||
    !isValidConfigValue(firebaseConfig.authDomain) ||
    !isValidConfigValue(firebaseConfig.projectId) ||
    !isValidConfigValue(firebaseConfig.appId)) {

    isFirebaseConfigured = false;
    firebaseInitError = "Missing Firebase configuration parameters. Please check your environment variables (VITE_FIREBASE_*).";
    console.error("Firebase config is incomplete:", {
        apiKey: firebaseConfig.apiKey ? "Present" : "Missing",
        authDomain: firebaseConfig.authDomain ? "Present" : "Missing",
        projectId: firebaseConfig.projectId ? "Present" : "Missing",
        appId: firebaseConfig.appId ? "Present" : "Missing"
    });
} else {
    try {
        // Initialize Firebase
        app = initializeApp(firebaseConfig);
        analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

        // Initialize Services
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        db = getFirestore(app);
        isFirebaseConfigured = true;
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        isFirebaseConfigured = false;
        firebaseInitError = error.message || error.toString();
    }
}

export { app, analytics, auth, googleProvider, db, isFirebaseConfigured, firebaseInitError };