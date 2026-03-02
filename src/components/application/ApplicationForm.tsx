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
      motivation: String(formData.get("motivation") ?? "").trim(),
      experience: String(formData.get("experience") ?? "").trim(),
    };

    const nextErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
    if (!payload.fullName) nextErrors.fullName = "Full name is required.";
    if (!payload.email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(payload.email)) nextErrors.email = "Use a valid email format.";
    if (!payload.phone) nextErrors.phone = "Phone is required.";
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
