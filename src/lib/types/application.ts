export type ApplicationStatus = "submitted" | "pending" | "accepted" | "rejected";

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  motivation: string;
  experience: string;
  status: ApplicationStatus;
  createdAt: string;
}
