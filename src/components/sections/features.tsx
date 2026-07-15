import {
  KeyRound,
  Cpu,
  ShieldCheck,
  Zap,
  Percent,
  History,
} from "lucide-react";

const features = [
  {
    icon: KeyRound,
    title: "Bring your own keys",
    description:
      "Add your OpenAI, Anthropic, or Google API key once. It's encrypted at rest and only ever decrypted server-side, for the moment a request is made.",
  },
  {
    icon: Cpu,
    title: "Every model, one thread",
    description:
      "Start a conversation with one model, switch to another mid-thread. No juggling five different tabs and five different logins.",
  },
  {
    icon: Percent,
    title: "No markup, ever",
    description:
      "You pay each provider directly, at their price. Switchboard doesn't sit in the middle of your bill — we're not a reseller.",
  },
  {
    icon: ShieldCheck,
    title: "Your key, your data",
    description:
      "We never see your key in plaintext outside the request that uses it, and your conversations are only ever visible to you.",
  },
  {
    icon: Zap,
    title: "Real streaming",
    description:
      "Responses stream in token by token, the same way they would in each provider's own app — no waiting for a buffered reply.",
  },
  {
    icon: History,
    title: "Full history, kept",
    description:
      "Every conversation is saved and searchable, so you can pick a thread back up days later without losing context.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Features
          </p>
          <h2 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            One place to talk to every model.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            No new subscription, no vendor lock-in — just your existing
            provider keys, unified into one interface.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-ink/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <feature.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
