import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setStatus("idle");
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Join the Expert Network</DialogTitle>
          <DialogDescription>
            Share your details and we&apos;ll reach out about relevant work in your domain.
          </DialogDescription>
        </DialogHeader>
        {status === "done" ? (
          <p className="py-6 text-sm text-foreground">
            Thank you — your details are with us. We&apos;ll be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
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
              <p className="text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
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
      </DialogContent>
    </Dialog>
  );
}
