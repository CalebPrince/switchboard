-- Phase 1 MVP schema: BYOK multi-LLM chat app.
-- Run this in the Supabase SQL editor for a fresh project.

create table provider_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('openai','anthropic','google')),
  label text,
  key_hint text not null,        -- last 4 chars, plaintext, safe to display
  ciphertext text not null,      -- base64 AES-256-GCM ciphertext
  iv text not null,
  auth_tag text not null,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider)
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New chat',
  provider text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade, -- denormalized for single-table RLS
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  model text,
  created_at timestamptz not null default now()
);

create index on conversations (user_id, updated_at desc);
create index on messages (conversation_id, created_at);
create index on provider_keys (user_id);

alter table provider_keys enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

create policy "own rows" on provider_keys for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on conversations for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on messages for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
