import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";

interface LeadPayload {
  fullName: string;
  email: string;
  company: string;
  headcount: string;
  automationGoal: string;
}

function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid payload" };
  const b = body as Record<string, unknown>;
  const fullName = String(b.fullName ?? "").trim();
  const email = String(b.email ?? "").trim();
  const company = String(b.company ?? "").trim();
  const headcount = String(b.headcount ?? "").trim();
  const automationGoal = String(b.automationGoal ?? "").trim();

  if (!fullName || fullName.length > 120) return { ok: false, error: "Invalid name" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
    return { ok: false, error: "Invalid email" };
  if (!company || company.length > 200) return { ok: false, error: "Invalid company" };
  if (!headcount || headcount.length > 50) return { ok: false, error: "Invalid headcount" };
  if (!automationGoal || automationGoal.length > 1000)
    return { ok: false, error: "Invalid automation goal" };

  return { ok: true, data: { fullName, email, company, headcount, automationGoal } };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const HUBSPOT_API_KEY = Deno.env.get("HUBSPOT_API_KEY");
    if (!HUBSPOT_API_KEY) throw new Error("HUBSPOT_API_KEY is not configured");

    const json = await req.json().catch(() => null);
    const parsed = validate(json);
    if (!parsed.ok) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { fullName, email, company, headcount, automationGoal } = parsed.data;
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ") || "—";

    const properties: Record<string, string> = {
      email,
      firstname: firstName,
      lastname: lastName,
      company,
      numemployees: headcount,
      message: `Wants to automate: ${automationGoal}`,
      lifecyclestage: "lead",
    };

    // Try create
    const response = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": HUBSPOT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    });

    let data = await response.json();

    // If contact already exists, update by email
    if (!response.ok && response.status === 409) {
      const updateRes = await fetch(
        `${GATEWAY_URL}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": HUBSPOT_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties }),
        },
      );
      data = await updateRes.json();
      if (!updateRes.ok) {
        throw new Error(`HubSpot update failed [${updateRes.status}]: ${JSON.stringify(data)}`);
      }
    } else if (!response.ok) {
      throw new Error(`HubSpot create failed [${response.status}]: ${JSON.stringify(data)}`);
    }

    // Fire-and-forget Slack notification — don't fail the request if Slack errors
    try {
      const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
      if (SLACK_API_KEY) {
        const slackText = `:tada: *New lead from website form*`;
        const blocks = [
          { type: "header", text: { type: "plain_text", text: "New Lead Submission" } },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${fullName}` },
              { type: "mrkdwn", text: `*Email:*\n${email}` },
              { type: "mrkdwn", text: `*Company:*\n${company}` },
              { type: "mrkdwn", text: `*Headcount:*\n${headcount}` },
            ],
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Wants to automate:*\n${automationGoal}` },
          },
        ];

        const slackRes = await fetch("https://connector-gateway.lovable.dev/slack/api/chat.postMessage", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": SLACK_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel: "websiteforms",
            text: slackText,
            blocks,
          }),
        });
        const slackData = await slackRes.json();
        if (!slackData.ok) {
          console.error("Slack notification failed:", slackData);
        }
      }
    } catch (slackErr) {
      console.error("Slack notification error:", slackErr);
    }

    return new Response(JSON.stringify({ success: true, id: data.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("hubspot-lead error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
