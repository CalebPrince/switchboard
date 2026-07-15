import { Search, Code2, PenTool, Lightbulb, GraduationCap } from "lucide-react";

const useCases = [
  {
    tag: "Coding",
    icon: Code2,
    title: "Debug with whichever model reasons best.",
    description:
      "Stuck on a bug? Switch to a different model mid-thread instead of copy-pasting your whole conversation somewhere else.",
  },
  {
    tag: "Writing",
    icon: PenTool,
    title: "Draft with one model, polish with another.",
    description:
      "Different models have different voices. Use the one you like for a first draft, then bring in another for editing.",
  },
  {
    tag: "Research",
    icon: Search,
    title: "Ask once, sanity-check with a second opinion.",
    description:
      "Get an answer, then ask a different model the same question — right in the same place, no extra tabs.",
  },
  {
    tag: "Brainstorming",
    icon: Lightbulb,
    title: "Keep the ideas flowing.",
    description:
      "No rate-limit walls mid-session — you're calling the provider with your own key, on your own plan.",
  },
  {
    tag: "Learning",
    icon: GraduationCap,
    title: "Have a concept explained three different ways.",
    description:
      "Some models are better teachers for some topics. Try a few, keep the explanation that actually clicks.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Use cases
            </p>
            <h2 className="mt-3 max-w-xl font-heading text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Built for however you actually use AI.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-navy p-7 text-cream md:col-span-2 lg:col-span-1 lg:row-span-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Model comparison
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold">
                Ask once, compare across models.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                Send the same question to more than one model without three
                separate windows and three separate logins.
              </p>
            </div>
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-cream/80">
                Explain this error in plain English
              </div>
              <div className="ml-6 flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3 text-sm text-cream/90">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium">
                  GPT-5.1
                </span>
                It&apos;s a null reference — line 42 assumes...
              </div>
              <div className="ml-6 flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-3 text-sm text-cream/90">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium">
                  Claude Sonnet 5
                </span>
                Same root cause, worth also checking...
              </div>
            </div>
          </div>

          {useCases.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl border border-border bg-white p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-ink">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">
                {item.tag}
              </span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
