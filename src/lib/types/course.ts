export type CourseState = "draft" | "open" | "active" | "closed";

export interface Material {
  id: string;
  label: string;
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  brief: string;
  dueDate: string;
  prInstructions: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  schedule: string;
  venue: string;
  maxCapacity: number;
  githubRepoUrl: string;
  state: CourseState;
  materials: Material[];
  assignments: Assignment[];
}
