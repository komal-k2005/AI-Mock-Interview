import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';

// Firebase configuration - replace with your Firebase project config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDm8aCEVPbnjuaMiofKuI6o_f_biGA3PYY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ai-mock-interview-e2efd.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ai-mock-interview-e2efd",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ai-mock-interview-e2efd.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "998854238206",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:998854238206:web:677f653d49f204b94b6aaf",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-NK375DJP37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add additional scopes for better Google integration
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Set custom parameters for better user experience
googleProvider.setCustomParameters({
  prompt: 'select_account',
  login_hint: ''
});

// Debug: Log Firebase initialization
console.log('Firebase initialized with config:', firebaseConfig);

// Helper function to check Firebase configuration
export const checkFirebaseConfig = () => {
  const issues = [];
  
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    issues.push('Firebase API key is not configured');
  }
  if (!firebaseConfig.authDomain || firebaseConfig.authDomain === 'YOUR_PROJECT_ID.firebaseapp.com') {
    issues.push('Firebase authDomain is not configured');
  }
  if (!firebaseConfig.projectId || firebaseConfig.projectId === 'YOUR_PROJECT_ID') {
    issues.push('Firebase projectId is not configured');
  }
  
  return issues;
};

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    
    console.log('Google Sign-In successful:', user.email);
    
    // Send token to backend for verification
    return { success: true, user, idToken };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Google Sign-In failed. Please try again.';
    if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup was blocked. Please allow popups for this site and try again.';
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign-in was cancelled. Please try again.';
    } else if (error.code === 'auth/configuration-not-found') {
      errorMessage = 'Google Sign-In is not configured. Please check Firebase settings.';
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      errorMessage = 'An account already exists with different credentials. Please use a different method.';
    } else if (error.message) {
      errorMessage = `Google Sign-In failed: ${error.message}`;
    }
    
    return { success: false, error: errorMessage };
  }
};

// Email/Password Registration
export const registerWithEmailPassword = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await user.updateProfile({ displayName: name });
    
    // Send email verification
    await sendEmailVerification(user);
    
    return { success: true, user, message: 'Registration successful. Please check your email for verification.' };
  } catch (error) {
    console.error('Registration Error:', error);
    return { success: false, error: error.message };
  }
};

// Email/Password Login
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    
    // Check if email is verified
    if (!user.emailVerified) {
      return { success: false, error: 'Please verify your email before logging in.' };
    }
    
    return { success: true, user, idToken };
  } catch (error) {
    console.error('Login Error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Login failed. Please check your credentials.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email. Please register first.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again or use "Forgot Password".';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled. Please contact support.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later or reset your password.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

// Password Reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent successfully' };
  } catch (error) {
    console.error('Password Reset Error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send password reset email';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many requests. Please try again later';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

// Auth State Observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout Error:', error);
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Reload user (to check email verification status)
export const reloadUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      return { success: true, user };
    }
    return { success: false, error: 'No user logged in' };
  } catch (error) {
    console.error('Reload User Error:', error);
    return { success: false, error: error.message };
  }
};

export { auth };