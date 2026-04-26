"use client";

import Image from "next/image";

type Size = "sm" | "md" | "lg";

const heightMap: Record<Size, number> = {
  sm: 22,
  md: 28,
  lg: 36,
};

export function PumpLogo({ size = "md" }: { size?: Size }) {
  const h = heightMap[size];
  return (
    <Image
      src="/pump-logo.png"
      alt="Pump"
      height={h}
      width={h * 4}
      priority
      style={{ width: "auto", height: h }}
    />
  );
}
