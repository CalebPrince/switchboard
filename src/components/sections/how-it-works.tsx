const steps = [
  {
    number: "01",
    title: "Add your API keys",
    description:
      "Paste in the keys you already have for OpenAI, Anthropic, or Google. Each one is encrypted before it touches the database.",
  },
  {
    number: "02",
    title: "Pick a model",
    description:
      "Choose which model to talk to for this conversation — and switch to a different one any time, without starting over.",
  },
  {
    number: "03",
    title: "Chat",
    description:
      "Messages stream straight from the provider to you. Every thread is saved automatically, so you can come back to it later.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            From API key to first chat in under a minute.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/60">
            No new account with each provider, no separate billing to
            track — just the keys you already have.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 md:block"
            aria-hidden
          />
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="font-heading text-sm font-semibold text-accent">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-cream">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
