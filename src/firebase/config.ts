import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD6y_Yka9Lj_gWphOI8hH5rZj99YlWBg1E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lawtronic-tech.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lawtronic-tech",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lawtronic-tech.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1043765308941",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1043765308941:web:12c013936479c598e22f44",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-X9FX55MRHC",
};

/** True when all required Firebase env vars are present. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else if (import.meta.env.DEV) {
  console.warn(
    '[Lawtronic] Firebase env vars missing — running in demo mode with mock data. Copy .env.example to .env.local and fill in your Firebase config.'
  );
}

export { app, auth, db, storage };

export const analyticsPromise: Promise<Analytics | null> = isFirebaseConfigured
  ? isSupported().then((ok) => (ok && app ? getAnalytics(app) : null))
  : Promise.resolve(null);
