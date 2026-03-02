import { Card } from "@/components/ui/Card";
import type { Mentor } from "@/lib/types/mentor";

export interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: Readonly<MentorCardProps>) {
  return (
    <Card title={mentor.name} description={mentor.expertise}>
      <p className="font-mono text-caption text-muted">{mentor.contact}</p>
    </Card>
  );
}
