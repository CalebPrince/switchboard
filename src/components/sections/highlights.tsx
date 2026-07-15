"use client";

import { useState } from "react";
import { RefreshCw, KeyRound, Zap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: RefreshCw,
    label: "Switch models mid-thread.",
    title: "Change your mind without losing the thread",
    description:
      "Start with one model, switch to another for the next message — the whole conversation stays in one place.",
  },
  {
    icon: KeyRound,
    label: "Manage every key in one spot.",
    title: "One settings page for every provider",
    description:
      "Add, test, and remove keys for OpenAI, Anthropic, and Google without leaving the app or juggling separate dashboards.",
  },
  {
    icon: Zap,
    label: "Watch responses stream.",
    title: "Real streaming, not a spinner",
    description:
      "Tokens arrive as the model generates them, the same way they would in each provider's own product.",
  },
  {
    icon: Lock,
    label: "Stay in control of your keys.",
    title: "Encrypted at rest, decrypted only to send your message",
    description:
      "Your keys are encrypted the moment you add them, and only ever decrypted server-side for the instant a request goes out.",
  },
];

export function Highlights() {
  const [active, setActive] = useState(0);
  const current = highlights[active];

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Highlights
          </p>
          <h2 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Built around your keys, not ours.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Everything about Switchboard starts from the same idea:
            it&apos;s your key, your provider relationship, your data.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <div className="flex flex-col gap-2">
            {highlights.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setActive(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all",
                  active === index
                    ? "border-accent/30 bg-white text-ink shadow-sm"
                    : "border-transparent text-foreground/45 hover:bg-white/50"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                    active === index
                      ? "bg-accent text-white"
                      : "bg-border/60 text-foreground/40"
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-navy shadow-xl shadow-ink/10">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(226,87,31,0.35), transparent 55%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    Live
                  </span>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-sm font-medium text-cream/90">
                    {current.title}
                  </p>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 w-2/3 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="mt-6 font-heading text-2xl font-semibold text-ink">
              {current.title}
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/65">
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
