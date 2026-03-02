"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(): Promise<void> {
    setLoading(true);
    setError(undefined);
    try {
      router.push("/admin");
    } catch {
      setError("Unable to sign in. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <AuthHeader title="Admin Sign In" subtitle="Manage applications, attendance, and course content." adminLabel="Admin Access" />
      <LoginForm onSubmit={handleSubmit} isLoading={loading} error={error} submitLabel="Sign In as Admin" />
      <AuthFooter prompt="Student?" linkLabel="Use student login" href="/login" />
    </AuthCard>
  );
}
