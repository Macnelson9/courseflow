"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { ApplicationStatusBadge } from "@/components/application/ApplicationStatusBadge";
import { useToast } from "@/lib/hooks/useToast";
import { sampleApplications, sampleCourse } from "@/lib/mock-data";
import type { Application, ApplicationStatus } from "@/lib/types/application";

type FilterValue = "all" | "waitlisted" | "accepted";

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Waitlisted", value: "waitlisted" },
  { label: "Accepted", value: "accepted" },
];

export default function AdminAcceptancePage() {
  const [applications, setApplications] =
    useState<Application[]>(sampleApplications);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [actionModal, setActionModal] = useState<{
    id: string;
    action: ApplicationStatus;
  } | null>(null);
  const { toasts, push, remove } = useToast();

  const acceptancePool = useMemo(
    () =>
      applications.filter(
        (a) => a.status === "accepted" || a.status === "waitlisted",
      ),
    [applications],
  );

  const filtered = useMemo(
    () =>
      acceptancePool.filter((a) => filter === "all" || a.status === filter),
    [acceptancePool, filter],
  );

  const acceptedCount = useMemo(
    () => acceptancePool.filter((a) => a.status === "accepted").length,
    [acceptancePool],
  );
  const remainingSeats = Math.max(sampleCourse.maxCapacity - acceptedCount, 0);
  const waitlistedCount = acceptancePool.filter(
    (a) => a.status === "waitlisted",
  ).length;

  function getAvailableActions(status: ApplicationStatus): {
    label: string;
    next: ApplicationStatus;
    variant: "primary" | "secondary" | "destructive";
  }[] {
    switch (status) {
      case "waitlisted":
        return [
          { label: "Accept", next: "accepted", variant: "primary" },
          { label: "Reject", next: "rejected", variant: "destructive" },
        ];
      default:
        return [];
    }
  }

  function getActionMessage(action: ApplicationStatus): string {
    switch (action) {
      case "interview_invited":
        return "An interview invite email will be sent to this applicant.";
      case "waitlisted":
        return "This applicant will be moved to the waitlist for the next cohort.";
      case "accepted":
        return "An acceptance email with default login credentials (email + default password) will be sent to the student.";
      case "rejected":
        return "A rejection email will be sent to this applicant.";
      default:
        return "This action will update the application status.";
    }
  }

  async function confirmAction() {
    if (!actionModal) return;
    setApplications((prev) =>
      prev.map((a) =>
        a.id === actionModal.id ? { ...a, status: actionModal.action } : a,
      ),
    );

    const actionLabels: Record<string, string> = {
      interview_invited: "Interview invite sent",
      waitlisted: "Moved to waitlist",
      accepted: "Student accepted — credentials email sent",
      rejected: "Application rejected — notification sent",
    };
    push(
      actionLabels[actionModal.action] || "Status updated",
      actionModal.action === "rejected" ? "info" : "success",
    );
    setActionModal(null);
  }

  const selectedApp = actionModal
    ? applications.find((a) => a.id === actionModal.id)
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Acceptance Queue"
        subtitle={`Accepted and waitlisted candidates · ${acceptedCount}/${sampleCourse.maxCapacity} accepted · ${remainingSeats} seats left`}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <article className="border border-border bg-surface p-4">
          <p className="font-mono text-caption uppercase text-muted">
            Waitlisted
          </p>
          <p className="mt-2 text-h2 text-foreground">{waitlistedCount}</p>
        </article>
        <article className="border border-border bg-surface p-4">
          <p className="font-mono text-caption uppercase text-muted">
            Accepted
          </p>
          <p className="mt-2 text-h2 text-foreground">{acceptedCount}</p>
        </article>
        <article className="border border-border bg-surface p-4">
          <p className="font-mono text-caption uppercase text-muted">
            Seats Left
          </p>
          <p className="mt-2 text-h2 text-foreground">{remainingSeats}</p>
        </article>
      </section>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <section className="space-y-3">
        {filtered.length === 0 ? (
          <article className="border border-border bg-surface p-5 font-mono text-caption text-muted">
            No applications match the current filter.
          </article>
        ) : (
          filtered.map((application) => {
            const actions = getAvailableActions(application.status);
            return (
              <article
                key={application.id}
                className="space-y-4 border border-border bg-surface p-5"
              >
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h2 className="text-h3 text-foreground">
                      {application.fullName}
                    </h2>
                    <p className="mt-1 font-mono text-caption text-muted">
                      {application.email} · {application.phone} · Applied{" "}
                      {application.createdAt}
                      {application.selectedCourse
                        ? ` · ${application.selectedCourse}`
                        : ""}
                    </p>
                  </div>
                  <ApplicationStatusBadge status={application.status} />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border border-border bg-background p-3">
                    <p className="font-mono text-caption uppercase text-muted">
                      Motivation
                    </p>
                    <p className="mt-2 text-body text-foreground">
                      {application.motivation}
                    </p>
                  </div>
                  <div className="border border-border bg-background p-3">
                    <p className="font-mono text-caption uppercase text-muted">
                      Experience
                    </p>
                    <p className="mt-2 text-body text-foreground">
                      {application.experience}
                    </p>
                  </div>
                </div>

                {application.interviewDate ? (
                  <p className="font-mono text-caption text-muted">
                    Interview Date: {application.interviewDate}
                  </p>
                ) : null}

                {actions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <Button
                        key={action.next}
                        variant={
                          action.variant === "primary"
                            ? "primary"
                            : action.variant === "destructive"
                              ? "destructive"
                              : "secondary"
                        }
                        size="sm"
                        onClick={() =>
                          setActionModal({
                            id: application.id,
                            action: action.next,
                          })
                        }
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </section>

      <Modal
        isOpen={Boolean(actionModal)}
        onClose={() => setActionModal(null)}
        title={`Confirm Action: ${selectedApp?.fullName ?? ""}`}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setActionModal(null)}>
              Cancel
            </Button>
            <Button
              variant={
                actionModal?.action === "rejected" ? "destructive" : "primary"
              }
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <p className="font-mono text-body text-muted">
          {actionModal ? getActionMessage(actionModal.action) : ""}
        </p>
      </Modal>

      <Toast toasts={toasts} onClose={remove} />
    </div>
  );
}
