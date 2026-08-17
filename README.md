# PAG 2026 FAQ

Passwortgeschützte FAQ-Seite für **Party am Golf**, 21.–23. August 2026. Die
Seite besteht nur aus HTML, CSS und JavaScript – ohne Astro oder React.

## Inhalte ändern

- Fragen und Antworten: `public/data/faqs.js`
- Allgemeine Seitentexte: `public/index.html`
- Design: `public/styles.css`

Ein FAQ-Eintrag sieht so aus:

```js
{
  question: "Eine Frage?",
  answer: "Die passende Antwort.",
}
```

Links können direkt ergänzt werden:

```js
{
  question: "Wo finde ich die Packliste?",
  answer: "Hier könnt ihr sie öffnen:",
  links: [
    { label: "Packliste", href: "/packliste.pdf" },
  ],
}
```

Für Absätze, Listen oder Links innerhalb der Antwort kann alternativ
`answerHtml` verwendet werden:

```js
{
  question: "Was muss ich beachten?",
  answerHtml: `<p>Bitte lest unsere <a href="/regeln.pdf">Regeln</a>.</p>`,
}
```

Erlaubte HTML-Elemente sind `p`, `br`, `strong`, `em`, `a`, `ul`, `ol`, `li`
und `code`. Andere Elemente und Attribute werden entfernt.

## Lokal starten

```sh
npm install
npm run dev
```

Für den lokalen Passwortschutz `.dev.vars.example` als `.dev.vars` kopieren und
dort ein Testpasswort eintragen. Danach ist die Seite normalerweise unter
`http://localhost:8788` erreichbar.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `public`
- Root directory: `/`

Unter **Workers & Pages → Projekt → Settings → Variables and Secrets** ein
verschlüsseltes Secret namens `PAG_PASSWORD` anlegen. Das echte Passwort gehört
nicht in dieses Repository.

Eine eigene Domain kann später in den Projekteinstellungen ergänzt werden; am
Code muss dafür nichts geändert werden.
