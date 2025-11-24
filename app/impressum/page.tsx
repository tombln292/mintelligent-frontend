"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ImpressumPage() {
  const { lang } = useLanguage();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {lang === "de" ? "Impressum" : "Imprint"}
        </h1>
        <p className="auth-subtitle">
          {lang === "de"
            ? "Hier kannst du später die rechtlich erforderlichen Angaben einfügen."
            : "Here you can later add the legally required information."}
        </p>

        <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
          {lang === "de"
            ? "Beispiel: Verantwortliche Organisation, Anschrift, Vertretungsberechtigte Personen, Kontakt, Registereintrag usw."
            : "Example: responsible organization, address, authorized representatives, contact details, registration information, etc."}
        </p>
      </div>
    </div>
  );
}
