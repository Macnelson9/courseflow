"use client";

import { useRouter } from "next/navigation";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ApplyPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Apply to CourseFlow"
        subtitle="Submit your application for the active cohort. Admin review is manual and status updates are emailed."
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="border border-border bg-surface p-5 md:p-6">
          <h2 className="text-h3 text-foreground">Student Application Form</h2>
          <p className="mt-2 font-mono text-caption text-muted">
            Complete all required fields. Once accepted, you&apos;ll get dashboard access and attendance tools.
          </p>
          <div className="mt-5">
            <ApplicationForm onSubmit={async () => router.prefetch("/login")} />
          </div>
        </article>

        <aside className="space-y-4">
          <section className="border border-border bg-surface p-5">
            <h3 className="font-mono text-label uppercase text-foreground">What Happens Next</h3>
            <ol className="mt-3 space-y-2 font-mono text-caption text-muted">
              <li>01 • You receive confirmation email after submission.</li>
              <li>02 • Admin reviews and marks Accepted or Rejected.</li>
              <li>03 • Accepted students receive dashboard login link.</li>
              <li>04 • Attend classes and sign attendance via QR.</li>
            </ol>
          </section>

          <section className="border border-border bg-surface p-5">
            <h3 className="font-mono text-label uppercase text-foreground">Application Fields</h3>
            <ul className="mt-3 space-y-2 font-mono text-caption text-muted">
              <li>• Full Name</li>
              <li>• Email Address</li>
              <li>• Phone Number</li>
              <li>• Motivation Statement</li>
              <li>• Prior Programming Experience</li>
            </ul>
          </section>
        </aside>
      </section>
    </div>
  );
}
