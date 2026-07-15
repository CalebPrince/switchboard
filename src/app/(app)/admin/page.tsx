import { notFound, redirect } from "next/navigation";
import { requireAdmin, AdminAuthError } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { listUsersWithStats } from "@/lib/db/admin";
import { AdminUserTable } from "@/components/admin/user-table";

export default async function AdminPage() {
  let user;
  try {
    ({ user } = await requireAdmin());
  } catch (err) {
    if (err instanceof AdminAuthError && err.reason === "UNAUTHENTICATED") {
      redirect("/login");
    }
    // Not an admin -- plain 404 gives no signal the route exists.
    notFound();
  }

  const users = await listUsersWithStats(createAdminClient());

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          Users
        </h1>
        <p className="text-sm text-muted-foreground">
          {users.length} account{users.length === 1 ? "" : "s"}. Counts only
          — conversation content is never shown here.
        </p>
      </div>
      <AdminUserTable users={users} currentAdminId={user.id} />
    </div>
  );
}
