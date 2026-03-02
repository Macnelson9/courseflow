import { api } from "./client";
import type { Application, ApplicationStatus } from "@/lib/types/application";

export const applicationsApi = {
  submit: (payload: Omit<Application, "id" | "status" | "createdAt">) =>
    api.post<Application>("/api/applications", payload),
  list: (token: string, status?: ApplicationStatus) =>
    api.get<Application[]>(`/api/admin/applications${status ? `?status=${status}` : ""}`, token),
  updateStatus: (id: string, status: Exclude<ApplicationStatus, "submitted" | "pending">, token: string) =>
    api.patch<Application>(`/api/admin/applications/${id}`, { status }, token),
};
