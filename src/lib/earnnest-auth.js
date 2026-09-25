// Two-password gate for /earnnest. A viewer password shows the deck; an admin
// password also shows the notes button and the presenter view. The role rides in
// an HttpOnly cookie signed with HMAC-SHA256 (Web Crypto, so it runs on Cloudflare
// Workers and Node). No passwords configured → the route is open (local dev).
//
// Env: EARNNEST_VIEW_PASSWORD, EARNNEST_ADMIN_PASSWORD, EARNNEST_SECRET (falls back
// to QUALIFY_SECRET). Set them in Cloudflare Pages → Settings → Environment variables.
const enc = new TextEncoder();
export const COOKIE = "earnnest_role";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function same(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function readConfig(env = {}) {
  const pick = (k) => env[k] ?? import.meta.env[k];
  const view = pick("EARNNEST_VIEW_PASSWORD"), admin = pick("EARNNEST_ADMIN_PASSWORD");
  const secret = pick("EARNNEST_SECRET") ?? pick("QUALIFY_SECRET");
  return { view, admin, secret, locked: !!(view || admin) };
}

// Which role a password unlocks, or null.
export function roleForPassword(cfg, password) {
  const p = String(password ?? "");
  if (cfg.admin && same(p, cfg.admin)) return "admin";
  if (cfg.view && same(p, cfg.view)) return "viewer";
  return null;
}

export async function signRole(secret, role) {
  const ts = Date.now().toString();
  return `${role}.${ts}.${await hmac(secret, `${role}|${ts}`)}`;
}

export async function roleFromCookie(secret, value) {
  if (!secret || !value) return null;
  const [role, ts, sig] = String(value).split(".");
  if (!["admin", "viewer"].includes(role) || !/^\d+$/.test(ts || "") || !sig) return null;
  if (Date.now() - Number(ts) > TTL_MS) return null;
  return same(await hmac(secret, `${role}|${ts}`), sig) ? role : null;
}
