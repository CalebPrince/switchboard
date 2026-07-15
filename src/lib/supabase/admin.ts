import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client -- bypasses row-level security entirely. Only ever
// construct this after an explicit requireAdmin() check (src/lib/auth/admin.ts),
// and never import this file from a "use client" component.
export function createAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set to create an admin client",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
