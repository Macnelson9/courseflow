"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setSuccess(undefined);
    setError(undefined);

    const currentPassword = String(
      formData.get("currentPassword") ?? "",
    ).trim();
    const newPassword = String(formData.get("newPassword") ?? "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    ).trim();

    const nextErrors: Record<string, string> = {};
    if (!currentPassword)
      nextErrors.currentPassword = "Current password is required.";
    if (!newPassword) nextErrors.newPassword = "New password is required.";
    else if (newPassword.length < 8)
      nextErrors.newPassword = "Password must be at least 8 characters.";
    if (!confirmPassword)
      nextErrors.confirmPassword = "Please confirm your new password.";
    else if (newPassword !== confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      // API call will be made here
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess("Password changed successfully.");
    } catch {
      setError("Unable to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Change Password" description="Update your login credentials">
      <form action={handleSubmit} className="space-y-4" aria-busy={loading}>
        {success ? (
          <p className="border border-border bg-background p-3 font-mono text-caption text-foreground">
            {success}
          </p>
        ) : null}
        {error ? (
          <p className="border border-border bg-background p-3 font-mono text-caption text-foreground">
            {error}
          </p>
        ) : null}

        <Input
          name="currentPassword"
          type="password"
          label="Current Password"
          placeholder="Enter your current password"
          required
          error={fieldErrors.currentPassword}
        />
        <Input
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="At least 8 characters"
          required
          error={fieldErrors.newPassword}
        />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          required
          error={fieldErrors.confirmPassword}
        />

        <Button type="submit" loading={loading}>
          Update Password
        </Button>
      </form>
    </Card>
  );
}
