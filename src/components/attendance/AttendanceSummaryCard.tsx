import Link from "next/link";
import { Card } from "@/components/ui/Card";

export interface AttendanceSummaryCardProps {
  attended: number;
  total: number;
  strikes: number;
  compact?: boolean;
}

export function AttendanceSummaryCard({
  attended,
  total,
  strikes,
  compact,
}: Readonly<AttendanceSummaryCardProps>) {
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
  const strikeTone =
    strikes >= 2
      ? "text-foreground"
      : strikes === 1
        ? "text-foreground"
        : "text-muted";

  return (
    <Card title="Attendance Summary" headerTone="inverse">
      <p className="text-h2 text-foreground">
        {attended} of {total} classes attended
      </p>
      <div
        className="mt-3 h-3 w-full border border-border bg-background"
        aria-label={`${percentage}% attendance`}
      >
        <div
          className="h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-caption text-muted">{percentage}%</p>
      <p className={`mt-2 font-mono text-caption ${strikeTone}`}>
        {strikes} / 2 absences
      </p>
      <Link
        href="/student/attendance"
        className="mt-3 inline-block font-mono text-caption uppercase underline-offset-2 hover:underline"
      >
        View full history
      </Link>
    </Card>
  );
}
