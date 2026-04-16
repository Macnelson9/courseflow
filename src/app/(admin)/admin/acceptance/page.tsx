"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { ApplicationStatusBadge } from "@/components/application/ApplicationStatusBadge";
import { useToast } from "@/lib/hooks/useToast";
import { applicationsApi } from "@/lib/api/applications";
import type { Application } from "@/lib/types/application";

function getToken(): string {
  return document.cookie.match(/courseflow_session=([^;]+)/)?.[1] ?? "";
}

export default function WaitlistPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionModal, setActionModal] = useState<{ app: Application; action: "accepted" | "rejected" } | null>(null);
  const [actioning, setActioning] = useState(false);
  const { toasts, push, remove } = useToast();

  const fetchWaitlist = useCallback(async () => {
    setLoading(true);
    try {
      const data = await applicationsApi.listWaitlist(getToken());
      setApplications(data);
    } catch {
      // endpoint not ready yet — show empty state silently
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchWaitlist(); }, [fetchWaitlist]);

  async function confirmAction() {
    if (!actionModal) return;
    setActioning(true);
    try {
      if (actionModal.action === "accepted") {
        await applicationsApi.accept(actionModal.app.id, getToken());
        push("Student accepted — credentials email sent", "success");
      } else {
        await applicationsApi.reject(actionModal.app.id, getToken());
        push("Application rejected", "info");
      }
      setActionModal(null);
      void fetchWaitlist();
    } catch (err) {
      push(err instanceof Error ? err.message : "Action failed", "error");
    } finally {
      setActioning(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Waitlist"
        subtitle={`${applications.length} candidate${applications.length !== 1 ? "s" : ""} on the waitlist`}
      />

      {loading ? (
        <div className="flex items-center gap-2 font-mono text-caption text-muted">
          <Spinner className="h-4 w-4" /> Loading waitlist…
        </div>
      ) : applications.length === 0 ? (
        <article className="border border-border bg-surface p-5 font-mono text-caption text-muted">
          No candidates on the waitlist yet.
        </article>
      ) : (
        <section className="space-y-3">
          {applications.map((application) => (
            <article key={application.id} className="space-y-4 border border-border bg-surface p-5">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <h2 className="text-h3 text-foreground">{application.first_name} {application.last_name}</h2>
                  <p className="mt-1 font-mono text-caption text-muted">
                    {application.email} · {application.course_name} · Applied {application.created_at}
                  </p>
                </div>
                <ApplicationStatusBadge status={application.status} />
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
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setActionModal({ app: application, action: "accepted" })}>
                  Accept
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setActionModal({ app: application, action: "rejected" })}>
                  Reject
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}

      <Modal
        isOpen={Boolean(actionModal)}
        onClose={() => setActionModal(null)}
        title={`${actionModal?.action === "accepted" ? "Accept" : "Reject"} ${actionModal?.app.first_name ?? ""} ${actionModal?.app.last_name ?? ""}?`}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setActionModal(null)}>Cancel</Button>
            <Button
              variant={actionModal?.action === "rejected" ? "destructive" : "secondary"}
              loading={actioning}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <p className="font-mono text-body text-muted">This action will update the application status immediately.</p>
      </Modal>

      <Toast toasts={toasts} onClose={remove} />
    </div>
  );
}
