"use client";

import React, { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const { login } = useAuth();
  const t = useI18n();
  const { lang } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ identifier: email, password });

      if (result === "not_registered") {
        // ➜ automatisch zur Registrierungsseite
        router.push(`/register?email=${encodeURIComponent(email)}`);
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      alert(
        lang === "de"
          ? "Login fehlgeschlagen. Bitte versuche es später erneut."
          : "Login failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t.loginTitle}</h1>
        <p className="auth-subtitle">{t.loginDescription}</p>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="form-label">
            {t.loginEmail}
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            {t.loginPassword}
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => router.push("/")}
            >
              {lang === "de" ? "Zurück" : "Back"}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading
                ? lang === "de"
                  ? "Anmelden..."
                  : "Logging in..."
                : t.loginSubmit}
            </button>
          </div>
        </form>
        <p className="auth-footer-text">
          {t.loginNoAccount}{" "}
          <button
            className="link-button"
            type="button"
            onClick={() => router.push("/register")}
          >
            {t.loginGoToRegister}
          </button>
        </p>
      </div>
    </div>
  );
}
