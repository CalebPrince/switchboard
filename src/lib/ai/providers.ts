import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogle } from "@ai-sdk/google";
import type { LanguageModel } from "ai";
import type { ProviderId } from "./models";

export function resolveModel(
  providerId: ProviderId,
  modelId: string,
  apiKey: string,
): LanguageModel {
  switch (providerId) {
    case "openai":
      return createOpenAI({ apiKey })(modelId);
    case "anthropic":
      return createAnthropic({ apiKey })(modelId);
    case "google":
      return createGoogle({ apiKey })(modelId);
    case "openrouter":
      // OpenRouter exposes an OpenAI-compatible API, so the OpenAI provider
      // factory works against it with just a different base URL.
      return createOpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
      })(modelId);
  }
}
