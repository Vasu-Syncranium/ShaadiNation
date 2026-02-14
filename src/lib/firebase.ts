/**
 * Firebase Configuration
 * 
 * Setup Instructions:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project (or use existing)
 * 3. Enable Authentication > Email/Password
 * 4. Go to Project Settings > General > Your apps > Add web app
 * 5. Copy the config values to your .env.local file
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
    return !!(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
};

// Initialize Firebase (singleton pattern) - only if configured
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (typeof window !== 'undefined' && isFirebaseConfigured()) {
    try {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }
        auth = getAuth(app);
    } catch (error) {
        console.warn('Firebase initialization failed:', error);
        app = null;
        auth = null;
    }
}

export { app, auth };
export default firebaseConfig;
