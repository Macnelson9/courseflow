import type { Application } from "@/lib/types/application";
import type { AttendanceRecord, AttendanceSession } from "@/lib/types/attendance";
import type { Course } from "@/lib/types/course";
import type { Mentor } from "@/lib/types/mentor";
import type { Classmate } from "@/lib/types/student";

export const sampleCourse: Course = {
  id: "course-1",
  name: "Intro to Rust",
  description: "Build real backend systems with Rust, Axum, SQLx, and JWT auth.",
  startDate: "2026-03-02",
  endDate: "2026-06-12",
  schedule: "Mon / Wed / Fri · 10:00 – 12:00",
  venue: "Block B, Room 12",
  maxCapacity: 40,
  githubRepoUrl: "https://github.com/courseflow/intro-rust",
  state: "active",
  materials: [
    { id: "m1", label: "Rust Ownership Deep Dive", url: "#" },
    { id: "m2", label: "Axum + JWT Auth Walkthrough", url: "#" },
    { id: "m3", label: "SQLx Migration Guide", url: "#" },
  ],
  assignments: [
    { id: "a1", title: "Enrollment Endpoint", brief: "Build CRUD for student enrollment.", dueDate: "2026-03-12", prInstructions: "Open PR against cohort repo." },
    { id: "a2", title: "Attendance Token Validator", brief: "Validate exp and single-use claims.", dueDate: "2026-03-18", prInstructions: "Submit PR with tests and screenshots." },
  ],
};

export const sampleMentors: Mentor[] = [
  { id: "mn1", name: "Ada N.", expertise: "Systems Programming", contact: "ada@courseflow.dev" },
  { id: "mn2", name: "Ken U.", expertise: "Web APIs", contact: "ken@courseflow.dev" },
  { id: "mn3", name: "Rita M.", expertise: "Database Architecture", contact: "rita@courseflow.dev" },
];

export const sampleClassmates: Classmate[] = [
  { id: "st1", name: "Aisha Bello", email: "aisha@example.com", phone: "+234-111-000-001" },
  { id: "st2", name: "David Kim", email: "david@example.com", phone: "+234-111-000-002" },
  { id: "st3", name: "Mina Park", email: "mina@example.com", phone: "+234-111-000-003" },
];

export const sampleApplications: Application[] = [
  {
    id: "app-1",
    fullName: "Aisha Bello",
    email: "aisha@example.com",
    phone: "+234-111-000-001",
    motivation: "I want practical backend mentoring and industry-ready Rust skills.",
    experience: "Intermediate TypeScript, basic Rust, one internship.",
    status: "pending",
    createdAt: "2026-02-27",
  },
  {
    id: "app-2",
    fullName: "Noah Kim",
    email: "noah@example.com",
    phone: "+234-111-000-010",
    motivation: "I want to transition to systems-level backend engineering.",
    experience: "Node.js API work, beginner Rust, no production Rust yet.",
    status: "submitted",
    createdAt: "2026-02-26",
  },
  {
    id: "app-3",
    fullName: "Rita Mensah",
    email: "rita@example.com",
    phone: "+234-111-000-016",
    motivation: "Looking for deeper architecture knowledge and real projects.",
    experience: "3 years backend engineering with Go and Python.",
    status: "accepted",
    createdAt: "2026-02-24",
  },
];

export const sampleAttendanceHistory: AttendanceRecord[] = [
  { id: "r1", date: "2026-02-21", status: "present", checkedInAt: "2026-02-21T09:58:00Z" },
  { id: "r2", date: "2026-02-24", status: "present", checkedInAt: "2026-02-24T10:04:00Z" },
  { id: "r3", date: "2026-02-26", status: "absent" },
];

export const sampleAttendanceSession: AttendanceSession = {
  id: "session-1",
  startedAt: "10:04 AM",
  open: true,
  presentCount: 26,
  absentCount: 0,
  pendingCount: 5,
  records: [
    { studentId: "st1", name: "Mina Park", email: "mina@example.com", status: "present", checkedInAt: "10:06 AM" },
    { studentId: "st2", name: "Tobi Ade", email: "tobi@example.com", status: "pending" },
    { studentId: "st3", name: "Nora Lin", email: "nora@example.com", status: "present", checkedInAt: "10:09 AM" },
  ],
};
