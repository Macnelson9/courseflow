import { ApplicationCard } from "@/components/application/ApplicationCard";
import type { Application } from "@/lib/types/application";

export interface ApplicationListProps {
  applications: Application[];
  onAccept: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

export function ApplicationList({ applications, onAccept, onReject }: Readonly<ApplicationListProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onAccept={() => onAccept(application.id)}
          onReject={() => onReject(application.id)}
        />
      ))}
    </div>
  );
}
