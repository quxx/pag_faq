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
        answer:
          "Die genaue Adresse und Hinweise zur Anfahrt ergänzen wir hier.",
      },
      {
        question: "Wann kann ich anreisen?",
        answer:
          "Die Anreisezeiten für Freitag und alle Hinweise zur Abreise folgen.",
      },
      {
        question: "Gibt es Parkplätze oder Fahrgemeinschaften?",
        answer:
          "Informationen zu Parkplätzen, ÖPNV und Fahrgemeinschaften folgen.",
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
          "Natürlich, du kannst dein Zelt auf dem Sportplatz aufstellen. Auch für deinen Camper ist dort Platz.",
      },
      {
        question: "Gibt es Duschen und Toiletten?",
        answer: "Es wird eine Außendusche geben. Toiletten sind vorhanden.",
      },
      {
        question: "Was sollte ich unbedingt mitbringen?",
        answer:
          "Alles was du fürs Camping brauchst und eine Grundausrüstung an kleinigkeiten zum essen.",
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
            Am Freitag wird gegrillt. Bitte bring alles, was du dafür brauchst, selbst mit. Holzkohlegrills, Teller und Besteck stehen bereit.<br>
            Am Samstagmittag geht es zu <a href="https://www.spreewaldbauer-ricken.de/de/mittagstisch/mittagstisch.html">Bauer Ricken</a> (bitte Bargeld mitbringen!). Am Abend folgt ein großes Pizza-Buffet.<br>
            Außerdem liegen ein paar Snacks für zwischendurch bereit. Bitte bring dir trotzdem noch ein paar Kleinigkeiten mit!
          </p>
          `,
      },
      {
        question: "Welche Getränke gibt es?",
        answerHtml: `
        <p>Wir stellen folgende Getränke bereit:</p>

          <ul>
            <li>Bier</li>
            <li>Wein & Sekt</li>
            <li>Wasser</li>
            <li>Cola & Sprite</li>
            <li>Ein paar Kurze</li>
            <li>Kaffee & Milch</li>
          </ul>

          <p>
            Wenn du noch andere Getränke möchtest, bring sie dir bitte selbst mit.
          </p>
          `,
      },
      {
        question: "Muss ich Becher oder Geschirr mitbringen?",
        answer: "Informationen zu Mehrwegbechern und Geschirr folgen.",
      },
    ],
  },
  {
    title: "Musik & Ablauf",
    kicker: "Laut und lange",
    items: [
      {
        question: "Wann kommt das Line-up?",
        answer:
          "Line-up und Timetable veröffentlichen wir hier, sobald alles feststeht.",
      },
      {
        question: "Was passiert bei schlechtem Wetter?",
        answer:
          "Unseren Regenplan und passende Ausrüstungstipps ergänzen wir noch.",
      },
    ],
  },
  {
    title: "Regeln & Kontakt",
    kicker: "Fair bleiben",
    items: [
      {
        question: "Darf ich weitere Personen mitbringen?",
        answer:
          "Die PAG ist privat. Informationen zu zusätzlichen Gästen ergänzen wir hier.",
      },
      {
        question: "Welche Regeln gelten auf dem Gelände?",
        answer:
          "Regeln zu Glas, Müll, Tieren und gegenseitiger Rücksicht folgen.",
      },
      {
        question: "Wen kann ich bei Fragen oder im Notfall erreichen?",
        answer: "Kontaktperson und Telefonnummer werden rechtzeitig ergänzt.",
      },
    ],
  },
];
