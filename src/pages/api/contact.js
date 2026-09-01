import { isFreeEmail } from '../../lib/free-email-domains.js';
import { signToken } from '../../lib/qualify-token.js';

// Without this the route is prerendered as STATIC and POST bodies are dropped
// ("Unexpected end of JSON input") — the form could never submit.
export const prerender = false;

export async function POST({ request, locals }) {
  const SLACK_WEBHOOK_URL = locals?.runtime?.env?.SLACK_WEBHOOK_URL ?? import.meta.env.SLACK_WEBHOOK_URL;
  try {
    const data = await request.json();
    const { situation, involvement, message, name, email, contactMethod, phone, phoneType, bookingLink, linkedin, source } = data;

    // V2 intake requires a work address (the form blocks free mailboxes; re-checked here)
    if (source === 'v2' && isFreeEmail(email)) {
      return new Response(JSON.stringify({ error: 'work_email_required' }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build contact method detail
    let contactDetail = contactMethod;
    if (contactMethod === 'phone' && phone) {
      contactDetail = `Phone (${phoneType || 'call'}): ${phone}`;
    } else if (contactMethod === 'linkedin') {
      contactDetail = `LinkedIn: ${linkedin || '(no URL given)'}`;
    } else if (contactMethod === 'video') {
      contactDetail = bookingLink ? `Video Call — their link: ${bookingLink}` : 'Video Call — use your calendar';
    } else {
      contactDetail = `Email: ${email}`;
    }

    const slackMessage = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📩 New Project Inquiry',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Name:*\n${name}` },
            { type: 'mrkdwn', text: `*Email:*\n${email}` },
          ],
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Situation:*\n${situation}` },
            { type: 'mrkdwn', text: `*Contact Method:*\n${contactDetail}` },
          ],
        },
        ...(phone || linkedin ? [{
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Phone:*\n${phone || '—'}` },
            { type: 'mrkdwn', text: `*LinkedIn:*\n${linkedin || '—'}` },
          ],
        }] : []),
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Involves:*\n${involvement || 'Not specified'}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Details:*\n${message || 'No details provided'}`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Submitted from gregtoler.com/contact`,
            },
          ],
        },
      ],
    };

    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      console.error('Slack webhook failed:', slackResponse.status);
      return new Response(JSON.stringify({ error: 'Slack notification failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // V2: hand back a short-lived proof-of-submission token so /api/qualify will
    // run — it refuses calls that don't carry one (keeps the model key un-abusable)
    const qualifySecret = locals?.runtime?.env?.QUALIFY_SECRET ?? import.meta.env.QUALIFY_SECRET;
    const token = source === 'v2' ? await signToken(qualifySecret, email) : null;
    return new Response(JSON.stringify({ ok: true, ...(token ? { token } : {}) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
