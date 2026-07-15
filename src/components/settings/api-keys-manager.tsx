"use client";

import { useActionState, useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  addKey,
  deleteKeyAction,
  testKeyAction,
  type KeyActionState,
} from "@/app/(app)/settings/api-keys/actions";
import { PROVIDERS } from "@/lib/ai/models";
import type { KeyMetadata } from "@/lib/db/keys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const initialState: KeyActionState = { error: null };

export function ApiKeysManager({
  initialKeys,
}: {
  initialKeys: KeyMetadata[];
}) {
  const [state, formAction, isPending] = useActionState(
    addKey,
    initialState,
  );
  const [provider, setProvider] = useState<string>("");

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-2">
        {initialKeys.length === 0 && (
          <li className="text-sm text-muted-foreground">
            No keys added yet.
          </li>
        )}
        {initialKeys.map((key) => (
          <KeyRow key={key.id} keyMeta={key} />
        ))}
      </ul>

      <form
        action={formAction}
        className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4"
      >
        <h2 className="font-heading text-sm font-medium text-ink">
          Add a key
        </h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="provider">Provider</Label>
          <input type="hidden" name="provider" value={provider} />
          <Select
            value={provider}
            onValueChange={(value) => setProvider(value ?? "")}
          >
            <SelectTrigger id="provider" className="w-full">
              <SelectValue placeholder="Choose a provider" />
            </SelectTrigger>
            <SelectContent>
              {PROVIDERS.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="apiKey">API key</Label>
          <Input
            id="apiKey"
            name="apiKey"
            type="password"
            autoComplete="off"
            placeholder="sk-..."
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="label">Label (optional)</Label>
          <Input id="label" name="label" placeholder="Personal key" />
        </div>

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button type="submit" disabled={isPending || !provider}>
          {isPending ? "Saving…" : "Save key"}
        </Button>
      </form>
    </div>
  );
}

function KeyRow({ keyMeta }: { keyMeta: KeyMetadata }) {
  const [isTesting, startTest] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const providerLabel =
    PROVIDERS.find((p) => p.id === keyMeta.provider)?.label ?? keyMeta.provider;

  function handleTest() {
    startTest(async () => {
      const result = await testKeyAction(keyMeta.provider);
      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDelete() {
    startDelete(async () => {
      await deleteKeyAction(keyMeta.provider);
      toast.success(`Removed ${providerLabel} key.`);
    });
  }

  return (
    <li className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-ink">
          {providerLabel}
          {keyMeta.label ? ` — ${keyMeta.label}` : ""}
        </span>
        <span className="text-xs text-muted-foreground">
          Ends in {keyMeta.keyHint}
          {keyMeta.lastVerifiedAt ? " · verified" : " · not verified"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isTesting}
          onClick={handleTest}
        >
          {isTesting ? "Testing…" : "Test"}
        </Button>
        <Dialog>
          <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <Trash2 className="size-4" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove {providerLabel} key?</DialogTitle>
              <DialogDescription>
                Chats using {providerLabel} will stop working until you add
                a new key.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? "Removing…" : "Remove"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
