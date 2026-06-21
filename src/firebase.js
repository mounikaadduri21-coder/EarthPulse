import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArOjRQeJ848IkPHhGsCoxXNhrC4wCAIAA",
    authDomain: "earthpulse-26c06.firebaseapp.com",
    projectId: "earthpulse-26c06",
    storageBucket: "earthpulse-26c06.firebasestorage.app",
    messagingSenderId: "999864234699",
    appId: "1:999864234699:web:767e11ccbf3407c5e4e14e",
    measurementId: "G-JF7GT4VEC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, googleProvider, db };