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
            ? "So erreichst du das Team von MINT Zukunft e. V."
            : "How to contact the team of MINT Zukunft e. V."}
        </p>

        <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
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

          {lang === "de" ? (
            <p>
              Für Fragen zu MINTelligent, Kooperationen oder Presseanfragen
              kannst du dich gerne per E-Mail oder Telefon melden.
            </p>
          ) : (
            <p>
              For questions about MINTelligent, collaborations or press
              inquiries, please contact us via email or phone.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
