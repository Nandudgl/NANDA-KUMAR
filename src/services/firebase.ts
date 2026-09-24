import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import config from '../../firebase-applet-config.json';
import { QuizAttempt } from '../types';

// Initialize Firebase App
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Target provisioned database ID
export const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);

// Critical Firestore Connection Validator required by SKILL.md
export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.info('Connected to Firebase Firestore successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
    // Still return false but don't crash app
    return false;
  }
}

// Automatically test on boot
validateFirestoreConnection().catch(() => {});

// Anonymous Auth for instant student session
export async function initStudentAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        resolve(currentUser);
      } else {
        try {
          const cred = await signInAnonymously(auth);
          resolve(cred.user);
        } catch (err) {
          console.warn('Anonymous sign-in unavailable, proceeding in offline student mode', err);
          resolve(null);
        }
      }
    });
  });
}

// Save Quiz Attempt to Firestore + Local Storage
export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  // Always save locally first for resilience
  try {
    const existing = localStorage.getItem('dl_quiz_history');
    const list: QuizAttempt[] = existing ? JSON.parse(existing) : [];
    list.unshift(attempt);
    localStorage.setItem('dl_quiz_history', JSON.stringify(list.slice(0, 50)));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }

  // Then sync with Firestore if authenticated
  try {
    const user = auth.currentUser;
    const uid = user ? user.uid : 'guest_student';
    const docRef = doc(db, 'users', uid, 'quizAttempts', attempt.id);
    await setDoc(docRef, attempt);
  } catch (err) {
    console.warn('Firestore quiz attempt write error, cached locally:', err);
  }
}

// Fetch Quiz History
export async function fetchQuizHistory(): Promise<QuizAttempt[]> {
  try {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, 'users', user.uid, 'quizAttempts'),
        orderBy('completedAt', 'desc'),
        limit(20)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as QuizAttempt);
      }
    }
  } catch (err) {
    console.warn('Falling back to local quiz history:', err);
  }

  // Fallback to local storage
  try {
    const existing = localStorage.getItem('dl_quiz_history');
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}
