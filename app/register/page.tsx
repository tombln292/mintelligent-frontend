"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const t = useI18n();
  const { lang } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("teacher");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // E-Mail aus der URL übernehmen (z.B. /register?email=foo@bar.de)
  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password, role });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(
        lang === "de"
          ? "Registrierung fehlgeschlagen. Bitte später erneut versuchen."
          : "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t.registerTitle}</h1>
        <p className="auth-subtitle">{t.registerDescription}</p>
        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="form-label">
            {t.registerName}
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            {t.registerEmail}
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            {t.registerPassword}
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            {t.registerRole}
            <select
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="teacher">{t.addlTeacher}</option>
              <option value="admin">{t.addlAdmin}</option>
              <option value="other">{t.addlOther}</option>
            </select>
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
                  ? "Erstellen..."
                  : "Creating..."
                : t.registerSubmit}
            </button>
          </div>
        </form>
        <p className="auth-footer-text">
          {lang === "de" ? "Schon ein Konto?" : "Already have an account?"}{" "}
          <button
            className="link-button"
            type="button"
            onClick={() => router.push("/login")}
          >
            {lang === "de" ? "Anmelden" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
