import type { SupabaseClient } from "@supabase/supabase-js";

export type MessageRole = "user" | "assistant" | "system";

export type Message = {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  model: string | null;
  createdAt: string;
};

export async function listMessages(
  supabase: SupabaseClient,
  conversationId: string,
): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("id, conversation_id, role, content, model, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    conversationId: row.conversation_id,
    role: row.role,
    content: row.content,
    model: row.model,
    createdAt: row.created_at,
  }));
}

export async function appendMessage(
  supabase: SupabaseClient,
  userId: string,
  conversationId: string,
  role: MessageRole,
  content: string,
  model?: string,
): Promise<void> {
  const { error } = await supabase.from("messages").insert({
    user_id: userId,
    conversation_id: conversationId,
    role,
    content,
    model: model ?? null,
  });

  if (error) throw error;
}
