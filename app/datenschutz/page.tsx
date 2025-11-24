"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function DatenschutzPage() {
  const { lang } = useLanguage();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        <p className="auth-subtitle">
          {lang === "de"
            ? "Hier kannst du später deine Datenschutzhinweise einfügen."
            : "Here you can later add your privacy policy."}
        </p>

        <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
          {lang === "de"
            ? "Beispiel: Welche Daten verarbeitet werden, Rechtsgrundlagen, Speicherdauer, Rechte der Nutzer:innen, Kontakt für Datenschutzfragen usw."
            : "Example: which data is processed, legal basis, storage duration, users' rights, contact for privacy questions, etc."}
        </p>
      </div>
    </div>
  );
}
