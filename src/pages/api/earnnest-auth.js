import { COOKIE, readConfig, roleForPassword, signRole } from "../../lib/earnnest-auth.js";

export const prerender = false;

// The lock page on /earnnest posts here. Right password → signed role cookie →
// back to the deck. Wrong → back to the lock page with ?wrong.
export async function POST({ request, locals, cookies, redirect }) {
  const cfg = readConfig(locals?.runtime?.env ?? {});
  if (!cfg.locked) return redirect("/earnnest", 303);
  if (!cfg.secret) return new Response("EARNNEST_SECRET (or QUALIFY_SECRET) is not set", { status: 500 });

  const form = await request.formData();
  const role = roleForPassword(cfg, form.get("password"));
  if (!role) return redirect("/earnnest?wrong", 303);

  cookies.set(COOKIE, await signRole(cfg.secret, role), {
    path: "/", httpOnly: true, sameSite: "lax", secure: import.meta.env.PROD, maxAge: 30 * 24 * 60 * 60,
  });
  return redirect("/earnnest", 303);
}

// /api/earnnest-auth?out clears the cookie.
export async function GET({ cookies, redirect }) {
  cookies.delete(COOKIE, { path: "/" });
  return redirect("/earnnest", 303);
}
