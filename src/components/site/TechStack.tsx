import Reveal from "./Reveal";

const tools = [
  { name: "n8n", slug: "n8n" },
  { name: "OpenAI", slug: "openai" },
  { name: "Google Sheets", slug: "googlesheets" },
  { name: "Slack", slug: "slack" },
  { name: "SendGrid", slug: "maildotru" },
  { name: "Apollo.io", slug: null },
  { name: "Typeform", slug: "typeform" },
  { name: "Telegram · WhatsApp", slug: "telegram" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Notion", slug: "notion" },
  { name: "Airtable", slug: "airtable" },
  { name: "Zapier", slug: "zapier" },
];

const TechStack = () => (
  <section className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">Tech Stack</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Tools I work with</h2>
        <p className="mt-4 text-dim">I integrate with the software you already use. No need to rip and replace.</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {tools.map((t, i) => (
          <Reveal key={t.name} delay={i * 40}>
            <div className="card-surface flex h-full flex-col items-center justify-center gap-3 px-3 py-6 text-center">
              {t.slug ? (
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/d29b4a`}
                  alt={`${t.name} logo`}
                  loading="lazy"
                  className="h-7 w-7"
                />
              ) : (
                <span className="h-3 w-3 rounded-full bg-primary" />
              )}
              <span className="text-xs text-dim">{t.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
