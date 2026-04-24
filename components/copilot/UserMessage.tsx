"use client";

import type { UserMessage as UserMsg } from "@/lib/types";

type Props = { message: UserMsg };

export function UserMessage({ message }: Props) {
  return (
    <div className="flex justify-end animate-fade-in">
      <div className="max-w-[75%] md:max-w-[65ch] bg-ink-800 text-white text-sm font-medium px-4 py-2.5 rounded-2xl rounded-br-sm leading-relaxed">
        {message.text}
      </div>
    </div>
  );
}
