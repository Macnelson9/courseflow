"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/Card";
import { attendanceApi } from "@/lib/api/attendance";
import { useAttendance } from "@/lib/hooks/useAttendance";
import { useCountdown } from "@/lib/hooks/useCountdown";

export interface QRCodeDisplayProps {
  studentId: string;
  sessionActive: boolean;
}

export function QRCodeDisplay({ studentId, sessionActive }: Readonly<QRCodeDisplayProps>) {
  const [secondsBase, setSecondsBase] = useState(120);

  const fetchQRToken = useCallback(async () => {
    const token = await attendanceApi.getQRToken(studentId);
    setSecondsBase(token.expiresInSeconds || 120);
    return token;
  }, [studentId]);

  const { token, loading, error, refresh } = useAttendance(fetchQRToken);

  const { seconds, reset } = useCountdown(secondsBase, async () => {
    const nextToken = await fetchQRToken();
    setSecondsBase(nextToken.expiresInSeconds || 120);
    reset(nextToken.expiresInSeconds || 120);
  });

  const progress = useMemo(() => {
    if (secondsBase <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((seconds / secondsBase) * 100)));
  }, [seconds, secondsBase]);

  if (!sessionActive) {
    return (
      <Card title="Attendance QR">
        <p className="font-mono text-body text-muted">No attendance session is open today.</p>
      </Card>
    );
  }

  return (
    <Card title="Attendance QR" description="Refreshes every 2 minutes" aria-busy={loading}>
      {error ? <p className="font-mono text-caption text-foreground">{error}</p> : null}
      {token ? (
        <div className="space-y-4">
          <QRCodeSVG
            value={token.tokenUrl}
            size={220}
            role="img"
            aria-label="Your attendance QR code. Show this to your instructor."
            className="border border-border bg-surface p-3"
          />
          <div>
            <div className="h-2 w-full border border-border bg-background">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 font-mono text-caption text-muted">
              Refreshes in {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
            </p>
          </div>
        </div>
      ) : null}
      <div className="mt-4 flex items-center gap-4 font-mono text-caption">
        <button type="button" onClick={() => void refresh()} className="underline-offset-2 hover:underline">
          Refresh now
        </button>
        <Link href="/dashboard/attendance#manual" className="underline-offset-2 hover:underline">
          Having trouble?
        </Link>
      </div>
    </Card>
  );
}
