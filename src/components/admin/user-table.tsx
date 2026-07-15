"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import type { AdminUserSummary } from "@/lib/db/admin";
import { banUserAction, unbanUserAction, deleteUserAction } from "@/app/(app)/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminUserTable({
  users,
  currentAdminId,
}: {
  users: AdminUserSummary[];
  currentAdminId: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Joined</th>
            <th className="px-4 py-3 font-medium">Last sign-in</th>
            <th className="px-4 py-3 font-medium">Providers</th>
            <th className="px-4 py-3 font-medium">Chats</th>
            <th className="px-4 py-3 font-medium">Messages</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} user={u} isSelf={u.id === currentAdminId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({
  user,
  isSelf,
}: {
  user: AdminUserSummary;
  isSelf: boolean;
}) {
  const [isBanPending, startBan] = useTransition();
  const [isDeletePending, startDelete] = useTransition();
  const isBanned = !!user.bannedUntil && new Date(user.bannedUntil) > new Date();

  function handleBanToggle() {
    startBan(async () => {
      const result = isBanned
        ? await unbanUserAction(user.id)
        : await banUserAction(user.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(isBanned ? "User unbanned." : "User banned.");
      }
    });
  }

  function handleDelete() {
    startDelete(async () => {
      const result = await deleteUserAction(user.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("User deleted.");
      }
    });
  }

  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-4 py-3">
        <span className="font-medium text-ink">{user.email ?? "—"}</span>
        {isSelf && (
          <Badge variant="outline" className="ml-2">
            You
          </Badge>
        )}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatDate(user.createdAt)}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatDate(user.lastSignInAt)}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {user.providers.length === 0 ? (
            <span className="text-muted-foreground">—</span>
          ) : (
            user.providers.map((p) => (
              <Badge key={p} variant="secondary">
                {p}
              </Badge>
            ))
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {user.conversationCount}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {user.messageCount}
      </td>
      <td className="px-4 py-3">
        {isBanned ? (
          <Badge variant="destructive">Banned</Badge>
        ) : (
          <Badge variant="outline">Active</Badge>
        )}
      </td>
      <td className="px-4 py-3">
        {isSelf ? (
          <span className="text-xs text-muted-foreground">—</span>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isBanPending}
              onClick={handleBanToggle}
            >
              {isBanPending ? "…" : isBanned ? "Unban" : "Ban"}
            </Button>
            <Dialog>
              <DialogTrigger render={<Button variant="destructive" size="sm" />}>
                Delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete {user.email ?? "this user"}?</DialogTitle>
                  <DialogDescription>
                    This permanently deletes the account and all of their
                    conversations, messages, and API keys. This can&apos;t be
                    undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <Button
                    variant="destructive"
                    disabled={isDeletePending}
                    onClick={handleDelete}
                  >
                    {isDeletePending ? "Deleting…" : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </td>
    </tr>
  );
}
