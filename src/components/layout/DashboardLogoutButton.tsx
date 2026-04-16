"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { authApi } from "@/lib/api/auth";

export interface DashboardLogoutButtonProps {
  loginHref: string;
  className?: string;
  iconOnly?: boolean;
}

export function DashboardLogoutButton({ loginHref, className, iconOnly = false }: Readonly<DashboardLogoutButtonProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const token = document.cookie.match(/courseflow_session=([^;]+)/)?.[1] ?? "";
    try {
      await authApi.logout(token);
    } catch {
      // proceed with logout regardless
    } finally {
      document.cookie = "courseflow_session=; path=/; max-age=0";
      router.push(loginHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={cn(
        "stack-btn-inverse flex min-h-11 items-center gap-3 border px-3 py-2 font-mono text-caption uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60",
        iconOnly ? "justify-center" : "justify-start",
        className,
      )}
      aria-label="Logout"
    >
      <LogOut className={cn("h-5 w-5", loading && "animate-spin")} aria-hidden="true" />
      <span className={cn("truncate whitespace-nowrap", iconOnly ? "sr-only" : "")}>
        {loading ? "Signing out…" : "Logout"}
      </span>
    </button>
  );
}
