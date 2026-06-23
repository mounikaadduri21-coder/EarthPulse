import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

/**
 * Sign in with Google using a popup dialog.
 * @returns {Promise<UserCredential>}
 */
export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    throw new Error("Google Sign-In is unavailable because Firebase is not configured.");
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error: ", error);
    throw error;
  }
};

/**
 * Sign out the currently logged in user.
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
  if (!auth) {
    console.warn("Sign-out requested but Firebase Auth is not initialized.");
    return;
  }
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-Out Error: ", error);
    throw error;
  }
};

/**
 * Listen for user auth state changes.
 * @param {Function} callback 
 * @returns {Function} unsubscribe function
 */
export const onAuthStateChangedListener = (callback) => {
  if (!auth) {
    console.warn("Firebase Auth is not initialized. Using mockup auth listener.");
    // Return a dummy unsubscribe function
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
