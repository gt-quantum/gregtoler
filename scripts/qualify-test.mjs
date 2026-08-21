// Fires sample submissions at the local /api/qualify with a valid signed token and
// prints the verdicts. Usage (dev server running):  node scripts/qualify-test.mjs
// Reads OPENAI_API_KEY / QUALIFY_SECRET from .env. Each call costs a fraction of a cent.
import { readFileSync } from "node:fs";
import { signToken } from "../src/lib/qualify-token.js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }),
);
const BASE = process.env.BASE || "http://localhost:4321";
if (!env.QUALIFY_SECRET) { console.error("QUALIFY_SECRET is empty in .env"); process.exit(1); }
if (!env.OPENAI_API_KEY) console.warn("OPENAI_API_KEY is empty in .env — every verdict will be 'screening unavailable'");

const samples = [
  { tag: "REAL — ops problem", name: "Dana Whitfield", email: "dana@northpeakroofing.com",
    situation: "Something's broken or inefficient", involvement: "Process / workflow, Technology / tools",
    message: "We're a 40-person roofing company. Leads come in from three places and get hand-typed into a spreadsheet, then into JobNimbus. Reps miss follow-ups and we can't tell which channel actually closes. Want the intake and handoff fixed and ideally automated." },
  { tag: "REAL — build request", name: "Marcus Lee", email: "marcus.lee@certifid.com",
    situation: "I need something built", involvement: "AI / automation, Data / reporting",
    message: "Ops team spends ~10 hrs/week compiling a weekly pipeline report from HubSpot and two Google Sheets. Looking for someone to build an automated version and clean up the underlying data model so it stays accurate." },
  { tag: "SPAM — SEO pitch", name: "Alex", email: "alex@rankboost-digital.com",
    situation: "I need something built", involvement: "Technology / tools",
    message: "Hi, I noticed your website could rank higher on Google. We offer guaranteed first-page results with our proven SEO package. Reply for a free audit and special pricing this month!" },
  { tag: "JUNK — gibberish name + thin", name: "asdf qwer", email: "test@examplecorp.com",
    situation: "Not sure yet — something needs to change", involvement: "Process / workflow",
    message: "just testing this form out to see what happens when i type some stuff here ok thanks bye" },
  { tag: "OFF-TOPIC — personal tech support", name: "Linda Park", email: "linda.park@bellworthlaw.com",
    situation: "Something's broken or inefficient", involvement: "Technology / tools",
    message: "My home printer stopped connecting to wifi after the last update and my daughter's laptop won't see it either. Can you come out and fix it this week?" },
  { tag: "RECRUITER", name: "Priya N.", email: "priya@talentbridge-recruit.com",
    situation: "I need ongoing operational support", involvement: "People / training",
    message: "We have an exciting Director of Operations opening at a fast-growing client in Austin. Competitive comp and equity. Would you be open to a quick chat about the role?" },
];

let spend = 0;
for (const s of samples) {
  const token = await signToken(env.QUALIFY_SECRET, s.email);
  const t0 = Date.now();
  const res = await fetch(`${BASE}/api/qualify`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...s, token }),
  });
  const body = await res.json();
  const ms = Date.now() - t0;
  const mark = body.qualified ? "✅ qualified" : "⛔ not qualified";
  console.log(`${mark}  [${res.status}, ${ms}ms]  ${s.tag}\n     ${body.reason}${body.checks ? "  " + JSON.stringify(body.checks) : ""}`);
}

// the protection: no token → never reaches the model
const r = await fetch(`${BASE}/api/qualify`, { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...samples[0] }) });
console.log(`\nno token → ${r.status} ${(await r.json()).reason}  (expect 401 unauthorised)`);
const r2 = await fetch(`${BASE}/api/qualify`, { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...samples[0], token: await signToken("wrong-secret", samples[0].email) }) });
console.log(`forged token → ${r2.status} ${(await r2.json()).reason}  (expect 401 unauthorised)`);
