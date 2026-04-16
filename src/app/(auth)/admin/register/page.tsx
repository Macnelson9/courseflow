"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { authApi } from "@/lib/api/auth";
import { isValidEmail } from "@/lib/utils/validators";
import type { UserRole } from "@/lib/types/auth";

const ROLES: UserRole[] = ["admin", "mentor", "student"];

interface FieldErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export default function AdminRegisterPage() {
  const [role, setRole] = useState<UserRole>("admin");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const first_name = String(formData.get("first_name") ?? "").trim();
    const last_name = String(formData.get("last_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextErrors: FieldErrors = {};
    if (!first_name) nextErrors.first_name = "First name is required.";
    if (!last_name) nextErrors.last_name = "Last name is required.";
    if (!email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Use a valid email format.";
    if (!password || password.length < 8) nextErrors.password = "Password must be at least 8 characters.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setError(undefined);
    try {
      await authApi.adminRegister({ first_name, last_name, email, password, role });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AuthCard className="max-w-[520px]">
        <AuthHeader title="Register Account" subtitle="Create a new admin, mentor, or student account." adminLabel="Admin Portal" />

        <div className="flex gap-2">
          {ROLES.map((r) => (
            <Button key={r} variant={role === r ? "primary" : "secondary"} size="sm" className="flex-1 capitalize" onClick={() => setRole(r)}>
              {r}
            </Button>
          ))}
        </div>

        <form action={handleSubmit} className="space-y-4" aria-busy={loading}>
          {error ? <p className="border border-border bg-background p-3 font-mono text-caption text-foreground">{error}</p> : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="first_name" label="First Name" required error={fieldErrors.first_name} />
            <Input name="last_name" label="Last Name" required error={fieldErrors.last_name} />
          </div>
          <Input name="email" type="email" label="Email Address" required error={fieldErrors.email} />
          <Input name="password" type="password" label="Password" required autoComplete="new-password" error={fieldErrors.password} />
          <Button type="submit" loading={loading} className="w-full">
            Register {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </form>

        <AuthFooter prompt="Already have an account?" linkLabel="Sign in as admin" href="/admin/login" />
      </AuthCard>

      <Modal
        isOpen={success}
        onClose={() => { setSuccess(false); router.push("/admin/login"); }}
        title="Registration Successful"
        footer={
          <Button onClick={() => { setSuccess(false); router.push("/admin/login"); }} className="w-full sm:w-auto">
            Go to Login
          </Button>
        }
      >
        <p className="font-mono text-body text-foreground">
          Your account has been created successfully. You can now sign in with your credentials.
        </p>
      </Modal>
    </>
  );
}
