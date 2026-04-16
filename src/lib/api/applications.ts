import { api } from "./client";
import type { Application } from "@/lib/types/application";

export interface ApplyPayload {
  course_id: string;
  email: string;
  experience: string;
  first_name: string;
  last_name: string;
  motivation: string;
}

export const applicationsApi = {
  submit: (payload: ApplyPayload) => api.post<Application>("/apply", payload),
  list: (token: string, status?: string) =>
    api.get<Application[]>(`/admin/applications${status ? `?status=${status}` : ""}`, token),
  accept: (id: string, token: string) =>
    api.put<Application>(`/admin/applications/${id}/accept`, {}, token),
  reject: (id: string, token: string) =>
    api.put<Application>(`/admin/applications/${id}/reject`, {}, token),
  waitlist: (id: string, token: string) =>
    api.put<Application>(`/admin/applications/${id}/waitlist`, {}, token),
  listWaitlist: (token: string) =>
    api.get<Application[]>("/admin/waitlist", token),
};
