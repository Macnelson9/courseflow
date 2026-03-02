import { Card } from "@/components/ui/Card";
import type { Classmate } from "@/lib/types/student";

export interface ClassmateCardProps {
  classmate: Classmate;
}

export function ClassmateCard({ classmate }: Readonly<ClassmateCardProps>) {
  return (
    <Card title={classmate.name} description={classmate.email}>
      <p className="font-mono text-caption text-muted">{classmate.phone}</p>
    </Card>
  );
}
