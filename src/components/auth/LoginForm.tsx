"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidEmail } from "@/lib/utils/validators";

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error?: string | undefined;
  submitLabel?: string;
}

export function LoginForm({ onSubmit, isLoading, error, submitLabel = "Sign In" }: Readonly<LoginFormProps>) {
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
      {error ? <p className="border border-border bg-background p-3 font-mono text-caption text-foreground">{error}</p> : null}
      <Input name="email" type="email" label="Email" autoComplete="email" error={fieldErrors.email} />
      <Input name="password" type="password" label="Password" autoComplete="current-password" error={fieldErrors.password} />
      <Button type="submit" loading={isLoading} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
