import { faqGroups } from "./data/faqs.js";

const container = document.querySelector("#faq-container");
const allowedHtmlTags = new Set(["A", "BR", "CODE", "EM", "LI", "OL", "P", "STRONG", "UL"]);

function configureLink(anchor, href) {
  try {
    const url = new URL(href, window.location.origin);
    if (!["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) return false;
    anchor.setAttribute("href", href);
    if (url.origin !== window.location.origin && ["http:", "https:"].includes(url.protocol)) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
    return true;
  } catch {
    return false;
  }
}

function sanitizeHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;

  [...template.content.querySelectorAll("*")].forEach((element) => {
    if (!allowedHtmlTags.has(element.tagName)) {
      element.replaceWith(document.createTextNode(element.textContent || ""));
      return;
    }

    const href = element.tagName === "A" ? element.getAttribute("href") : null;
    [...element.attributes].forEach((attribute) => element.removeAttribute(attribute.name));

    if (href) configureLink(element, href);
  });

  return template.content;
}

function appendAnswerContent(answer, item) {
  if (item.answerHtml) {
    answer.append(sanitizeHtml(item.answerHtml));
  } else {
    const answerText = document.createElement("p");
    answerText.textContent = item.answer;
    answer.append(answerText);
  }

  if (!item.links?.length) return;
  const linkList = document.createElement("ul");
  linkList.className = "faq-links";

  item.links.forEach((link) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = link.label;
    if (!configureLink(anchor, link.href)) return;
    listItem.append(anchor);
    linkList.append(listItem);
  });

  answer.append(linkList);
}

function createFaqItem(item) {
  const details = document.createElement("details");
  details.className = "faq-item";

  const summary = document.createElement("summary");
  const question = document.createElement("span");
  const icon = document.createElement("span");
  question.textContent = item.question;
  icon.className = "faq-icon";
  icon.setAttribute("aria-hidden", "true");
  summary.append(question, icon);

  const answer = document.createElement("div");
  answer.className = "faq-answer";
  appendAnswerContent(answer, item);
  details.append(summary, answer);
  return details;
}

faqGroups.forEach((group, index) => {
  const section = document.createElement("section");
  const heading = document.createElement("header");
  const number = document.createElement("span");
  const headingText = document.createElement("div");
  const kicker = document.createElement("p");
  const title = document.createElement("h2");
  const list = document.createElement("div");
  const headingId = `group-${index}`;

  section.className = "faq-section";
  section.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
  section.setAttribute("aria-labelledby", headingId);
  heading.className = "section-heading";
  number.className = "section-number";
  number.setAttribute("aria-hidden", "true");
  number.textContent = String(index + 1).padStart(2, "0");
  kicker.textContent = group.kicker;
  title.id = headingId;
  title.textContent = group.title;
  list.className = "faq-list";

  headingText.append(kicker, title);
  heading.append(number, headingText);
  group.items.forEach((item) => list.append(createFaqItem(item)));
  section.append(heading, list);
  container.append(section);
});

const revealElements = document.querySelectorAll(".faq-intro, .faq-section");

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("has-motion");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8%" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
