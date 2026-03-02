import { api } from "./client";
import type { Course } from "@/lib/types/course";

export const courseApi = {
  getPublicCourse: () => api.get<Course>("/api/course"),
  getAdminCourse: (token: string) => api.get<Course>("/api/admin/course", token),
  saveCourse: (token: string, payload: Partial<Course>) => api.post<Course>("/api/admin/course", payload, token),
};
