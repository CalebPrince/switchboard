import type { SupabaseClient } from "@supabase/supabase-js";
import { decryptSecret, encryptSecret } from "@/lib/crypto";
import type { ProviderId } from "@/lib/ai/models";

export type KeyMetadata = {
  id: string;
  provider: ProviderId;
  label: string | null;
  keyHint: string;
  lastVerifiedAt: string | null;
  createdAt: string;
};

export async function listKeyMetadata(
  supabase: SupabaseClient,
  userId: string,
): Promise<KeyMetadata[]> {
  const { data, error } = await supabase
    .from("provider_keys")
    .select("id, provider, label, key_hint, last_verified_at, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    provider: row.provider,
    label: row.label,
    keyHint: row.key_hint,
    lastVerifiedAt: row.last_verified_at,
    createdAt: row.created_at,
  }));
}

export async function getKeyForProvider(
  supabase: SupabaseClient,
  userId: string,
  provider: ProviderId,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("provider_keys")
    .select("ciphertext, iv, auth_tag")
    .eq("user_id", userId)
    .eq("provider", provider)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return decryptSecret({
    ciphertext: data.ciphertext,
    iv: data.iv,
    authTag: data.auth_tag,
  });
}

export async function upsertKey(
  supabase: SupabaseClient,
  userId: string,
  provider: ProviderId,
  rawKey: string,
  label?: string,
): Promise<void> {
  const { ciphertext, iv, authTag } = encryptSecret(rawKey);
  const keyHint = rawKey.slice(-4);

  const { error } = await supabase.from("provider_keys").upsert(
    {
      user_id: userId,
      provider,
      label: label ?? null,
      key_hint: keyHint,
      ciphertext,
      iv,
      auth_tag: authTag,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,provider" },
  );

  if (error) throw error;
}

export async function markKeyVerified(
  supabase: SupabaseClient,
  userId: string,
  provider: ProviderId,
): Promise<void> {
  const { error } = await supabase
    .from("provider_keys")
    .update({ last_verified_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("provider", provider);

  if (error) throw error;
}

export async function deleteKey(
  supabase: SupabaseClient,
  userId: string,
  provider: ProviderId,
): Promise<void> {
  const { error } = await supabase
    .from("provider_keys")
    .delete()
    .eq("user_id", userId)
    .eq("provider", provider);

  if (error) throw error;
}
