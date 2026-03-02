"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export interface ApplicationActionsProps {
  studentName: string;
  disabled?: boolean;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
}

export function ApplicationActions({ studentName, disabled, onAccept, onReject }: Readonly<ApplicationActionsProps>) {
  const [open, setOpen] = useState<null | "accept" | "reject">(null);
  const [loading, setLoading] = useState(false);

  async function confirmAction() {
    if (!open) return;
    setLoading(true);
    try {
      if (open === "accept") await onAccept();
      if (open === "reject") await onReject();
      setOpen(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={disabled} onClick={() => setOpen("accept")}>Accept</Button>
        <Button variant="destructive" size="sm" disabled={disabled} onClick={() => setOpen("reject")}>Reject</Button>
      </div>
      <Modal
        isOpen={Boolean(open)}
        onClose={() => setOpen(null)}
        title={`${open === "accept" ? "Accept" : "Reject"} ${studentName}?`}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(null)}>Cancel</Button>
            <Button variant={open === "accept" ? "secondary" : "destructive"} loading={loading} onClick={confirmAction}>
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
