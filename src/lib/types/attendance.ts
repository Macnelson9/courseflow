export type AttendanceState = "present" | "absent" | "pending";

export interface QRToken {
  tokenUrl: string;
  expiresInSeconds: number;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: AttendanceState;
  checkedInAt?: string;
}

export interface AttendanceSession {
  id: string;
  startedAt: string;
  open: boolean;
  presentCount: number;
  absentCount: number;
  pendingCount: number;
  records: {
    studentId: string;
    name: string;
    email: string;
    status: AttendanceState;
    checkedInAt?: string;
  }[];
}
