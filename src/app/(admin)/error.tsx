"use client";

import { Button } from "@/components/ui/Button";

export default function AdminError({ reset }: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <div className="space-y-4 border border-border bg-surface p-6">
      <h2 className="text-h2">Something went wrong</h2>
      <p className="font-mono text-body text-muted">We could not load this admin section.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
