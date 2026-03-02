import { Card } from "@/components/ui/Card";
import type { Application } from "@/lib/types/application";
import { formatDate } from "@/lib/utils/dates";
import { ApplicationStatusBadge } from "@/components/application/ApplicationStatusBadge";
import { ApplicationActions } from "@/components/application/ApplicationActions";

export interface ApplicationCardProps {
  application: Application;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
}

export function ApplicationCard({ application, onAccept, onReject }: Readonly<ApplicationCardProps>) {
  const actioned = application.status === "accepted" || application.status === "rejected";

  return (
    <Card
      title={application.fullName}
      description={`${application.email} · ${application.phone}`}
      action={<ApplicationStatusBadge status={application.status} />}
      headerTone="inverse"
    >
      <p className="line-clamp-3 font-mono text-caption text-muted">{application.motivation}</p>
      <p className="mt-2 line-clamp-2 font-mono text-caption text-muted">{application.experience}</p>
      <p className="mt-2 font-mono text-caption text-muted">Applied: {formatDate(application.createdAt)}</p>
      <div className="mt-4">
        <ApplicationActions studentName={application.fullName} disabled={actioned} onAccept={onAccept} onReject={onReject} />
      </div>
    </Card>
  );
}
