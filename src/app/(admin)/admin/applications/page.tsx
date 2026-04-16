"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ApplicationList } from "@/components/application/ApplicationList";
import { Spinner } from "@/components/ui/Spinner";
import { useToast } from "@/lib/hooks/useToast";
import { Toast } from "@/components/ui/Toast";
import { applicationsApi } from "@/lib/api/applications";
import type { Application, ApplicationStatus } from "@/lib/types/application";

const filters: Array<{ label: string; value: "all" | ApplicationStatus }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Interview Invited", value: "interview_invited" },
  { label: "Waitlisted", value: "waitlisted" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

function getToken(): string {
  return document.cookie.match(/courseflow_session=([^;]+)/)?.[1] ?? "";
}

export default function AdminApplicationsPage() {
  const [status, setStatus] = useState<"all" | ApplicationStatus>("all");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toasts, push, remove } = useToast();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await applicationsApi.list(getToken(), status === "all" ? undefined : status);
      setApplications(data);
    } catch {
      push("Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { void fetchApplications(); }, [fetchApplications]);

  async function handleAccept(id: string) {
    await applicationsApi.accept(id, getToken());
    push("Application accepted — interview invite sent", "success");
    void fetchApplications();
  }

  async function handleReject(id: string) {
    await applicationsApi.reject(id, getToken());
    push("Application rejected", "info");
    void fetchApplications();
  }

  async function handleWaitlist(id: string) {
    await applicationsApi.waitlist(id, getToken());
    push("Applicant added to waitlist", "success");
    void fetchApplications();
  }

  const pending = applications.filter((a) => a.status === "pending").length;
  const invited = applications.filter((a) => a.status === "interview_invited").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        subtitle={`${applications.length} total · ${pending} pending · ${invited} interview invited`}
      />
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button key={f.value} variant={status === f.value ? "primary" : "secondary"} size="sm" onClick={() => setStatus(f.value)}>
            {f.label}
          </Button>
        ))}
      </div>
      {loading ? (
        <div className="flex items-center gap-2 font-mono text-caption text-muted">
          <Spinner className="h-4 w-4" /> Loading applications…
        </div>
      ) : (
        <ApplicationList
          applications={applications}
          onAccept={handleAccept}
          onReject={handleReject}
          onWaitlist={handleWaitlist}
        />
      )}
      <Toast toasts={toasts} onClose={remove} />
    </div>
  );
}
