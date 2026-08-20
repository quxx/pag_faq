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

const revealElements = document.querySelectorAll(".pag-note, .faq-intro, .faq-section");

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

const sticker = document.querySelector(".sticker");
const stickerTilt = document.querySelector(".sticker-tilt");
const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (sticker && stickerTilt && precisePointer.matches && !reducedMotion.matches) {
  let animationFrame;

  sticker.addEventListener("pointermove", (event) => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      const bounds = sticker.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
      const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

      stickerTilt.style.setProperty("--tilt-x", `${vertical * -8}deg`);
      stickerTilt.style.setProperty("--tilt-y", `${horizontal * 8}deg`);
      stickerTilt.style.setProperty("--tilt-scale", "1.025");
    });
  });

  sticker.addEventListener("pointerleave", () => {
    cancelAnimationFrame(animationFrame);
    stickerTilt.style.removeProperty("--tilt-x");
    stickerTilt.style.removeProperty("--tilt-y");
    stickerTilt.style.removeProperty("--tilt-scale");
  });
}

if (sticker && stickerTilt && !reducedMotion.matches && "DeviceMotionEvent" in window) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  let lastMotion;
  let lastShakeAt = 0;
  let resetShakeTimer;
  let permissionRequested = false;

  const resetShake = () => {
    sticker.classList.remove("is-device-shaking");
    stickerTilt.style.removeProperty("--shake-x");
    stickerTilt.style.removeProperty("--shake-y");
    stickerTilt.style.removeProperty("--shake-rotate");
    stickerTilt.style.removeProperty("--flummy-x");
    stickerTilt.style.removeProperty("--flummy-x-rebound");
    stickerTilt.style.removeProperty("--flummy-x-hop");
    stickerTilt.style.removeProperty("--flummy-x-settle");
    stickerTilt.style.removeProperty("--flummy-x-last");
    stickerTilt.style.removeProperty("--flummy-rotate");
    stickerTilt.style.removeProperty("--flummy-rotate-rebound");
    stickerTilt.style.removeProperty("--flummy-rotate-hop");
    stickerTilt.style.removeProperty("--flummy-rotate-settle");
    stickerTilt.style.removeProperty("--flummy-rotate-last");
  };

  const handleDeviceMotion = (event) => {
    const acceleration = event.accelerationIncludingGravity || event.acceleration;
    if (!acceleration) return;

    const motion = {
      x: acceleration.x || 0,
      y: acceleration.y || 0,
      z: acceleration.z || 0,
    };

    if (!lastMotion) {
      lastMotion = motion;
      return;
    }

    const delta = {
      x: motion.x - lastMotion.x,
      y: motion.y - lastMotion.y,
      z: motion.z - lastMotion.z,
    };
    lastMotion = motion;

    const shakeStrength = Math.abs(delta.x) + Math.abs(delta.y) + Math.abs(delta.z);
    const now = performance.now();
    if (shakeStrength < 16 || now - lastShakeAt < 260) return;

    lastShakeAt = now;
    const direction = delta.x >= 0 ? 1 : -1;
    const bounceDistance = clamp(shakeStrength * 3.3, 54, 108) * direction;
    const bounceRotation = clamp((shakeStrength * 0.9 + Math.abs(delta.x) * 2) * direction, -38, 38);

    sticker.classList.remove("is-device-shaking");
    void stickerTilt.offsetWidth;
    stickerTilt.style.setProperty("--flummy-x", `${bounceDistance}px`);
    stickerTilt.style.setProperty("--flummy-x-rebound", `${bounceDistance * -0.72}px`);
    stickerTilt.style.setProperty("--flummy-x-hop", `${bounceDistance * 0.44}px`);
    stickerTilt.style.setProperty("--flummy-x-settle", `${bounceDistance * -0.22}px`);
    stickerTilt.style.setProperty("--flummy-x-last", `${bounceDistance * 0.08}px`);
    stickerTilt.style.setProperty("--flummy-rotate", `${bounceRotation}deg`);
    stickerTilt.style.setProperty("--flummy-rotate-rebound", `${bounceRotation * -0.68}deg`);
    stickerTilt.style.setProperty("--flummy-rotate-hop", `${bounceRotation * 0.48}deg`);
    stickerTilt.style.setProperty("--flummy-rotate-settle", `${bounceRotation * -0.24}deg`);
    stickerTilt.style.setProperty("--flummy-rotate-last", `${bounceRotation * 0.1}deg`);
    sticker.classList.add("is-device-shaking");

    clearTimeout(resetShakeTimer);
    resetShakeTimer = setTimeout(resetShake, 720);
  };

  const enableShake = async () => {
    if (permissionRequested) return;
    permissionRequested = true;

    try {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== "granted") return;
      }

      window.addEventListener("devicemotion", handleDeviceMotion);
    } catch {
      permissionRequested = false;
    }
  };

  enableShake();
  document.addEventListener("pointerdown", enableShake, { once: true });
}

