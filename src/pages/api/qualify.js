/**
 * POST /api/qualify — asks a small OpenAI model whether an intake submission is a
 * genuine request for Greg's services. The V2 form calls this AFTER /api/contact
 * succeeds and shows the booking calendar only on `qualified: true`.
 *
 * Cost / abuse protection (the key is server-side only — it never reaches a browser):
 *   - requires the HMAC token /api/contact issues after a real Slack post (5-min TTL,
 *     bound to the email) → direct calls to this route never reach OpenAI
 *   - input capped at 4,000 chars, minimal reasoning, cheapest suitable model
 *   - fails CLOSED: any problem → not qualified → plain thank-you. Slack already has
 *     the submission, so nothing is lost.
 *
 * Env (Cloudflare Pages → Settings → Environment variables; locally `.dev.vars`):
 *   OPENAI_API_KEY   the "form review bot" key
 *   QUALIFY_SECRET   any long random string (shared with /api/contact)
 *   OPENAI_MODEL     optional, default gpt-5-nano (cheapest; set gpt-5-mini if nano misreads)
 */
import { verifyToken } from "../../lib/qualify-token.js";

export const prerender = false;

const SYSTEM = `You screen inbound contact-form submissions for Greg Toler, an independent operator
(GT Strategies) who takes on consulting and build work for businesses across go-to-market
and operations: fixing broken processes and revenue/pipeline problems, building internal
tools, automations, AI systems and custom software, designing SOPs and systems that scale,
fractional/embedded operations leadership, and ongoing operational support.

Run three checks and be strict but fair:
1. name — looks like a real person's name (not gibberish, a handle, a company, or a placeholder).
2. email — looks like a real person's work address at a plausible business domain (not
   a throwaway, a test address, or a domain that reads as made-up for this form).
3. message — a genuine, substantive request for the kind of help described above from a
   real business or person, with enough detail to act on. Fail it for: spam, SEO/link or
   vendor pitches, recruiting or job offers, test or gibberish text, requests clearly
   outside these services (personal tech support, legal/medical questions, etc.).

qualified is true ONLY if all three pass.
Respond with ONLY this JSON, nothing else:
{"qualified": true|false, "checks": {"name": true|false, "email": true|false, "message": true|false}, "reason": "<one short sentence>"}`;

export async function POST({ request, locals }) {
  const env = locals?.runtime?.env ?? {};
  const apiKey = env.OPENAI_API_KEY ?? import.meta.env.OPENAI_API_KEY;
  const secret = env.QUALIFY_SECRET ?? import.meta.env.QUALIFY_SECRET;
  const model = env.OPENAI_MODEL ?? import.meta.env.OPENAI_MODEL ?? "gpt-5-nano";
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  try {
    if (Number(request.headers.get("content-length") || 0) > 16_000) return json({ qualified: false, reason: "too large" }, 413);
    const { token, situation, involvement, message, name, email, linkedin } = await request.json();

    if (!(await verifyToken(secret, token, email))) return json({ qualified: false, reason: "unauthorised" }, 401);
    if (!apiKey) return json({ qualified: false, reason: "screening unavailable" });
    const text = String(message || "").slice(0, 4000);
    if (text.trim().length < 40) return json({ qualified: false, reason: "too short" });

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12_000);
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        // gpt-5 family reasons before it answers; "minimal" keeps that near zero and the
        // cap leaves room for it — the visible output is ~40 tokens of JSON either way
        reasoning_effort: "minimal",
        max_completion_tokens: 600,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content:
              `Situation: ${String(situation || "(not set)").slice(0, 200)}\n` +
              `Touches: ${String(involvement || "(none)").slice(0, 300)}\n` +
              `Name: ${String(name || "").slice(0, 100)}\nEmail: ${String(email || "").slice(0, 200)}\n` +
              `LinkedIn: ${String(linkedin || "").slice(0, 200)}\n\nMessage:\n${text}`,
          },
        ],
      }),
    }).finally(() => clearTimeout(timer));

    if (!res.ok) {
      console.error("qualify: OpenAI", res.status);
      return json({ qualified: false, reason: "screening error" });
    }
    const data = await res.json();
    const choice = data?.choices?.[0];
    let parsed = {};
    try { parsed = JSON.parse(choice?.message?.content || "{}"); } catch {}
    if (typeof parsed.qualified !== "boolean") {
      console.error("qualify: unparseable", choice?.finish_reason, JSON.stringify(choice?.message?.content || "").slice(0, 200));
      return json({ qualified: false, reason: "unparseable" });
    }
    const c = parsed.checks || {};
    const checks = { name: c.name === true, email: c.email === true, message: c.message === true };
    const qualified = parsed.qualified && checks.name && checks.email && checks.message;
    return json({ qualified, checks, reason: String(parsed.reason || "").slice(0, 200) });
  } catch (err) {
    console.error("qualify error:", err?.message ?? err);
    return json({ qualified: false, reason: "screening error" });
  }
}
