import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Why do I need to bring my own API key?",
    answer:
      "So we're never in a position to resell or ration access to a model. Your key means your usage, your rate limits, and your bill — straight from the provider, with nothing marked up in between.",
  },
  {
    question: "Is my API key safe?",
    answer:
      "Your key is encrypted before it's stored, and only decrypted on the server for the moment a request is made to that provider. It's never sent to your browser and never logged.",
  },
  {
    question: "Which providers can I connect?",
    answer:
      "OpenAI, Anthropic, and Google today, with more providers on the way. You can add a key for any or all of them and switch between their models freely.",
  },
  {
    question: "How much does Switchboard cost?",
    answer:
      "Switchboard itself is free to use. You pay each provider directly for the tokens you use, at their normal rate — the same as if you'd used their app.",
  },
  {
    question: "What happens to my chat history?",
    answer:
      "Every conversation is saved to your account so you can pick it back up later. It's visible only to you, and you can delete a conversation any time.",
  },
  {
    question: "What if I don't have an API key yet?",
    answer:
      "Each provider offers a straightforward way to generate one from their own developer console. Once you have it, adding it to Switchboard takes about thirty seconds.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-cream py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink">
            Questions, answered.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Everything we get asked most about bringing your own keys.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-white p-6">
            <p className="font-heading text-lg font-semibold text-ink">
              Ready to try it?
            </p>
            <p className="mt-1 text-sm text-foreground/60">
              Add a key and send your first message in under a minute.
            </p>
            <Button
              render={<Link href="/signup" />}
              nativeButton={false}
              className="mt-5 cursor-pointer rounded-full bg-ink text-cream hover:bg-ink/90"
            >
              Get started
            </Button>
          </div>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="cursor-pointer text-left font-heading text-base font-medium text-ink hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/65">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
