import { Card } from "@/components/ui/Card";
import { formatDate, formatRelativeDay } from "@/lib/utils/dates";

export interface NextClassCardProps {
  date: string;
  time: string;
  duration: string;
  venue: string;
}

export function NextClassCard({ date, time, duration, venue }: Readonly<NextClassCardProps>) {
  return (
    <Card className="bg-primary text-inverse-fg" title="Next Class">
      <p className="text-display text-inverse-fg">{formatDate(date, { weekday: "long", day: "numeric", month: "short" })}</p>
      <p className="mt-2 font-mono text-body text-muted-2">{time} · {duration}</p>
      <p className="mt-1 font-mono text-body text-muted-2">{venue}</p>
      <p className="mt-2 font-mono text-label uppercase">{formatRelativeDay(date)}</p>
    </Card>
  );
}
