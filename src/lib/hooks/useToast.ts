"use client";

import { useCallback, useState } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastState {
  id: string;
  message: string;
  variant: ToastVariant;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const push = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = crypto.randomUUID();
    setToasts((curr) => [...curr, { id, message, variant }]);
    window.setTimeout(() => {
      setToasts((curr) => curr.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((curr) => curr.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, push, remove };
}
