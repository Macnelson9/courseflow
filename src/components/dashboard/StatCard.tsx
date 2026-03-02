import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: Readonly<StatCardProps>) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" aria-hidden="true" />
        <div>
          <p className="text-h2">{value}</p>
          <p className="font-mono text-caption uppercase text-muted">{label}</p>
        </div>
      </div>
    </Card>
  );
}
