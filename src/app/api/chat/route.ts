import { NextResponse, type NextRequest } from "next/server";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createClient } from "@/lib/supabase/server";
import { getKeyForProvider } from "@/lib/db/keys";
import { resolveModel } from "@/lib/ai/providers";
import { findModel } from "@/lib/ai/models";
import {
  createConversation,
  getConversation,
  touchConversation,
} from "@/lib/db/conversations";
import { appendMessage } from "@/lib/db/messages";

function extractText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

// The AI SDK's transport reads a non-ok response body as plain text and
// uses it directly as `error.message` on the client -- it does not parse
// JSON, so error responses must be plain text, not NextResponse.json().
function errorResponse(message: string, status: number): NextResponse {
  return new NextResponse(message, { status });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return errorResponse("Not authenticated.", 401);
  }

  const body = await request.json();
  const messages: UIMessage[] = body.messages ?? [];
  const providerId: string = body.providerId;
  const modelId: string = body.modelId;
  let conversationId: string | undefined = body.conversationId;

  const model = findModel(providerId, modelId);
  if (!model) {
    return errorResponse("Unknown model.", 400);
  }

  const apiKey = await getKeyForProvider(supabase, user.id, model.providerId);
  if (!apiKey) {
    return errorResponse(
      `Add an API key for ${model.providerId} in Settings before starting a conversation.`,
      400,
    );
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return errorResponse("Expected the last message to be from the user.", 400);
  }

  if (conversationId) {
    const existing = await getConversation(supabase, user.id, conversationId);
    if (!existing) {
      // First message of a chat whose id was pre-generated on the client
      // (see ChatView) -- create the row now, using that id.
      const title = extractText(lastMessage).slice(0, 50) || "New chat";
      await createConversation(
        supabase,
        user.id,
        model.providerId,
        model.modelId,
        title,
        conversationId,
      );
    }
  } else {
    const title = extractText(lastMessage).slice(0, 50) || "New chat";
    const created = await createConversation(
      supabase,
      user.id,
      model.providerId,
      model.modelId,
      title,
    );
    conversationId = created.id;
  }

  await appendMessage(
    supabase,
    user.id,
    conversationId,
    "user",
    extractText(lastMessage),
  );

  let resolvedModel;
  try {
    resolvedModel = resolveModel(model.providerId, model.modelId, apiKey);
  } catch (err) {
    return errorResponse(
      err instanceof Error ? err.message : "Invalid API key.",
      400,
    );
  }

  const result = streamText({
    model: resolvedModel,
    messages: await convertToModelMessages(messages),
  });

  const finalConversationId = conversationId;

  return result.toUIMessageStreamResponse({
    headers: { "x-conversation-id": finalConversationId },
    onEnd: async ({ messages: finalMessages }) => {
      const assistantMessage = finalMessages[finalMessages.length - 1];
      if (assistantMessage?.role === "assistant") {
        await appendMessage(
          supabase,
          user.id,
          finalConversationId,
          "assistant",
          extractText(assistantMessage),
          model.modelId,
        );
      }
      await touchConversation(supabase, finalConversationId);
    },
  });
}
