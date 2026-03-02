import { AssignmentList } from "@/components/course/AssignmentList";
import { CourseMaterials } from "@/components/course/CourseMaterials";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { NextClassCard } from "@/components/dashboard/NextClassCard";
import { AttendanceSummaryCard } from "@/components/attendance/AttendanceSummaryCard";
import { StrikeWarning } from "@/components/attendance/StrikeWarning";
import { MentorGrid } from "@/components/mentors/MentorGrid";
import { ClassmateGrid } from "@/components/students/ClassmateGrid";
import { sampleClassmates, sampleCourse, sampleMentors } from "@/lib/mock-data";

export default async function StudentDashboardPage() {
  const [course, mentors, classmates] = await Promise.all([
    Promise.resolve(sampleCourse),
    Promise.resolve(sampleMentors),
    Promise.resolve(sampleClassmates),
  ]);

  return (
    <div className="space-y-6">
      <StrikeWarning strikes={1} />
      <DashboardGrid>
        <div className="md:col-span-2">
          <NextClassCard date="2026-03-02" time="10:00 AM" duration="2h" venue="Block B, Room 12" />
        </div>
        <AttendanceSummaryCard attended={8} total={10} strikes={1} />
        <CourseMaterials materials={course.materials} />
        <AssignmentList assignments={course.assignments} />
        <div className="md:col-span-2">
          <h2 className="mb-3 font-mono text-label uppercase tracking-[0.16em] text-foreground">Mentors</h2>
          <MentorGrid mentors={mentors} />
        </div>
        <div className="md:col-span-2">
          <h2 className="mb-3 font-mono text-label uppercase tracking-[0.16em] text-foreground">Classmates</h2>
          <ClassmateGrid classmates={classmates} />
        </div>
      </DashboardGrid>
    </div>
  );
}
