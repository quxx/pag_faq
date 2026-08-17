// Hier könnt ihr Fragen, Antworten und ganze Bereiche selbst ändern.
// Neue Einträge brauchen nur "question" und "answer".
//
// Optionaler Link unter einer Antwort:
// links: [
//   { label: "Zur Packliste", href: "/packliste.pdf" },
// ]
//
// Formatiertes HTML statt "answer":
// answerHtml: `
//   <p>Mehr Infos gibt es <a href="https://example.com">hier</a>.</p>
// `
//
// Erlaubte HTML-Elemente:
// <p>, <br>, <strong>, <em>, <a>, <ul>, <ol>, <li> und <code>
export const faqGroups = [
  {
    title: "Anreise & Ort",
    kicker: "Hin und wieder weg",
    items: [
      {
        question: "Wo findet die PAG statt?",
        answerHtml: `
          <p><a href="https://maps.app.goo.gl/bNxtLkyceHF2axYd9">In Koßwig am Sportplatz.</a></p>
        `,
      },
      {
        question: "Wann kann ich anreisen?",
        answerHtml: `
          <p>
          Wann du möchtest!<br><br>

          Unser legendärer Shuttle-Service vom Bahnhof Calau fährt zu folgenden Zeiten:<br>
          <strong>Freitag:</strong> 11:45 Uhr & 18:45 Uhr<br>
          <strong>Samstag:</strong> 12:45 Uhr<br>
          <strong>Sonntag:</strong> 14:45 Uhr<br><br>

          Für weitere Mitfahrgelegenheiten könnt ihr euch einfach in der WhatsApp-Gruppe austauschen.
        </p>`,
      },
      {
        question: "Gibt es Parkplätze oder Fahrgemeinschaften?",
        answer:
          "Parkplätze gibt es vor Ort. Für Fahrgemeinschaften findet euch in der WhatsApp-Gruppe zusammen.",
      },
    ],
  },
  {
    title: "Schlafen & Gelände",
    kicker: "Basecamp",
    items: [
      {
        question: "Kann ich vor Ort übernachten?",
        answer:
          "Natürlich! Du kannst dein Zelt ganz einfach auf dem Sportplatz aufstellen. Auch für Camper ist dort ausreichend Platz vorhanden.",
      },
      {
        question: "Gibt es Duschen und Toiletten?",
        answer:
          "Es wird eine Außendusche geben. Toiletten sind natürlich ebenfalls vorhanden.",
      },
      {
        question: "Gibt es auf dem Campingplatz Strom?",
        answer:
          "Wir empfehlen euch unbedingt, eine Powerbank mitzubringen. Auf dem Campingplatz gibt es keine Möglichkeit zum Aufladen.",
      },
      {
        question: "Was sollte ich unbedingt mitbringen?",
        answer:
          "Alles, was du fürs Camping brauchst, sowie eine kleine Grundausstattung an Essen und Snacks für zwischendurch.",
      },
    ],
  },
  {
    title: "Essen & Getränke",
    kicker: "Energieversorgung",
    items: [
      {
        question: "Gibt es Essen vor Ort?",
        answerHtml: `
          <p>
            Am Freitag wird gegrillt. Bitte bring alles, was du auf dem Grill haben möchtest, selbst mit. Holzkohlegrills, Teller und Besteck stellen wir bereit.<br><br>

            Am Samstagmittag geht es um 11:30 Uhr zu
            <a href="https://www.spreewaldbauer-ricken.de/de/mittagstisch/mittagstisch.html">Bauer Ricken</a>
            – bitte denkt daran, Bargeld mitzubringen. Am Abend wartet dann ein großes Pizza-Buffet (inkl. Vegetarische und Vegane Optionen) auf euch.<br><br>

            Für zwischendurch stehen ein paar Snacks bereit. Pack dir trotzdem am besten noch ein paar Kleinigkeiten für den kleinen Hunger ein.
          </p>
          `,
      },
      {
        question: "Welche Getränke gibt es?",
        answerHtml: `
        <p>Wir stellen folgende Getränke bereit:</p>

          <ul>
            <li>Bier</li>
            <li>Weißwein & Sekt</li>
            <li>Wasser</li>
            <li>Cola & Sprite</li>
            <li>Ein paar Kurze</li>
            <li>Kaffee, Kuh- und Hafermilch</li>
          </ul>

          <p>
            Wenn du noch andere Getränke möchtest, bring sie dir bitte selbst mit.
          </p>
          `,
      },
      {
        question: "Muss ich Becher oder Geschirr mitbringen?",
        answerHtml: `<p> Wir haben eine Grundausstattung an <strong>Papptellern, Bechern sowie Holzbesteck</strong> (Messer & Gabel) vor Ort. Wenn alle verantwortungsvoll damit umgehen, musst du nichts Weiteres mitbringen. </p>
          `,
      },
    ],
  },
  {
    title: "Musik & Ablauf",
    kicker: "Laut und lange",
    items: [
      {
        question: "Gehen wir auch baden?",
        answer:
          "Ja! Am Samstag gehen wir gemeinsam zum Bischdorfer See. Pack deshalb unbedingt Badesachen und ein Handtuch ein.",
      },
      {
        question: "Wann kommt das Line-up?",
        answer:
          "Das bleibt bis zur letzten Minute unser kleines Geheimnis. Lasst euch überraschen! :)",
      },
      {
        question: "Was passiert bei schlechtem Wetter?",
        answer: "Es gibt kein schlechtes Wetter!",
      },
    ],
  },
  {
    title: "Auf- & Abbau",
    kicker: "Helfende Hände",
    items: [
      {
        question: "Wann beginnt der Aufbau?",
        answer:
          "Wir starten am Freitag ab 11:00 Uhr mit dem Aufbau. Wer Zeit und Lust hat, darf gerne schon etwas früher vorbeikommen und mit anpacken.",
      },
      {
        question: "Werden beim Abbau Helfer gebraucht?",
        answer:
          "Ja, unbedingt! Am Sonntag freuen wir uns über jede helfende Hand. In den letzten Jahren hat der Abbau leider nicht immer ganz so gut geklappt – deshalb wäre es super, wenn diesmal möglichst viele noch kurz mit anpacken, bevor es nach Hause geht. Gemeinsam sind wir deutlich schneller fertig! 🙌",
      },
    ],
  },
  {
    title: "Regeln & Kontakt",
    kicker: "Fair bleiben",
    items: [
      {
        question: "Darf ich Konfetti mitbringen?",
        answer:
          "Konfetti lässt sich nur sehr schwer aus der Natur entfernen. Bitte verzichtet daher auf darauf.",
      },
      {
        question: "Was gilt für Umwelt & Natur?",
        answer:
          "Bitte respektiert Natur und Umwelt auf dem Festivalgelände, auf dem Campingplatz und in der Umgebung. Das bedeutet: keinen Müll, Flaschen oder Zigaretten in den Wald, auf die Wiese oder auf den Gehweg werfen.",
      },
      {
        question: "Darf ich weitere Personen mitbringen?",
        answer: "Bitte melde dich zuerst bei einem der Organisatoren!",
      },
      {
        question: "Welche Regeln gelten auf dem Gelände?",
        answer:
          "Das Festival ist eine private Veranstaltung und wir müssen das Gelände anschließend selbst wieder aufräumen. Achtet deshalb bitte auf eure Umgebung, lasst keinen Müll liegen und behandelt das Gelände so, als wäre es euer eigenes. Wenn jeder mitdenkt, haben wir hinterher deutlich weniger Arbeit.",
      },
      {
        question: "Wen kann ich bei Fragen oder im Notfall erreichen?",
        answer:
          "Melde dich in der WhatsApp Gruppe oder schreibe einen der Orga-Leute direkt an.",
      },
    ],
  },
];
