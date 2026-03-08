import { Badge } from "@/components/ui/Badge";
import type { ApplicationStatus } from "@/lib/types/application";

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const mapVariant: Record<
  ApplicationStatus,
  "warning" | "success" | "destructive" | "info"
> = {
  submitted: "warning",
  pending: "warning",
  interview_invited: "info",
  waitlisted: "warning",
  accepted: "success",
  rejected: "destructive",
};

const labelMap: Record<ApplicationStatus, string> = {
  submitted: "Submitted",
  pending: "Pending",
  interview_invited: "Interview Invited",
  waitlisted: "Waitlisted",
  accepted: "Accepted",
  rejected: "Rejected",
};

export function ApplicationStatusBadge({
  status,
}: Readonly<ApplicationStatusBadgeProps>) {
  return (
    <Badge
      variant={mapVariant[status]}
      aria-label={`Application status: ${labelMap[status]}`}
    >
      {labelMap[status]}
    </Badge>
  );
}
