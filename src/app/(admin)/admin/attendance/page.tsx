"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AttendanceSession } from "@/components/attendance/AttendanceSession";
import { AttendanceGrid } from "@/components/attendance/AttendanceGrid";
import { sampleAttendanceSession } from "@/lib/mock-data";

export default function AdminAttendancePage() {
  const [open, setOpen] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  return (
    <div className="space-y-6">
      {!open ? (
        <section className="grid min-h-[300px] place-content-center gap-4 border border-border bg-surface p-8 text-center">
          <p className="font-data text-label uppercase tracking-[0.1em]">{new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date())}</p>
          <h1 className="text-h1">Start Today&apos;s Attendance</h1>
          <Button onClick={() => setOpen(true)}>Open Attendance Session</Button>
        </section>
      ) : (
        <>
          <AttendanceSession open={open} startedAt={sampleAttendanceSession.startedAt} onClose={() => setConfirmClose(true)} />
          <AttendanceGrid session={sampleAttendanceSession} onPoll={async () => undefined} onOverride={async () => undefined} />
        </>
      )}

      <Modal
        isOpen={confirmClose}
        onClose={() => setConfirmClose(false)}
        title="Close attendance session?"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmClose(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setOpen(false); setConfirmClose(false); }}>Close Session</Button>
          </div>
        }
      >
        {sampleAttendanceSession.presentCount} present, {sampleAttendanceSession.absentCount} absent.
      </Modal>
    </div>
  );
}
