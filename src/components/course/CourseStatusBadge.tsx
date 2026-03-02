import { Badge } from "@/components/ui/Badge";
import type { CourseState } from "@/lib/types/course";

export interface CourseStatusBadgeProps {
  state: CourseState;
}

const mapStateToVariant: Record<CourseState, "default" | "active" | "warning" | "success"> = {
  draft: "default",
  open: "warning",
  active: "active",
  closed: "success",
};

export function CourseStatusBadge({ state }: Readonly<CourseStatusBadgeProps>) {
  return <Badge variant={mapStateToVariant[state]} aria-label={`Course status: ${state}`}>{state}</Badge>;
}
