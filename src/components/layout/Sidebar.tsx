"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  match?: "exact" | "prefix";
}

export interface SidebarProps {
  navItems: NavItem[];
  pathname: string;
  title?: string;
  collapsible?: boolean;
  homeHref?: string;
}
const STUDENT_SIDEBAR_STORAGE_KEY = "courseflow-student-sidebar-collapsed";

export function Sidebar({
  navItems,
  pathname,
  title = "CourseFlow",
  collapsible = false,
  homeHref = "/",
}: Readonly<SidebarProps>) {
  const initials = useMemo(() => (pathname.startsWith("/admin") ? "AD" : "ST"), [pathname]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!collapsible) return;

    const saved = window.localStorage.getItem(STUDENT_SIDEBAR_STORAGE_KEY);
    setCollapsed(saved === "true");
  }, [collapsible]);

  useEffect(() => {
    if (!collapsible) return;
    window.localStorage.setItem(STUDENT_SIDEBAR_STORAGE_KEY, String(collapsed));
  }, [collapsed, collapsible]);

  return (
    <aside className={cn("hidden border-r border-black bg-black text-white lg:flex lg:flex-col", collapsible && !collapsed ? "w-60" : "w-20")}>
      <div className={cn("flex h-20 items-center px-3", collapsible && !collapsed ? "justify-between" : "justify-center")}>
        {collapsed ? null : (
          <Link href={homeHref} className="inline-flex h-12 w-12 items-center justify-center border border-surface bg-surface font-sans text-h3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            CF
          </Link>
        )}
        {collapsible ? (
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
            className="stack-btn-inverse inline-flex min-h-11 min-w-11 items-center justify-center border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            data-no-gsap="true"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <ChevronLeft className="h-4 w-4" aria-hidden="true" />}
          </button>
        ) : null}
      </div>
      <nav className="flex-1 space-y-2 p-3" aria-label="Sidebar navigation">
        {navItems.map((item) => {
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
                "stack-btn-inverse flex min-h-11 items-center gap-3 border px-3 py-2 font-mono text-caption uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                collapsible && !collapsed ? "justify-start" : "justify-center",
                active ? "stack-btn-inverse-active" : "",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {collapsible && !collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>
      <div className="p-3">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center border border-surface bg-surface font-mono text-body text-foreground">
          {initials}
        </div>
      </div>
    </aside>
  );
}
