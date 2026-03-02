import { Button } from "@/components/ui/Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: Readonly<EmptyStateProps>) {
  return (
    <section className="border border-border bg-surface p-10 text-center">
      <h2 className="text-h2 text-foreground">{title}</h2>
      <p className="mt-2 font-mono text-body text-muted">{description}</p>
      {actionLabel && onAction ? (
        <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </section>
  );
}
