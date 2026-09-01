// Proof-of-submission token: /api/contact signs one after a real submission reached
// Slack; /api/qualify only calls the model when it gets a valid, fresh one back.
// Stateless HMAC-SHA256 via Web Crypto (runs on Cloudflare Workers and Node).
// Secret: QUALIFY_SECRET env (any long random string). No secret → no tokens → no calls.
const enc = new TextEncoder();
const TTL_MS = 5 * 60 * 1000;

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function signToken(secret, email) {
  if (!secret) return null;
  const ts = Date.now().toString();
  return `${ts}.${await hmac(secret, `${ts}|${String(email).trim().toLowerCase()}`)}`;
}

export async function verifyToken(secret, token, email) {
  if (!secret || !token || !email) return false;
  const [ts, sig] = String(token).split(".");
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;
  if (Math.abs(Date.now() - Number(ts)) > TTL_MS) return false;
  const expected = await hmac(secret, `${ts}|${String(email).trim().toLowerCase()}`);
  if (expected.length !== sig.length) return false;
  let diff = 0;                                  // constant-time compare
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
