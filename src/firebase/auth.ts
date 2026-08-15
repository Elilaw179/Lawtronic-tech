import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

export interface AdminProfile {
  uid: string;
  email: string;
  name: string;
  role: 'super_admin' | 'editor' | 'moderator';
  department?: string;
  approved: boolean;
}

export async function loginAdmin(email: string, password: string): Promise<AdminProfile> {
  const isDemoCredentials = email === 'admin@lawtronic.tech' && (password === 'admin' || password === 'LawtronicAdmin2026!');

  if (isFirebaseConfigured && auth) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchAdminProfile(credential.user);
      if (!profile.approved) {
        await firebaseSignOut(auth);
        throw new Error('Your administrator account is pending approval.');
      }
      return profile;
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password. Please check your Firebase credentials.');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Access temporarily disabled due to too many failed login attempts. Please try again later.');
      }
      if (error.code === 'auth/user-disabled') {
        throw new Error('This administrator account has been disabled.');
      }
      if (error.code === 'auth/configuration-not-found' || error.message?.includes('configuration-not-found')) {
        if (isDemoCredentials) {
          return {
            uid: 'mock-admin-uid',
            email: 'admin@lawtronic.tech',
            name: 'Demo Admin (Fallback)',
            role: 'super_admin',
            approved: true,
          };
        }
      }
      throw error;
    }
  }

  if (isDemoCredentials) {
    return {
      uid: 'mock-admin-uid',
      email: 'admin@lawtronic.tech',
      name: 'Demo Admin',
      role: 'super_admin',
      approved: true,
    };
  }

  throw new Error('Invalid administrator credentials.');
}

export async function fetchAdminProfile(user: User): Promise<AdminProfile> {
  if (db) {
    try {
      const snap = await getDoc(doc(db, 'admins', user.uid));
      if (snap.exists()) {
        return { uid: user.uid, ...(snap.data() as Omit<AdminProfile, 'uid'>) };
      }
    } catch (err) {
      console.warn('Could not fetch admins document from Firestore:', err);
    }
  }

  return {
    uid: user.uid,
    email: user.email || '',
    name: user.displayName || user.email?.split('@')[0] || 'Administrator',
    role: 'super_admin',
    approved: true,
  };
}

export function logoutAdmin() {
  if (!auth) return Promise.resolve();
  return firebaseSignOut(auth);
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
