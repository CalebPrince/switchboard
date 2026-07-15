"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Composer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-2xl items-end gap-2 border-t border-border p-4"
    >
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit(e);
          }
        }}
        placeholder="Message…"
        rows={1}
        className="max-h-40 min-h-10 flex-1 resize-none"
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || value.trim().length === 0}
      >
        <ArrowUp className="size-4" />
      </Button>
    </form>
  );
}
