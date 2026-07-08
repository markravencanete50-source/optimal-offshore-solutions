// Client-side Firebase (optional). Only initialised in the browser and only
// when the public config is present. Currently the contact form posts through
// the server API route (which uses the Admin SDK), so this is provided for
// future client-side reads (e.g. surfacing case studies) without extra setup.
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True when the public web config is present (so client auth/db can init). */
export function hasClientConfig(): boolean {
  return Boolean(config.apiKey && config.projectId);
}

let app: FirebaseApp | null = null;

function getClientApp(): FirebaseApp | null {
  if (!hasClientConfig()) return null;
  app = getApps()[0] ?? initializeApp(config);
  return app;
}

export function getClientDb(): Firestore | null {
  const a = getClientApp();
  return a ? getFirestore(a) : null;
}

/** Firebase Authentication (client) — used for admin email/password sign-in. */
export function getClientAuth(): Auth | null {
  const a = getClientApp();
  return a ? getAuth(a) : null;
}
