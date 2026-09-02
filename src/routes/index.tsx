import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Youtube } from "lucide-react";
import logo from "../assets/logo.png.asset.json";

const title = "SuperAI Base — The human intelligence layer for AI in India";
const description =
  "SuperAI Base builds the expert networks, evaluations and training environments that make AI better at real work in India.";

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

function Index() {
  return (
    <article className="mx-auto max-w-2xl px-6 pt-24 pb-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={logo.url}
          alt="SuperAI Base logo"
          className="h-16 w-16 mix-blend-multiply"
        />
        <span className="text-2xl font-medium tracking-tight">SuperAI Base</span>
      </div>

      <h1 className="mt-12 text-center text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
        The human intelligence layer for making AI native to India.
      </h1>

      <div className="mt-10 space-y-6 text-[1.0625rem] leading-8 text-foreground/85">
        <p></p>
        <p></p>
        <p className="text-foreground">
          AI is becoming remarkably capable, but there is a simple truth about it:&nbsp;
          <br />
          A model can only become as good as the data, feedback and environments it learns from.
        </p>
        <p>
          Today, much of that human intelligence comes from a handful of developed markets,
          particularly the US and Europe.
        </p>
        <p>That matters when you bring these models to India.</p>
        <p>
          A doctor in India may see dengue and malaria every monsoon. An American doctor may rarely
          encounter either. An Indian lawyer doesn't just know the law. They know how that law
          actually works in Indian courts.
        </p>
        <p>The profession may be the same. The expert's mental model is not.</p>
        <p>
          The model doesn't need another language or another knowledge book. It needs another world
          , backed by the judgment of local experts.
        </p>

        <h2 className="pt-8 text-xl">We teach AI how India works.</h2>
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

        <h2 className="pt-8 text-xl">What we build</h2>
        <p>
           <span className="text-foreground">Expert Network.</span>&nbsp;High-quality human feedback and
          expert reasoning from verified Indian professionals.
        </p>
        <p>
          <span className="text-foreground">Custom Evaluations.</span> Local benchmarks that test
          whether a model understands Indian nuances, and custom evaluations that measure how well
          it performs on your specific use case.
        </p>
        <p>
          <span className="text-foreground">India-Native Environments.</span> Practice environments
           built around popular platforms, enterprise systems and regulatory workflows,
          allowing AI agents to learn and be tested on real Indian work.
        </p>
        <p>
          <span className="text-foreground">Proprietary Data.</span> We help enterprises turn their
          operational knowledge and workflows into high-quality training data while maintaining
          appropriate privacy and controls.
        </p>

        <h2 className="pt-8 text-xl">Why this matters</h2>
        <p>The next generation of AI won't just answer questions. It will do the work.</p>
        <p>
          And the quality of that work will depend on how well AI understands the world it is
          operating in.
        </p>
        <p>
          The frontier models of today are being shaped by the expertise and environments of the
          markets they come from. We want to make sure India shapes them too.
        </p>

        <h2 className="pt-8 text-xl">Who we work with</h2>
        <p>We work with frontier AI companies building AI that is genuinely useful in India.</p>
        <p>
          <span className="text-foreground">Global, sovereign, and open-source AI companies.</span>{" "}
          We help them access experts, datasets, and independent evaluations to improve regional
           with hiring experts, accessing datasets, and independent evaluations to improve regional
           utility and local relevance.
        </p>
        <p>
          <span className="text-foreground">Indian enterprises.</span> We help them train AI on
           proprietary workflows and identify and evaluate the right models (or combination) for
           their specific needs.
           <br />
           <br />
           <br />
           Help us make AI better for India!&nbsp;
           <a className="underline underline-offset-4" href="mailto:hello@superaibase.com">
             Join Expert Network
           </a>
        </p>

        <h2 className="pt-8 text-xl"></h2>
        <p></p>
        <p></p>
        <p></p>
        <p className="text-foreground"></p>
      </div>

      <div className="mt-12 flex items-center justify-center gap-5 text-muted-foreground">
        <a
          href="https://www.linkedin.com"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://www.x.com"
          aria-label="X"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://www.youtube.com"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          <Youtube size={20} />
        </a>
      </div>
    </article>
  );
}
