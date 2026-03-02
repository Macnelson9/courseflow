import type { Course } from "@/lib/types/course";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/dates";

export interface CourseDetailsProps {
  course: Course;
}

export function CourseDetails({ course }: Readonly<CourseDetailsProps>) {
  return (
    <Card title="Course Details" description={`${formatDate(course.startDate)} - ${formatDate(course.endDate)}`}>
      <dl className="grid gap-3 font-mono text-body text-muted sm:grid-cols-2">
        <div><dt className="text-caption uppercase">Schedule</dt><dd>{course.schedule}</dd></div>
        <div><dt className="text-caption uppercase">Venue</dt><dd>{course.venue}</dd></div>
        <div><dt className="text-caption uppercase">Capacity</dt><dd>{course.maxCapacity}</dd></div>
        <div><dt className="text-caption uppercase">Repository</dt><dd className="truncate">{course.githubRepoUrl}</dd></div>
      </dl>
    </Card>
  );
}
