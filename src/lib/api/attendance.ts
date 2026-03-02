import { api } from "./client";
import type { QRToken, AttendanceRecord, AttendanceSession } from "@/lib/types/attendance";

export const attendanceApi = {
  getQRToken: (token: string) => api.get<QRToken>("/api/attendance/qr", token),
  getMyHistory: (token: string) => api.get<AttendanceRecord[]>("/api/attendance/me", token),
  openSession: (token: string) => api.post<AttendanceSession>("/api/admin/attendance/open", {}, token),
  closeSession: (sessionId: string, token: string) =>
    api.post<AttendanceSession>("/api/admin/attendance/close", { sessionId }, token),
  getSessionDetails: (sessionId: string, token: string) =>
    api.get<AttendanceSession>(`/api/admin/attendance/${sessionId}`, token),
  override: (sessionId: string, studentId: string, status: "present" | "absent", token: string) =>
    api.patch<{ success: boolean }>(`/api/admin/attendance/${sessionId}/${studentId}`, { status }, token),
};