const countdown = document.querySelector("[data-countdown]");

if (countdown) {
  const targetTime = new Date(countdown.dataset.countdown).getTime();
  const values = countdown.querySelector(".countdown-values");
  const liveMessage = countdown.querySelector("[data-countdown-live]");
  const fields = {
    days: countdown.querySelector("[data-days]"),
    hours: countdown.querySelector("[data-hours]"),
    minutes: countdown.querySelector("[data-minutes]"),
    seconds: countdown.querySelector("[data-seconds]"),
  };

  let countdownTimer;
  const updateCountdown = () => {
    const remaining = targetTime - Date.now();

    if (remaining <= 0) {
      values.hidden = true;
      liveMessage.hidden = false;
      countdown.classList.add("is-live");
      clearInterval(countdownTimer);
      return false;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    fields.days.textContent = String(days).padStart(2, "0");
    fields.hours.textContent = String(hours).padStart(2, "0");
    fields.minutes.textContent = String(minutes).padStart(2, "0");
    fields.seconds.textContent = String(seconds).padStart(2, "0");
    countdown.setAttribute(
      "aria-label",
      `Noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten und ${seconds} Sekunden bis zur PAG.`,
    );
    return true;
  };

  if (updateCountdown()) {
    countdownTimer = setInterval(updateCountdown, 1000);
  }
}

const weatherWidget = document.querySelector("[data-weather-widget]");

if (weatherWidget) {
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.search = new URLSearchParams({
    latitude: "51.7772",
    longitude: "14.0295",
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "Europe/Berlin",
    forecast_days: "7",
  });

  const weatherText = new Map([
    [0, "Sonnig"],
    [1, "Meist klar"],
    [2, "Wolkig"],
    [3, "Bedeckt"],
    [45, "Nebel"],
    [48, "Nebel"],
    [51, "Niesel"],
    [53, "Niesel"],
    [55, "Niesel"],
    [56, "Glatteis"],
    [57, "Glatteis"],
    [61, "Regen"],
    [63, "Regen"],
    [65, "Starkregen"],
    [66, "Eisregen"],
    [67, "Eisregen"],
    [71, "Schnee"],
    [73, "Schnee"],
    [75, "Schnee"],
    [77, "Schnee"],
    [80, "Schauer"],
    [81, "Schauer"],
    [82, "Starke Schauer"],
    [85, "Schneeschauer"],
    [86, "Schneeschauer"],
    [95, "Gewitter"],
    [96, "Gewitter"],
    [99, "Gewitter"],
  ]);

  const formatDay = new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    timeZone: "Europe/Berlin",
  });
  const weatherTemperature = weatherWidget.querySelector("[data-weather-temp]");
  const weatherSummary = weatherWidget.querySelector("[data-weather-summary]");
  const weatherDays = weatherWidget.querySelector("[data-weather-days]");
  const pagDates = new Set(["2026-08-21", "2026-08-22", "2026-08-23"]);
  const describeWeather = (code) => weatherText.get(code) || "Wetter";

  fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Wetterdaten nicht erreichbar.");
      return response.json();
    })
    .then((data) => {
      const current = data.current;
      const daily = data.daily;
      const dailyDates = daily?.time || [];
      const selectedDays = dailyDates
        .map((date, index) => ({ date, index }))
        .filter(({ date }) => pagDates.has(date))
        .slice(0, 3);

      if (!current || selectedDays.length === 0) {
        throw new Error("Wetterdaten unvollständig.");
      }

      weatherTemperature.textContent = `${Math.round(current.temperature_2m)}°`;
      weatherSummary.textContent = describeWeather(current.weather_code);
      weatherDays.replaceChildren(
        ...selectedDays.map(({ date, index }) => {
          const day = document.createElement("span");
          const max = Math.round(daily.temperature_2m_max[index]);
          const min = Math.round(daily.temperature_2m_min[index]);
          day.innerHTML = `${formatDay.format(new Date(`${date}T12:00:00+02:00`))}<strong>${max}°/${min}°</strong>`;
          return day;
        }),
      );
    })
    .catch(() => {
      weatherTemperature.textContent = "--°";
      weatherSummary.textContent = "Nicht verfügbar";
      weatherDays.replaceChildren();
    });
}
