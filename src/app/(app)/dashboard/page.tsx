import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listConversations } from "@/lib/db/conversations";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const conversations = user ? await listConversations(supabase, user.id) : [];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          {conversations.length > 0
            ? "Pick up a conversation from the sidebar, or start a new one."
            : "Add an API key, then start your first chat."}
        </p>
      </div>
      <div className="flex gap-3">
        <Button render={<Link href="/chat" />} nativeButton={false}>
          New chat
        </Button>
        <Button
          variant="outline"
          render={<Link href="/settings/api-keys" />}
          nativeButton={false}
        >
          Manage API keys
        </Button>
      </div>
    </div>
  );
}
