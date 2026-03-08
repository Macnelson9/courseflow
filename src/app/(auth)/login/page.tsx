"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/Button";

export default function StudentLoginPage() {
  return (
    <Suspense
      fallback={
        <AuthCard>
          <p className="font-mono text-caption text-muted">Loading login...</p>
        </AuthCard>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const paramRole = params.get("role");
  const role =
    paramRole === "admin" || paramRole === "mentor" ? paramRole : "student";

  async function handleSubmit(email: string, password: string): Promise<void> {
    setLoading(true);
    setError(undefined);

    try {
      if (!email || !password) {
        setError("Provide both email and password.");
        return;
      }

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "mentor") {
        router.push("/mentor");
      } else {
        router.push("/student");
      }
    } catch {
      setError("Unable to sign in. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard className="max-w-[520px]">
      <div className="flex gap-2">
        <Link href="/login?role=student" className="flex-1">
          <Button
            variant={role === "student" ? "primary" : "secondary"}
            className="w-full"
          >
            Student Login
          </Button>
        </Link>
        <Link href="/login?role=mentor" className="flex-1">
          <Button
            variant={role === "mentor" ? "primary" : "secondary"}
            className="w-full"
          >
            Mentor Login
          </Button>
        </Link>
        <Link href="/login?role=admin" className="flex-1">
          <Button
            variant={role === "admin" ? "primary" : "secondary"}
            className="w-full"
          >
            Admin Login
          </Button>
        </Link>
      </div>

      <AuthHeader
        title={
          role === "admin"
            ? "Admin Sign In"
            : role === "mentor"
              ? "Mentor Sign In"
              : "Student Sign In"
        }
        subtitle={
          role === "admin"
            ? "Review applications, accept students, and control attendance sessions."
            : role === "mentor"
              ? "View assigned courses, students, attendance, and upload course content."
              : "Access your dashboard, attendance QR, assignments, and class updates."
        }
        {...(role === "admin" || role === "mentor"
          ? { adminLabel: "Restricted Access" }
          : {})}
      />

      <div className="space-y-3 border border-border bg-background p-4 font-mono text-caption text-muted">
        <p className="uppercase tracking-[0.08em]">Demo Credentials</p>
        {role === "admin" ? (
          <p>admin@courseflow.dev / AdminPass123</p>
        ) : role === "mentor" ? (
          <p>mentor@courseflow.dev / MentorPass123</p>
        ) : (
          <p>student@courseflow.dev / StudentPass123</p>
        )}
      </div>

      <LoginForm
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error}
        submitLabel={
          role === "admin"
            ? "Sign In as Admin"
            : role === "mentor"
              ? "Sign In as Mentor"
              : "Sign In"
        }
      />

      {role === "admin" || role === "mentor" ? (
        <AuthFooter
          prompt="Need student access?"
          linkLabel="Use student login"
          href="/login?role=student"
        />
      ) : (
        <AuthFooter
          prompt="First time here?"
          linkLabel="Start with welcome"
          href="/#welcome-section"
        />
      )}

      <div className="text-center font-mono text-caption text-muted">
        <Link href="/apply" className="underline underline-offset-2">
          Don&apos;t have an account? Apply to the cohort
        </Link>
      </div>
    </AuthCard>
  );
}
