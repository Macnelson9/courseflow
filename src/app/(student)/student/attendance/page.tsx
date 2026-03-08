"use client";

import { useMemo, useState } from "react";
import { AttendanceSummaryCard } from "@/components/attendance/AttendanceSummaryCard";
import { AttendanceHistory } from "@/components/attendance/AttendanceHistory";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { sampleAttendanceHistory } from "@/lib/mock-data";

function generateQRData(
  courseName: string,
  cohort: string,
  studentName: string,
  date: Date,
): string {
  const courseInitial = courseName.charAt(0).toUpperCase();
  const cohortCode = cohort.toUpperCase().replace(/\s/g, "");
  const nameCode = studentName.toUpperCase().replace(/\s/g, "");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${courseInitial}${cohortCode}${nameCode}${day}${month}${year}`;
}

export default function StudentAttendancePage() {
  const [qrGenerated, setQrGenerated] = useState(false);

  const today = new Date();
  const courseName = "Rust";
  const cohort = "CH3";
  const studentName = "UCHE";

  const qrData = useMemo(
    () => generateQRData(courseName, cohort, studentName, today),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseName, cohort, studentName, today.toDateString()],
  );

  return (
    <div className="space-y-6">
      <AttendanceSummaryCard attended={8} total={10} strikes={1} compact />

      <Card
        title="Generate Attendance QR Code"
        description="Generate your unique QR code for today's class"
      >
        <div className="space-y-4">
          <div className="grid gap-3 font-mono text-body text-muted sm:grid-cols-2">
            <div>
              <p className="text-caption uppercase text-muted">Course</p>
              <p>Intro to {courseName}</p>
            </div>
            <div>
              <p className="text-caption uppercase text-muted">Cohort</p>
              <p>Cohort 3 ({cohort})</p>
            </div>
            <div>
              <p className="text-caption uppercase text-muted">Student</p>
              <p>{studentName}</p>
            </div>
            <div>
              <p className="text-caption uppercase text-muted">Date</p>
              <p>{today.toLocaleDateString("en-US", { dateStyle: "full" })}</p>
            </div>
          </div>

          {!qrGenerated ? (
            <Button onClick={() => setQrGenerated(true)}>
              Generate QR Code
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 border border-border bg-background p-6">
                {/* QR Code placeholder — will use actual QR library when backend is ready */}
                <div className="flex h-[220px] w-[220px] items-center justify-center border-2 border-dashed border-border bg-surface p-4">
                  <div className="text-center">
                    <p className="font-mono text-h3 text-foreground">QR</p>
                    <p className="mt-1 font-mono text-caption text-muted">
                      Code Preview
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-mono text-caption text-muted">
                Show this QR code to your mentor to mark your attendance. Each
                code is unique per day.
              </p>

              <Button variant="secondary" onClick={() => setQrGenerated(false)}>
                Regenerate
              </Button>
            </div>
          )}
        </div>
      </Card>

      <AttendanceHistory records={sampleAttendanceHistory} />
    </div>
  );
}
