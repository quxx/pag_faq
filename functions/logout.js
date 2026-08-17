import { clearSessionCookie } from "./_lib/auth.js";

export function onRequest() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/login",
      "Set-Cookie": clearSessionCookie(),
      "Cache-Control": "no-store",
    },
  });
}
