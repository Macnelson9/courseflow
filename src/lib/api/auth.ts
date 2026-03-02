import { api } from "./client";
import type { Session, User } from "@/lib/types/auth";

export const authApi = {
  me: (token: string) => api.get<User>("/api/auth/me", token),
  login: (email: string, password: string, role: "student" | "admin") =>
    api.post<Session>("/api/auth/login", { email, password, role }),
  logout: (token: string) => api.post<{ success: boolean }>("/api/auth/logout", {}, token),
};
