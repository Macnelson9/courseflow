"use client";

import { BookOpen, CalendarCheck2, Home, Users } from "lucide-react";
import { Shell } from "@/components/layout/Shell";

const studentNav = [
  { label: "Dashboard", href: "/dashboard", icon: Home, match: "exact" as const },
  { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck2 },
  { label: "Course", href: "/", icon: BookOpen, match: "exact" as const },
  { label: "Peers", href: "/dashboard/peers", icon: Users, match: "exact" as const },
];

export function StudentShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Shell
      title="Student Dashboard"
      subtitle="CourseFlow • Intro to Rust • Active"
      navItems={studentNav}
      sidebarCollapsible
      sidebarHomeHref="/"
    >
      {children}
    </Shell>
  );
}
