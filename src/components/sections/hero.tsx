import Link from "next/link";
import { ArrowRight, ArrowUp, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #171220 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(226,87,31,0.35) 0%, rgba(226,87,31,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 text-center lg:pt-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground/70 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Bring your own keys — no markup, ever
        </div>

        <h1 className="font-heading text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          One chat.
          <br />
          Every model.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-foreground/70 sm:text-lg">
          Switchboard is the unified interface for OpenAI, Anthropic, Google,
          and more. Add your own API keys, switch models mid-conversation,
          and pay each provider directly — we never mark up a token.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href="/signup" />}
            nativeButton={false}
            className="cursor-pointer rounded-full bg-ink px-7 text-base text-cream hover:bg-ink/90"
          >
            Start chatting free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="#how-it-works" />}
            nativeButton={false}
            className="cursor-pointer rounded-full border-border bg-white px-7 text-base text-ink hover:bg-white/80"
          >
            See how it works
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-5 text-sm text-foreground/50">
          Free to use · You only pay your model providers, directly
        </p>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="rounded-2xl border border-border bg-white p-2 text-left shadow-xl shadow-ink/5">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-3">
              <KeyRound className="h-4 w-4 shrink-0 text-foreground/40" />
              <span className="flex-1 text-sm text-foreground/40">
                Message any model…
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-foreground/60 shadow-sm">
                Claude Sonnet 5
              </span>
              <button
                aria-label="Send"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-cream transition-colors hover:bg-ink/90"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
