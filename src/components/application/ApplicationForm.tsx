"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import confetti from "canvas-confetti";
import { isValidEmail } from "@/lib/utils/validators";
import { courseApi, type PublicCourse } from "@/lib/api/course";
import { applicationsApi } from "@/lib/api/applications";

interface FieldErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  course_id?: string;
  motivation?: string;
  experience?: string;
}

type ModalState = "idle" | "loading" | "success" | "error";

export function ApplicationForm() {
  const [courses, setCourses] = useState<PublicCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<ModalState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    courseApi.getCourses().then(setCourses).catch(() => {});
  }, []);

  async function submit(formData: FormData) {
    const first_name = String(formData.get("first_name") ?? "").trim();
    const last_name = String(formData.get("last_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const course_id = String(formData.get("course_id") ?? "").trim();
    const motivation = String(formData.get("motivation") ?? "").trim();
    const experience = String(formData.get("experience") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!first_name) nextErrors.first_name = "First name is required.";
    if (!last_name) nextErrors.last_name = "Last name is required.";
    if (!email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Use a valid email format.";
    if (!course_id) nextErrors.course_id = "Please select a course.";
    if (!motivation || motivation.length < 20) nextErrors.motivation = "Share at least 20 characters about your motivation.";
    if (!experience || experience.length < 20) nextErrors.experience = "Share at least 20 characters about your prior experience.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setModalState("loading");

    try {
      await applicationsApi.submit({ first_name, last_name, email, course_id, motivation, experience });
      setModalState("success");
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 }, colors: ["#000000", "#ffffff", "#555555"] });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to submit your application. Please retry.";
      setErrorMessage(message);
      setModalState("error");
    } finally {
      setLoading(false);
    }
  }

  const modalTitle =
    modalState === "loading" ? "Submitting…" :
    modalState === "success" ? "Application Received" :
    "Submission Failed";

  return (
    <>
      <form action={submit} className={cn("space-y-4 transition-[filter] duration-200", loading && "blur-sm pointer-events-none")} aria-busy={loading}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="first_name" label="First Name" required error={fieldErrors.first_name} />
          <Input name="last_name" label="Last Name" required error={fieldErrors.last_name} />
        </div>
        <Input name="email" type="email" label="Email Address" required error={fieldErrors.email} />

        <div className="space-y-2">
          <label htmlFor="course_id" className="block font-mono text-label uppercase text-muted">
            Available Courses
          </label>
          <select
            id="course_id"
            name="course_id"
            required
            aria-invalid={Boolean(fieldErrors.course_id)}
            aria-describedby={fieldErrors.course_id ? "course_id-error" : undefined}
            className="h-12 w-full border border-border bg-surface px-4 font-mono text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            defaultValue=""
          >
            <option value="" disabled>
              {courses.length === 0 ? "Loading courses…" : "Select a course"}
            </option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {fieldErrors.course_id ? (
            <p id="course_id-error" className="font-mono text-caption text-foreground" role="alert">
              {fieldErrors.course_id}
            </p>
          ) : null}
        </div>

        <Textarea name="motivation" label="Why do you want to take this course?" required minLength={20} error={fieldErrors.motivation} />
        <Textarea name="experience" label="Prior Programming Experience" required minLength={20} error={fieldErrors.experience} />

        <Button type="submit" loading={loading} className="w-full sm:w-auto">
          Submit Application
        </Button>
      </form>

      <Modal
        isOpen={modalState !== "idle"}
        onClose={() => setModalState("idle")}
        title={modalTitle}
        footer={
          modalState !== "loading" ? (
            <Button onClick={() => setModalState("idle")} className="w-full sm:w-auto">
              {modalState === "success" ? "Done" : "Try Again"}
            </Button>
          ) : null
        }
      >
        {modalState === "loading" && (
          <p className="font-mono text-body text-muted">
            Sending your application — please wait…
          </p>
        )}
        {modalState === "success" && (
          <p className="font-mono text-body text-foreground">
            Application submitted successfully! Keep an eye out for an email with further instructions after your application has been reviewed.
          </p>
        )}
        {modalState === "error" && (
          <p className="font-mono text-body text-foreground">
            {errorMessage}
          </p>
        )}
      </Modal>
    </>
  );
}
