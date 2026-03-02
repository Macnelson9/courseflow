import { Button } from "@/components/ui/Button";

export interface AttendanceSessionProps {
  open: boolean;
  startedAt?: string;
  onClose: () => void;
}

export function AttendanceSession({ open, startedAt, onClose }: Readonly<AttendanceSessionProps>) {
  if (!open) {
    return null;
  }

  return (
    <section className="flex flex-wrap items-center justify-between gap-3 border border-border bg-surface p-4">
      <p className="font-mono text-body">Session Open{startedAt ? ` · Started at ${startedAt}` : ""}</p>
      <Button variant="destructive" onClick={onClose}>Close Session</Button>
    </section>
  );
}
