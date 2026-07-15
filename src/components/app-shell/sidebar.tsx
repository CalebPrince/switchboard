import Link from "next/link";
import { Plus } from "lucide-react";
import type { Conversation } from "@/lib/db/conversations";
import { UserMenu } from "./user-menu";
import { Button } from "@/components/ui/button";

export function Sidebar({
  conversations,
  email,
}: {
  conversations: Conversation[];
  email: string;
}) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="p-3">
        <Button
          render={<Link href="/chat" />}
          nativeButton={false}
          className="w-full justify-start gap-2"
        >
          <Plus className="size-4" />
          New chat
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2">
        {conversations.length === 0 ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">
            No conversations yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {conversations.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/chat/${c.id}`}
                  className="block truncate rounded-lg px-2 py-2 text-sm hover:bg-secondary"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="border-t border-border p-2">
        <UserMenu email={email} />
      </div>
    </aside>
  );
}
