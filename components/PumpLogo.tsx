"use client";

import { useId } from "react";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { icon: number; text: string }> = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 24, text: "text-xl" },
  lg: { icon: 32, text: "text-3xl" },
};

export function PumpLogo({ size = "md" }: { size?: Size }) {
  const uid = useId();
  const gradientId = `pump-logo-g-${uid}`.replace(/:/g, "");
  const { icon, text } = sizeMap[size];

  return (
    <div className="flex items-center gap-2">
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9EF94E" />
            <stop offset="100%" stopColor="#15A365" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="#0A0E1C" />
        <path
          d="M10 22 L10 10 L17 10 Q22 10 22 15 Q22 20 17 20 L13 20"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={clsx(
          "font-display font-extrabold tracking-tight text-ink-900",
          text
        )}
      >
        pump
      </span>
    </div>
  );
}
