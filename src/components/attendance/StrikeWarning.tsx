import { AlertTriangle } from "lucide-react";

export interface StrikeWarningProps {
  strikes: number;
}

export function StrikeWarning({ strikes }: Readonly<StrikeWarningProps>) {
  if (strikes !== 1) {
    return null;
  }

  return (
    <section className="flex items-start gap-3 border border-border bg-secondary p-4" role="status" aria-label="Strike warning">
      <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      <div>
        <h2 className="text-body font-semibold">Strike warning active</h2>
        <p className="font-mono text-caption text-muted">You have 1 absence. One more absence may trigger automatic removal.</p>
      </div>
    </section>
  );
}
