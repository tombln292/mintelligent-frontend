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
            ? "Angaben gemäß § 5 TMG"
            : "Provider identification (Germany)"}
        </p>

        <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
              {lang === "de" ? "Verantwortlich" : "Responsible entity"}
            </h2>
            <p>
              <strong>MINT Zukunft e. V.</strong>
              <br />
              c/o Factory Works GmbH
              <br />
              Rheinsberger Str. 76/77
              <br />
              10115 Berlin
            </p>

            <p>
              Tel.: +49 30 21230-828
              <br />
              E-Mail:{" "}
              <a href="mailto:benjamin.gesing@mintzukunftschaffen.de">
                benjamin.gesing@mintzukunftschaffen.de
              </a>
            </p>

            <p>
              Web:{" "}
              <a
                href="https://mintzukunftschaffen.de"
                target="_blank"
                rel="noreferrer"
              >
                mintzukunftschaffen.de
              </a>
              <br />
              Twitter:{" "}
              <a
                href="https://www.twitter.com/mint_zukunft"
                target="_blank"
                rel="noreferrer"
              >
                @mint_zukunft
              </a>
              <br />
              Vimeo:{" "}
              <a
                href="https://vimeo.com/mintzukunft"
                target="_blank"
                rel="noreferrer"
              >
                vimeo.com/mintzukunft
              </a>
              <br />
              Facebook:{" "}
              <a
                href="https://www.facebook.com/mintzukunftschaffen"
                target="_blank"
                rel="noreferrer"
              >
                facebook.com/mintzukunftschaffen
              </a>
            </p>
          </section>

          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
              {lang === "de" ? "Vertretung" : "Representation"}
            </h2>
            <p>
              {lang === "de" ? "Vorstandsvorsitzender:" : "Chairman:"} Prof.
              Dr. Christoph Meinel
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
              {lang === "de"
                ? "Registereintrag"
                : "Registration in the association register"}
            </h2>
            <p>
              {lang === "de"
                ? "Eingetragen im Vereinsregister des Amtsgerichts Charlottenburg unter der Nummer:"
                : "Registered in the association register at the Local Court of Charlottenburg under number:"}{" "}
              VR 27594 B
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
