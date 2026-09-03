import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ExpertNetworkDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    const { error } = await supabase.from("expert_applications").insert({
      name: name.trim(),
      mobile: mobile.trim(),
      linkedin_url: linkedin.trim(),
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setName("");
    setMobile("");
    setLinkedin("");
  }

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="inline-flex"
      >
        {children}
      </span>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4"
          onClick={() => {
            setOpen(false);
            setStatus("idle");
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Join the Expert Network"
            className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-medium text-foreground">Join the Expert Network</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Share your details and we&apos;ll reach out about relevant work in your domain.
            </p>
            {status === "done" ? (
              <p className="py-6 text-sm text-foreground">
                Thank you — your details are with us. We&apos;ll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="expert-name">Full name</Label>
                  <Input
                    id="expert-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={120}
                    placeholder="Ananya Iyer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expert-mobile">Mobile number</Label>
                  <Input
                    id="expert-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    minLength={6}
                    maxLength={20}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expert-linkedin">LinkedIn URL</Label>
                  <Input
                    id="expert-linkedin"
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    required
                    maxLength={300}
                    placeholder="https://www.linkedin.com/in/…"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "saving"}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "saving" ? "Submitting…" : "Submit"}
                </button>
              </form>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setStatus("idle");
              }}
              className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
