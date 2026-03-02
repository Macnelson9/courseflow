import { StudentShell } from "@/components/layout/StudentShell";

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <StudentShell>{children}</StudentShell>;
}
