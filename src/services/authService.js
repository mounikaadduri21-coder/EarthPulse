import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

/**
 * Sign in with Google using a popup dialog.
 * @returns {Promise<UserCredential>}
 */
export const signInWithGoogle = async () => {
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
  return onAuthStateChanged(auth, callback);
};
