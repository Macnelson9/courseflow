"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: Readonly<ModalProps>) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm transition duration-150"
      onClick={onClose}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-black bg-black"
        />
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn("relative z-10 w-full border border-black bg-white p-6 text-black shadow-none transition duration-150")}
          onClick={(event) => event.stopPropagation()}
        >
          <h2 id={titleId} className="text-h2 text-black">
            {title}
          </h2>
          <div className="mt-4 text-body text-black">{children}</div>
          {footer ? <footer className="mt-6">{footer}</footer> : null}
        </div>
      </div>
    </div>
  );
}
