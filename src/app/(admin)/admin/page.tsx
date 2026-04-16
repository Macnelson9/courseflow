"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { applicationsApi } from "@/lib/api/applications";
import type { Application } from "@/lib/types/application";
import { sampleAttendanceSession } from "@/lib/mock-data";

function getToken(): string {
  return document.cookie.match(/courseflow_session=([^;]+)/)?.[1] ?? "";
}

export default function AdminHomePage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    applicationsApi.list(getToken()).then(setApplications).catch(() => {});
  }, []);

  const pending = applications.filter((a) => a.status === "pending").length;
  const accepted = applications.filter((a) => a.status === "accepted").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">Applications</p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">{applications.length}</h3>
          <p className="mt-1 font-mono text-caption text-muted">
            {pending} pending · {accepted} accepted · {rejected} rejected
          </p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">Today Attendance</p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {sampleAttendanceSession.presentCount} / {sampleAttendanceSession.records.length}
          </h3>
          <p className="mt-1 font-mono text-caption text-muted">{sampleAttendanceSession.pendingCount} pending check-ins</p>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">Cohort Status</p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">1 strike alert</h3>
          <p className="mt-1 font-mono text-caption text-muted">Auto-removal on 2 missed classes is enabled</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="overflow-hidden border border-primary bg-surface">
          <div className="bg-primary px-5 py-4 font-mono text-caption uppercase tracking-[0.16em] text-inverse-fg">
            Application Review Queue
          </div>
          <div className="grid grid-cols-[1.2fr_0.9fr_0.8fr] gap-3 border-b border-divider px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>Name</span>
            <span>Course</span>
            <span>Status</span>
          </div>
          <div className="text-caption">
            {applications.map((row) => (
              <div key={row.id} className="grid grid-cols-[1.2fr_0.9fr_0.8fr] gap-3 border-b border-divider px-5 py-3 font-mono">
                <span>{row.first_name} {row.last_name}</span>
                <span className="truncate text-muted">{row.course_name}</span>
                <span className="uppercase">{row.status}</span>
              </div>
            ))}
            {applications.length === 0 && (
              <p className="px-5 py-4 font-mono text-caption text-muted">No applications yet.</p>
            )}
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
              <li key={row.studentId}>{row.name} · {row.status.toUpperCase()}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
