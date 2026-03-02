"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/apply", label: "Apply" },
  { href: "/login?role=student", label: "Student Login" },
  { href: "/login?role=admin", label: "Admin Login" },
];

const mobileNavItems: NavItem[] = navItems.filter((item) => item.label !== "Welcome");

const buttonClass =
  "stack-btn-inverse inline-flex min-h-11 min-w-11 items-center justify-center border px-4 font-mono text-caption uppercase tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2";

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);

  function setItemRef(el: HTMLAnchorElement | null, index: number) {
    if (!el) return;
    itemRefs.current[index] = el;
  }

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
      gsap.fromTo(
        itemRefs.current,
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.22, stagger: 0.04, ease: "power2.out", delay: 0.08 },
      );
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
      <nav className="hidden flex-wrap items-center gap-5 font-data text-caption uppercase lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-gsap-button="true"
            data-no-gsap="true"
            className={buttonClass}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
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
          "fixed right-0 top-0 z-50 flex h-full w-[min(86vw,360px)] translate-x-full flex-col gap-6 border-l border-black bg-black p-6 pt-20 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-label="Mobile navigation"
      >
        {mobileNavItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => setItemRef(el, index)}
            data-gsap-button="true"
            data-no-gsap="true"
            className={buttonClass}
          >
            {item.label}
          </Link>
        ))}
      </aside>
    </>
  );
}
