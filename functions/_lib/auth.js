const encoder = new TextEncoder();
const COOKIE_NAME = "pag_session";
const SESSION_PAYLOAD = "pag-2026-authenticated";

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(left, right) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return bytesToHex(
    await crypto.subtle.sign("HMAC", key, encoder.encode(value)),
  );
}

export function readCookie(request, name) {
  const cookies = request.headers.get("Cookie") || "";
  const entry = cookies
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));
  return entry ? entry.slice(name.length + 1) : "";
}

export async function isAuthenticated(request, secret) {
  if (!secret) return false;
  const actual = readCookie(request, COOKIE_NAME);
  const expected = await hmac(SESSION_PAYLOAD, secret);
  return safeEqual(actual, expected);
}

function secureCookieAttribute(requestUrl) {
  const url = new URL(requestUrl);
  return url.protocol === "https:" ? "; Secure" : "";
}

export async function createSessionCookie(secret, requestUrl) {
  const token = await hmac(SESSION_PAYLOAD, secret);
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly${secureCookieAttribute(requestUrl)}; SameSite=Lax; Max-Age=604800`;
}

export function clearSessionCookie(requestUrl) {
  return `${COOKIE_NAME}=; Path=/; HttpOnly${secureCookieAttribute(requestUrl)}; SameSite=Lax; Max-Age=0`;
}

export async function verifyPassword(input, secret) {
  if (!input || !secret) return false;
  const [inputHash, secretHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(input)),
    crypto.subtle.digest("SHA-256", encoder.encode(secret)),
  ]);
  return safeEqual(bytesToHex(inputHash), bytesToHex(secretHash));
}

export function loginPage({ error = false, misconfigured = false } = {}) {
  const notice = misconfigured
    ? "Der Zugang ist noch nicht konfiguriert. Bitte melde dich beim PAG-Team."
    : error
      ? "Das Passwort stimmt leider nicht. Versuch es noch einmal."
      : "Das Passwort findest du in der WhatsApp Gruppe.";

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="theme-color" content="#151517">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>PAG 2026 · Zugang</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;min-height:100svh;display:grid;place-items:center;padding:24px;color:#f4f0e7;background:#151517;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:56px 56px}
    .card{width:min(100%,860px);min-height:580px;display:grid;grid-template-columns:.88fr 1.12fr;border:1px solid rgba(244,240,231,.2);background:#242326;box-shadow:0 35px 90px rgba(0,0,0,.4);overflow:hidden}
    .visual{position:relative;min-width:0;padding:34px;display:flex;flex-direction:column;justify-content:space-between;color:#151517;background:#f25b35;overflow:hidden;isolation:isolate}
    .visual:before{content:"";position:absolute;z-index:-1;width:420px;height:420px;left:-160px;bottom:-230px;border:1px solid rgba(21,21,23,.35);border-radius:50%;box-shadow:0 0 0 55px rgba(255,181,27,.12),0 0 0 110px rgba(21,21,23,.05)}
    .brand{margin:0;font-size:22px;font-weight:850;letter-spacing:-.065em}.brand span{color:#fffdf7}
    .mascot{position:relative;display:block;width:min(31vw,330px);height:auto;margin:auto;filter:drop-shadow(10px 12px 0 #151517);animation:float 5s ease-in-out infinite}
    .visual-meta{margin:0;font-size:10px;font-weight:800;letter-spacing:.14em;line-height:1.55;text-transform:uppercase}
    .access{position:relative;padding:clamp(40px,6vw,70px);display:flex;flex-direction:column;justify-content:center}
    .eyebrow{margin:0 0 23px;display:flex;align-items:center;gap:10px;color:#8d8a84;font-size:10px;font-weight:750;letter-spacing:.16em;text-transform:uppercase}.eyebrow:before{content:"";width:26px;height:2px;background:#f25b35}
    h1{margin:0;font-size:clamp(52px,9vw,82px);font-weight:850;line-height:.88;letter-spacing:-.08em;text-transform:uppercase}
    .notice{margin:27px 0;color:#aaa6a0;line-height:1.6}.error{color:#ffb51b;font-weight:700}
    form{display:grid;gap:12px}label{font-size:10px;font-weight:750;letter-spacing:.12em;text-transform:uppercase}
    input{width:100%;padding:16px;border:1px solid rgba(244,240,231,.28);border-radius:0;color:#f4f0e7;background:#151517;font:inherit}input:focus{outline:3px solid rgba(242,91,53,.3);border-color:#f25b35}
    button{margin-top:5px;padding:16px;border:0;border-radius:0;color:#151517;background:#f25b35;font:inherit;font-size:14px;font-weight:800;cursor:pointer;transition:background 160ms ease,transform 160ms ease}button:hover{background:#ffb51b;transform:translateY(-1px)}
    @keyframes float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-10px) rotate(2deg)}}
    @media(max-width:760px){body{padding:14px}.card{min-height:0;grid-template-columns:1fr}.visual{min-height:285px;padding:24px}.mascot{position:absolute;width:220px;right:12px;top:38px}.access{padding:42px 26px 48px}.visual-meta{margin-top:auto}}
    @media(prefers-reduced-motion:reduce){.mascot{animation:none}}
  </style>
</head>
<body>
  <main class="card">
    <section class="visual" aria-label="PAG 2026">
      <p class="brand">PAG<span>26</span></p>
      <img class="mascot" src="/images/disco-login.png" alt="Tanzende PAG-Diskokugel">
    </section>
    <section class="access">
      <p class="eyebrow">Party am Golf</p>
      <h1>Einlass</h1>
      <p class="notice${error || misconfigured ? " error" : ""}"${error || misconfigured ? ' role="alert"' : ""}>${notice}</p>
      ${misconfigured ? "" : `<form method="post" action="/login"><label for="password">Passwort</label><input id="password" name="password" type="password" required autocomplete="current-password" autofocus><button type="submit">Zur PAG</button></form>`}
    </section>
  </main>
</body>
</html>`;
}
