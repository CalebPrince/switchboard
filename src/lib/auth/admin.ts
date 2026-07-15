import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "./admin-email";

export { isAdminEmail };

export class AdminAuthError extends Error {
  reason: "UNAUTHENTICATED" | "FORBIDDEN";

  constructor(reason: "UNAUTHENTICATED" | "FORBIDDEN") {
    super(reason === "UNAUTHENTICATED" ? "Not signed in" : "Not an admin");
    this.reason = reason;
  }
}

export async function requireAdmin(): Promise<{ user: User }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new AdminAuthError("UNAUTHENTICATED");
  }
  if (!isAdminEmail(user.email)) {
    throw new AdminAuthError("FORBIDDEN");
  }

  return { user };
}
