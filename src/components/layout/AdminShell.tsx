"use client";

import {
  ClipboardList,
  CalendarCheck2,
  BookOpen,
  Home,
  UsersRound,
  UserCheck,
  UserCircle,
} from "lucide-react";
import { Shell } from "@/components/layout/Shell";

const adminNav = [
  { label: "Overview", href: "/admin", icon: Home, match: "exact" as const },
  { label: "Acceptance", href: "/admin/acceptance", icon: UserCheck },
  { label: "Applications", href: "/admin/applications", icon: ClipboardList },
  { label: "Attendance", href: "/admin/attendance", icon: CalendarCheck2 },
  { label: "Course", href: "/admin/course", icon: BookOpen },
  { label: "Mentors", href: "/admin/mentors", icon: UsersRound },
  { label: "Profile", href: "/admin/profile", icon: UserCircle },
];

export function AdminShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Shell
      title="Admin Dashboard"
      subtitle="Applications • Attendance Session • Cohort Control"
      navItems={adminNav}
      sidebarCollapsible
      sidebarHomeHref="/"
    >
      {children}
    </Shell>
  );
}
