import { Card } from "@/components/ui/Card";
import { sampleApplications, sampleAttendanceSession } from "@/lib/mock-data";

export default function AdminHomePage() {
  const newApplications = sampleApplications.filter(
    (item) => item.status === "submitted",
  ).length;
  const interviewInvited = sampleApplications.filter(
    (item) => item.status === "interview_invited",
  ).length;
  const waitlisted = sampleApplications.filter(
    (item) => item.status === "waitlisted",
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Applications
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {sampleApplications.length}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            {newApplications} new · {interviewInvited} invited · {waitlisted}{" "}
            waitlisted
          </p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Today Attendance
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {sampleAttendanceSession.presentCount} /{" "}
            {sampleAttendanceSession.records.length}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            {sampleAttendanceSession.pendingCount} pending check-ins
          </p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Cohort Status
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            1 strike alert
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">
            Auto-removal on 2 missed classes is enabled
          </p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="overflow-hidden border border-primary bg-surface">
          <div className="bg-primary px-5 py-4 font-mono text-caption uppercase tracking-[0.16em] text-inverse-fg">
            Application Review Queue
          </div>
          <div className="grid grid-cols-[1.2fr_0.9fr_1fr] gap-3 border-b border-divider px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>Name</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          <div className="text-caption">
            {sampleApplications.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1.2fr_0.9fr_1fr] gap-3 border-b border-divider px-5 py-3 font-mono"
              >
                <span>{row.fullName}</span>
                <span className="uppercase">
                  {row.status === "interview_invited"
                    ? "Invited"
                    : row.status === "waitlisted"
                      ? "Waitlisted"
                      : row.status}
                </span>
                <span>
                  {row.status === "submitted" && "Interview Invite / Reject"}
                  {row.status === "interview_invited" &&
                    "Accept / Waitlist / Reject"}
                  {row.status === "waitlisted" && "Re-invite / Accept / Reject"}
                  {(row.status === "accepted" || row.status === "rejected") &&
                    "Archived"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Card title="Live Attendance">
          <ul className="space-y-1 font-mono text-caption text-muted">
            <li>Present: {sampleAttendanceSession.presentCount}</li>
            <li>Pending: {sampleAttendanceSession.pendingCount}</li>
            <li>Absent: {sampleAttendanceSession.absentCount}</li>
          </ul>
          <div className="my-3 h-px bg-border" />
          <ul className="space-y-1 font-mono text-caption text-muted">
            {sampleAttendanceSession.records.map((row) => (
              <li key={row.studentId}>
                {row.name} · {row.status.toUpperCase()}
              </li>
            ))}
          </ul>
          <div className="my-3 h-px bg-border" />
          <ul className="space-y-1 font-mono text-caption text-muted">
            <li>Token TTL: 2 minutes</li>
            <li>Replay protection: single use</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
