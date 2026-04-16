import { api } from "./client";
import type { AuthResponse } from "@/lib/types/auth";

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: "student" | "admin" | "mentor";
}

export const authApi = {
  adminRegister: (payload: RegisterPayload) =>
    api.post<AuthResponse>("/auth/admin/register", payload),
  adminLogin: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/admin/login", { email, password }),
  logout: (token: string) =>
    api.post<void>("/auth/logout", {}, token),
};
