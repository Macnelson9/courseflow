"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  status: "present" | "absent";
  checkedInAt?: string;
  qrCode?: string;
}

const initialStudents: StudentRecord[] = [
  {
    id: "st1",
    name: "Aisha Bello",
    email: "aisha@example.com",
    status: "absent",
  },
  {
    id: "st2",
    name: "David Kim",
    email: "david@example.com",
    status: "absent",
  },
  { id: "st3", name: "Mina Park", email: "mina@example.com", status: "absent" },
  { id: "st4", name: "Noah Kim", email: "noah@example.com", status: "absent" },
  { id: "st5", name: "Tobi Ade", email: "tobi@example.com", status: "absent" },
  { id: "st6", name: "Nora Lin", email: "nora@example.com", status: "absent" },
];

export default function MentorAttendancePage() {
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [scanModal, setScanModal] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [scanning, setScanning] = useState(false);

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, "0")}${String(today.getMonth() + 1).padStart(2, "0")}${today.getFullYear()}`;

  async function handleScan(formData: FormData) {
    setScanning(true);
    setScanResult(null);

    const qrData = String(formData.get("qrData") ?? "")
      .trim()
      .toUpperCase();

    // Simulate QR validation: extract student name from the QR data
    // QR format: {CourseInitial}{CohortCode}{StudentName}{DDMMYYYY}
    // e.g., RCH3UCHE09032026
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!qrData) {
      setScanResult({ success: false, message: "No QR data provided." });
      setScanning(false);
      return;
    }

    // Check if the date part matches today
    if (!qrData.endsWith(dateStr)) {
      setScanResult({
        success: false,
        message:
          "QR code date does not match today. Code may be expired or from another day.",
      });
      setScanning(false);
      return;
    }

    // Try to find a matching student by checking if their name appears in the QR code
    const matchedStudent = students.find((s) => {
      const firstName = s.name.split(" ")[0];
      if (!firstName) return false;
      const nameUpper = firstName.toUpperCase();
      return qrData.includes(nameUpper);
    });

    if (!matchedStudent) {
      setScanResult({
        success: false,
        message:
          "Student not found in class roster. QR code does not match any enrolled student.",
      });
      setScanning(false);
      return;
    }

    if (matchedStudent.status === "present") {
      setScanResult({
        success: false,
        message: `${matchedStudent.name} is already marked present.`,
      });
      setScanning(false);
      return;
    }

    // Mark student present
    const checkedInTime = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setStudents((prev) =>
      prev.map((s) =>
        s.id === matchedStudent.id
          ? {
              ...s,
              status: "present" as const,
              checkedInAt: checkedInTime,
              qrCode: qrData,
            }
          : s,
      ),
    );
    setScanResult({
      success: true,
      message: `${matchedStudent.name} marked present at ${checkedInTime}.`,
    });
    setScanning(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Records"
        subtitle="Scan student QR codes to validate and mark attendance."
        action={
          <Button
            onClick={() => {
              setScanModal(true);
              setScanResult(null);
            }}
          >
            Scan QR Code
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Present
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {presentCount}
          </h3>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Absent
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {absentCount}
          </h3>
        </Card>
        <Card>
          <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
            Total Students
          </p>
          <h3 className="mt-2 text-[clamp(30px,4vw,40px)] leading-none tracking-[-2px]">
            {students.length}
          </h3>
        </Card>
      </div>

      <Card title="QR Code Validation" description="How QR attendance works">
        <div className="space-y-2 font-mono text-caption text-muted">
          <p>
            Each student generates a unique QR code daily on their dashboard.
          </p>
          <p>Scan or enter the QR code data to validate.</p>
          <p>
            By default, all students are marked{" "}
            <span className="text-foreground">absent</span> until validated.
          </p>
        </div>
      </Card>

      <div className="overflow-x-auto border border-border" aria-live="polite">
        <table className="min-w-full border-collapse font-mono text-caption">
          <thead className="bg-primary text-inverse-fg">
            <tr>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Checked In</th>
              <th className="px-4 py-3 text-left">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {students.map((record) => (
              <tr key={record.id} className="border-t border-divider">
                <td className="px-4 py-3">{record.name}</td>
                <td className="px-4 py-3">{record.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`uppercase ${record.status === "present" ? "text-foreground font-semibold" : "text-muted"}`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-3">{record.checkedInAt ?? "-"}</td>
                <td className="px-4 py-3 text-[10px]">
                  {record.qrCode ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QR Scan Modal */}
      <Modal
        isOpen={scanModal}
        onClose={() => setScanModal(false)}
        title="Scan / Enter QR Code"
        footer={null}
      >
        <form action={handleScan} className="space-y-4">
          <p className="font-mono text-caption text-muted">
            Enter the QR code data from a student&apos;s generated attendance
            code. In production, this will use camera-based scanning.
          </p>

          <Input
            name="qrData"
            label="QR Code Data"
            placeholder={`e.g., RCH3AISHA${dateStr}`}
            required
          />

          {scanResult ? (
            <div
              className={`border p-3 font-mono text-caption ${scanResult.success ? "border-foreground bg-background text-foreground" : "border-border bg-background text-foreground"}`}
            >
              {scanResult.success ? "✓ " : "✗ "}
              {scanResult.message}
            </div>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setScanModal(false)}
            >
              Close
            </Button>
            <Button type="submit" loading={scanning}>
              Validate QR
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
