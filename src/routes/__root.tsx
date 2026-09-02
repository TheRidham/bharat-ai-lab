import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Linkedin } from "lucide-react";

import appCss from "../styles.css?url";

import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition-colors hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "SuperAI Base" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const footerGroups = [
  {
    title: "Experts",
    links: [
      { label: "Join the network", href: "mailto:experts@superaibase.com" },
      { label: "How we work", href: "mailto:hello@superaibase.com" },
      { label: "Domains we cover", href: "mailto:hello@superaibase.com" },
      { label: "Expert FAQs", href: "mailto:experts@superaibase.com" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Satya Benchmarks", href: "mailto:research@superaibase.com" },
      { label: "Bharat Environments", href: "mailto:research@superaibase.com" },
      { label: "Custom Evaluations", href: "mailto:research@superaibase.com" },
    ],
  },
  {
    title: "Enterprise",
    links: [
      { label: "Hire Experts", href: "mailto:enterprise@superaibase.com" },
      { label: "Access Datasets", href: "mailto:enterprise@superaibase.com" },
      { label: "Data Monetization", href: "mailto:enterprise@superaibase.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "mailto:careers@superaibase.com" },
      { label: "Privacy policy", href: "mailto:hello@superaibase.com" },
      { label: "Terms of service", href: "mailto:hello@superaibase.com" },
    ],
  },
];

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium text-foreground">{group.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} SuperAI Base</p>
          <a href="mailto:hello@superaibase.com" className="hover:text-foreground">
            hello@superaibase.com
          </a>
          <a
            href="https://www.linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

