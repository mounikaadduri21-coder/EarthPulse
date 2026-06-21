import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Save user data to Firestore under users/{userId}
 * @param {string} userId 
 * @param {Object} data - Containing userProfile and points, streak, companion, badges, history, etc.
 * @returns {Promise<void>}
 */
export const saveUserData = async (userId, data) => {
  if (!userId) return;
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      companion: data.companion || null,
      points: typeof data.points === 'number' ? data.points : 0,
      streak: typeof data.streak === 'number' ? data.streak : 7,
      badges: Array.isArray(data.badges) ? data.badges : [],
      co2Saved: typeof data.co2Saved === 'number' ? data.co2Saved : 14.0,
      co2Goal: typeof data.co2Goal === 'number' ? data.co2Goal : 20.0,
      funQuizCompleted: !!data.funQuizCompleted,
      history: Array.isArray(data.history) ? data.history : [],
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Firestore Save Error: ", error);
    throw error;
  }
};

/**
 * Load user data from Firestore users/{userId}
 * @param {string} userId 
 * @returns {Promise<Object|null>} - Returns the document data or null if it doesn't exist
 */
export const loadUserData = async (userId) => {
  if (!userId) return null;
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Firestore Load Error: ", error);
    throw error;
  }
};
