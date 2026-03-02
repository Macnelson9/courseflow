"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { useToast } from "@/lib/hooks/useToast";
import { sampleApplications, sampleCourse } from "@/lib/mock-data";
import type { Application } from "@/lib/types/application";

function toPendingPool(items: readonly Application[]): Application[] {
  return items.filter((item) => item.status === "pending" || item.status === "submitted");
}

export default function AdminAcceptancePage() {
  const [applications, setApplications] = useState<Application[]>(sampleApplications);
  const { toasts, push, remove } = useToast();

  const pendingPool = useMemo(() => toPendingPool(applications), [applications]);
  const acceptedCount = useMemo(() => applications.filter((item) => item.status === "accepted").length, [applications]);
  const remainingSeats = Math.max(sampleCourse.maxCapacity - acceptedCount, 0);

  async function decide(id: string, nextStatus: "accepted" | "rejected") {
    setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));

    if (nextStatus === "accepted") {
      push("Student accepted and notified", "success");
    } else {
      push("Application rejected", "info");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Acceptance Queue"
        subtitle={`Capacity: ${acceptedCount}/${sampleCourse.maxCapacity} accepted · ${remainingSeats} seats left`}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <article className="border border-border bg-surface p-4">
          <p className="font-mono text-caption uppercase text-muted">Pending Review</p>
          <p className="mt-2 text-h2 text-foreground">{pendingPool.length}</p>
        </article>
        <article className="border border-border bg-surface p-4">
          <p className="font-mono text-caption uppercase text-muted">Accepted</p>
          <p className="mt-2 text-h2 text-foreground">{acceptedCount}</p>
        </article>
        <article className="border border-border bg-surface p-4">
          <p className="font-mono text-caption uppercase text-muted">Seats Left</p>
          <p className="mt-2 text-h2 text-foreground">{remainingSeats}</p>
        </article>
      </section>

      <section className="space-y-3">
        {pendingPool.length === 0 ? (
          <article className="border border-border bg-surface p-5 font-mono text-caption text-muted">
            No pending applications right now.
          </article>
        ) : (
          pendingPool.map((application) => (
            <article key={application.id} className="space-y-4 border border-border bg-surface p-5">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <h2 className="text-h3 text-foreground">{application.fullName}</h2>
                  <p className="mt-1 font-mono text-caption text-muted">
                    {application.email} · {application.phone} · Applied {application.createdAt}
                  </p>
                </div>
                <p className="font-mono text-caption uppercase tracking-[0.08em] text-muted">{application.status}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="border border-border bg-background p-3">
                  <p className="font-mono text-caption uppercase text-muted">Motivation</p>
                  <p className="mt-2 text-body text-foreground">{application.motivation}</p>
                </div>
                <div className="border border-border bg-background p-3">
                  <p className="font-mono text-caption uppercase text-muted">Experience</p>
                  <p className="mt-2 text-body text-foreground">{application.experience}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => decide(application.id, "accepted")}>Accept Student</Button>
                <Button variant="secondary" onClick={() => decide(application.id, "rejected")}>Reject Student</Button>
              </div>
            </article>
          ))
        )}
      </section>

      <Toast toasts={toasts} onClose={remove} />
    </div>
  );
}
