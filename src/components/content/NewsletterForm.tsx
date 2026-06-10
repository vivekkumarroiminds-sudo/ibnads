"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

// Provider-agnostic email capture. Wire `onSubmit` to ConvertKit/Beehiiv/etc.
// by posting to an /api route or the provider's endpoint.
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // TODO: replace with real provider call.
      await new Promise((r) => setTimeout(r, 600));
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm font-medium text-positive">
        Thanks — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "" : "rounded-2xl border border-border bg-surface p-6"}>
      {!compact && (
        <>
          <h2 className="text-lg font-semibold text-fg">Get our best reviews, monthly</h2>
          <p className="mt-1 text-sm text-muted">
            No spam. Just our top-tested picks and buying advice.
          </p>
        </>
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="focus-ring h-11 flex-1 rounded-lg border border-border bg-bg px-3 text-sm text-fg placeholder:text-muted"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Subscribe"}
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-negative">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
