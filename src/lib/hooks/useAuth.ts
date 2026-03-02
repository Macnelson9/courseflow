"use client";

import { useCallback, useState } from "react";
import type { Session, User } from "@/lib/types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (resolver: () => Promise<Session>) => {
    setIsLoading(true);
    try {
      const session = await resolver();
      setUser(session.user);
      return session;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return { user, isLoading, login, logout };
}
