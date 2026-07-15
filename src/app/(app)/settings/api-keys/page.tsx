import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listKeyMetadata } from "@/lib/db/keys";
import { ApiKeysManager } from "@/components/settings/api-keys-manager";

export default async function ApiKeysPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const keys = await listKeyMetadata(supabase, user.id);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          API keys
        </h1>
        <p className="text-sm text-muted-foreground">
          Bring your own key for each provider. Keys are encrypted at rest
          and only decrypted on the server when you send a message.
        </p>
      </div>
      <ApiKeysManager initialKeys={keys} />
    </div>
  );
}
