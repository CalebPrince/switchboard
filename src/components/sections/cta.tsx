import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-cream px-6 pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-8 py-20 text-center">
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(226,87,31,0.4) 0%, rgba(226,87,31,0) 70%)",
          }}
        />
        <p className="relative text-sm font-semibold uppercase tracking-wider text-accent">
          Ready when you are
        </p>
        <h2 className="relative mx-auto mt-3 max-w-2xl font-heading text-4xl font-medium tracking-tight text-cream sm:text-5xl">
          Stop paying for five subscriptions.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/60">
          Add the keys you already have and start chatting in under a
          minute. No credit card, no new subscription.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href="/signup" />}
            nativeButton={false}
            className="cursor-pointer rounded-full bg-accent px-7 text-base text-white hover:bg-accent/90"
          >
            Start chatting free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/login" />}
            nativeButton={false}
            className="cursor-pointer rounded-full border-cream/20 bg-transparent px-7 text-base text-cream hover:bg-white/10"
          >
            Sign in
          </Button>
        </div>
      </div>
    </section>
  );
}
