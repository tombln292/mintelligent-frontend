"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  if (lang === "en") {
    // einfache englische Zusammenfassung
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">About MINT Zukunft schaffen e.V.</h1>
          <p className="auth-subtitle">
            Overview of the mission, focus areas and structure of MINT Zukunft schaffen e.V.
          </p>

          <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>Philosophy</h2>
              <p>
                Germany faces a structural shortage of qualified STEM (MINT)
                professionals. This shortage affects both university graduates
                and vocationally trained specialists and is already slowing down
                innovation and economic growth.
              </p>
              <p>
                MINT education is therefore key – both for individual careers
                and for equal opportunities and democratic participation in a
                technology-driven society.
              </p>
            </section>

            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>Focus areas</h2>
              <p>
                The initiative aims to excite pupils about STEM, motivate and
                recognise schools, increase the number of STEM students in
                higher education (especially women), and improve the quality of
                STEM graduates.
              </p>
              <p>
                Core programmes are{" "}
                <strong>&quot;MINT-freundliche Schule&quot;</strong> and{" "}
                <strong>&quot;Digitale Schule&quot;</strong>, which support and
                recognise schools with a strong MINT or digital profile.
              </p>
            </section>

            <section style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem" }}>The association</h2>
              <p>
                MINT Zukunft e.V. is a registered, non-profit association. All
                activities run under the name &quot;MINT Zukunft schaffen!&quot;
                and are implemented together with members, supporters and
                partners throughout Germany.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1rem" }}>Network & structures</h2>
              <p>
                The initiative brings together stakeholders from schools,
                business, science and civil society: members, supporters,
                ambassadors and several working groups (e.g. for{" "}
                &quot;MINT-freundliche Schule&quot;, &quot;Digitale Schule&quot;
                , social media and networking across Germany).
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
        <h1 className="auth-title">Über MINT Zukunft schaffen e.V.</h1>
        <p className="auth-subtitle">
          Philosophie, Handlungsschwerpunkte, Vereinsziele und Strukturen.
        </p>

        <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
          {/* Philosophie */}
          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>Philosophie</h2>
            <p>
              Der Wirtschaftsstandort Deutschland ist gefährdet durch den Mangel
              an Nachwuchs in den MINT-Qualifikationen (Mathematik,
              Informatik, Naturwissenschaften und Technik). Der Engpass an
              naturwissenschaftlich-technisch qualifizierten Fachkräften ist ein
              strukturelles Problem, das schon heute als Wachstums- und
              Innovationsbremse einen hohen Wertschöpfungsverlust für die
              deutsche Volkswirtschaft verursacht – mit steigender Tendenz.
            </p>
            <p>
              MINT-Fachkräfte-Engpässe gibt es sowohl im akademischen Bereich
              als auch insbesondere im Bereich der qualifizierten
              MINT-Fachkräfte mit abgeschlossener Berufsausbildung. Hier werden
              in gravierendem Umfang Bewerberinnen und Bewerber fehlen.
              Absolventinnen und Absolventen von MINT-Ausbildungs- und
              -Studiengängen sind gefragte Technologieexperten und finden
              attraktive Berufseinstiege und Karrierewege – nicht nur in
              Unternehmen der Metall- und Elektroindustrie, in der Chemie oder
              in der IT-Branche, sondern auch zunehmend in der
              Dienstleistungsbranche wie z. B. in Banken und Versicherungen.
            </p>
            <p>
              Um die Zahl qualifizierter Bewerberinnen und Bewerber für
              MINT-Ausbildungsberufe und MINT-Studiengänge signifikant zu
              steigern und somit unseren Wohlstand auch in Zukunft zu
              gewährleisten, müssen alle Talentquellen ausgeschöpft und
              Bildungsbarrieren konsequent abgebaut werden. Unterricht und Lehre
              in den MINT-Fächern müssen an Schule und Hochschule quantitativ
              und qualitativ verbessert werden.
            </p>
            <p>
              Neben der Bedeutung der MINT-Bildung für die eigene berufliche
              Entwicklung bildet sie auch die Grundlage für die Teilhabe an
              unserer von Wissenschaft und Technik geprägten Welt im Sinne einer
              umfassenden Chancengerechtigkeit und fördert
              kreativ-gestalterische Kompetenzen. Die Kenntnis
              mathematisch-naturwissenschaftlicher Zusammenhänge ist
              Voraussetzung für einen verantwortlichen Diskurs zu
              wissenschaftlich-technischen Entwicklungen der Gegenwart und der
              Zukunft.
            </p>
            <p>
              „MINT Zukunft schaffen!” will profiliert zu einer positiven
              Einstellung von jungen Menschen, Eltern, Lehrkräften sowie einer
              breiten Öffentlichkeit zu MINT beitragen. Die notwendige Stärkung
              von MINT-Fähigkeiten und -Fertigkeiten betrifft alle
              Bildungsbereiche: von der frühkindlichen Bildung über die
              allgemeinbildende Schule, die Berufsbildung, die Hochschule und
              die berufliche Weiterbildung. Die Hauptzielgruppen für „MINT
              Zukunft schaffen!“ sind einerseits Schüler und Schülerinnen aller
              Altersklassen, andererseits Studienanfängerinnen und -anfänger
              sowie Studierende. Adressiert werden die Hauptzielgruppen mit den
              Programmen „MINT-freundliche Schule“ (Etablierung eines
              MINT-Schwerpunkts) und „Digitale Schule“ (Statusfeststellung zur
              Digitalisierung).
            </p>
            <p>
              Als bundesweites MINT-Netzwerk setzt „MINT Zukunft schaffen!”
              zukunftsorientiert und wegweisend Zeichen für positive
              Veränderungen und bietet den zahlreichen, seit vielen Jahren
              erfolgreich vorhandenen MINT-Einzelinitiativen der Verbände und
              Unternehmen eine breite Multiplikatorplattform, um durch ein
              gemeinsames Auftreten eine kritische Masse zu erreichen und
              politischen Forderungen Nachdruck zu verleihen.
            </p>
          </section>

          {/* Handlungsschwerpunkte */}
          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>Handlungsschwerpunkte</h2>
            <p>
              Die Nationale Initiative „MINT Zukunft schaffen!“ hat den
              Schwerpunkt, Schülerinnen und Schüler für MINT zu begeistern und
              Schulen im Bereich MINT zu motivieren, fördern und auszuzeichnen.
              Hierzu werden insbesondere die MINT-Profile von Schulen im
              Allgemeinen sowie das Informatik- bzw. Digitalisierungsprofil im
              Besonderen durch die Programme „MINT-freundliche Schule“ und
              „Digitale Schule“ in den Blick genommen.
            </p>
            <p>
              Weitere Ziele sind die Erhöhung der Zahl der
              Studienanfänger:innen in MINT-Studiengängen an den Hochschulen in
              Deutschland und dabei insbesondere die Erhöhung des
              Frauenanteils, sowie die Sicherung und Steigerung der Qualität der
              Absolvent:innen von MINT-Studiengängen und -Ausbildungsberufen.
            </p>
            <p>
              Weitere Aktivitäten sind unter anderem:
            </p>
            <ul>
              <li>
                monatliche Erhebung der MINT-Lücke und halbjährliches
                MINT-Reporting im Rahmen des MINT-Meters gemeinsam mit dem IW
                Köln,
              </li>
              <li>
                MINT-Awards für Studierende und ein Stipendium für Studierende
                gemeinsam mit dem Förderer MLP,
              </li>
              <li>
                Konferenzen zur Vernetzung und Bündelung der
                MINT-Einzelinitiativen gemeinsam mit Partnern.
              </li>
            </ul>
          </section>

          {/* Der Verein */}
          <section style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem" }}>Der Verein</h2>
            <p>
              Der Verein „MINT Zukunft e.V.“ ist ein eingetragener und
              gemeinnütziger Verein. Alle Aktivitäten des Vereins laufen unter
              dem Namen „MINT Zukunft schaffen!“.
            </p>
            <p>
              Eine Auflistung der Mitglieder sowie Unterlagen zum
              Vereinsbeitritt (Satzung, Beitragsordnung, Beitrittsantrag) werden
              auf der Website bereitgestellt.
            </p>
            <p>Die Ziele des Vereins sind insbesondere:</p>
            <ul>
              <li>
                der Verein ist selbstlos tätig und verfolgt ausschließlich und
                unmittelbar gemeinnützige Zwecke,
              </li>
              <li>
                Motivation, Förderung und Auszeichnung von Schulen im Bereich
                MINT,
              </li>
              <li>
                Förderung des MINT-Profils von Schulen allgemein sowie des
                Informatik- bzw. Digitalisierungsprofils durch „MINT-freundliche
                Schule“ und „Digitale Schule“,
              </li>
              <li>
                Erhöhung der Zahl der Studienanfänger:innen in
                MINT-Studiengängen und insbesondere des Frauenanteils,
              </li>
              <li>
                Sicherung und Steigerung der Qualität der Absolvent:innen von
                MINT-Studiengängen und -Ausbildungsberufen,
              </li>
              <li>Abbau von Technologie-Skepsis in der Bevölkerung.</li>
            </ul>
            <p>Der Verein verfolgt diese Ziele unter anderem durch:</p>
            <ul>
              <li>
                Auszeichnung von Schulen mit einem MINT-Profil („MINT-freundliche
                Schule“) oder einem digitalen Profil („Digitale Schule“),
              </li>
              <li>
                Erfahrungsaustausch, Kooperation mit Vereinen, Stiftungen und
                Hochschulen sowie Aufbau eines Netzwerks,
              </li>
              <li>
                ehrenamtliche MINT-Botschafter:innen in MINT-Netzwerken,
              </li>
              <li>
                Ausschreibung von Preisen und Ausrichtung von Wettbewerben,
              </li>
              <li>
                Ausrichtung von Konferenzen zur Vernetzung und Bündelung der
                MINT-Einzelinitiativen.
              </li>
            </ul>
          </section>

          {/* Strukturen */}
          <section>
            <h2 style={{ fontSize: "1rem" }}>
              Strukturen bei „MINT Zukunft schaffen!“
            </h2>
            <p>
              Die Arbeit von „MINT Zukunft schaffen!“ wird durch Gremien,
              Community und Arbeitsgruppen getragen:
            </p>
            <ul>
              <li>
                <strong>Verein / Gremien (G):</strong> Mitgliederversammlung,
                Vorstand, Kuratorium, Geschäftsstelle.
              </li>
              <li>
                <strong>Community (C):</strong> Förderer, Vereinsmitglieder,
                Kurator:innen, MINT-Botschafter:innen.
              </li>
              <li>
                <strong>Arbeitsgruppen (AG):</strong> Partner der Ehrung
                „MINT-freundliche Schule“, Projektgruppe „Digitale Schule“,
                MINT-Botschafternetzwerk inkl. HUBs, AG Social Media,
                One2Ones mit Kurator:innen, Fach- und Wissensgesellschaften
                sowie Nutzung des Arbeitstools „Mattermost“.
              </li>
            </ul>
            <p style={{ fontSize: "0.8rem", marginTop: "0.75rem" }}>
              (G) Gremien sind per Satzung vorgegeben. (C) Community meint die
              einzelnen Menschen, die in Gremien, Arbeitsgruppen oder eigenständig
              für „MINT Zukunft schaffen!“ wirken. (AG) bezeichnet
              Zusammenfassungen von Community-Mitgliedern in Arbeitsgruppen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
