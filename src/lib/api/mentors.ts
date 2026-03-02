import { api } from "./client";
import type { Mentor } from "@/lib/types/mentor";

export const mentorsApi = {
  list: () => api.get<Mentor[]>("/api/mentors"),
  save: (payload: Partial<Mentor>, token: string) => api.post<Mentor>("/api/admin/mentors", payload, token),
};
