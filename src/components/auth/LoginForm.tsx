"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidEmail } from "@/lib/utils/validators";

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

export function LoginForm({ onSubmit, isLoading, submitLabel = "Sign In" }: Readonly<LoginFormProps>) {
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextErrors: { email?: string; password?: string } = {};
    if (!email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Use a valid email.";
    if (!password) nextErrors.password = "Password is required.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(email, password);
  }

  return (
    <form action={handleSubmit} className="space-y-4" aria-busy={isLoading}>
      <Input name="email" type="email" label="Email" autoComplete="email" error={fieldErrors.email} />
      <Input name="password" type="password" label="Password" autoComplete="current-password" error={fieldErrors.password} />
      <Button type="submit" loading={isLoading} disabled={isLoading} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
