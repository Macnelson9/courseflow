"use client";

import { useCallback, useEffect, useState } from "react";
import type { QRToken } from "@/lib/types/attendance";

export function useAttendance(fetchToken: () => Promise<QRToken>) {
  const [token, setToken] = useState<QRToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const next = await fetchToken();
      setToken(next);
      setError(null);
    } catch {
      setError("Unable to load attendance QR token.");
    } finally {
      setLoading(false);
    }
  }, [fetchToken]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { token, loading, error, refresh };
}
