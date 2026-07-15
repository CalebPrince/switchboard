export type ProviderId = "openai" | "anthropic" | "google";

export type ModelInfo = {
  providerId: ProviderId;
  modelId: string;
  label: string;
};

export const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "google", label: "Google" },
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
];

export function findModel(
  providerId: string,
  modelId: string,
): ModelInfo | undefined {
  return MODELS.find(
    (m) => m.providerId === providerId && m.modelId === modelId,
  );
}
