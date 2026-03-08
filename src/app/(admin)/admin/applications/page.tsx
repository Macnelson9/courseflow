"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ApplicationList } from "@/components/application/ApplicationList";
import type { ApplicationStatus } from "@/lib/types/application";
import { sampleApplications } from "@/lib/mock-data";
import { useToast } from "@/lib/hooks/useToast";
import { Toast } from "@/components/ui/Toast";

const filters: Array<{ label: string; value: "all" | ApplicationStatus }> = [
  { label: "All", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Interview Invited", value: "interview_invited" },
  { label: "Waitlisted", value: "waitlisted" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

export default function AdminApplicationsPage() {
  const [status, setStatus] = useState<"all" | ApplicationStatus>("all");
  const { toasts, push, remove } = useToast();

  const applications = useMemo(
    () =>
      sampleApplications.filter((application) =>
        status === "all" ? true : application.status === status,
      ),
    [status],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        subtitle={`${sampleApplications.length} total · ${sampleApplications.filter((item) => item.status === "submitted").length} new · ${sampleApplications.filter((item) => item.status === "interview_invited").length} interview invited · ${sampleApplications.filter((item) => item.status === "waitlisted").length} waitlisted`}
      />
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={status === filter.value ? "primary" : "secondary"}
            onClick={() => setStatus(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <ApplicationList
        applications={applications}
        onAccept={async () => push("Application accepted", "success")}
        onReject={async () => push("Application rejected", "info")}
      />
      <Toast toasts={toasts} onClose={remove} />
    </div>
  );
}
