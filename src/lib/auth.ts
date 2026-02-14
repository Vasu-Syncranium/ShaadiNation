/**
 * Firebase Authentication for admin panel
 * Uses Firebase Auth for user management
 * Falls back to dev credentials when Firebase is not configured
 */

import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

const AUTH_TOKEN_KEY = 'shaadination_firebase_token';

export interface AuthSession {
    user: User | null;
    token: string;
    email?: string;
}

/**
 * Sign in with email and password
 */
export async function login(email: string, password: string): Promise<{
    success: boolean;
    token?: string;
    user?: User;
    error?: string
}> {
    // Development fallback when Firebase is not configured
    if (!isFirebaseConfigured()) {
        console.log('Firebase not configured, using dev fallback');
        if (email === 'admin@shaadination.com' && password === 'admin123') {
            const devToken = `dev-token-${Date.now()}`;
            if (typeof window !== 'undefined') {
                localStorage.setItem(AUTH_TOKEN_KEY, devToken);
                localStorage.setItem('shaadination_user_email', email);
            }
            return { success: true, token: devToken };
        }
        return { success: false, error: 'Invalid email or password' };
    }

    if (!auth) {
        return { success: false, error: 'Authentication not available' };
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        // Store token for API calls
        if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem('shaadination_user_email', userCredential.user.email || email);
        }

        return {
            success: true,
            token,
            user: userCredential.user
        };
    } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };
        let errorMessage = 'Login failed';

        switch (firebaseError.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password';
                break;
            default:
                errorMessage = firebaseError.message || 'Login failed';
        }

        return { success: false, error: errorMessage };
    }
}

/**
 * Sign out
 */
export async function logout(): Promise<void> {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem('shaadination_user_email');
    }

    if (isFirebaseConfigured() && auth) {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.warn('Firebase signOut error:', error);
        }
    }
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get stored user email
 */
export function getUserEmail(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('shaadination_user_email');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return !!getAuthToken();
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
    if (!isFirebaseConfigured() || !auth) {
        // In dev mode, just run callback once with null
        setTimeout(() => callback(null), 0);
        return () => { };
    }

    return onAuthStateChanged(auth, callback);
}

/**
 * Refresh the ID token (tokens expire after 1 hour)
 */
export async function refreshToken(): Promise<string | null> {
    if (!isFirebaseConfigured() || !auth?.currentUser) {
        return getAuthToken();
    }

    try {
        const token = await auth.currentUser.getIdToken(true);
        if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        }
        return token;
    } catch {
        return null;
    }
}

// Legacy exports for backwards compatibility
export function clearAuthToken(): void {
    logout();
}

export function clearAuthSession(): void {
    logout();
}
