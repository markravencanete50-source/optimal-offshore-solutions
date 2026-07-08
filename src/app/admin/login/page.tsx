"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const auth = getClientAuth();
      if (!auth) {
        throw new Error("Sign-in is not configured. Add the Firebase web config to the environment.");
      }

      // We mint our own httpOnly session cookie below, so we don't need the
      // Firebase client session to linger in the browser — keep it in memory.
      await setPersistence(auth, inMemoryPersistence);

      let idToken: string;
      try {
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
        idToken = await cred.user.getIdToken();
      } catch (fbErr) {
        // Don't leak which part was wrong.
        const code = (fbErr as { code?: string })?.code || "";
        if (code === "auth/too-many-requests") {
          throw new Error("Too many attempts. Please wait a moment and try again.");
        }
        throw new Error("Incorrect email or password.");
      }

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed.");

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setBusy(false);
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={onSubmit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="" />
        <h1>Admin console</h1>
        <p>Optimal Offshore Solutions — lead &amp; site activity dashboard.</p>
        {error && <div className="err">{error}</div>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          autoComplete="username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit" disabled={busy || !email || !password}>
          {busy ? "Signing in…" : "Sign in →"}
        </button>
      </form>
    </div>
  );
}
