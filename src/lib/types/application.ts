export type ApplicationStatus =
  | "submitted"
  | "pending"
  | "interview_invited"
  | "waitlisted"
  | "accepted"
  | "rejected";

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  motivation: string;
  experience: string;
  selectedCourse?: string;
  status: ApplicationStatus;
  createdAt: string;
  interviewDate?: string;
}
