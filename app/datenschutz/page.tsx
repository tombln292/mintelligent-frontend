"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function DatenschutzPage() {
  const { lang } = useLanguage();

  if (lang === "en") {
    // einfache englische Version
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Privacy Information</h1>
          <p className="auth-subtitle">
            Summary of data protection information for collaboration with MINT
            Zukunft e. V.
          </p>

          <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>Purpose of data protection</h2>
              <p>
                The aim of data protection is to protect every individual from
                having their personal rights infringed by the handling of their
                personal data. Personal data is any information relating to an
                identified or identifiable person (for example name, address,
                date of birth, contact details, information on occupation or
                health, photos and videos).
              </p>
            </section>

            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>
                Processing of personal data
              </h2>
              <p>
                Processing includes any operation performed on personal data,
                regardless of whether it is automated or not. This includes in
                particular collection, storage, organisation, modification,
                access, transmission, use, deletion and destruction of data.
              </p>
            </section>

            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>Confidentiality obligation</h2>
              <p>
                All personal information that you receive in the context of
                collaboration with MINT Zukunft e. V. must be treated
                confidentially. The obligation to maintain data secrecy
                continues even after the end of the collaboration.
              </p>
            </section>

            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>
                Technical and organisational measures
              </h2>
              <p>To fulfil data protection and data security requirements:</p>
              <ul>
                <li>Use user accounts and passwords and keep them secret.</li>
                <li>Keep devices and media with personal data locked away.</li>
                <li>
                  Only store data that you really need for your work and delete
                  data that is no longer required in a secure way.
                </li>
                <li>
                  Keep software (programs, browser, virus protection, firewall)
                  up to date.
                </li>
                <li>
                  If personal data is stored on private devices, it must be
                  encrypted and agreed with MINT Zukunft e. V. in advance.
                </li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1rem" }}>Contact for questions</h2>
              <p>
                If you have questions regarding data protection in the context
                of MINT Zukunft e. V., please contact the MINT Zukunft office.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Deutsche Version
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Datenschutzhinweise</h1>
        <p className="auth-subtitle">
          Informationen zum Datenschutz im Rahmen der Zusammenarbeit mit MINT
          Zukunft e. V.
        </p>

        <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>Ziel des Datenschutzes</h2>
            <p>
              Ziel des Datenschutzes ist es, jede einzelne Person davor zu
              schützen, dass ihre Persönlichkeitsrechte durch den Umgang mit
              ihren personenbezogenen Daten beeinträchtigt werden. Unter
              personenbezogenen Daten versteht man alle Informationen, die sich
              auf eine identifizierte oder identifizierbare natürliche Person
              beziehen – zum Beispiel Name, Anschrift, Kontaktdaten, Beruf,
              Geburtsdatum, Angaben zum Gesundheitszustand sowie Fotos und
              Videoaufnahmen.
            </p>
          </section>

          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>
              Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Unter „Verarbeitung“ versteht man jeden Vorgang im Umgang mit
              personenbezogenen Daten – unabhängig davon, ob dies automatisiert
              oder manuell erfolgt. Dazu zählen insbesondere das Erheben,
              Erfassen, Ordnen, Speichern, Anpassen oder Verändern, Auslesen,
              Abfragen, Verwenden, Übermitteln, Verbreiten sowie das Löschen
              und Vernichten von Daten.
            </p>
          </section>

          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>
              Verpflichtung zur Wahrung des Datengeheimnisses
            </h2>
            <p>
              Alle personenbezogenen Informationen, die du im Rahmen der
              Zusammenarbeit mit MINT Zukunft e. V. erhältst – zum Beispiel aus
              Schulbewerbungen, Bewertungsprozessen oder Kommunikationsvorgängen
              – sind vertraulich zu behandeln. Diese Verpflichtung gilt auch
              über das Ende der Zusammenarbeit hinaus.
            </p>
          </section>

          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>
              Technische und organisatorische Maßnahmen
            </h2>
            <p>
              Um die Anforderungen an Datenschutz und Datensicherheit zu
              erfüllen, sind insbesondere folgende Maßnahmen zu beachten:
            </p>
            <ul>
              <li>
                Zugang zu Geräten und Programmen nur mit persönlichem
                Benutzerkonto und Passwort.
              </li>
              <li>
                Datenträger und Unterlagen mit personenbezogenen Daten (z.&nbsp;B.
                Notizen, USB-Sticks) so aufbewahren, dass Dritte keinen Zugriff
                haben.
              </li>
              <li>
                Nur die Daten speichern, die für die jeweilige Aufgabe
                erforderlich sind; nicht mehr benötigte Daten sicher löschen.
              </li>
              <li>
                Programme, Browser und Virenschutz (inkl. Firewall) regelmäßig
                aktualisieren.
              </li>
              <li>
                Regelmäßig Datensicherungen durchführen und diese sicher
                verwahren.
              </li>
              <li>
                Werden besonders schutzbedürftige Daten auf privaten Geräten
                gespeichert (z.&nbsp;B. Laptop, Smartphone, Tablet), müssen diese
                verschlüsselt sein und die Speicherung ist vorab mit MINT
                Zukunft e. V. abzustimmen.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1rem" }}>
              Ansprechpartner für Datenschutzfragen
            </h2>
            <p>
              Wenn du Fragen zum Datenschutz oder zu den hier beschriebenen
              Maßnahmen hast oder in einem Einzelfall rechtliche Auskünfte
              benötigst, wende dich bitte an die Geschäftsstelle von MINT
              Zukunft e. V.
            </p>
            <p>
              <strong>MINT Zukunft e. V.</strong>
              <br />
              c/o Factory Works GmbH
              <br />
              Rheinsberger Str. 76/77
              <br />
              10115 Berlin
              <br />
              E-Mail:{" "}
              <a href="mailto:benjamin.gesing@mintzukunftschaffen.de">
                benjamin.gesing@mintzukunftschaffen.de
              </a>
            </p>

            <p style={{ fontSize: "0.8rem", marginTop: "0.75rem" }}>
              Hinweis: Diese Seite stellt eine verständliche Zusammenfassung der
              internen Datenschutzhinweise dar und ersetzt keine
              rechtsverbindliche, von juristischen Expert:innen geprüfte
              Datenschutzerklärung im Sinne der DSGVO.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
