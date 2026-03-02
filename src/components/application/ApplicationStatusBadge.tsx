import { Badge } from "@/components/ui/Badge";
import type { ApplicationStatus } from "@/lib/types/application";

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const mapVariant: Record<ApplicationStatus, "warning" | "success" | "destructive"> = {
  submitted: "warning",
  pending: "warning",
  accepted: "success",
  rejected: "destructive",
};

export function ApplicationStatusBadge({ status }: Readonly<ApplicationStatusBadgeProps>) {
  return <Badge variant={mapVariant[status]} aria-label={`Application status: ${status}`}>{status}</Badge>;
}
