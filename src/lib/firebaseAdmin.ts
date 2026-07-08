import "server-only";
import {
  getApps,
  initializeApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Lazily initialise the Firebase Admin SDK (server-side only) from env vars.
 * Returns null when credentials are not configured, so callers can degrade
 * gracefully instead of throwing during local dev / preview.
 *
 * Required env vars (see .env.example):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY   (with literal "\n" escaped, or real newlines)
 */
let cachedApp: App | null | undefined;

function getAdminApp(): App | null {
  if (cachedApp !== undefined) return cachedApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    cachedApp = null;
    return cachedApp;
  }

  cachedApp =
    getApps()[0] ??
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  return cachedApp;
}

let cachedDb: Firestore | null | undefined;

export function getAdminDb(): Firestore | null {
  if (cachedDb !== undefined) return cachedDb;
  const app = getAdminApp();
  cachedDb = app ? getFirestore(app) : null;
  return cachedDb;
}

let cachedAuth: Auth | null | undefined;

/** Firebase Authentication (Admin) — used to verify admin sign-in ID tokens. */
export function getAdminAuth(): Auth | null {
  if (cachedAuth !== undefined) return cachedAuth;
  const app = getAdminApp();
  cachedAuth = app ? getAuth(app) : null;
  return cachedAuth;
}
