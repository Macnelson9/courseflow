"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

export function Tooltip({ label, children }: Readonly<TooltipProps>) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>{children}</span>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 border border-border bg-primary px-2 py-1 font-mono text-caption text-inverse-fg transition",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {label}
      </span>
    </span>
  );
}
