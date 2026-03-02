import { Card } from "@/components/ui/Card";
import type { Course } from "@/lib/types/course";
import { CourseStatusBadge } from "@/components/course/CourseStatusBadge";

export interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: Readonly<CourseCardProps>) {
  return (
    <Card
      title={course.name}
      description={`${course.schedule} · ${course.venue}`}
      action={<CourseStatusBadge state={course.state} />}
    >
      <p className="font-mono text-body text-muted">{course.description}</p>
    </Card>
  );
}
