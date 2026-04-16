"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { Toast } from "@/components/ui/Toast";
import { useToast } from "@/lib/hooks/useToast";
import { authApi } from "@/lib/api/auth";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const { toasts, push, remove } = useToast();
  const router = useRouter();

  async function handleSubmit(email: string, password: string): Promise<void> {
    setLoading(true);
    try {
      const res = await authApi.adminLogin(email, password);
      document.cookie = `courseflow_session=${res.access_token}; path=/; max-age=${res.expires_in}`;
      push("Signed in successfully", "success");
      setTimeout(() => router.push("/admin"), 800);
    } catch (err) {
      push(err instanceof Error ? err.message : "Invalid credentials. Try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AuthCard>
        <AuthHeader title="Admin Sign In" subtitle="Manage applications, attendance, and course content." adminLabel="Admin Access" />
        <LoginForm onSubmit={handleSubmit} isLoading={loading} submitLabel="Sign In as Admin" />
        <AuthFooter prompt="No account yet?" linkLabel="Register as admin" href="/admin/register" />
        <AuthFooter prompt="Student?" linkLabel="Use student login" href="/login" />
      </AuthCard>
      <Toast toasts={toasts} onClose={remove} />
    </>
  );
}
