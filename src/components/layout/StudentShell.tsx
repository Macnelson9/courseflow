"use client";

import { BookOpen, CalendarCheck2, Home, UserCircle } from "lucide-react";
import { Shell } from "@/components/layout/Shell";

const studentNav = [
  {
    label: "Dashboard",
    href: "/student",
    icon: Home,
    match: "exact" as const,
  },
  { label: "Attendance", href: "/student/attendance", icon: CalendarCheck2 },
  { label: "Course", href: "/student/course", icon: BookOpen },
  { label: "Profile", href: "/student/profile", icon: UserCircle },
];

export function StudentShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
