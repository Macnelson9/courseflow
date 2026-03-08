import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

const courseAttendanceData = [
  {
    course: "Intro to Rust",
    enrolled: 38,
    presentToday: 26,
    absentToday: 12,
    avgAttendance: "82%",
  },
  {
    course: "Intro to Blockchain using Solidity",
    enrolled: 30,
    presentToday: 22,
    absentToday: 8,
    avgAttendance: "78%",
  },
  {
    course: "Design Basics",
    enrolled: 25,
    presentToday: 20,
    absentToday: 5,
    avgAttendance: "85%",
  },
  {
    course: "Intro to Starknet using Cairo",
    enrolled: 18,
    presentToday: 15,
    absentToday: 3,
    avgAttendance: "88%",
  },
];

const mentorAttendanceData = [
  {
    name: "Ada N.",
    course: "Intro to Rust",
    sessionsPresent: 18,
    totalSessions: 20,
    rate: "90%",
  },
  {
    name: "Ken U.",
    course: "Intro to Blockchain using Solidity",
    sessionsPresent: 19,
    totalSessions: 20,
    rate: "95%",
  },
  {
    name: "Rita M.",
    course: "Design Basics",
    sessionsPresent: 20,
    totalSessions: 20,
    rate: "100%",
  },
];

const totalStudents = courseAttendanceData.reduce(
  (sum, c) => sum + c.enrolled,
  0,
);
const totalPresentToday = courseAttendanceData.reduce(
  (sum, c) => sum + c.presentToday,
  0,
);
const totalAbsentToday = courseAttendanceData.reduce(
  (sum, c) => sum + c.absentToday,
  0,
);
const totalMentors = mentorAttendanceData.length;

export default function AdminAttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Overview"
        subtitle="Summary of attendance data across all courses, students, and mentors."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Total Students
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {totalStudents}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            Registered across all courses
          </p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Present Today
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {totalPresentToday}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            Out of {totalStudents} students
          </p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Absent Today
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {totalAbsentToday}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            Across all courses
          </p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Total Mentors
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {totalMentors}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            Active this cohort
          </p>
        </Card>
      </div>

      <Card
        title="Course Attendance Breakdown"
        description="Students per course and today's attendance"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse font-mono text-caption">
            <thead className="bg-primary text-inverse-fg">
              <tr>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-left">Enrolled</th>
                <th className="px-4 py-3 text-left">Present Today</th>
                <th className="px-4 py-3 text-left">Absent Today</th>
                <th className="px-4 py-3 text-left">Avg Attendance</th>
              </tr>
            </thead>
            <tbody>
              {courseAttendanceData.map((row) => (
                <tr key={row.course} className="border-t border-divider">
                  <td className="px-4 py-3">{row.course}</td>
                  <td className="px-4 py-3">{row.enrolled}</td>
                  <td className="px-4 py-3">{row.presentToday}</td>
                  <td className="px-4 py-3">{row.absentToday}</td>
                  <td className="px-4 py-3">{row.avgAttendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="Mentor Attendance"
        description="Mentor session attendance records"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse font-mono text-caption">
            <thead className="bg-primary text-inverse-fg">
              <tr>
                <th className="px-4 py-3 text-left">Mentor</th>
                <th className="px-4 py-3 text-left">Assigned Course</th>
                <th className="px-4 py-3 text-left">Sessions Present</th>
                <th className="px-4 py-3 text-left">Total Sessions</th>
                <th className="px-4 py-3 text-left">Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              {mentorAttendanceData.map((row) => (
                <tr key={row.name} className="border-t border-divider">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.course}</td>
                  <td className="px-4 py-3">{row.sessionsPresent}</td>
                  <td className="px-4 py-3">{row.totalSessions}</td>
                  <td className="px-4 py-3">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
