import { randomUUID } from "node:crypto";
import { ChatView } from "@/components/chat/chat-view";

export default function NewChatPage() {
  const conversationId = randomUUID();
  return <ChatView conversationId={conversationId} />;
}
