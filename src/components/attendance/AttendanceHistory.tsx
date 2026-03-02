import type { AttendanceRecord } from "@/lib/types/attendance";
import { formatDate, formatTime } from "@/lib/utils/dates";

export interface AttendanceHistoryProps {
  records: AttendanceRecord[];
}

export function AttendanceHistory({ records }: Readonly<AttendanceHistoryProps>) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="min-w-full border-collapse font-mono text-caption">
        <thead className="bg-primary text-inverse-fg">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Checked In</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-t border-divider">
              <td className="px-4 py-3">{formatDate(record.date)}</td>
              <td className="px-4 py-3 uppercase">{record.status}</td>
              <td className="px-4 py-3">{record.checkedInAt ? formatTime(record.checkedInAt) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
