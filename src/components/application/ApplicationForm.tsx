"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { isValidEmail } from "@/lib/utils/validators";

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  selectedCourse: string;
  motivation: string;
  experience: string;
}

export interface ApplicationFormProps {
  onSubmit?: (payload: ApplicationFormData) => Promise<void>;
}

export function ApplicationForm({ onSubmit }: Readonly<ApplicationFormProps>) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});

  async function submit(formData: FormData) {
    setLoading(true);
    setSuccess(undefined);
    setError(undefined);

    const payload: ApplicationFormData = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      selectedCourse: String(formData.get("selectedCourse") ?? "").trim(),
      motivation: String(formData.get("motivation") ?? "").trim(),
      experience: String(formData.get("experience") ?? "").trim(),
    };

    const nextErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
    if (!payload.fullName) nextErrors.fullName = "Full name is required.";
    if (!payload.email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(payload.email)) nextErrors.email = "Use a valid email format.";
    if (!payload.phone) nextErrors.phone = "Phone is required.";
    if (!payload.selectedCourse) nextErrors.selectedCourse = "Please select a course.";
    if (!payload.motivation || payload.motivation.length < 20) {
      nextErrors.motivation = "Share at least 20 characters about your motivation.";
    }
    if (!payload.experience || payload.experience.length < 20) {
      nextErrors.experience = "Share at least 20 characters about your prior experience.";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await onSubmit?.(payload);
      setSuccess("Application submitted. Check your email for confirmation and status updates.");
    } catch {
      setError("Unable to submit your application at the moment. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={submit} className="space-y-4" aria-busy={loading}>
      {success ? <p className="border border-border bg-background p-3 font-mono text-caption text-foreground">{success}</p> : null}
      {error ? <p className="border border-border bg-background p-3 font-mono text-caption text-foreground">{error}</p> : null}

      <Input name="fullName" label="Full Name" required error={fieldErrors.fullName} />
      <Input name="email" type="email" label="Email Address" required error={fieldErrors.email} />
      <Input name="phone" type="tel" label="Phone Number" required error={fieldErrors.phone} />
      <div className="space-y-2">
        <label htmlFor="selectedCourse" className="block font-mono text-label uppercase text-muted">
          Available Courses
        </label>
        <select
          id="selectedCourse"
          name="selectedCourse"
          required
          aria-invalid={Boolean(fieldErrors.selectedCourse)}
          aria-describedby={fieldErrors.selectedCourse ? "selectedCourse-error" : undefined}
          className="h-12 w-full border border-border bg-surface px-4 font-mono text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select a course
          </option>
          <option value="Intro to Rust">Intro to Rust</option>
          <option value="Intro to Blockchain using Solidity">Intro to Blockchain using Solidity</option>
          <option value="Design Basics">Design Basics</option>
          <option value="Intro to Starknet using Cairo">Intro to Starknet using Cairo</option>
          <option value="Video Editing Basics">Video Editing Basics</option>
          <option value="Rust for Bitcoin">Rust for Bitcoin</option>
          <option value="Product Management">Product Management</option>
        </select>
        {fieldErrors.selectedCourse ? (
          <p id="selectedCourse-error" className="font-mono text-caption text-foreground" role="alert">
            {fieldErrors.selectedCourse}
          </p>
        ) : null}
      </div>
      <Textarea name="motivation" label="Why do you want to take this course?" required minLength={20} error={fieldErrors.motivation} />
      <Textarea
        name="experience"
        label="Prior Programming Experience"
        required
        minLength={20}
        error={fieldErrors.experience}
      />

      <Button type="submit" loading={loading} className="w-full sm:w-auto">
        Submit Application
      </Button>
    </form>
  );
}
