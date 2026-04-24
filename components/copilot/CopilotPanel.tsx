"use client";

import { useCopilot } from "@/lib/useCopilot";
import type { FlowKey } from "@/lib/types";
import { MessageList } from "./MessageList";
import { SuggestionChips } from "./SuggestionChips";
import { Composer } from "./Composer";

export function CopilotPanel() {
  const { messages, isStreaming, ask, sendFreeText, cancel } = useCopilot();
  const isEmpty = messages.length === 0;

  const handleChipClick = (text: string) => {
    // Follow-up chips come as text strings; map them to flows if possible
    sendFreeText(text);
  };

  const handleSelect = (key: FlowKey) => {
    ask(key);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 mesh-hero relative">
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <div className="text-center max-w-xl">
            <h1 className="text-3xl md:text-4xl font-display font-black text-ink-900 tracking-tight mb-3 leading-tight">
              Ask Pump anything
              <br className="hidden sm:block" /> about your cloud.
            </h1>
            <p className="text-ink-500 text-base leading-relaxed">
              Your copilot sees every dollar, every service, every tag. Ask it a
              question.
            </p>
          </div>
          <SuggestionChips onSelect={handleSelect} />
          <p className="text-xs text-ink-400">
            or type below and press Enter — <kbd>⌘K</kbd> to focus
          </p>
        </div>
      ) : (
        <MessageList messages={messages} onChipClick={handleChipClick} />
      )}

      <Composer
        onSubmit={sendFreeText}
        isStreaming={isStreaming}
        onStop={cancel}
      />
    </div>
  );
}
