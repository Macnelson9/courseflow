"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export interface DashboardLogoutButtonProps {
  loginHref: string;
  className?: string;
  iconOnly?: boolean;
}

export function DashboardLogoutButton({
  loginHref,
  className,
  iconOnly = false,
}: Readonly<DashboardLogoutButtonProps>) {
  const router = useRouter();

  function handleLogout() {
    router.push(loginHref);
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={cn(
        "stack-btn-inverse flex min-h-11 items-center gap-3 border px-3 py-2 font-mono text-caption uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        iconOnly ? "justify-center" : "justify-start",
        className,
      )}
      aria-label="Logout"
    >
      <LogOut className="h-5 w-5" aria-hidden="true" />
      <span className={cn("truncate whitespace-nowrap", iconOnly ? "sr-only" : "")}>Logout</span>
    </button>
  );
}
