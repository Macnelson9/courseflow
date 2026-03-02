"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid h-16 grid-cols-4 border-t border-primary bg-primary lg:hidden" aria-label="Mobile navigation">
      {items.slice(0, 5).map((item) => {
        const active = item.match === "exact"
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-1 border-l border-inverse-fg/20 bg-primary text-caption text-inverse-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background",
              active ? "border-inverse-fg/50" : "opacity-85",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="font-mono uppercase tracking-[0.06em]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
