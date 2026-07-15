import type { SupabaseClient } from "@supabase/supabase-js";

export type AdminUserSummary = {
  id: string;
  email: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  bannedUntil: string | null;
  conversationCount: number;
  messageCount: number;
  providers: string[];
};

export async function listUsersWithStats(
  adminClient: SupabaseClient,
): Promise<AdminUserSummary[]> {
  const { data: usersPage, error: usersError } =
    await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersError) throw usersError;

  const [conversationsRes, messagesRes, keysRes] = await Promise.all([
    adminClient.from("conversations").select("user_id"),
    adminClient.from("messages").select("user_id"),
    adminClient.from("provider_keys").select("user_id, provider"),
  ]);
  if (conversationsRes.error) throw conversationsRes.error;
  if (messagesRes.error) throw messagesRes.error;
  if (keysRes.error) throw keysRes.error;

  const conversationCounts = new Map<string, number>();
  for (const row of conversationsRes.data ?? []) {
    conversationCounts.set(
      row.user_id,
      (conversationCounts.get(row.user_id) ?? 0) + 1,
    );
  }

  const messageCounts = new Map<string, number>();
  for (const row of messagesRes.data ?? []) {
    messageCounts.set(row.user_id, (messageCounts.get(row.user_id) ?? 0) + 1);
  }

  const providersByUser = new Map<string, Set<string>>();
  for (const row of keysRes.data ?? []) {
    const set = providersByUser.get(row.user_id) ?? new Set<string>();
    set.add(row.provider);
    providersByUser.set(row.user_id, set);
  }

  return usersPage.users.map((u) => ({
    id: u.id,
    email: u.email ?? null,
    createdAt: u.created_at,
    lastSignInAt: u.last_sign_in_at ?? null,
    bannedUntil: u.banned_until ?? null,
    conversationCount: conversationCounts.get(u.id) ?? 0,
    messageCount: messageCounts.get(u.id) ?? 0,
    providers: Array.from(providersByUser.get(u.id) ?? []),
  }));
}

export async function banUser(
  adminClient: SupabaseClient,
  userId: string,
): Promise<void> {
  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    ban_duration: "876000h",
  });
  if (error) throw error;
}

export async function unbanUser(
  adminClient: SupabaseClient,
  userId: string,
): Promise<void> {
  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    ban_duration: "none",
  });
  if (error) throw error;
}

export async function deleteUserAccount(
  adminClient: SupabaseClient,
  userId: string,
): Promise<void> {
  const { error } = await adminClient.auth.admin.deleteUser(userId, false);
  if (error) throw error;
}
