"use client";

import { useEffect } from "react";
import type { AttendanceSession } from "@/lib/types/attendance";

export interface AttendanceGridProps {
  session: AttendanceSession;
  onPoll: () => Promise<void>;
  onOverride: (studentId: string, status: "present" | "absent") => Promise<void>;
}

export function AttendanceGrid({ session, onPoll, onOverride }: Readonly<AttendanceGridProps>) {
  useEffect(() => {
    const timer = window.setInterval(() => {
      void onPoll();
    }, 15000);

    return () => window.clearInterval(timer);
  }, [onPoll]);

  return (
    <div className="overflow-x-auto border border-border" aria-live="polite">
      <table className="min-w-full border-collapse font-mono text-caption">
        <thead className="bg-primary text-inverse-fg">
          <tr>
            <th className="px-4 py-3 text-left">Student Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Time Checked In</th>
            <th className="px-4 py-3 text-left">Override</th>
          </tr>
        </thead>
        <tbody>
          {session.records.map((record) => (
            <tr key={record.studentId} className="border-t border-divider">
              <td className="px-4 py-3">{record.name}</td>
              <td className="px-4 py-3">{record.email}</td>
              <td className="px-4 py-3 uppercase">{record.status}</td>
              <td className="px-4 py-3">{record.checkedInAt ?? "-"}</td>
              <td className="px-4 py-3">
                <select
                  className="min-h-10 border border-border bg-surface px-2"
                  defaultValue={record.status}
                  aria-label={`Override attendance for ${record.name}`}
                  onChange={(event) => void onOverride(record.studentId, event.target.value as "present" | "absent")}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
