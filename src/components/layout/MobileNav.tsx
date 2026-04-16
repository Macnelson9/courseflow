"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import type { LucideIcon } from "lucide-react";
import { DashboardLogoutButton } from "@/components/layout/DashboardLogoutButton";
import { cn } from "@/lib/utils/cn";

export interface MobileNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match?: "exact" | "prefix";
}

export interface MobileNavProps {
  items: MobileNavItem[];
}

export function MobileNav({ items }: Readonly<MobileNavProps>) {
  const pathname = usePathname();
  const loginHref =
    pathname.startsWith("/admin")
      ? "/login?role=admin"
      : pathname.startsWith("/mentor")
        ? "/login?role=mentor"
        : "/login?role=student";
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.to(backdrop, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(panel, { x: 0, duration: 0.28, ease: "power2.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(backdrop, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
      gsap.to(panel, { x: "100%", duration: 0.24, ease: "power2.inOut" });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close dashboard menu" : "Open dashboard menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="stack-btn-inverse inline-flex min-h-11 min-w-11 items-center justify-center border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
        data-no-gsap="true"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        ref={backdropRef}
        className={cn(
          "fixed inset-0 z-40 bg-black/55 opacity-0 transition-opacity lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <aside
        ref={panelRef}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[min(86vw,360px)] translate-x-full flex-col gap-3 border-l border-white bg-black p-6 pt-20 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-label="Dashboard mobile navigation"
      >
        {(() => {
          const homeActive = pathname === "/";
          return (
        <Link
          href="/"
          data-gsap-button="true"
          data-no-gsap="true"
          className={cn(
            "stack-btn-inverse flex min-h-11 min-w-11 w-full items-center gap-2 border px-4 font-mono text-caption uppercase tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            homeActive ? "stack-btn-inverse-active" : "",
          )}
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
          );
        })()}
        <div className="space-y-3">
          {items.slice(0, 5).map((item) => {
            const active = item.match === "exact"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-gsap-button="true"
                data-no-gsap="true"
                className={cn(
                  "stack-btn-inverse flex min-h-11 min-w-11 w-full items-center gap-2 border px-4 font-mono text-caption uppercase tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  active ? "stack-btn-inverse-active" : "",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <DashboardLogoutButton loginHref={loginHref} className="mt-auto w-full justify-start px-4 tracking-[0.08em]" />
      </aside>
    </>
  );
}
