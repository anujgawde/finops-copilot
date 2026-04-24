"use client";

import { useCallback, useRef, useState } from "react";
import type { Block, FlowKey, Message } from "./types";
import { FLOW_CHIPS } from "./types";
import { FLOWS } from "./conversations";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _counter = 0;
const uid = () => String(++_counter);

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function matchFlowKey(text: string): FlowKey | null {
  const lower = text.trim().toLowerCase();
  for (const [key, label] of Object.entries(FLOW_CHIPS)) {
    if (lower === label.toLowerCase()) return key as FlowKey;
  }
  if (lower.includes("spike") || lower.includes("bill") || lower.includes("thursday") || lower.includes("why did")) return "spike";
  if (lower.includes("saving") || lower.includes("opportunit")) return "savings";
  if (lower.includes("board") || lower.includes("draft") || lower.includes("spend update")) return "board";
  return null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCopilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // refs so we can cancel mid-flow without stale state issues
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Core playback — separated so sendFreeText can share it
  const play = useCallback(
    (key: FlowKey, userText: string) => {
      clearAll();

      const flow = FLOWS[key];
      const reduced = prefersReducedMotion();

      const userMsgId = uid();
      const asstMsgId = uid();

      setMessages((prev) => [
        ...prev,
        { role: "user" as const, id: userMsgId, text: userText },
        { role: "assistant" as const, id: asstMsgId, blocks: [], status: "streaming" as const },
      ]);
      setIsStreaming(true);

      // Helper — mutates one assistant message's blocks immutably
      const mutateBlocks = (updater: (bs: Block[]) => Block[]) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === asstMsgId && m.role === "assistant"
              ? { ...m, blocks: updater(m.blocks) }
              : m,
          ),
        );
      };

      for (const action of flow.actions) {
        const t = setTimeout(() => {
          switch (action.type) {
            case "tool-start":
              mutateBlocks((bs) => [
                ...bs,
                { kind: "tool", id: action.id, label: action.label, icon: action.icon, status: "running" },
              ]);
              break;

            case "tool-done":
              mutateBlocks((bs) =>
                bs.map((b) =>
                  b.id === action.id && b.kind === "tool" ? { ...b, status: "done" } : b,
                ),
              );
              break;

            case "text": {
              const { id: blockId, content } = action;
              if (reduced) {
                mutateBlocks((bs) => [...bs, { kind: "text", id: blockId, text: content, revealed: content.length }]);
              } else {
                mutateBlocks((bs) => [...bs, { kind: "text", id: blockId, text: content, revealed: 0 }]);

                // Word-by-word streaming at ~35ms per word
                const words = content.split(" ");
                let charCount = 0;
                let wordIdx = 0;

                intervalRef.current = setInterval(() => {
                  if (wordIdx >= words.length) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    return;
                  }
                  if (wordIdx > 0) charCount += 1; // restore space
                  charCount += words[wordIdx].length;
                  wordIdx++;

                  const reveal = charCount;
                  setMessages((prev) =>
                    prev.map((m) => {
                      if (m.id !== asstMsgId || m.role !== "assistant") return m;
                      return {
                        ...m,
                        blocks: m.blocks.map((b) =>
                          b.id === blockId && b.kind === "text" ? { ...b, revealed: reveal } : b,
                        ),
                      };
                    }),
                  );
                }, 35);
              }
              break;
            }

            case "chart":
              mutateBlocks((bs) => [...bs, { kind: "chart", id: action.id, data: action.data }]);
              break;

            case "table":
              mutateBlocks((bs) => [...bs, { kind: "table", id: action.id, rows: action.rows }]);
              break;

            case "opportunities":
              mutateBlocks((bs) => [...bs, { kind: "opportunities", id: action.id, items: action.items }]);
              break;

            case "exec-summary":
              mutateBlocks((bs) => [...bs, { kind: "exec-summary", id: action.id, summary: action.summary }]);
              break;

            case "actions":
              mutateBlocks((bs) => [...bs, { kind: "actions", id: action.id, actions: action.actions }]);
              break;

            case "followups":
              mutateBlocks((bs) => [...bs, { kind: "followups", id: action.id, chips: action.chips }]);
              break;

            case "done":
              if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === asstMsgId && m.role === "assistant" ? { ...m, status: "done" } : m,
                ),
              );
              setIsStreaming(false);
              break;
          }
        }, action.at);

        timersRef.current.push(t);
      }
    },
    [clearAll],
  );

  const ask = useCallback(
    (key: FlowKey) => {
      play(key, FLOW_CHIPS[key]);
    },
    [play],
  );

  const sendFreeText = useCallback(
    (text: string) => {
      const key = matchFlowKey(text);
      if (key) {
        play(key, text);
        return;
      }

      // Fallback — unrecognised input
      clearAll();
      const userMsgId = uid();
      const asstMsgId = uid();
      const fallbackText =
        "👋 This is a demo — try one of the prompts below. If you're seeing this at Pump: *I'd love to build the real thing with you.*";

      setIsStreaming(false);
      setMessages((prev) => [
        ...prev,
        { role: "user" as const, id: userMsgId, text },
        {
          role: "assistant" as const,
          id: asstMsgId,
          blocks: [
            { kind: "text" as const,      id: uid(), text: fallbackText,                    revealed: fallbackText.length },
            { kind: "followups" as const, id: uid(), chips: Object.values(FLOW_CHIPS) },
          ],
          status: "done" as const,
        },
      ]);
    },
    [play, clearAll],
  );

  const cancel = useCallback(() => {
    clearAll();
    setMessages((prev) =>
      prev.map((m) =>
        m.role === "assistant" && m.status === "streaming" ? { ...m, status: "done" } : m,
      ),
    );
    setIsStreaming(false);
  }, [clearAll]);

  return { messages, isStreaming, ask, sendFreeText, cancel };
}
