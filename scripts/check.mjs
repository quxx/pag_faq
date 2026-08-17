import { access } from "node:fs/promises";
import { faqGroups } from "../public/data/faqs.js";

const requiredFiles = [
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "public/favicon.svg",
  "public/robots.txt",
  "public/images/pag-2026.jpg",
  "public/images/pag-2026-round.png",
  "public/images/disco-login.png",
];
await Promise.all(requiredFiles.map((file) => access(file)));

if (!Array.isArray(faqGroups) || faqGroups.length === 0) {
  throw new Error("Die FAQ-Datei muss mindestens einen Bereich enthalten.");
}

for (const group of faqGroups) {
  if (!group.title || !group.kicker || !Array.isArray(group.items)) {
    throw new Error("Jeder FAQ-Bereich braucht title, kicker und items.");
  }
  for (const item of group.items) {
    if (!item.question || (!item.answer && !item.answerHtml)) {
      throw new Error(`Ungültiger FAQ-Eintrag in \"${group.title}\".`);
    }
    if (item.links && !Array.isArray(item.links)) {
      throw new Error(`"links" muss in "${item.question}" eine Liste sein.`);
    }
  }
}

console.log(`HTML/JS-Seite geprüft: ${faqGroups.length} FAQ-Bereiche.`);
