import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProviderId } from "@/lib/ai/models";

export type Conversation = {
  id: string;
  title: string;
  provider: ProviderId;
  model: string;
  createdAt: string;
  updatedAt: string;
};

export async function listConversations(
  supabase: SupabaseClient,
  userId: string,
): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, title, provider, model, created_at, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    provider: row.provider,
    model: row.model,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function getConversation(
  supabase: SupabaseClient,
  userId: string,
  conversationId: string,
): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, title, provider, model, created_at, updated_at")
    .eq("user_id", userId)
    .eq("id", conversationId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    provider: data.provider,
    model: data.model,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function createConversation(
  supabase: SupabaseClient,
  userId: string,
  provider: ProviderId,
  model: string,
  title: string,
  id?: string,
): Promise<Conversation> {
  const { data, error } = await supabase
    .from("conversations")
    .insert({ id, user_id: userId, provider, model, title })
    .select("id, title, provider, model, created_at, updated_at")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    provider: data.provider,
    model: data.model,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function touchConversation(
  supabase: SupabaseClient,
  conversationId: string,
): Promise<void> {
  const { error } = await supabase
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  if (error) throw error;
}
