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

// User Management Types
export type UserRole = 'super-admin' | 'admin' | 'editor';

export interface AdminUserInfo {
    uid: string;
    email: string;
    username: string;
    role: UserRole;
    createdAt: string;
    lastLogin?: string;
}

// User Management Functions (Mock Implementation without Admin SDK)

/**
 * Check if the current user is a super admin
 */
export function isSuperAdmin(): boolean {
    const email = getUserEmail();
    // Hardcoded check for the main admin email
    return email === 'admin@shaadination.com';
}

/**
 * List all users
 */
export async function listUsers(): Promise<{ users: AdminUserInfo[] } | { error: string }> {
    // Mock data for development/demo
    // In a real app with Firebase Admin, this would call a Cloud Function or API route

    // Check local storage for mocked users
    let mockUsers: AdminUserInfo[] = [
        {
            uid: 'admin-1',
            email: 'admin@shaadination.com',
            username: 'admin',
            role: 'super-admin',
            createdAt: new Date().toISOString()
        }
    ];

    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('shaadination_mock_users');
        if (stored) {
            try {
                mockUsers = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse mock users', e);
                return { error: 'Failed to parse mock users' };
            }
        } else {
            // Initialize with default admin
            localStorage.setItem('shaadination_mock_users', JSON.stringify(mockUsers));
        }
    }

    return { users: mockUsers };
}

/**
 * Create a new user
 */
export async function createUser(username: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string; user?: AdminUserInfo }> {
    // Mock implementation
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('shaadination_mock_users');
        const users: AdminUserInfo[] = stored ? JSON.parse(stored) : [];

        if (users.find(u => u.username === username)) {
            return { success: false, error: 'Username already exists' };
        }

        const newUser: AdminUserInfo = {
            uid: `user-${Date.now()}`,
            email: `${username}@example.com`,
            username,
            role,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('shaadination_mock_users', JSON.stringify(users));

        return { success: true, user: newUser };
    }

    return { success: false, error: 'Cannot create user in this environment' };
}

/**
 * Delete a user
 */
export async function deleteUser(username: string): Promise<{ success: boolean; error?: string }> {
    // Mock implementation
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('shaadination_mock_users');
        if (!stored) return { success: false, error: 'No users found' };

        const users: AdminUserInfo[] = JSON.parse(stored);
        const filtered = users.filter(u => u.username !== username);

        if (filtered.length === users.length) {
            return { success: false, error: 'User not found' };
        }

        localStorage.setItem('shaadination_mock_users', JSON.stringify(filtered));
        return { success: true };
    }

    return { success: false, error: 'Cannot delete user in this environment' };
}
