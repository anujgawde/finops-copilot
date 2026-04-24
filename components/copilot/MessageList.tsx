"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/types";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";

type Props = {
  messages: Message[];
  onChipClick: (text: string) => void;
};

export function MessageList({ messages, onChipClick }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      className="flex-1 overflow-y-auto scroll-thin px-4 md:px-8 py-6 space-y-5"
    >
      {messages.map((msg) =>
        msg.role === "user" ? (
          <UserMessage key={msg.id} message={msg} />
        ) : (
          <AssistantMessage key={msg.id} message={msg} onChipClick={onChipClick} />
        ),
      )}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
}
