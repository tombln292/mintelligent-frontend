"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ImpressumPage() {
  const { lang } = useLanguage();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {lang === "de" ? "Impressum" : "Legal notice"}
        </h1>

        {lang === "de" ? (
          <div className="legal-text">
            <p style={{ whiteSpace: "pre-line" }}>
              {`Impressum
Diensteanbieter
MINT Zukunft e.V.

c/o Factory Works GmbH
Rheinsbergerstr. 76/77
10115 Berlin
Deutschland

Kontaktmöglichkeiten
E-Mail-Adresse: info@mintzukunftschaffen.de
Telefon: +49 30 21230-828

Vertretungsberechtigte Personen
Vertretungsberechtigt: Prof. Dr. Christoph Meinel (Vorstandsvorsitzender), Benjamin Gesing (Vorstand und Geschäftsführer)

Journalistisch-redaktionelle Angebote
Inhaltlich verantwortlich: Benjamin Gesing

Audiovisuelle Mediendienste
Sitzland: Deutschland.
Zuständige Regulierungs-, bzw. Aufsichtsbehörde: Medienanstalt Berlin-Brandenburg (mabb), http://www.mabb.de.

Register und Registernummer
Vereinsregister
Geführt bei: Vereinsregister Amtsgericht Charlottenburg
Nummer: 27594 B

Social Media und andere Onlinepräsenzen
Dieses Impressum gilt auch für die folgenden Social-Media-Präsenzen und Onlineprofile:

Web: mintzukunftschaffen.de
Twitter
Vimeo
Facebook
Instagram
LinkedIn
Youtube
Mastodon
Mattermost
Seedshirt
Arcgis
CiviCRM

Haftungs- und Schutzrechtshinweise
Haftungsausschluss: Die Inhalte dieses Onlineangebotes wurden sorgfältig und nach unserem aktuellen Kenntnisstand erstellt, dienen jedoch nur der Information und entfalten keine rechtlich bindende Wirkung, sofern es sich nicht um gesetzlich verpflichtende Informationen (z. B. das Impressum, die Datenschutzerklärung, AGB oder verpflichtende Belehrungen von Verbrauchern) handelt. Wir behalten uns vor, die Inhalte vollständig oder teilweise zu ändern oder zu löschen, soweit vertragliche Verpflichtungen unberührt bleiben. Alle Angebote sind freibleibend und unverbindlich.

Links auf fremde Webseiten: Die Inhalte fremder Webseiten, auf die wir direkt oder indirekt verweisen, liegen außerhalb unseres Verantwortungsbereiches und wir machen sie uns nicht zu Eigen. Für alle Inhalte und Nachteile, die aus der Nutzung der in den verlinkten Webseiten aufrufbaren Informationen entstehen, übernehmen wir keine Verantwortung.

Urheberrechte und Markenrechte: Alle auf dieser Website dargestellten Inhalte, wie Texte, Fotografien, Grafiken, Marken und Warenzeichen sind durch die jeweiligen Schutzrechte (Urheberrechte, Markenrechte) geschützt. Die Verwendung, Vervielfältigung usw. unterliegen unseren Rechten oder den Rechten der jeweiligen Urheber bzw. Rechteinhaber.

Hinweise auf Rechtsverstöße: Sollten Sie innerhalb unseres Internetauftritts Rechtsverstöße bemerken, bitten wir Sie uns auf diese hinzuweisen. Wir werden rechtswidrige Inhalte und Links nach Kenntnisnahme unverzüglich entfernen.`}
            </p>
          </div>
        ) : (
          <div className="legal-text">
            <p style={{ whiteSpace: "pre-line" }}>
              {`Legal notice

Service provider
MINT Zukunft e.V.
c/o Factory Works GmbH
Rheinsbergerstr. 76/77
10115 Berlin
Germany

Email: info@mintzukunftschaffen.de
Phone: +49 30 21230-828

Represented by
Prof. Dr. Christoph Meinel (Chairman of the Board),
Benjamin Gesing (Board member and Managing Director)

Further details, liability and copyright notes correspond to the German version of the legal notice. In case of doubt, only the German original text is legally binding.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
