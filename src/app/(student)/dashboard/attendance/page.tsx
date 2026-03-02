import { AttendanceSummaryCard } from "@/components/attendance/AttendanceSummaryCard";
import { QRCodeDisplay } from "@/components/attendance/QRCodeDisplay";
import { AttendanceHistory } from "@/components/attendance/AttendanceHistory";
import { sampleAttendanceHistory } from "@/lib/mock-data";

export default function StudentAttendancePage() {
  return (
    <div className="space-y-6">
      <AttendanceSummaryCard attended={8} total={10} strikes={1} compact />
      <QRCodeDisplay studentId="student-token" sessionActive />
      <AttendanceHistory records={sampleAttendanceHistory} />
    </div>
  );
}
