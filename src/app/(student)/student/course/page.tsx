"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { CourseMaterials } from "@/components/course/CourseMaterials";
import { sampleCourse } from "@/lib/mock-data";

export default function StudentCoursePage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitModal, setSubmitModal] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | undefined>();

  const selectedAssignment = sampleCourse.assignments.find(
    (a) => a.id === submitModal,
  );

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    const _prUrl = String(formData.get("prUrl") ?? "").trim();
    const _notes = String(formData.get("notes") ?? "").trim();

    try {
      // API call will be made here
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess(
        `Assignment "${selectedAssignment?.title}" submitted successfully.`,
      );
      setSubmitModal(null);
    } catch {
      // Error handling will go here
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={sampleCourse.name}
        subtitle={`${sampleCourse.schedule} · ${sampleCourse.venue}`}
      />

      {success ? (
        <div className="border border-border bg-background p-3 font-mono text-caption text-foreground">
          {success}
        </div>
      ) : null}

      <Card
        title="Course Details"
        description={`${sampleCourse.startDate} — ${sampleCourse.endDate}`}
      >
        <p className="font-mono text-body text-muted">
          {sampleCourse.description}
        </p>
        <div className="mt-3 grid gap-3 font-mono text-body text-muted sm:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-muted">Schedule</p>
            <p>{sampleCourse.schedule}</p>
          </div>
          <div>
            <p className="text-caption uppercase text-muted">Venue</p>
            <p>{sampleCourse.venue}</p>
          </div>
          <div>
            <p className="text-caption uppercase text-muted">Repository</p>
            <a
              href={sampleCourse.githubRepoUrl}
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {sampleCourse.githubRepoUrl}
            </a>
          </div>
        </div>
      </Card>

      <CourseMaterials materials={sampleCourse.materials} />

      <Card title="Assignments" headerTone="inverse">
        {sampleCourse.assignments.length === 0 ? (
          <p className="font-mono text-body text-muted">
            No assignments have been published yet.
          </p>
        ) : (
          <div className="space-y-4">
            {sampleCourse.assignments.map((assignment) => (
              <article
                key={assignment.id}
                className="space-y-3 border border-border bg-background p-4"
              >
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-body font-semibold text-foreground">
                      {assignment.title}
                    </h3>
                    <p className="mt-1 font-mono text-caption text-muted">
                      {assignment.brief}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-caption text-muted">
                    Due: {assignment.dueDate}
                  </span>
                </div>
                <div className="font-mono text-caption text-muted">
                  <p className="uppercase text-muted">PR Instructions</p>
                  <p>{assignment.prInstructions}</p>
                </div>
                <Button size="sm" onClick={() => setSubmitModal(assignment.id)}>
                  Submit Assignment
                </Button>
              </article>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={Boolean(submitModal)}
        onClose={() => setSubmitModal(null)}
        title={`Submit: ${selectedAssignment?.title ?? "Assignment"}`}
        footer={null}
      >
        <form action={handleSubmit} className="space-y-4">
          <p className="font-mono text-caption text-muted">
            {selectedAssignment?.brief}
          </p>
          <p className="font-mono text-caption text-muted">
            Due: {selectedAssignment?.dueDate}
          </p>
          <Input
            name="prUrl"
            label="Pull Request URL"
            type="url"
            placeholder="https://github.com/..."
            required
          />
          <Textarea
            name="notes"
            label="Additional Notes (Optional)"
            placeholder="Any extra context for the mentor..."
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setSubmitModal(null)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
