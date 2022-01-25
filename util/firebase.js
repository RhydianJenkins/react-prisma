import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY || 'dev',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'dev',
  projectId: process.env.FIREBASE_PROJECT_ID || 'dev',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'dev',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'dev',
  appId: process.env.FIREBASE_APP_ID || 'dev',
});

export const analytics = getAnalytics(app);

export default app;
