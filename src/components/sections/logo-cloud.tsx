const providers = [
  "OpenAI",
  "Anthropic",
  "Google",
  "and more coming soon",
];

export function LogoCloud() {
  return (
    <section className="border-y border-border bg-cream py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-medium text-foreground/50">
          Works with the providers you already have keys for
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {providers.map((name) => (
            <span
              key={name}
              className="font-heading text-lg font-medium tracking-tight text-foreground/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
