"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { ApplicationStatus } from "@/lib/types/application";

export interface ApplicationActionsProps {
  studentName: string;
  status: ApplicationStatus;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
  onWaitlist?: () => Promise<void>;
}

type ActionKey = "accept" | "reject" | "waitlist";

const actionLabels: Record<ActionKey, string> = {
  accept: "Accept",
  reject: "Reject",
  waitlist: "Add to Waitlist",
};

export function ApplicationActions({ studentName, status, onAccept, onReject, onWaitlist }: Readonly<ApplicationActionsProps>) {
  const [open, setOpen] = useState<ActionKey | null>(null);
  const [loading, setLoading] = useState(false);

  const isTerminal = status === "rejected" || status === "waitlisted";

  async function confirmAction() {
    if (!open) return;
    setLoading(true);
    try {
      if (open === "accept") await onAccept();
      else if (open === "reject") await onReject();
      else if (open === "waitlist") await onWaitlist?.();
      setOpen(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {status === "interview_invited" ? (
          <>
            <Button variant="secondary" size="sm" disabled={isTerminal} onClick={() => setOpen("waitlist")}>
              Add to Waitlist
            </Button>
            <Button variant="destructive" size="sm" disabled={isTerminal} onClick={() => setOpen("reject")}>
              Reject
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" size="sm" disabled={isTerminal || status === "accepted"} onClick={() => setOpen("accept")}>
              Accept
            </Button>
            <Button variant="destructive" size="sm" disabled={isTerminal} onClick={() => setOpen("reject")}>
              Reject
            </Button>
          </>
        )}
      </div>

      <Modal
        isOpen={Boolean(open)}
        onClose={() => setOpen(null)}
        title={`${open ? actionLabels[open] : ""} ${studentName}?`}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(null)}>Cancel</Button>
            <Button
              variant={open === "reject" ? "destructive" : "secondary"}
              loading={loading}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </div>
        }
      >
        This action will update the application status immediately.
      </Modal>
    </>
  );
}
