"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {lang === "de" ? "Kontakt" : "Contact"}
        </h1>
        <p className="auth-subtitle">
          {lang === "de"
            ? "Hier kannst du später deine Kontaktdaten und Hinweise für Schulen eintragen."
            : "Here you can later add your contact details and information for schools."}
        </p>

        <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
          {lang === "de"
            ? "Beispiel: E-Mail-Adresse, Ansprechpartner:in, Telefon, Link zum Kontaktformular usw."
            : "Example: email address, contact person, phone number, link to a contact form, etc."}
        </p>
      </div>
    </div>
  );
}
