import { createFileRoute } from "@tanstack/react-router";
import { ExpertNetworkDialog } from "@/components/ExpertNetworkDialog";

const title = "SuperAI Base — Teaching AI how India works";
const description =
  "SuperAI Base builds the expert networks, datasets, evaluations and training environments that help AI models understand and perform real work in India.";

const whatsappUrl =
  "https://wa.me/919873027250?text=hey%21%20would%20like%20to%20know%20more%20about%20SuperAI%20Base";

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

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary";

const buildBlocks = [
  {
    title: "Expert Network",
    body: "India's highest-quality professional experts for AI training and evaluation.",
  },
  {
    title: "Custom Evaluations",
    body: "Benchmarks that measure whether AI works in India and for your specific use case.",
  },
  {
    title: "India-Native Data & Environments (Coming Soon)",
    body: "Real-world knowledge, and practice environments that help AI agents learn and perform Indian work.",
  },
];

function Index() {
  return (
    <article className="mx-auto max-w-2xl px-6 pt-24 pb-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <img src="/logo.png" alt="SuperAI Base logo" className="h-20 w-20" />
        <span className="text-2xl font-medium tracking-tight">SuperAI Base</span>
      </div>

      <h1 className="mt-12 text-center text-2xl font-normal leading-snug tracking-tight sm:text-3xl">
        Teaching AI how India works.
      </h1>

      <div className="mt-10 space-y-6 text-[1.0625rem] leading-8 text-foreground/85">
        <p>
          The world&apos;s best AI models are becoming remarkably capable. But the expertise and
          environments shaping them still come{" "}
          <em>disproportionately from a handful of developed markets.</em>
        </p>
        <p>
          SuperAI Base builds the expert networks, datasets, evaluations, and training environments
          that help AI models <strong>understand and perform real work in India.</strong>
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={primaryCta}>
            Build with us
          </a>
          <ExpertNetworkDialog>
            <button type="button" className={secondaryCta}>
              Join Expert Network
            </button>
          </ExpertNetworkDialog>
        </div>

        <h2 className="pt-8 text-xl">The thesis</h2>
        <p>
          <strong>The profession may be the same. The expert&apos;s mental model is not.</strong>
        </p>
        <p>
          India creates different contexts, constraints, institutions, regulations, workflows, and
          edge cases.
        </p>
        <p>
          A doctor in India may see dengue and malaria every monsoon.
          <br />
          An American doctor may rarely encounter either.
        </p>
        <p>
          An Indian lawyer doesn&apos;t just know the law.
          <br />
          They know <em>how that law actually works in Indian courts.</em>
        </p>
        <p>
          AI needs to learn those mental models.
        </p>

        <h2 className="pt-8 text-xl">What we build</h2>
        {buildBlocks.map((block) => (
          <p key={block.title}>
            <span className="font-semibold text-foreground">{block.title}</span>
            <br />
            {block.body}
          </p>
        ))}

        <h2 className="pt-8 text-xl">Why now</h2>
        <p>
          The next generation of AI won&apos;t just answer questions.{" "}
          <strong>It will do the work.</strong>
        </p>
        <p>
          And the quality of that work will depend on how well AI understands the world in which it
          operates.
        </p>
        <p>
          The models shaping the future are being trained and evaluated against the expertise and
          environments available to them.
        </p>
        <p>
          <em>We want India to help shape those models too.</em>
        </p>

        <h2 className="pt-8 text-xl">Who we work with</h2>
        <p>
          <span className="font-semibold text-foreground">Frontier AI companies</span>
          <br />
          Build models that are genuinely useful in India.
        </p>
        <p>
          <span className="font-semibold text-foreground">Indian enterprises</span>
          <br />
           Helping them train AI for proprietary workflows and evaluate models against real business
           requirements.
        </p>

        <h2 className="pt-10 text-xl">Build AI that understands India.</h2>
        <div className="flex flex-wrap items-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={primaryCta}>
            Talk to us
          </a>
        </div>
        <p className="pt-2">
          <strong>Are you an expert?</strong>
        </p>
        <div className="flex flex-wrap gap-3">
          <ExpertNetworkDialog>
            <button type="button" className={secondaryCta}>
              Join the Expert Network
            </button>
          </ExpertNetworkDialog>
        </div>
      </div>
    </article>
  );
}
