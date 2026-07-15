import { Plus, MessageSquare } from "lucide-react";

const conversations = [
  { title: "Why does this useEffect fire twice", active: true },
  { title: "Trip itinerary — Lisbon, 4 days", active: false },
  { title: "Rewrite this cover letter", active: false },
  { title: "CAP theorem, explained simply", active: false },
];

const messages = [
  {
    role: "user" as const,
    text: "Why does this useEffect fire twice in dev?",
  },
  {
    role: "assistant" as const,
    model: "GPT-5.1",
    text: "That's React 19 Strict Mode — it intentionally double-invokes effects in development to surface missing cleanup functions. Won't happen in production.",
  },
  {
    role: "user" as const,
    text: "Can Claude double check that for me?",
  },
  {
    role: "assistant" as const,
    model: "Claude Sonnet 5",
    text: "Confirmed — same behavior. Worth adding a cleanup function too if your effect touches a subscription or timer.",
  },
];

export function ProductPreview() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            What you&apos;ll see inside
          </p>
          <h2 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Your dashboard, and a real conversation.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            No login required to see what it looks like once you&apos;re in.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
          <div className="flex flex-col">
            <p className="mb-3 text-sm font-semibold text-foreground/50">
              Your dashboard
            </p>
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-ink/5">
              <div className="p-3">
                <div className="flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-medium text-cream">
                  <Plus className="h-4 w-4" />
                  New chat
                </div>
              </div>
              <div className="flex-1 space-y-1 px-2 pb-3">
                {conversations.map((c) => (
                  <div
                    key={c.title}
                    className={
                      "flex items-center gap-2 truncate rounded-lg px-2.5 py-2 text-sm " +
                      (c.active
                        ? "bg-muted font-medium text-ink"
                        : "text-foreground/60")
                    }
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-foreground/35" />
                    <span className="truncate">{c.title}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-border p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                  A
                </span>
                <span className="truncate text-sm text-foreground/60">
                  you@example.com
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="mb-3 text-sm font-semibold text-foreground/50">
              One thread, every model
            </p>
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-navy shadow-xl shadow-ink/10">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="text-xs font-medium text-cream/40">
                  Why does this useEffect fire twice
                </span>
              </div>

              <div className="flex-1 space-y-3 p-5">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={
                      "flex " +
                      (m.role === "user" ? "justify-end" : "justify-start")
                    }
                  >
                    <div
                      className={
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
                        (m.role === "user"
                          ? "bg-accent text-white"
                          : "bg-white/8 text-cream/90")
                      }
                    >
                      {m.role === "assistant" && (
                        <span className="mb-1.5 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-cream/60">
                          {m.model}
                        </span>
                      )}
                      <p>{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2.5 text-sm text-cream/40">
                  Message…
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
