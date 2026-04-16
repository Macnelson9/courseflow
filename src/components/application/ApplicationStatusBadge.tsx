import { Badge } from "@/components/ui/Badge";
import type { ApplicationStatus } from "@/lib/types/application";

const mapVariant: Record<ApplicationStatus, "warning" | "success" | "destructive" | "info"> = {
  pending: "warning",
  interview_invited: "info",
  waitlisted: "info",
  accepted: "success",
  rejected: "destructive",
};

const labelMap: Record<ApplicationStatus, string> = {
  pending: "Pending",
  interview_invited: "Interview Invited",
  waitlisted: "Waitlisted",
  accepted: "Accepted",
  rejected: "Rejected",
};

export function ApplicationStatusBadge({ status }: Readonly<{ status: ApplicationStatus }>) {
  return (
    <Badge variant={mapVariant[status]} aria-label={`Application status: ${labelMap[status]}`}>
      {labelMap[status]}
    </Badge>
  );
}
