import { EmptyState } from "@/components/ui/EmptyState";
import { CourseForm } from "@/components/course/CourseForm";
import { sampleCourse } from "@/lib/mock-data";

const HAS_COURSE = true;

export default function AdminCoursePage() {
  if (!HAS_COURSE) {
    return (
      <EmptyState title="No Course Yet" description="Create your first course to begin admissions and attendance." actionLabel="Create Your First Course" />
    );
  }

  return <CourseForm initialCourse={sampleCourse} />;
}
