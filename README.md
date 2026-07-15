# Switchboard

One chat, every model, your own keys. Switchboard is a BYOK (bring-your-own-key) interface for OpenAI, Anthropic, and Google — add your own API keys, chat with any of them from one thread, and switch models mid-conversation. There's no reseller markup: you pay each provider directly, at their price.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** on **Base UI** primitives
- **Supabase** for auth and Postgres (encrypted API keys, conversations, messages)
- **Vercel AI SDK** (`ai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`) for streaming chat completions

> This repo runs on a Next.js version with some renamed conventions vs. what you may expect — notably `middleware.ts` is `src/proxy.ts` (exporting `proxy` instead of `middleware`, Node runtime only). See `node_modules/next/dist/docs/` if something looks unfamiliar.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a Supabase project**, then run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. It creates `provider_keys`, `conversations`, and `messages` with row-level security scoped to `auth.uid()`.

3. **Set up environment variables.** Copy the template and fill it in:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Where to get it |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
   | `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally; your deployed URL in production |
   | `KEY_ENCRYPTION_SECRET` | A 32-byte base64 secret: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Sign up, add an API key under Settings → API keys, and start a chat.

## Project structure

```
src/app/(marketing)/   Public landing page
src/app/(auth)/        Login / signup
src/app/(app)/         Authenticated app (dashboard, chat, settings) — auth-gated in src/proxy.ts
src/app/api/chat/      Streaming chat route handler
src/lib/ai/            Model catalog + provider resolution (Vercel AI SDK)
src/lib/crypto.ts      AES-256-GCM encrypt/decrypt for stored API keys
src/lib/db/            Supabase query helpers (keys, conversations, messages)
src/lib/supabase/      Supabase client factories (server, browser, proxy middleware)
supabase/schema.sql    Database schema + RLS policies
```

API keys are encrypted with `KEY_ENCRYPTION_SECRET` before they're stored, and only decrypted server-side for the moment a request is sent to a provider — they're never sent to the client or logged.

## Deployment

Deploys to Netlify with zero extra config (Next.js 16, including `proxy.ts`, is supported out of the box). In the Netlify dashboard, set the same four environment variables as above under **Site settings → Environment variables**, using a freshly generated `KEY_ENCRYPTION_SECRET` for production. Then, in Supabase, add `<your-site-url>/auth/callback` to **Auth → URL Configuration → Redirect URLs** so the signup confirmation link works.

## Roadmap

Phase 1 (current) is BYOK-only: no markup, no shared credit pool, no reseller relationship with any provider. A managed credits tier — routed through OpenRouter rather than direct provider agreements — is a possible Phase 2, not yet built.
