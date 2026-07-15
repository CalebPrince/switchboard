"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-accent">
            <Sparkle className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight text-ink">
            switchboard
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="cursor-pointer text-sm font-medium text-foreground/80 transition-colors hover:text-ink"
          >
            Sign in
          </Link>
          <Button
            render={<Link href="/signup" />}
            nativeButton={false}
            className="cursor-pointer rounded-full bg-ink px-5 text-cream hover:bg-ink/90"
          >
            Get started
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="cursor-pointer text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-left text-sm font-medium text-foreground/80"
              >
                Sign in
              </Link>
              <Button
                render={<Link href="/signup" onClick={() => setOpen(false)} />}
                nativeButton={false}
                className="cursor-pointer rounded-full bg-ink text-cream hover:bg-ink/90"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
