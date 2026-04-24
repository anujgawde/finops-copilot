"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
import clsx from "clsx";

type Props = {
  onSubmit: (text: string) => void;
  isStreaming: boolean;
  onStop: () => void;
};

export function Composer({ onSubmit, isStreaming, onStop }: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ⌘K / Ctrl+K anywhere → focus composer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        textareaRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto-grow textarea (max 3 lines ≈ 72px)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 72)}px`;
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming) return;
    onSubmit(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const canSend = value.trim().length > 0 && !isStreaming;

  return (
    <div className="shrink-0 px-4 md:px-8 pb-5 pt-2">
      <div
        className={clsx(
          "flex items-center gap-3 bg-white border rounded-2xl px-4 py-3 transition-all duration-150",
          focused
            ? "border-mint-400 shadow-glow"
            : "border-ink-200 shadow-card",
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask Pump anything e.g. 'why did we spend more on S3 last week?'"
          rows={1}
          aria-label="Message input"
          className="focus:outline-none h-full w-full flex-1 resize-none text-sm text-ink-900 placeholder-ink-400 bg-transparent outline-none leading-6 overflow-y-auto"
          style={{ maxHeight: 72 }}
        />

        {/* ⌘K hint when unfocused and empty */}
        {!focused && !value && (
          <kbd className="shrink-0 self-center text-ink-400 pointer-events-none">
            ⌘K
          </kbd>
        )}

        {isStreaming ? (
          <button
            onClick={onStop}
            aria-label="Stop generation"
            className="shrink-0 w-8 h-8 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-600 flex items-center justify-center transition-colors"
          >
            <Square size={14} />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!canSend}
            aria-label="Send message"
            className={clsx(
              "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150",
              canSend
                ? "bg-mint-500 hover:bg-mint-600 text-white shadow-sm"
                : "bg-ink-100 text-ink-300 cursor-not-allowed",
            )}
          >
            <ArrowUp size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
