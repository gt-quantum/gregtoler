const SLACK_WEBHOOK_URL = import.meta.env.SLACK_WEBHOOK_URL;

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { situation, involvement, message, name, email, contactMethod, phone, phoneType, bookingLink } = data;

    // Build contact method detail
    let contactDetail = contactMethod;
    if (contactMethod === 'phone' && phone) {
      contactDetail = `Phone (${phoneType || 'call'}): ${phone}`;
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

    return new Response(JSON.stringify({ ok: true }), {
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
