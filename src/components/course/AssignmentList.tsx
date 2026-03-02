import { Card } from "@/components/ui/Card";
import type { Assignment } from "@/lib/types/course";

export interface AssignmentListProps {
  assignments: Assignment[];
}

export function AssignmentList({ assignments }: Readonly<AssignmentListProps>) {
  return (
    <Card title="Assignments" headerTone="inverse">
      <ul className="space-y-3">
        {assignments.map((assignment) => (
          <li key={assignment.id} className="border-b border-border pb-3">
            <h3 className="text-body font-semibold text-foreground">{assignment.title}</h3>
            <p className="font-mono text-caption text-muted">{assignment.brief}</p>
            <p className="font-mono text-caption text-muted">Due: {assignment.dueDate}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
