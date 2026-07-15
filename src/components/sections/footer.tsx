import Link from "next/link";
import { Sparkle } from "lucide-react";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.394 7.86 10.918.575.106.785-.25.785-.554 0-.274-.01-1.001-.016-1.965-3.196.695-3.872-1.54-3.872-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.044-.714.08-.7.08-.7 1.154.081 1.762 1.185 1.762 1.185 1.026 1.757 2.693 1.25 3.35.956.104-.744.402-1.25.73-1.538-2.552-.29-5.235-1.276-5.235-5.68 0-1.255.448-2.28 1.184-3.083-.12-.29-.513-1.46.112-3.043 0 0 .967-.31 3.17 1.178a10.99 10.99 0 0 1 2.888-.389c.98.005 1.968.133 2.889.389 2.2-1.489 3.166-1.178 3.166-1.178.627 1.583.233 2.753.114 3.043.738.803 1.183 1.828 1.183 3.083 0 4.415-2.688 5.386-5.248 5.67.413.356.78 1.058.78 2.134 0 1.541-.014 2.784-.014 3.163 0 .307.207.665.79.552C20.21 21.39 23.5 17.081 23.5 12 23.5 5.648 18.352.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Use cases", href: "#use-cases" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Providers",
    links: [
      { label: "OpenAI", href: "#" },
      { label: "Anthropic", href: "#" },
      { label: "Google", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Sign up", href: "/signup" },
      { label: "API keys", href: "/settings/api-keys" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-accent">
                <Sparkle className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="font-heading text-lg font-semibold text-ink">
                switchboard
              </span>
            </div>
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-foreground/55">
              One chat, every model, your own keys.
            </p>
            <div className="mt-5 flex gap-3 text-foreground/40">
              <a href="#" aria-label="X (Twitter)" className="hover:text-ink">
                <XIcon />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-ink">
                <GitHubIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-ink">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/55 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-foreground/45 sm:flex-row">
          <p>© 2026 Switchboard. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS &amp; shadcn/ui.</p>
        </div>
      </div>
    </footer>
  );
}
