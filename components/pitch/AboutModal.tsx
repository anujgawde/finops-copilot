"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AboutModal({ open, onClose }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 animate-fade-in" />
        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-pop p-7 animate-slide-up focus:outline-none"
          aria-labelledby="about-title"
        >
          {/* Close */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </Dialog.Close>

          <Dialog.Title
            id="about-title"
            className="text-lg font-bold text-ink-900 leading-snug pr-6"
          >
            A Concept for Pump.co by Anuj
          </Dialog.Title>

          {/* Todo: Add content for the card */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
