"use client";

import { cn } from "@/lib/utils/cn";
import type { ToastState } from "@/lib/hooks/useToast";

export interface ToastProps {
  toasts: ToastState[];
  onClose: (id: string) => void;
}

const tone: Record<ToastState["variant"], string> = {
  success: "bg-[#000000] text-[#ffffff] border-[#000000]",
  info: "bg-[#ffffff] text-[#000000] border-[#000000]",
  error: "bg-[#000000] text-[#ffffff] border-[#000000]",
};

export function Toast({ toasts, onClose }: Readonly<ToastProps>) {
  return (
    <div
      className="fixed top-4 left-1/2 z-[60] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.variant === "error" ? "alert" : "status"}
          className={cn("toast-enter border p-3 font-mono text-body", tone[toast.variant])}
        >
          <div className="flex items-start justify-between gap-3">
            <p>{toast.message}</p>
            <button
              onClick={() => onClose(toast.id)}
              className="min-h-11 min-w-11 text-center"
              aria-label="Dismiss notification"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
