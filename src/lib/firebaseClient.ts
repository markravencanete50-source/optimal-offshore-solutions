// Client-side Firebase (optional). Only initialised in the browser and only
// when the public config is present. Currently the contact form posts through
// the server API route (which uses the Admin SDK), so this is provided for
// future client-side reads (e.g. surfacing case studies) without extra setup.
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;

export function getClientDb(): Firestore | null {
  if (!config.apiKey || !config.projectId) return null;
  app = getApps()[0] ?? initializeApp(config);
  return getFirestore(app);
}
