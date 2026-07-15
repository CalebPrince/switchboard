"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { banUser, unbanUser, deleteUserAccount } from "@/lib/db/admin";

export type AdminActionState = { error: string | null; success?: boolean };

async function guardTarget(targetUserId: string) {
  const { user } = await requireAdmin();
  if (targetUserId === user.id) {
    return { error: "You can't ban or delete your own account." };
  }
  return null;
}

export async function banUserAction(
  targetUserId: string,
): Promise<AdminActionState> {
  const rejection = await guardTarget(targetUserId);
  if (rejection) return rejection;

  try {
    await banUser(createAdminClient(), targetUserId);
    revalidatePath("/admin");
    return { error: null, success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to ban user." };
  }
}

export async function unbanUserAction(
  targetUserId: string,
): Promise<AdminActionState> {
  const rejection = await guardTarget(targetUserId);
  if (rejection) return rejection;

  try {
    await unbanUser(createAdminClient(), targetUserId);
    revalidatePath("/admin");
    return { error: null, success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to unban user.",
    };
  }
}

export async function deleteUserAction(
  targetUserId: string,
): Promise<AdminActionState> {
  const rejection = await guardTarget(targetUserId);
  if (rejection) return rejection;

  try {
    await deleteUserAccount(createAdminClient(), targetUserId);
    revalidatePath("/admin");
    return { error: null, success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to delete user.",
    };
  }
}
