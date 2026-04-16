import { Card } from "@/components/ui/Card";
import type { Application } from "@/lib/types/application";
import { formatDate } from "@/lib/utils/dates";
import { ApplicationStatusBadge } from "@/components/application/ApplicationStatusBadge";
import { ApplicationActions } from "@/components/application/ApplicationActions";

export interface ApplicationCardProps {
  application: Application;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
  onWaitlist?: () => Promise<void>;
}

export function ApplicationCard({ application, onAccept, onReject, onWaitlist }: Readonly<ApplicationCardProps>) {
  const fullName = `${application.first_name} ${application.last_name}`;

  return (
    <Card
      title={fullName}
      description={`${application.email} · ${application.course_name}`}
      action={<ApplicationStatusBadge status={application.status} />}
      headerTone="inverse"
    >
      <p className="line-clamp-3 font-mono text-caption text-muted">{application.motivation}</p>
      <p className="mt-2 line-clamp-2 font-mono text-caption text-muted">{application.experience}</p>
      <p className="mt-2 font-mono text-caption text-muted">Applied: {formatDate(application.created_at)}</p>
      <div className="mt-4">
        <ApplicationActions
          studentName={fullName}
          status={application.status}
          onAccept={onAccept}
          onReject={onReject}
          {...(onWaitlist ? { onWaitlist } : {})}
        />
      </div>
    </Card>
  );
}
