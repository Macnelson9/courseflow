"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectTo?: string;
  children: React.ReactNode;
}

export function ProtectedRoute({ isAuthenticated, redirectTo = "/login", children }: Readonly<ProtectedRouteProps>) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
