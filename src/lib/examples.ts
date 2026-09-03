/**
 * The examples, in one place. Three consumers:
 *   1. the framework map on the home page (pins, one per example, placed by `x` / `y`)
 *   2. the Work table on the home page (one row per example, linking to /examples#slug)
 *   3. /examples itself (the three text-only examples added 2026-09-02 read their
 *      Problem / Build from here so the copy exists once)
 *
 * Coordinates: x runs Go-to-market (0) → Operations (1); y runs Strategy (0) → Execution (1).
 * Keep pins at least 8% clear of the quadrant labels at (.25,.25) (.75,.25) (.25,.75) (.75,.75)
 * and at least 6% off either axis, or the label text and the pin collide.
 *
 * Copy rules (Greg, documentation/examples-page.md): no company or people names, companies
 * are described; no colons, no em dashes; plain descriptor titles; every example is
 * Problem then Build. The `problem` / `build` here are the short panel versions.
 * Slugs MUST match the article ids on /examples.
 */

export type Quadrant = "gtm-strategy" | "revops-bizops" | "gtm-execution" | "systems-automation";

export interface Example {
  slug: string;
  title: string;
  /** which /examples group the article lives in */
  group: "core" | "automation" | "ai" | "tools";
  quadrant: Quadrant;
  /** 0 = Go-to-market, 1 = Operations */
  x: number;
  /** 0 = Strategy, 1 = Execution */
  y: number;
  /** short, for the map panel and the Work table */
  problem: string;
  build: string;
  /** set on the three examples that do not have visuals yet, so /examples can render them from here */
  textOnly?: boolean;
  /** long form Problem / Build for the text-only articles on /examples */
  problemFull?: string;
  buildFull?: string;
}

export const QUADRANTS: Record<Quadrant, { label: string; coord: string }> = {
  "gtm-strategy":       { label: "GTM strategy",         coord: "GTM, Strategy" },
  "revops-bizops":      { label: "RevOps & BizOps",      coord: "Ops, Strategy" },
  "gtm-execution":      { label: "GTM execution",        coord: "GTM, Execution" },
  "systems-automation": { label: "Systems & automation", coord: "Ops, Execution" },
};

export const GROUPS: Record<Example["group"], string> = {
  core: "Core marketing ops",
  automation: "Marketing ops with automation",
  ai: "Marketing ops with AI in the loop",
  tools: "Custom tools",
};

