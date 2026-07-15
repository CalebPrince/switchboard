"use client";

import type { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function textOf(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { text: string }).text)
    .join("");
}

export function MessageList({ messages }: { messages: UIMessage[] }) {
  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
        {messages.length === 0 && (
          <p className="pt-16 text-center text-sm text-muted-foreground">
            Start the conversation below.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-1",
              message.role === "user" ? "items-end" : "items-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {textOf(message)}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
