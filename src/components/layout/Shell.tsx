"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/layout/Sidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export interface ShellProps {
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  children: React.ReactNode;
  sidebarCollapsible?: boolean;
  sidebarHomeHref?: string;
}

export function Shell({
  title,
  subtitle,
  navItems,
  children,
  sidebarCollapsible = false,
  sidebarHomeHref = "/",
}: Readonly<ShellProps>) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="flex min-h-[900px] w-full flex-1 border border-primary bg-surface p-5">
        <Sidebar navItems={navItems} pathname={pathname} title="CourseFlow" collapsible={sidebarCollapsible} homeHref={sidebarHomeHref} />
        <div className="flex min-h-[900px] flex-1 flex-col pb-16 lg:pb-0">
          <Topbar
            title={title}
            subtitle={subtitle}
            mobileNavItems={navItems.map((item) => ({
              href: item.href,
              label: item.label,
              icon: item.icon,
              ...(item.match ? { match: item.match } : {}),
            }))}
          />
          <main id="main-content" className="flex-1 space-y-6 px-4 py-8 md:px-14 md:py-10">
            {children}
          </main>
        </div>
      </div>
      <footer className="w-full border-t border-black bg-black px-4 py-4 text-center font-data text-caption text-white md:px-8">
        <span className="inline-flex items-center gap-1 align-middle">
          <span>CourseFlow</span>
          <span className="leading-none">©</span>
          <span>2026</span>
        </span>
      </footer>
    </div>
  );
}