export const examples: Example[] = [
  /* ───────── GTM strategy (top left) ───────── */
  {
    slug: "account-scoring-and-tiering",
    title: "Account scoring and tiering",
    group: "core",
    quadrant: "gtm-strategy",
    x: 0.15, y: 0.20,
    problem: "Target lists were built by gut feel or by whichever vendor tag happened to be populated, and paid audiences inherited the same noise.",
    build: "A composite fit score across every account in the registry, rolled into four tiers with the features weighted in the open, so a rep can argue with a tier instead of a black box.",
    textOnly: true,
    problemFull: "Target lists were built by gut feel or by whichever vendor tag happened to be populated. Paid audiences inherited the same noise, so budget went to accounts nobody had actually qualified and the reps could not say why an account was on the list.",
    buildFull: "At a public safety software company, a composite fit score across every agency in the national registry, weighing opportunity in the state, agency size, investigative complexity, specialty units, and agency type, rolled into four tiers and an addressability flag. At a wire fraud protection SaaS, an audit of the CRM segment formula against a vendor AI score showed the paid audience's strategic tag came almost entirely from one enrichment source, so the LinkedIn target lists were rebuilt from the audit. The features are weighted in the open, so a rep can argue with a tier instead of a black box, and the same model later synced tiers to CRM properties as a product.",
  },
  {
    slug: "competitive-landing-pages-from-closed-won-data",
    title: "Competitive landing pages from closed-won data",
    group: "core",
    quadrant: "gtm-strategy",
    x: 0.36, y: 0.36,
    problem: "Paid search was bidding on competitor names and landing on the homepage. Comparison pages did not exist and the team disagreed about tone.",
    build: "Researched why deals were won against each competitor in the CRM, built three pages from that, and wired a CMS template so new variants are a prompt away, with the funnel tracked end to end.",
    textOnly: true,
    problemFull: "Paid search was bidding on competitor names and sending every click to the homepage. Comparison pages did not exist, and the team disagreed about how direct the tone should be, so nothing shipped.",
    buildFull: "Researched why deals were won against each competitor in the CRM's closed won notes, then built three pages from that research, a direct comparison, a subtle one, and an above the fold refresh, and recorded a walkthrough for legal and brand review. A paid CMS template wired to the Webflow MCP means new variants are a prompt away. UTM parameters were pushed through Meta and Google into the form so the funnel can prove which page produced the meeting, and a conversion leak was traced to a sitelink pointing at a legacy page. Two value add PDFs run as document ads on the same funnel.",
  },
  {
    slug: "paid-media-inside-claude",
    title: "Paid media inside Claude",
    group: "ai",
    quadrant: "gtm-strategy",
    x: 0.30, y: 0.12,
    problem: "Multiple paid platforms, a team that was not technical enough to run them, and an agency being paid mostly to click buttons. Nobody could say what was live or pacing without waiting on a report.",
    build: "Three production MCP servers connect Google, LinkedIn, and Microsoft Ads to Claude, and a skill agent carries the ad playbooks and company context, so the team asks for a strategy or a budget shift and the same agent builds and deploys it.",
  },

  /* ───────── RevOps & BizOps (top right) ───────── */
  {
    slug: "custom-dashboards-across-systems-that-do-not-report-together",
    title: "Custom dashboards across systems that do not report together",
    group: "tools",
    quadrant: "revops-bizops",
    x: 0.62, y: 0.14,
    problem: "The CRM, the marketing automation tool, the sequencing tool, the phone system, and the work management tool each reported on themselves and none agreed on who had been contacted or which form fill became a meeting.",
    build: "Read only pulls from every source joined on the person and the account, then the dashboard the team actually needs built on that model, and finally the schema promoted to a hosted database so the full funnel reports without a script.",
  },
  {
    slug: "metabase-product-data-into-hubspot",
    title: "Metabase product data into HubSpot",
    group: "automation",
    quadrant: "revops-bizops",
    x: 0.88, y: 0.34,
    problem: "Product usage lived in the BI tool. The CRM got a hand built CSV once a week, so outreach, lifecycle emails, and account health all ran on stale data.",
    build: "Saved BI cards queried on a schedule and written to CRM properties on the contact and the company, matched on a user id so reruns update instead of duplicate, feeding trial scoring, lifecycle emails, and a paid health score.",
  },
  {
    slug: "account-health-from-slack",
    title: "Account health from Slack",
    group: "automation",
    quadrant: "revops-bizops",
    x: 0.66, y: 0.40,
    problem: "Checking an account's health meant a BI login and knowing the right saved question. Most people never looked.",
    build: "A Slack command takes an email or an org name, runs the same BI queries, and posts back a chart with a plain language summary and the score with the reasons behind it.",
  },

  /* ───────── GTM execution (bottom left) ───────── */
  {
    slug: "assessment-chatbot-into-marketo-salesforce-and-lemlist",
    title: "Assessment chatbot into Marketo, Salesforce, and Lemlist",
    group: "automation",
    quadrant: "gtm-execution",
    x: 0.13, y: 0.64,
    problem: "A target list of 140 accounts needed a reason to engage beyond a whitepaper, and reps needed owned, warm leads without hand routing.",
    build: "A chatbot on the landing page adapts its questions as the visitor answers, turns the submission into a personalized audit, updates the marketing automation person, and in parallel routes the lead to an owner and enrolls it in that owner's sequence with copy drawn from the same answers.",
  },
  {
    slug: "content-bot-in-slack",
    title: "Content bot in Slack",
    group: "ai",
    quadrant: "gtm-execution",
    x: 0.36, y: 0.84,
    problem: "Marketing had produced hundreds of articles, guides, and videos. Sales could not find them, so they asked in Slack and waited, or sent nothing.",
    build: "A content repository indexed and wired to a retrieval layer and a model behind a Slack app. A rep asks a plain question and the bot answers from approved content and lists the exact pieces to share.",
  },
  {
    slug: "voice-notes-to-crm-and-drafted-follow-ups",
    title: "Voice notes to CRM and drafted follow ups",
    group: "automation",
    quadrant: "gtm-execution",
    x: 0.16, y: 0.90,
    problem: "Event follow up died in the gap between the conversation and the laptop. Notes were lost, contacts never created, emails sent days late.",
    build: "A voice note from the phone is transcribed, matched to the event, written to the contact record, and turned into a personalized follow up waiting in the rep's drafts. Nothing sends without the rep.",
    textOnly: true,
    problemFull: "Event follow up died in the gap between the booth conversation and the laptop. Notes were lost, contacts never got created, and the follow up email went out days late or not at all.",
    buildFull: "A rep records a voice note on their phone after the conversation. The note is transcribed, the model identifies the event from the events list, finds or creates the contact in the CRM, appends the notes, and writes a personalized follow up straight into the rep's Gmail drafts for a one tap send. It ran against both a CRM and a shared spreadsheet as the system of record. Nothing is sent without the rep, the draft is the checkpoint.",
  },

  /* ───────── Systems & automation (bottom right) ───────── */
  {
    slug: "event-requests-into-jira-and-asana",
    title: "Event requests into Jira and Asana",
    group: "core",
    quadrant: "systems-automation",
    x: 0.64, y: 0.62,
    problem: "About ten event requests a week arrived by email in no fixed format. Every one had to be retyped into the ticketing system and chased for whatever was missing.",
    build: "A script watches a folder. Drop the email in and it reads the thread, creates the record and the tasks with eleven fields filled, asks the requester for anything missing, and updates only what changed when the answer comes back.",
  },
  {
    slug: "marketing-requests-into-revops",
    title: "Marketing requests into RevOps",
    group: "core",
    quadrant: "systems-automation",
    x: 0.88, y: 0.72,
    problem: "Marketing worked in Asana and RevOps worked in Jira. Requests were retyped by hand, half arrived without enough detail, and nobody could see progress once a ticket was in flight.",
    build: "Assigning a task hands it to an agent that pulls the full project context into a properly written ticket, sends a needs context subtask back when the detail is not there, and syncs status both ways after that.",
  },
  {
    slug: "research-agents-for-a-newsletter-and-tool-directory",
    title: "Research agents for a newsletter and tool directory",
    group: "tools",
    quadrant: "systems-automation",
    x: 0.62, y: 0.90,
    problem: "Two founders were doing a weekly newsletter and a tool directory's research and writing by hand, which left little time for sales, customers, and events.",
    build: "A set of agents behind an orchestrator does the research and the writing at scale, with a quality gate, a hallucination check, and a newsletter draft waiting for approval. The founders review rather than write.",
  },

  /* ───────── on the Work table, not pinned (the map stays readable at three a quadrant) ───────── */
  {
    slug: "venue-research-agent-for-customer-events",
    title: "Venue research agent for customer events",
    group: "ai",
    quadrant: "gtm-execution",
    x: 0.38, y: 0.62,
    problem: "Monthly customer events with plans that change late, so every change meant starting venue research from scratch.",
    build: "Submit a city and the criteria and an agent researches, dedupes, enriches, and scores venues into a ranked shortlist with outreach drafted, adding to a venue database every run.",
  },
  {
    slug: "weekly-competitor-roundup",
    title: "Weekly competitor roundup",
    group: "ai",
    quadrant: "systems-automation",
    x: 0.82, y: 0.88,
    problem: "Competitor launches, pricing changes, and industry news surfaced by accident, usually because a rep happened to see a post.",
    build: "A scheduled service discovers new competitor pages, classifies each with a small model, summarizes the survivors with a stronger one, and posts what changed with every source threaded underneath.",
  },
  {
    slug: "discovery-calls-into-help-center-and-website-drafts",
    title: "Discovery calls into help center and website drafts",
    group: "ai",
    quadrant: "gtm-execution",
    x: 0.28, y: 0.62,
    problem: "The website and help center were written from the inside out. The questions prospects actually asked on calls never reached the people writing the pages.",
    build: "Call audio transcribed, questions and objections extracted and checked against the content index, and for each gap a help center article and website copy drafted with a review task so a person approves before anything publishes.",
  },
  {
    slug: "account-map",
    title: "Account map",
    group: "tools",
    quadrant: "gtm-execution",
    x: 0.12, y: 0.76,
    problem: "No mapping tool, so territory and event decisions came out of spreadsheets and guesswork.",
    build: "A custom internal mapping tool. Upload a list or sync from the CRM, geocode in batch, and see every list on one map with filters, territories, trips, and shareable views.",
  },
];

/** the pins: first three per quadrant, in file order */
export const pinned: Example[] = (() => {
  const count: Partial<Record<Quadrant, number>> = {};
  return examples.filter((e) => {
    count[e.quadrant] = (count[e.quadrant] ?? 0) + 1;
    return count[e.quadrant]! <= 3;
  });
})();
