import "server-only";
import {
  getApps,
  initializeApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

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
let cachedDb: Firestore | null | undefined;

export function getAdminDb(): Firestore | null {
  if (cachedDb !== undefined) return cachedDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    cachedDb = null;
    return cachedDb;
  }

  const app: App =
    getApps()[0] ??
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });

  cachedDb = getFirestore(app);
  return cachedDb;
}
