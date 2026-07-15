import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getConversation } from "@/lib/db/conversations";
import { listMessages } from "@/lib/db/messages";
import { ChatView } from "@/components/chat/chat-view";
import type { ChatMessageMetadata } from "@/lib/ai/models";
import type { UIMessage } from "ai";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const conversation = await getConversation(supabase, user.id, id);
  if (!conversation) {
    notFound();
  }

  const dbMessages = await listMessages(supabase, id);
  const initialMessages: UIMessage<ChatMessageMetadata>[] = dbMessages.map(
    (m) => ({
      id: m.id,
      role: m.role,
      parts: [{ type: "text", text: m.content }],
      metadata: m.model ? { model: m.model } : undefined,
    }),
  );

  return (
    <ChatView
      conversationId={id}
      initialMessages={initialMessages}
      initialProviderId={conversation.provider}
      initialModelId={conversation.model}
    />
  );
}
