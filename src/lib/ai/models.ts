export type ProviderId = "openai" | "anthropic" | "google" | "openrouter";

export type ModelInfo = {
  providerId: ProviderId;
  modelId: string;
  label: string;
};

export const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "google", label: "Google" },
  { id: "openrouter", label: "OpenRouter" },
];

// Static catalog -- the chat route validates every request against this list
// rather than trusting client-supplied provider/model strings directly.
export const MODELS: ModelInfo[] = [
  { providerId: "openai", modelId: "gpt-5.1", label: "GPT-5.1" },
  { providerId: "openai", modelId: "gpt-5.1-mini", label: "GPT-5.1 Mini" },
  {
    providerId: "anthropic",
    modelId: "claude-sonnet-5",
    label: "Claude Sonnet 5",
  },
  {
    providerId: "anthropic",
    modelId: "claude-haiku-4-5-20251001",
    label: "Claude Haiku 4.5",
  },
  {
    providerId: "google",
    modelId: "gemini-3-pro",
    label: "Gemini 3 Pro",
  },
  {
    providerId: "google",
    modelId: "gemini-3-flash",
    label: "Gemini 3 Flash",
  },
  // OpenRouter is an aggregator (its own key, its own billing) rather than
  // a direct model provider -- one key here unlocks its whole catalog, not
  // just these four. Model IDs use OpenRouter's "vendor/model" slugs.
  {
    providerId: "openrouter",
    modelId: "meta-llama/llama-3.3-70b-instruct",
    label: "Llama 3.3 70B",
  },
  {
    providerId: "openrouter",
    modelId: "deepseek/deepseek-chat",
    label: "DeepSeek Chat",
  },
  {
    providerId: "openrouter",
    modelId: "mistralai/mistral-large",
    label: "Mistral Large",
  },
  {
    providerId: "openrouter",
    modelId: "x-ai/grok-4",
    label: "Grok 4",
  },
];

export function findModel(
  providerId: string,
  modelId: string,
): ModelInfo | undefined {
  return MODELS.find(
    (m) => m.providerId === providerId && m.modelId === modelId,
  );
}

// Metadata attached to each assistant UIMessage (see src/app/api/chat/route.ts's
// messageMetadata callback) so the UI can show which model produced it --
// this is what makes mid-conversation model switching visible/trustworthy,
// matching the "switch models mid-thread" promise on the landing page.
export type ChatMessageMetadata = { model?: string };

export function findModelLabel(modelId?: string): string | undefined {
  if (!modelId) return undefined;
  return MODELS.find((m) => m.modelId === modelId)?.label;
}
