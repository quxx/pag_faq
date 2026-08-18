import { createSessionCookie, loginPage, verifyPassword } from "./_lib/auth.js";

export async function onRequestGet(context) {
  return new Response(loginPage({ misconfigured: !context.env.PAG_PASSWORD }), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const password = String(formData.get("password") || "");

  if (await verifyPassword(password, context.env.PAG_PASSWORD)) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/",
        "Set-Cookie": await createSessionCookie(context.env.PAG_PASSWORD, context.request.url),
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(loginPage({ error: true }), {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
