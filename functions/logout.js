import { clearSessionCookie } from "./_lib/auth.js";

export function onRequest(context) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/login",
      "Set-Cookie": clearSessionCookie(context.request.url),
      "Cache-Control": "no-store",
    },
  });
}
