import { isAuthenticated, loginPage } from "./_lib/auth.js";

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (
    url.pathname === "/login" ||
    url.pathname === "/logout" ||
    url.pathname === "/robots.txt" ||
    url.pathname === "/images/disco-login.png"
  ) {
    return context.next();
  }

  if (await isAuthenticated(context.request, context.env.PAG_PASSWORD)) {
    return context.next();
  }

  return new Response(
    loginPage({ misconfigured: !context.env.PAG_PASSWORD }),
    {
      status: 401,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
