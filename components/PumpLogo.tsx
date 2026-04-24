"use client";

import Image from "next/image";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { markW: number; markH: number; text: string }> = {
  sm: { markW: 24, markH: 22, text: "text-base" },
  md: { markW: 32, markH: 29, text: "text-lg" },
  lg: { markW: 40, markH: 37, text: "text-2xl" },
};

export function PumpLogo({ size = "md" }: { size?: Size }) {
  const { markW, markH, text } = sizeMap[size];
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/pump-logo.png"
        alt="Pump logo mark"
        width={markW}
        height={markH}
        priority
      />
      <span
        className={clsx(
          "font-black tracking-tight text-ink-900 uppercase",
          text,
        )}
      >
        pump
      </span>
    </div>
  );
}
