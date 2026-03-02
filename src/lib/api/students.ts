import { api } from "./client";
import type { Classmate } from "@/lib/types/student";

export const studentsApi = {
  classmates: (token: string) => api.get<Classmate[]>("/api/students/classmates", token),
};
