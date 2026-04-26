"use client";

import { useState, useCallback } from "react";

export type ViewId = "overview" | "ask-pump";

export type Prefill =
  | { kind: "chip"; chipKey: string }
  | { kind: "text"; text: string }
  | null;

export function useView(initial: ViewId = "overview") {
  const [view, setView] = useState<ViewId>(initial);
  const [prefill, setPrefill] = useState<Prefill>(null);

  const goTo = useCallback((next: ViewId, payload: Prefill = null) => {
    setView(next);
    setPrefill(payload);
  }, []);

  const consumePrefill = useCallback(() => {
    const p = prefill;
    setPrefill(null);
    return p;
  }, [prefill]);

  return { view, prefill, goTo, consumePrefill };
}
