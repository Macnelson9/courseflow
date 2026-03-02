"use client";

import { cn } from "@/lib/utils/cn";
import type { ToastState } from "@/lib/hooks/useToast";

export interface ToastProps {
  toasts: ToastState[];
  onClose: (id: string) => void;
}

const tone: Record<ToastState["variant"], string> = {
  success: "bg-primary text-inverse-fg border-primary",
  info: "bg-surface text-foreground border-border",
  error: "bg-foreground text-inverse-fg border-foreground",
};

export function Toast({ toasts, onClose }: Readonly<ToastProps>) {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[min(92vw,420px)] flex-col gap-2 sm:bottom-4 sm:right-4" aria-live="polite">
      {toasts.map((toast) => {
        const role = toast.variant === "error" ? "alert" : "status";
        return (
          <div key={toast.id} role={role} className={cn("border p-3 font-mono text-body", tone[toast.variant])}>
            <div className="flex items-start justify-between gap-3">
              <p>{toast.message}</p>
              <button onClick={() => onClose(toast.id)} className="min-h-11 min-w-11" aria-label="Dismiss notification" type="button">
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
