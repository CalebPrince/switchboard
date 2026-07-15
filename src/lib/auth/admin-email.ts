// Zero-dependency check, safe to import from src/proxy.ts (via src/lib/supabase/middleware.ts)
// without pulling in next/headers or any Supabase client.
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.trim().toLowerCase());
}
