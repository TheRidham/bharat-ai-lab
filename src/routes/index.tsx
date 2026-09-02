import { createFileRoute } from "@tanstack/react-router";

const title = "SuperAI Base — The human intelligence layer for AI in India";
const description =
  "SuperAI Base builds expert networks, evaluations and training environments that make frontier AI models better at real work in India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    name: "Expert Network",
    body: "High-quality human feedback and expert reasoning from verified Indian professionals.",
  },
  {
    name: "Custom Evaluations",
    body: "Local benchmarks that test whether a model understands Indian nuances; and custom evaluations that measure how well it performs on your specific use case.",
  },
  {
    name: "India-Native Environments",
    body: "Practice environments built around real government portals, enterprise systems and regulatory workflows, allowing AI agents to learn and be tested on real Indian work.",
  },
  {
    name: "Proprietary Data",
    body: "We help enterprises turn their operational knowledge and workflows into high-quality training data while maintaining appropriate privacy and controls.",
  },
];

function Section({
  id,
  eyebrow,
  heading,
  children,
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/70 py-20">
      <div className="mx-auto max-w-2xl px-6">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {heading ? (
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{heading}</h2>
        ) : null}
        <div className="mt-8 space-y-6 prose-body">{children}</div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <section className="px-6 pt-24 pb-16 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl leading-[1.05] tracking-tight sm:text-7xl">SuperAI Base</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            The human intelligence layer for making AI native to India.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#build-with-us"
              className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Build with us
            </a>
            <a
              href="#what-we-build"
              className="rounded-full border border-border px-6 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              What we build
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl space-y-6 prose-body">
          <p>
            AI is becoming remarkably capable. The world's best models can reason, write code,
            analyze documents, use tools and solve increasingly complex problems.
          </p>
          <p>But there is a simple truth about AI:</p>
          <p className="border-l-2 pl-5 font-display text-2xl leading-snug text-foreground" style={{ borderColor: "var(--accent)" }}>
            A model can only become as good as the data, feedback and environments it learns from.
          </p>
          <p>
            Today, much of that human intelligence comes from a handful of developed markets,
            particularly the US and Europe.
          </p>
          <p>That matters when you bring these models to India.</p>
          <p>
            A doctor in India may see dengue and malaria every monsoon. An American doctor may
            rarely encounter either. An Indian lawyer doesn't just know the law. They know how that
            law actually works in Indian courts.
          </p>
          <p>The profession may be the same. The expert's mental model is not.</p>
          <p>The model doesn't need another language or another knowledge book.</p>
          <p className="font-display text-2xl text-foreground">
            It needs another world — backed by the judgment of local experts.
          </p>
        </div>
      </section>

      <Section eyebrow="Our work" heading="We teach AI how India works.">
        <p>
          SuperAI Base builds the expert networks, evaluations and training environments that make
          AI better at real work in India.
        </p>
        <p>
          We bring together India's top 1% professionals across domains, and turn their knowledge
          and judgment into intelligence that AI models can learn from.
        </p>
        <p>
          Not just the right answer, but how an expert gets there, what they consider, and where a
          model gets it wrong.
        </p>
      </Section>

      <section id="what-we-build" className="border-t border-border/70 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">What we build</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.name} className="bg-card p-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="why-this-matters" eyebrow="Perspective" heading="Why this matters">
        <p>The next generation of AI won't just answer questions.</p>
        <p className="font-display text-2xl text-foreground">It will do the work.</p>
        <p>
          And the quality of that work will depend on how well AI understands the world it is
          operating in.
        </p>
        <p>
          The frontier models of today are being shaped by the expertise and environments of the
          markets they come from.
        </p>
        <p>We want to make sure India shapes them too.</p>
      </Section>

      <Section id="who-we-work-with" eyebrow="Partners" heading="Who we work with">
        <p>
          We work with frontier AI companies building AI that is genuinely useful in India.
        </p>
        <p>
          <span className="text-foreground">Global, sovereign, and open-source AI companies:</span>{" "}
          We help them access experts, datasets, and independent evaluations to improve regional
          utility and local relevance.
        </p>
        <p>
          <span className="text-foreground">Indian enterprises:</span> We help them train AI on
          proprietary workflows and identify and evaluate the right models (or combination) for
          their specific needs.
        </p>
      </Section>

      <section id="build-with-us" className="border-t border-border/70 py-24">
        <div className="mx-auto max-w-2xl px-6">
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Build with us</h2>
          <div className="mt-8 space-y-6 prose-body">
            <p>Frontier models cannot become truly useful in India through public data alone.</p>
            <p>
              The next leap in AI requires something harder to find: expert judgment and the
              knowledge embedded in how organizations actually work.
            </p>
            <p>That is what we are building.</p>
          </div>
          <a
            href="mailto:hello@superaibase.com"
            className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Help us make AI better for India
          </a>
        </div>
      </section>
    </>
  );
}
