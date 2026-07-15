"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { upsertKey, deleteKey, markKeyVerified } from "@/lib/db/keys";
import { resolveModel } from "@/lib/ai/providers";
import { MODELS, PROVIDERS, type ProviderId } from "@/lib/ai/models";
import { generateText } from "ai";

function isProviderId(value: string): value is ProviderId {
  return PROVIDERS.some((p) => p.id === value);
}

export type KeyActionState = { error: string | null; success?: boolean };

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, user };
}

export async function addKey(
  _prevState: KeyActionState,
  formData: FormData,
): Promise<KeyActionState> {
  const provider = String(formData.get("provider") ?? "");
  const rawKey = String(formData.get("apiKey") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim() || undefined;

  if (!isProviderId(provider)) {
    return { error: "Choose a provider." };
  }
  if (!rawKey) {
    return { error: "Enter an API key." };
  }

  try {
    const { supabase, user } = await requireUser();
    await upsertKey(supabase, user.id, provider, rawKey, label);
    revalidatePath("/settings/api-keys");
    return { error: null, success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save key." };
  }
}

export async function deleteKeyAction(provider: string): Promise<void> {
  if (!isProviderId(provider)) return;
  const { supabase, user } = await requireUser();
  await deleteKey(supabase, user.id, provider);
  revalidatePath("/settings/api-keys");
}

export async function testKeyAction(
  provider: string,
): Promise<{ ok: boolean; message: string }> {
  if (!isProviderId(provider)) {
    return { ok: false, message: "Unknown provider." };
  }

  const { supabase, user } = await requireUser();
  const { getKeyForProvider } = await import("@/lib/db/keys");
  const apiKey = await getKeyForProvider(supabase, user.id, provider);

  if (!apiKey) {
    return { ok: false, message: "No key saved for this provider." };
  }

  const model = MODELS.find((m) => m.providerId === provider);
  if (!model) {
    return { ok: false, message: "No model configured for this provider." };
  }

  try {
    await generateText({
      model: resolveModel(provider, model.modelId, apiKey),
      prompt: "Reply with the single word: ok",
    });
    await markKeyVerified(supabase, user.id, provider);
    return { ok: true, message: "Key verified." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Key rejected by provider.",
    };
  }
}
