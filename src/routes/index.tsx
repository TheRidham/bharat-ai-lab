import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  House,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Wrench,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import neighborhoodBusinessImage from "@/assets/neighborhood-businesses.jpg";

const pageTitle = "SuperAI Base — Be the local business AI recommends";
const pageDescription =
  "SuperAI Base helps U.S. small businesses become easier to find in AI search and local discovery, turning nearby searches into new customer opportunities.";

const inquirySchema = z.object({
  contact_name: z.string().trim().min(2, "Enter your name.").max(120),
  business_name: z.string().trim().min(2, "Enter your business name.").max(160),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(24)
    .regex(/^[+\d().\-\s]+$/, "Use a valid phone number."),
  business_type: z.enum(["healthcare", "legal", "home-services", "other"], {
    errorMap: () => ({ message: "Choose a business type." }),
  }),
  service_area: z.string().trim().min(2, "Add a city, neighborhood, or ZIP code.").max(140),
  website: z
    .string()
    .trim()
    .max(300)
    .refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message: "Enter a complete website URL, including https://.",
    }),
});

type InquiryForm = z.infer<typeof inquirySchema>;
type FieldErrors = Partial<Record<keyof InquiryForm, string[]>>;

const initialForm: InquiryForm = {
  contact_name: "",
  business_name: "",
  email: "",
  phone: "",
  business_type: "",
  service_area: "",
  website: "",
} as InquiryForm;

const businessTypes = [
  { value: "healthcare", label: "Healthcare" },
  { value: "legal", label: "Legal services" },
  { value: "home-services", label: "Home services" },
  { value: "other", label: "Other local business" },
] as const;

const industries = [
  {
    number: "01",
    icon: Stethoscope,
    title: "Healthcare",
    examples: "Primary care · Dental · Physical therapy",
    description: "Help nearby patients find the right care and understand what makes your practice different.",
  },
  {
    number: "02",
    icon: Scale,
    title: "Legal services",
    examples: "Family law · Estate planning · Injury law",
    description: "Make your focus, service area, and experience easier for local clients to discover.",
  },
  {
    number: "03",
    icon: House,
    title: "Home services",
    examples: "Cleaning · HVAC · Plumbing",
    description: "Show up when homeowners need a trusted professional in their neighborhood.",
  },
  {
    number: "04",
    icon: Store,
    title: "Neighborhood businesses",
    examples: "Studios · Pet care · Auto services",
    description: "Connect what you offer to the people searching nearby for exactly that.",
  },
];

