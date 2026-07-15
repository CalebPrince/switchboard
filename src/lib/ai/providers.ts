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
      // Calling the provider as a function (createOpenAI({...})(modelId))
      // defaults to OpenAI's newer Responses API, not Chat Completions.
      // Chat Completions is the more universally-compatible surface (it's
      // the only one OpenRouter implements below), so use it explicitly.
      return createOpenAI({ apiKey }).chat(modelId);
    case "anthropic":
      return createAnthropic({ apiKey })(modelId);
    case "google":
      return createGoogle({ apiKey })(modelId);
    case "openrouter":
      // OpenRouter only implements the Chat Completions format, not the
      // Responses API -- must use .chat(), or every request fails with
      // "Invalid Responses API request".
      return createOpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
      }).chat(modelId);
  }
}
