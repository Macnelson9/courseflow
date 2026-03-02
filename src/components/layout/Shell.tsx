"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/layout/Sidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileNav } from "@/components/layout/MobileNav";

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
    <div className="min-h-screen bg-background p-5 text-foreground">
      <div className="flex min-h-[900px] w-full border border-primary bg-surface">
        <Sidebar navItems={navItems} pathname={pathname} title="CourseFlow" collapsible={sidebarCollapsible} homeHref={sidebarHomeHref} />
        <div className="flex min-h-[900px] flex-1 flex-col pb-16 lg:pb-0">
          <Topbar title={title} subtitle={subtitle} />
          <main id="main-content" className="flex-1 space-y-6 px-4 py-8 md:px-14 md:py-10">
            {children}
          </main>
        </div>
      </div>
      <MobileNav
        items={navItems.map((item) => ({
          href: item.href,
          label: item.label,
          icon: item.icon,
          ...(item.match ? { match: item.match } : {}),
        }))}
      />
    </div>
  );
}
