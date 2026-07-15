"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import Link from "next/link";
import { ModelPicker } from "./model-picker";
import { MessageList } from "./message-list";
import { Composer } from "./composer";
import { MODELS, type ProviderId } from "@/lib/ai/models";
import { Button } from "@/components/ui/button";

export function ChatView({
  conversationId,
  initialMessages = [],
  initialProviderId,
  initialModelId,
}: {
  conversationId: string;
  initialMessages?: UIMessage[];
  initialProviderId?: ProviderId;
  initialModelId?: string;
}) {
  const router = useRouter();
  const [providerId, setProviderId] = useState<ProviderId>(
    initialProviderId ?? MODELS[0].providerId,
  );
  const [modelId, setModelId] = useState<string>(
    initialModelId ?? MODELS[0].modelId,
  );
  const [isNew, setIsNew] = useState(initialMessages.length === 0);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport,
    onFinish: () => {
      // Only navigate to the permanent URL once a response has actually
      // completed -- the conversation row is only guaranteed to exist on
      // the server at that point. Navigating eagerly (e.g. right after
      // calling sendMessage) 404s if the send fails before ever creating
      // it, such as when no API key is configured for the provider.
      if (isNew) {
        setIsNew(false);
        router.replace(`/chat/${conversationId}`);
        router.refresh();
      }
    },
  });

  const isStreaming = status === "submitted" || status === "streaming";

  function handleSend(text: string) {
    sendMessage({ text }, { body: { conversationId, providerId, modelId } });
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <ModelPicker
          providerId={providerId}
          modelId={modelId}
          onChange={(p, m) => {
            setProviderId(p);
            setModelId(m);
          }}
          disabled={!isNew}
        />
      </div>

      <MessageList messages={messages} />

      {error && (
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 pb-2 text-sm text-destructive">
          <span>{error.message}</span>
          {/* Only points at Settings for errors that are actually about a
              missing/invalid key -- other failures (rate limits, provider
              outages, etc.) shouldn't send someone to re-check a key that
              already works. */}
          {/api key/i.test(error.message) && (
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/settings/api-keys" />}
              nativeButton={false}
            >
              Add key
            </Button>
          )}
        </div>
      )}

      <Composer onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
