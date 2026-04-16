export type ApplicationStatus = "pending" | "accepted" | "rejected" | "interview_invited" | "waitlisted";

export interface Application {
  id: string;
  course_id: string;
  course_name: string;
  email: string;
  first_name: string;
  last_name: string;
  motivation: string;
  experience: string;
  status: ApplicationStatus;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}
