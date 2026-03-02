import { cn } from "@/lib/utils/cn";

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: Readonly<AuthCardProps>) {
  return (
    <section className={cn("w-full max-w-[420px] space-y-6 border border-border bg-surface p-6 sm:p-8 sm:shadow-card", className)}>
      {children}
    </section>
  );
}