const steps = [
  {
    number: "01",
    title: "See how AI sees you",
    description: "We look at the questions customers ask, your current local signals, and where your business is missing from the conversation.",
  },
  {
    number: "02",
    title: "Build a stronger local presence",
    description: "We bring your services, expertise, location, and customer proof into a clear, consistent story across the web.",
  },
  {
    number: "03",
    title: "Keep improving discovery",
    description: "We track how visibility changes and refine your local content as customer behavior and AI search evolve.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:url", content: "https://bharat-ai-lab.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
    ],
    links: [{ rel: "canonical", href: "https://bharat-ai-lab.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "success" | "error">("idle");

  function updateField<Key extends keyof InquiryForm>(key: Key, value: InquiryForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (submissionState !== "idle") setSubmissionState("idle");
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionState("idle");
    const { error } = await supabase.from("business_inquiries").insert({
      ...parsed.data,
      website: parsed.data.website || null,
    });
    setIsSubmitting(false);

    if (error) {
      setSubmissionState("error");
      return;
    }

    setForm(initialForm);
    setErrors({});
    setSubmissionState("success");
  }

  return (
    <div className="overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3 text-foreground" aria-label="SuperAI Base home">
            <img src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
            <span className="text-base font-semibold">SuperAI Base</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-foreground/80 md:flex">
            <a className="transition-colors hover:text-primary" href="#services">What we do</a>
            <a className="transition-colors hover:text-primary" href="#industries">Who we help</a>
            <a className="transition-colors hover:text-primary" href="#approach">Our approach</a>
          </div>
          <Button asChild size="sm" className="h-10 rounded-full px-5">
            <a href="#contact">Get your visibility snapshot <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </nav>
      </header>

      <main>
        <section id="top" className="relative isolate flex min-h-[700px] items-end overflow-hidden bg-background pt-28 sm:min-h-[760px] lg:min-h-[820px]">
          <img
            src={neighborhoodBusinessImage}
            alt="A local healthcare professional outside her neighborhood practice"
            width={1808}
            height={1200}
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[61%_center]"
          />
          <div className="hero-wash absolute inset-0 -z-10" aria-hidden="true" />
          <div className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/80">
                <MapPin size={14} aria-hidden="true" /> Local discovery, reimagined
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-primary-foreground sm:text-6xl lg:text-7xl">
                Be the local business AI recommends.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80 sm:text-xl">
                Help more nearby customers discover your business when they ask AI where to go, who to call, and what to choose.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <a href="#contact">Get your AI visibility snapshot <ArrowRight aria-hidden="true" /></a>
                </Button>
                <a href="#services" className="inline-flex items-center gap-2 self-start px-2 py-3 text-sm font-medium text-primary-foreground/85 transition-colors hover:text-primary-foreground">
                  Explore what we do <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="mt-16 flex max-w-3xl flex-col gap-3 border-t border-primary-foreground/25 pt-5 text-sm text-primary-foreground/75 sm:flex-row sm:items-center sm:justify-between">
              <span>Made for local businesses across the United States</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} aria-hidden="true" /> Built around your expertise, not ad spend</span>
            </div>
          </div>
        </section>

        <section id="services" className="border-b border-border bg-background px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="section-kicker"><Sparkles size={14} aria-hidden="true" /> The new local search</p>
              <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
                Customers are asking AI for the right business nearby.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                “Find a family dentist near me.” “Who can fix a leak today?” “Which attorney handles small business contracts?” Discovery is becoming a conversation.
              </p>
              <p>
                SuperAI Base helps independent businesses show up with clear, useful answers wherever local customers are searching. We turn your real-world expertise and service area into stronger signals for AI discovery.
              </p>
              <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <div><Search size={18} className="mb-3 text-primary" aria-hidden="true" /><p className="font-semibold text-foreground">Be discoverable</p><p className="mt-1 text-sm leading-6">Make your services easier to understand.</p></div>
                <div><MapPin size={18} className="mb-3 text-primary" aria-hidden="true" /><p className="font-semibold text-foreground">Be relevant nearby</p><p className="mt-1 text-sm leading-6">Connect your expertise with your service area.</p></div>
                <div><Wrench size={18} className="mb-3 text-primary" aria-hidden="true" /><p className="font-semibold text-foreground">Build for action</p><p className="mt-1 text-sm leading-6">Help turn discovery into a call, visit, or booking.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="bg-secondary/50 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="section-kicker"><Store size={14} aria-hidden="true" /> Who we help</p>
                <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">Local expertise deserves to be found.</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-muted-foreground">Built for the businesses people rely on every day, in every city and community.</p>
            </div>
            <div className="grid border-t border-border sm:grid-cols-2">
              {industries.map(({ number, icon: Icon, title, examples, description }) => (
                <article key={number} className="border-b border-border py-7 sm:pr-8 sm:even:border-l sm:even:pl-8 lg:py-9">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">{number}</span>
                    <Icon size={19} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm font-medium text-primary">{examples}</p>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="bg-background px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="section-kicker"><Search size={14} aria-hidden="true" /> How it works</p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">A clearer path from search to your door.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">Practical, transparent work that starts with how customers actually look for local help.</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {steps.map((step) => (
                <article key={step.number} className="grid gap-3 py-6 sm:grid-cols-[64px_1fr] sm:gap-5 sm:py-8">
                  <span className="text-xs font-semibold text-primary">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">Small business. Big local presence.</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Your next customer is already asking.</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-primary-foreground/80">Make it easier for AI-powered search to understand what you do, where you do it, and why customers trust you.</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="h-12 shrink-0 rounded-full px-6">
              <a href="#contact">Start with a snapshot <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </section>

        <section id="contact" className="bg-secondary/50 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:pt-6">
              <p className="section-kicker"><MapPin size={14} aria-hidden="true" /> Your business, in focus</p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">Let’s see where local AI discovery can take you.</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Tell us a little about your business. We’ll get back to you about a tailored AI visibility snapshot for your service area.</p>
              <div className="mt-8 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                <Check size={17} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>Clear next steps for your business and the customers you serve.</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8">
              {submissionState === "success" ? (
                <div role="status" className="flex min-h-80 flex-col items-start justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check size={23} aria-hidden="true" /></span>
                  <h3 className="mt-6 text-2xl font-semibold">Thanks for reaching out.</h3>
                  <p className="mt-3 max-w-md leading-7 text-muted-foreground">Your business details are in. We’ll be in touch about your local AI visibility snapshot.</p>
                </div>
              ) : (
                <form onSubmit={submitInquiry} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField id="contact_name" label="Your name" error={errors.contact_name?.[0]}>
                      <Input id="contact_name" name="contact_name" autoComplete="name" maxLength={120} placeholder="Jordan Lee" value={form.contact_name} onChange={(event) => updateField("contact_name", event.target.value)} aria-invalid={Boolean(errors.contact_name)} aria-describedby={errors.contact_name ? "contact_name-error" : undefined} />
                    </FormField>
                    <FormField id="business_name" label="Business name" error={errors.business_name?.[0]}>
                      <Input id="business_name" name="business_name" autoComplete="organization" maxLength={160} placeholder="Your business" value={form.business_name} onChange={(event) => updateField("business_name", event.target.value)} aria-invalid={Boolean(errors.business_name)} aria-describedby={errors.business_name ? "business_name-error" : undefined} />
                    </FormField>
                    <FormField id="email" label="Work email" error={errors.email?.[0]}>
                      <Input id="email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@business.com" value={form.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
                    </FormField>
                    <FormField id="phone" label="Phone number" error={errors.phone?.[0]}>
                      <Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={24} placeholder="(555) 123-4567" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
                    </FormField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField id="business_type" label="Business type" error={errors.business_type?.[0]}>
                      <select id="business_type" name="business_type" value={form.business_type} onChange={(event) => updateField("business_type", event.target.value as InquiryForm["business_type"])} aria-invalid={Boolean(errors.business_type)} aria-describedby={errors.business_type ? "business_type-error" : undefined} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option value="">Choose a category</option>
                        {businessTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                      </select>
                    </FormField>
                    <FormField id="service_area" label="City, neighborhood, or ZIP" error={errors.service_area?.[0]}>
                      <Input id="service_area" name="service_area" autoComplete="address-level2" maxLength={140} placeholder="Austin, TX" value={form.service_area} onChange={(event) => updateField("service_area", event.target.value)} aria-invalid={Boolean(errors.service_area)} aria-describedby={errors.service_area ? "service_area-error" : undefined} />
                    </FormField>
                  </div>
                  <FormField id="website" label="Business website" error={errors.website?.[0]}>
                    <Input id="website" name="website" type="url" autoComplete="url" maxLength={300} placeholder="https://yourbusiness.com" value={form.website} onChange={(event) => updateField("website", event.target.value)} aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "website-error" : undefined} />
                  </FormField>
                  {submissionState === "error" && <p role="alert" className="text-sm text-destructive">We couldn’t send your details just now. Please try again.</p>}
                  <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 w-full rounded-md">
                    {isSubmitting ? "Sending your details…" : "Request my visibility snapshot"}
                    {!isSubmitting && <ArrowRight aria-hidden="true" />}
                  </Button>
                  <p className="text-center text-xs leading-5 text-muted-foreground">Your details are used only to respond to this request.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}