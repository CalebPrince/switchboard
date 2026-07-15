import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listConversations } from "@/lib/db/conversations";
import { isAdminEmail } from "@/lib/auth/admin";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const conversations = await listConversations(supabase, user.id);
  const isAdmin = isAdminEmail(user.email);

  return (
    <div className="flex flex-1">
      <Sidebar
        conversations={conversations}
        email={user.email ?? ""}
        isAdmin={isAdmin}
      />
      <main className="flex flex-1 flex-col overflow-hidden bg-background">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
